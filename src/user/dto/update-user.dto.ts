import { IsEmail, IsObject, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { MAX_EMAIL_LENGTH, MAX_PASSWORD_LENGTH, TestResult } from '../entity/user.entity';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(MAX_PASSWORD_LENGTH)
  @MinLength(6)
  readonly password?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(MAX_EMAIL_LENGTH)
  readonly email?: string;

  @IsOptional()
  @IsObject()
  readonly finishedTests?: TestResult;
}
