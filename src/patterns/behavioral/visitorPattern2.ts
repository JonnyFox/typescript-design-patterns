import { IRunner } from "../../runner";

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
});

interface IVisitor2 {
    visitClerk(item: Clerk2);
    visitEmployee(item: Employee2);
}

class IncomeVisitor2 implements IVisitor2 {
    visitClerk(item: Clerk2) {
        item.income *= 1.1;
        this.log(item);
    }

    visitEmployee(item: Employee2) {
        item.income *= 1.3;
        this.log(item);
    }

    private log(item: Employee2): void {
        console.log(`${(<any>item.constructor).name} - ${item.name}'s new income: ${formatter.format(item.income)}`);
    }
}

class VacationVisitor2 implements IVisitor2 {
    public visitClerk(item: Clerk2) {
        item.vactionDays += 1;
        this.log(item);
    }

    public visitEmployee(item: Employee2) {
        item.vactionDays += 3;
        this.log(item);
    }

    private log(item: Employee2): void { 
        console.log(`${(<any>item.constructor).name} - ${item.name}'s new vacation days: ${item.vactionDays}`);
    }
}

interface IVisitableItem2 {
    accept(v: IVisitor2);
}

class Employee2 implements IVisitableItem2 {
    constructor(
        public name: string,
        public income: number = 10000,
        public vactionDays: number = 30,
    ) { }

    public accept(v: IVisitor2) {
        v.visitEmployee(this);
    }
}

class Clerk2 extends Employee2 {
    constructor(name: string) {
        super(name);
    }

    public accept(v: IVisitor2) { 
        v.visitClerk(this);
    }
}

class Employees2 implements IVisitableItem2 {
    constructor(
        public employees: Employee2[] = []
    ) { }

    public accept(v: IVisitor2) {
        this.employees.forEach(e => e.accept(v));
    }
}

export class VisitorPattern2 implements IRunner {
    public run(): void {
        const list = new Employees2([new Clerk2('Alan'), new Employee2('Tim'), new Employee2('Zoe')]);

        console.log('Accept IncomeVisitor2');
        list.accept(new IncomeVisitor2());

        console.log('<br/>');

        console.log('Accept VacationVisitor2');
        list.accept(new VacationVisitor2());
    }
}