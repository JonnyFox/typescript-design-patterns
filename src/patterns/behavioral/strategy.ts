import { IRunner } from "../../runner";

interface IStrategy {
    calculate(value1: number, value2: number): number;
}

class Plus implements IStrategy {
    public calculate(value1: number, value2: number): number {
        return value1 + value2;
    }
}

class Minus implements IStrategy {
    public calculate(value1: number, value2: number): number {
        return value1 - value2;
    }
}

class Multiply implements IStrategy {
    public calculate(value1: number, value2: number): number {
        return value1 * value2;
    }
}

class Context {
    constructor(public strategy: IStrategy) { }

    public executeStrategy(value1: number, value2: number): number {
        return this.strategy.calculate(value1, value2);
    }
}

export class StrategyPattern implements IRunner {
    public run(): void {

        console.log('<span style="color: orange">Initialize to "Plus Strategy"</span>');

        const context = new Context(new Plus());
        console.log(`Passing 10 and 5 to "Plus Strategy" = ${context.executeStrategy(10, 5)}`);

        console.log('<span style="color: orange">Switch to "Minus Strategy"</span>');

        context.strategy = new Minus();
        console.log(`Passing 10 and 5 to "Minus Strategy" = ${context.executeStrategy(10, 5)}`);

        console.log('<span style="color: orange">Switch to "Multiply Strategy"</span>');

        context.strategy = new Multiply();
        console.log(`Passing 10 and 5 to "Multiply Strategy" = ${context.executeStrategy(10, 5)}`);
    }
}