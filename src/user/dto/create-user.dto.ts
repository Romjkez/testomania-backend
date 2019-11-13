import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { MAX_EMAIL_LENGTH, MAX_LOGIN_LENGTH, MAX_PASSWORD_LENGTH } from '../entity/user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(MAX_PASSWORD_LENGTH)
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(MAX_LOGIN_LENGTH)
  readonly login: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(MAX_EMAIL_LENGTH)
  readonly email?: string;
}
