import { Field, InputType, Int } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, MaxLength, IsInt, Min, IsNotEmpty } from "class-validator";

@InputType()
export class UpdateTodoInput {

    @Field(() => Int)
    @IsInt()
    @Min(0)
    id: number;

    @Field(() => String, {nullable: true, description: 'What needs to be done'})
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    description?: string;

    @Field(() => Boolean, {nullable: true, description: 'If the todo task has been done'})
    @IsBoolean()
    @IsOptional()
    done?: boolean;
}