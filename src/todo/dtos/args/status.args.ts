import { ArgsType, Field } from "@nestjs/graphql";
import { IsBoolean, IsOptional } from "class-validator";

@ArgsType()
export class StatusArgs {
    @Field( () => Boolean)
    @IsOptional()
    @IsBoolean()
    status?: boolean
}