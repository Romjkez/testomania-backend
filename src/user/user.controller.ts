import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiImplicitQuery, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { UpdateUserDtoPipe } from './pipes/update-user-dto.pipe';
import { DeleteResult } from 'typeorm';
import { User } from './entity/user.entity';

@ApiUseTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get('auth')
  @ApiImplicitQuery({ name: 'login', type: 'string', required: true })
  @ApiImplicitQuery({ name: 'password', type: 'string', required: true })
  async checkUserPassword(@Query('login') login: string,
                          @Query('password') pass: string): Promise<{ correctPassword: boolean }> {
    return this.userService.checkPassword(login, pass).then(res => {
      return { correctPassword: res };
    }).catch(e => {
      if (e.name === 'EntityNotFound') {
        throw new NotFoundException(`No user found with specified login: ${login}`);
      }
      throw new BadRequestException(e);
    });
  }

  @Get('multiple')
  async getMultipleById(@Query('ids') ids: number[]): Promise<User[]> {
    if (ids && ids.length > 0) {
      return this.userService.getMultipleById(ids).then(res => {
        if (res.length === 0) {
          throw new NotFoundException(`No users found with specified IDs: ${ids}`);
        }
        return res;
      });
    }
    throw new BadRequestException('You must specify `ids` query param with array of needed IDs');
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<User> {
    return this.userService.getById(id).catch(e => {
      if (e.name === 'EntityNotFound') {
        throw new NotFoundException(`No user found with specified ID: ${id}`);
      }
      throw new BadRequestException(e.message);
    });
  }

  @Put(':id')
  @UsePipes(UpdateUserDtoPipe)
  async update(@Body() options: UpdateUserDto, @Param('id') id: number): Promise<User> {
    return this.userService.update(id, options).catch(e => {
      if (e.name === 'EntityNotFound') {
        throw new NotFoundException(`No user found with specified ID: ${id}`);
      }
      throw new BadRequestException(e.message);
    });
  }

  @ApiOkResponse({ type: DeleteResult })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.delete(id).catch(e => {
      if (e.name === 'EntityNotFound') {
        throw new NotFoundException(`No user found with specified ID: ${id}`);
      }
      throw new BadRequestException(e.message);
    });
  }

  @Post()
  @HttpCode(201)
  async create(@Body() options: CreateUserDto): Promise<User> {
    return this.userService.create(options).catch(e => {
      throw new BadRequestException(e.message);
    });
  }

  @Get()
  @ApiImplicitQuery({ required: true, type: String, name: 'login' })
  async getByLogin(@Query('login') login: string): Promise<User> {
    return this.userService.getByLogin(login);
  }
}
