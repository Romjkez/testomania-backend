import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
  }

  create(createOptions: CreateUserDto): Promise<User> {
    return this.userRepository.save(createOptions);
  }

  /*update(updateOptions: UpdateUserDto): Promise<User> {
  }*/

  delete(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  getById(id: number): Promise<User> {
    return this.userRepository.findOneOrFail(id);
  }

  /*getMultipleById(ids: number[]): Promise<User[]> {

  }*/
}
