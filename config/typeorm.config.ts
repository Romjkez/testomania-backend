import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../src/user/entity/user.entity';
import { Question } from '../src/question/entity/question.entity';
import { Test } from '../src/test/entity/test.entity';

export let typeOrmOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.NODE_ENV === 'production' ? 'std-mysql' : 'localhost',
  port: 3306,
  username: process.env.NODE_ENV === 'production' ? 'std_259' : 'std_247',
  password: process.env.NODE_ENV === 'production' ? 'MontaJ322' : 'qwerty123',
  database: process.env.NODE_ENV === 'production' ? 'std_259' : 'std_247',
  entities: [User, Question, Test],
  synchronize: true,
};
