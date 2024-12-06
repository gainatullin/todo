import { Todo, TodoService } from './todo.service';
export declare class TodoController {
    private todoService;
    constructor(todoService: TodoService);
    create(dto: any): Todo;
    get(): Todo[];
    remove(id: string): void;
    updateIsCompleted(id: number, isCompleted: boolean): void;
}
