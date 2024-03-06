import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dtos/inputs/create-todo.input';
import { UpdateTodoInput } from './dtos/inputs/update-todo.input';
import { StatusArgs } from './dtos/args/status.args';

@Injectable()
export class TodoService {
    private todos: Array<Todo> = [
        {id: 0, description: 'Recoger jardín', done: false},
        {id: 1, description: 'Limpieza general', done: false},
        {id: 2, description: 'Pasear al perro', done: false},
        {id: 3, description: 'Ir a la compra', done: false},
    ]

    findAll(status: StatusArgs): Array<Todo> {
        if(status.status !== undefined)
            return this.todos.filter( (todo) => todo.done === status.status)
        return this.todos;
    }

    findBy(id: number) {
        const todo = this.todos.find( (todo) => todo.id === id);

        if(!todo)
            throw new NotFoundException(`Todo ${id} not found.`);

        return todo;
    }

    create(createTodoInput: CreateTodoInput) {
        const todo = new Todo();
        todo.description = createTodoInput.description;
        todo.id = this.todos.length;

        this.todos.push(todo);

        return todo;
    }

    update(id: number, updateTodoInput: UpdateTodoInput){
       const todo = this.findBy(id);

       if(updateTodoInput.description)
            todo.description = updateTodoInput.description

        if(updateTodoInput.done !== undefined)
            todo.done = updateTodoInput.done

        this.todos.filter( (todo) => todo.id !== id).push(todo);

        return todo;
    }


    delete(id: number){
        this.findBy(id);
        this.todos = this.todos.filter( (todo) => todo.id !== id);
    }

    get totalTodos() {
        return this.todos.length;
    }

    get completedTodos() {
        return this.todos.filter( (todo) => todo.done === true).length
    }

    get pendingTodos() {
        return this.todos.filter( (todo) => todo.done === false).length
    }
}
