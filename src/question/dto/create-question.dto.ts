import { IsArray, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { MAX_QUESTION_LENGTH } from '../entity/question.entity';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(MAX_QUESTION_LENGTH)
  text: string;

  @IsArray({ each: true })
  @IsNotEmpty()
  options: string[];

  @IsNumber()
  @IsNotEmpty()
  rightOptionId: number;
}
