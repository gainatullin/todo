import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Todo, TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post('/')
  create(@Body() dto): Todo {
    return this.todoService.create(dto);
  }

  @Get('/')
  get() {
    return this.todoService.getAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.todoService.remove(Number(id));
  }

  @Patch(':id')
  updateIsCompleted(
    @Param('id') id: number,
    @Body('isCompleted') isCompleted: boolean,
  ) {
    return this.todoService.updateTodoStatus(Number(id), isCompleted);
  }
}
