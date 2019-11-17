import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Test } from './entity/test.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTestDto } from './dto/create-test.dto';
import { Question } from '../question/entity/question.entity';

@Injectable()
export class TestService {
  constructor(@InjectRepository(Test) private readonly testRepository: Repository<Test>,
              @InjectRepository(Question) private readonly questionRepository: Repository<Question>) {
  }

  async create(createOptions: CreateTestDto) {
    const test = Object.assign(createOptions, { questions: [] });
    // TODO: привязать вопросы наподобие как у юзера
  }

  async delete(id: number) {
  }

  async getById(id: number): Promise<Test> {
    return this.testRepository.findOneOrFail(id);
  }

  async getMultipleById(ids: number[]) {

  }
}
