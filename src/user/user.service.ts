import { BadRequestException, ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { DeleteResult, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

const SAFE_USER_OUTPUT: FindOneOptions = {
  select: ['id', 'email', 'login', 'createdAt', 'updatedAt', 'finishedTests'],
  relations: ['createdTests'],
};

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
  }

  async create(createOptions: CreateUserDto): Promise<User> {
    return this.userRepository.findOne({ login: createOptions.login })
      .then(res => {
        if (!res) {
          return bcrypt.hash(createOptions.password, 5);
        }
        throw new ConflictException(`User with such login or email already exists`);
      })
      .then(hash => {
        const options: CreateUserDto = Object.assign(createOptions, { password: hash, finishedTests: [] });
        return this.userRepository.save(options);
      })
      .then(user => {
        const usr: User = Object.assign(user, { createdTests: [] });
        delete usr.password;
        return usr;
      });
  }

  async checkPassword(login: string, password: string): Promise<boolean> {
    return this.userRepository.findOneOrFail({ login: login })
      .then(user => bcrypt.compare(password, user.password));
  }

  async update(id: number, updateOptions: UpdateUserDto): Promise<User> {
    let password;
    if (updateOptions.password) {
      password = await bcrypt.hash(updateOptions.password, 5);
    }
    return this.userRepository
      .findOneOrFail(id)
      .then(async user => {
        const options: any = { ...updateOptions, updatedAt: new Date() };
        if (password) {
          options.password = password;
        }
        if (options.finishedTests) {
          user.finishedTests.forEach(t => {
            if (t.id === options.finishedTests.id) {
              throw new UnprocessableEntityException('User has already finished this test');
            }
          });
          options.finishedTests = user.finishedTests;
          options.finishedTests.push(updateOptions.finishedTests);
        }
        return this.userRepository.update(id, options as object);
      })
      .then(() => {
        return this.userRepository.findOne(id, SAFE_USER_OUTPUT);
      }).catch(e => {
        if (e.name === 'EntityNotFound') {
          throw new NotFoundException(`No user found with specified ID: ${id}`);
        }
        throw new BadRequestException(e.response || e);
      });
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  async getById(id: number): Promise<User> {
    return this.userRepository
      .findOneOrFail(id, SAFE_USER_OUTPUT);
  }

  async getByLogin(login: string): Promise<User> {
    return this.userRepository.findOneOrFail({ login: login }, SAFE_USER_OUTPUT);
  }

  async getMultipleById(ids: number[]): Promise<User[]> {
    return this.userRepository
      .findByIds(ids, SAFE_USER_OUTPUT as FindManyOptions);
  }
}
