import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { Test } from './entity/test.entity';
import { ApiUseTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

@ApiUseTags('Test')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<Test> {
    return this.testService.getById(id);
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
