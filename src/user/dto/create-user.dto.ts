import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { MAX_EMAIL_LENGTH, MAX_LOGIN_LENGTH, MAX_PASSWORD_LENGTH } from '../entity/user.entity';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(MAX_PASSWORD_LENGTH)
  @MinLength(6)
  @ApiModelProperty({ example: 'qwerty123', type: 'string', maxLength: MAX_PASSWORD_LENGTH, minLength: 6, required: true })
  readonly password: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(MAX_LOGIN_LENGTH)
  @ApiModelProperty({ example: 'puppy', type: 'string', minLength: 3, maxLength: MAX_LOGIN_LENGTH, required: true })
  readonly login: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(MAX_EMAIL_LENGTH)
  @ApiModelProperty({ example: 'dog@mail.com', required: false, maxLength: MAX_EMAIL_LENGTH, minLength: 3, type: 'string' })
  readonly email?: string;
}
