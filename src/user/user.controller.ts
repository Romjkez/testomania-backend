import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { DeleteResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<User> {
    return this.userService.getById(id).catch(e => {
      if (e.name === 'EntityNotFound') {
        throw new NotFoundException(`No user found with specified ID: ${id}`);
      }
      throw new BadRequestException(e.message);
    });
  }

  @Get()
  getMultipleById(@Query('ids') ids: number[]): Promise<User[]> {
    return this.userService.getMultipleById(ids);
  }

  @Post()
  create(@Body() options: CreateUserDto): Promise<User> {
    return this.userService.create(options).catch(e => {
      throw new BadRequestException(e.message);
    });
  }

  @Post(':id/auth')
  checkPassword(@Param('id') id: number, @Body('password') pass: string): Promise<{ correctPassword: boolean }> {
    return this.userService.checkPassword(id, pass)
      .then(res => {
        return { correctPassword: res };
      });
  }

  @Put(':id')
  update(@Body() options: UpdateUserDto, @Param('id') id: number): Promise<User> {
    // TODO: ВАЛИДИРОВАТЬ finishedTests
    return this.userService.update(id, options).catch(e => {
      if (e.name === 'EntityNotFound') {
        throw new NotFoundException(`No user found with specified ID: ${id}`);
      }
      throw new BadRequestException(e.message);
    });
  }

  @ApiOkResponse({ type: DeleteResult })
  @Delete(':id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.delete(id).catch(e => {
      if (e.name === 'EntityNotFound') {
        throw new NotFoundException(`No user found with specified ID: ${id}`);
      }
      throw new BadRequestException(e.message);
    });
  }
}
