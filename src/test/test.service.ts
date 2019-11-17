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
    return this.testRepository.save(createOptions);
    /* return of(this.testRepository.save(test))
       .pipe(
         first(),
         flatMap((t: Test) => {
           const questions: QuestionWithoutId[] = createOptions.questions.map(q => {
             const question: QuestionWithoutId = Object.assign(q, { parentTest: t });
             return question;
           });
           return zip(of(t), of(questions));
         }),
         map(([t, questions]) =>),
       );*/

    /*return this.testRepository.save(test)
      .then(t => {
        /!*const questions: QuestionWithoutId[] = createOptions.questions.map(q => {
          const question: QuestionWithoutId = Object.assign(q, { parentTest: t });
          return question;
        });*!/
        return [t, createOptions.questions];
      })
      .then(([t, questions]) => this.questionRepository.save(questions))
      .then();*/
  }

  async delete(id: number) {
  }

  async getById(id: number): Promise<Test> {
    return this.testRepository.findOneOrFail(id);
  }

  async getMultipleById(ids: number[]) {

  }
}
