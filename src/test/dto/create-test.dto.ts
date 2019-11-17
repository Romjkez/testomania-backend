import { Entity } from 'typeorm';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { MAX_TEST_TITLE_LENGTH, MIN_TEST_TITLE_LENGTH } from '../entity/test.entity';
import { CreateQuestionDto } from '../../question/dto/create-question.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../../user/entity/user.entity';

const questionsExample: CreateQuestionDto[] = [
  { text: 'Сколько будет 2+2*2', options: ['4', '6', '8'], rightOptionId: 2 },
  { text: 'Сколько будет 2/2*2', options: ['1', '2', '4'], rightOptionId: 2 },
];

@Entity()
export class CreateTestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(MAX_TEST_TITLE_LENGTH)
  @MinLength(MIN_TEST_TITLE_LENGTH)
  @ApiModelProperty({ example: 'Проверь знания математики?', nullable: false, required: true, type: 'string' })
  readonly title: string;

  @IsNotEmpty()
  @IsArray({ each: true })
  @ApiModelProperty({ example: questionsExample, required: true, nullable: false, isArray: true, type: CreateQuestionDto })
  readonly questions: CreateQuestionDto[];

  @IsNumber()
  @IsNotEmpty()
  @ApiModelProperty({ required: true, type: 'int', nullable: false, example: 8 })
  readonly createdBy: User; // TODO: брать ID из токена

  @IsNotEmpty()
  @IsOptional()
  @MaxLength(1000)
  @ApiModelProperty({
    example: 'Узнай, кто ты по жизни, чтобы не сомневаться!',
    type: 'string',
    required: false,
    nullable: true,
    maxLength: 1000,
  })
  readonly description?: string;
}
