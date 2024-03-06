import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query(() => Float, {
        name: 'randomNumber'
    })
    getRandomNumber(): number {
        return Math.random() * 100;
    }

    @Query( () => Int, {
        name: 'randomFromZeroTo',
        description: 'generate a numbero from 0 to a specify number (or 6 if it is not default)'
    })
    getRandomFromZeroTo(
        @Args('to', { nullable: true, type: () => Int}) to: number = 6
    ): number {
        return Math.floor(Math.random() * to);
    }
}
