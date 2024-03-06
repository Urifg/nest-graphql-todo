import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dtos/inputs/create-todo.input';
import { UpdateTodoInput } from './dtos/inputs/update-todo.input';
import { StatusArgs } from './dtos/args/status.args';

@Resolver( () => Todo )
export class TodoResolver {

    constructor(
        private readonly todoService: TodoService,
    ){}

    @Query( () => [Todo], {name: 'todos'})
    findAll(
        @Args() statusArgs: StatusArgs
    ) {
        return this.todoService.findAll(statusArgs);
    }

    @Query( () => Todo, {name: 'todo'})
    findOne(
        @Args('id', {type: () => Int}) id: number
    ) {
        return this.todoService.findBy(id);
    }

    @Mutation(() => Todo, {name: 'createTodo'})
    create(
        @Args('createTodoInput') createTodoInput: CreateTodoInput
    ) {
        return this.todoService.create(createTodoInput);
    }

    @Mutation(() => Todo, {name: 'updateTodo'})
    update(
        @Args('updateTodoInput') updateTodoInput: UpdateTodoInput
    ) {
        return this.todoService.update(updateTodoInput.id, updateTodoInput)
    }

    @Mutation(() => Boolean, {name: 'deleteTodo'})
    delete(
        @Args('id', {type: () => Int}) id: number
    ) {
        this.todoService.delete(id);

        return true;
    }

    // Aggregations
    @Query(() => Int, {name: 'totalTodos'})
    count() {
        return this.todoService.totalTodos;
    }

    @Query(() => Int, {name: 'pendingTodos'})
    countUncompleted() {
        return this.todoService.pendingTodos;
    }

    @Query(() => Int, {name: 'completedTodos'})
    countCompleted() {
        return this.todoService.completedTodos;
    }
}
