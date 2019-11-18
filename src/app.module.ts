import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestModule } from './test/test.module';
import { typeOrmOptions } from '../config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOptions),
    UserModule,
    TestModule,
  ],
  controllers: [AppController],
})
export class AppModule {
}
