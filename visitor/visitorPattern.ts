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
        item.income *= 1.1;
        console.log(`${(<any>item.constructor).name} - ${item.name}'s new income: ${formatter.format(item.income)}`)
    }
}

class VacationVisitor implements IVisitor {
    visit(item: Employee) {
        item.vactionDays += 3;
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
        public vactionDays: number = 20,
    ) { }

    public accept(v: IVisitor) {
        v.visit(this);
    }
}

class Clerk extends Employee {
    constructor(name: string) {
        super(name, 30000, 30);
    }
}

class Employees implements IVisitableItem {

    constructor(
        public employees: Employee[] = []
    ) { }

    public accept(v: IVisitor) {
        this.employees.forEach(e => v.visit(e));
    }
}

class VisitorPattern implements IRunner {
    public run(): void {

        const list = new Employees([new Clerk('Alan'), new Employee('Tim'), new Employee('Zoe')]);

        console.log('Accept Income Visitor');
        list.accept(new IncomeVisitor());

        console.log('<br/>');

        console.log('Accept Vacation Visitor');
        list.accept(new VacationVisitor());
    }
}