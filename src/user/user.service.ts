import { ConflictException, Injectable } from '@nestjs/common';
import { DeleteResult, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

const SAFE_USER_OUTPUT: FindOneOptions = {
  select: ['id', 'email', 'login', 'createdAt', 'updatedAt', 'finishedTests'],
  join: {
    alias: 'user',
    leftJoinAndSelect: {
      createdTests: 'user.createdTests',
    },
  },
};

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
  }

  create(createOptions: CreateUserDto): Promise<User> {
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
      .then(user => Object.assign(user, { password: '', createdTests: [] }));
  }

  checkPassword(id: number, password: string): Promise<boolean> {
    return this.getById(id)
      .then(user => bcrypt.compare(password, user.password));
  }

  update(id: number, updateOptions: UpdateUserDto): Promise<User> {
    return this.userRepository
      .findOneOrFail(id)
      .then(user => {
        user.finishedTests.push(updateOptions.finishedTests);
        const options = {
          email: updateOptions.email || undefined,
          password: updateOptions.password || undefined,
          finishedTests: user.finishedTests || [],
        };
        return this.userRepository.update(id, Object.assign(options, { updatedAt: new Date() }));
      })
      .then(() => this.userRepository.findOneOrFail(id, SAFE_USER_OUTPUT));
  }

  delete(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  getById(id: number): Promise<User> {
    return this.userRepository
      .findOneOrFail(id, SAFE_USER_OUTPUT);
  }

  getMultipleById(ids: number[]): Promise<User[]> {
    return this.userRepository
      .findByIds(ids, SAFE_USER_OUTPUT as FindManyOptions);
  }
}
