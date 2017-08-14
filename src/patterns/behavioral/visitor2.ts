import { IRunner } from '../../runner';

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
    }

    visitEmployee(item: Employee2) {
        item.income *= 1.3;
    }
}

class VacationVisitor2 implements IVisitor2 {
    public visitClerk(item: Clerk2) {
        item.vactionDays += 1;
    }

    public visitEmployee(item: Employee2) {
        item.vactionDays += 3;
    }
}

class LogVisitor2 implements IVisitor2 {

    private _visitedItems: (Clerk2 | Employee2)[] = [];

    public visitClerk(item: Clerk2) {
        this.visit(item);
    }

    public visitEmployee(item: Employee2) {
        this.visit(item);
    }

    private visit(item: Clerk2 | Employee2) { 
        const loggedItems = this._visitedItems.filter(i => i.name === item.name);
        if (loggedItems.length) {
            this.log(item, loggedItems[0]);
        } else {
            this._visitedItems.push(Object.assign({},item));
            this.log(item);
        }
    }

    private log(item: Clerk2 | Employee2, previous = null): void {
        if (!previous) {
            console.log(`${(<any>item.constructor).name} - ${item.name}'s income: ${formatter.format(item.income)}, vacation days: ${item.vactionDays}`);
        } else {
            let incomeDelta = '';
            if (item.income !== previous.income) {
                incomeDelta = `${formatter.format(item.income)} <span style="color: green">(+${formatter.format(item.income - previous.income)})</span>`;
            }
            
            let vacationDelta = '';
            if (item.vactionDays !== previous.vactionDays) { 
                vacationDelta = `${item.vactionDays} <span style="color: green">(+${item.vactionDays - previous.vactionDays})</span>`;
            }

            console.log(`${(<any>item.constructor).name} - ${item.name}'s new income: ${item.income} ${incomeDelta}, vacation days: ${item.vactionDays} ${vacationDelta}`);
        }
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

        const logVisitor = new LogVisitor2();

        console.log('<span style="color: orange">Accept LogVisitor2</span>');
        list.accept(logVisitor);

        console.log('<br/>');

        console.log('<span style="color: orange">Accept IncomeVisitor2</span>');
        list.accept(new IncomeVisitor2());
        list.accept(logVisitor);

        console.log('<br/>');

        console.log('<span style="color: orange">Accept VacationVisitor2</span>');
        list.accept(new VacationVisitor2());
        list.accept(logVisitor);
    }
}