export type Todo = {
    id: number;
    title: string;
    isCompleted: boolean;
};
export declare class TodoService {
    private todos;
    private currentId;
    create(dto: {
        title: string;
    }): Todo;
    getAll(): Todo[];
    remove(id: any): void;
    updateTodoStatus(id: number, isCompleted: boolean): void;
    private findTodoById;
}
