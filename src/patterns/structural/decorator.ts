import { IRunner } from '../../runner';

interface Shape {
    draw(): void;
}

class Circle implements Shape {
    public draw(): void {
        console.log('Drawing a circle');
    }
}

class Rectangle implements Shape {
    public draw(): void {
        console.log('Drawing a rectangle');
    }
}

abstract class ShapeDecorator implements Shape {
    constructor(protected decoratedShape: Shape) { }

    public draw(): void { 
        this.decoratedShape.draw();
    };
}

class RedBorderDecorator extends ShapeDecorator {
    public draw(): void {
        super.draw();
        console.log('<span style="border: 1px solid red;">... with red border</span>');
    }
}

class GreenFillDecorator extends ShapeDecorator {
    public draw(): void {
        this.decoratedShape.draw();
        console.log('<span style="color:green;">... with green fill</span>');
    }
}

export class DecoratorPattern implements IRunner {
    public run(): void {

        const circle = new Circle();
        circle.draw();

        const rectangle = new Rectangle();
        rectangle.draw();

        console.log('<br/>');

        console.log('Decorating the circle with a red border');
        const redBorderCircle = new RedBorderDecorator(circle);
        redBorderCircle.draw();

        console.log('<br/>');

        console.log('Decorating the circle with a red border and green fill');
        const redBorderRectangle = new RedBorderDecorator(rectangle);
        const redBorderGreenFillRectangle = new GreenFillDecorator(redBorderRectangle);
        redBorderGreenFillRectangle.draw();
    }
}