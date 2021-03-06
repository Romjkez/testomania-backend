import { IsEmail, IsNotEmptyObject, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { MAX_EMAIL_LENGTH, MAX_PASSWORD_LENGTH } from '../entity/user.entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { TestResult } from '../../common/model/test-result.model';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(MAX_PASSWORD_LENGTH, { message: `Required password length: from 6 to ${MAX_PASSWORD_LENGTH}` })
  @MinLength(6, { message: `Required password length: from 6 to ${MAX_PASSWORD_LENGTH}` })
  @ApiModelProperty({ required: false, minLength: 6, maxLength: MAX_PASSWORD_LENGTH, type: 'string', example: 'qwerty321' })
  readonly password?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(MAX_EMAIL_LENGTH, { message: `Maximum password length is ${MAX_PASSWORD_LENGTH} symbols` })
  @ApiModelProperty({ required: false, minLength: 3, maxLength: MAX_EMAIL_LENGTH, type: 'string', example: 'kitten@mail.com' })
  readonly email?: string;

  @IsOptional()
  @IsNotEmptyObject()
  @ApiModelProperty({
    required: false,
    type: TestResult,
    example: { id: 1, result: [true, true, true] },
    description: 'TestResult to add to user`s model',
  })
  readonly finishedTests?: TestResult;
}
