"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
let TodoService = class TodoService {
    constructor() {
        this.todos = [];
        this.currentId = 0;
    }
    create(dto) {
        const newTodo = {
            id: this.currentId++,
            title: dto.title,
            isCompleted: false,
        };
        this.todos.push(newTodo);
        return newTodo;
    }
    getAll() {
        return this.todos;
    }
    remove(id) {
        const foundTodo = this.findTodoById(id);
        this.todos = this.todos.filter((todo) => todo.id !== foundTodo.id);
    }
    updateTodoStatus(id, isCompleted) {
        const todo = this.findTodoById(id);
        todo.isCompleted = isCompleted;
    }
    findTodoById(id) {
        const todo = this.todos.find((todo) => todo.id === id);
        if (!todo) {
            throw new common_1.NotFoundException('Todo with same id was not found!');
        }
        return todo;
    }
};
exports.TodoService = TodoService;
exports.TodoService = TodoService = __decorate([
    (0, common_1.Injectable)()
], TodoService);
//# sourceMappingURL=todo.service.js.map