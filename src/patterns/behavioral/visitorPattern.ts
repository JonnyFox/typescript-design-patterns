import { IRunner } from '../../runner';

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
});

interface IVisitor {
    visit(item: Employee);
}

class IncomeVisitor implements IVisitor {
    visit(item: Employee) {
        if (item instanceof Clerk) {
            item.income *= 1.1;
        } else { 
            item.income *= 1.3;
        }
        console.log(`${(<any>item.constructor).name} - ${item.name}'s new income: ${formatter.format(item.income)}`)
    }
}

class VacationVisitor implements IVisitor {
    visit(item: Employee) {
        if (item instanceof Clerk) {
            item.vactionDays += 1;
        } else {
            item.vactionDays += 3;
        }
        console.log(`${(<any>item.constructor).name} - ${item.name}'s new vacation days: ${item.vactionDays}`)
    }
}

interface IVisitableItem {
    accept(v: IVisitor);
}

class Employee implements IVisitableItem {
    constructor(
        public name: string,
        public income: number = 10000,
        public vactionDays: number = 30,
    ) { }

    public accept(v: IVisitor) {
        v.visit(this);
    }
}

class Clerk extends Employee {
    constructor(name: string) {
        super(name);
    }
}

class Employees implements IVisitableItem {
    constructor(
        public employees: Employee[] = []
    ) { }

    public accept(v: IVisitor) {
        this.employees.forEach(e => e.accept(v));
    }
}

export class VisitorPattern implements IRunner {
    public run(): void {
        const list = new Employees([new Clerk('Alan'), new Employee('Tim'), new Employee('Zoe')]);

        console.log('Accept IncomeVisitor');
        list.accept(new IncomeVisitor());

        console.log('<br/>');

        console.log('Accept VacationVisitor');
        list.accept(new VacationVisitor());
    }
}