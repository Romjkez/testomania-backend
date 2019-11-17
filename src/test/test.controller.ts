import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { Test } from './entity/test.entity';
import { ApiImplicitQuery, ApiUseTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

export enum SortType {
  DESC = 'DESC',
  ASC = 'ASC',
}

@ApiUseTags('Test')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<Test> {
    return this.testService.getById(id);
  }

  @Get()
  @ApiImplicitQuery({ required: false, name: 'sort', enum: ['ASC', 'DESC'], type: 'string', description: 'Sort direction. Default: DESC' })
  @ApiImplicitQuery({ required: false, name: 'limit', type: 'number', description: 'How much items to return. Default: 15' })
  @ApiImplicitQuery({
    required: false, name: 'offset', type: 'number',
    description: 'How much items to skip from the beginning. Default: 0',
  })
  getAll(@Query('sort') sort?: SortType,
         @Query('limit') limit?: number,
         @Query('offset') offset?: number): Promise<Test[]> {
    return this.testService.getAll(sort || SortType.DESC, offset && offset >= 0 ? offset : 0, limit && limit > 0 ? limit : 15);
  }

  @Post()
  create(@Body() createOptions: CreateTestDto): Promise<Test> {
    return this.testService.create(createOptions);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.testService.delete(id);
  }
}
