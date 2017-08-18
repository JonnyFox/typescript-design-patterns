import { SingletonPattern } from './patterns/creational/singleton';
import { DecoratorPattern } from "./patterns/structural/decorator";
import { VisitorPattern } from './patterns/behavioral/visitor';
import { VisitorPattern2 } from './patterns/behavioral/visitor2';
import './style.scss';
import { StrategyPattern } from "./patterns/behavioral/strategy";

export interface IRunner {
    run(): void;
}

enum Patterns { 
    Singleton,
    
    Decorator,
    
    Strategy,
    Visitor,
    Visitor2
}

const terminal = <HTMLSelectElement>document.getElementById('terminal');
const selectedPattern = <HTMLInputElement>document.getElementById('pattern');
const patternList = <HTMLUListElement>document.getElementById('patternList');

if (patternList) { 

    Object.keys(Patterns)
        .filter(key => isNaN(Number(Patterns[key])))
        .forEach(i => {
            let li = document.createElement('li');
            li.classList.add('mdl-menu__item');
            li.setAttribute('data-val', Patterns[i]);
            li.innerHTML = Patterns[i];
            patternList.appendChild(li);
        });
    
    selectedPattern.value = Patterns[0];
}

selectedPattern.onchange = (ev: Event) => {
    terminal.innerHTML = '';
};

document.getElementById('runner').onclick = () => {
    let runner: IRunner;

    switch (selectedPattern.value) {
        case Patterns[Patterns.Singleton]: runner = new SingletonPattern(); break;
        case Patterns[Patterns.Decorator]: runner = new DecoratorPattern(); break;
        case Patterns[Patterns.Strategy]: runner = new StrategyPattern(); break;
        case Patterns[Patterns.Visitor]: runner = new VisitorPattern(); break;
        case Patterns[Patterns.Visitor2]: runner = new VisitorPattern2(); break;
    }

    if (runner) {
        let log = [];

        console.log = (value: any) => log.push(typeof value === 'string' ? value : JSON.stringify(value));

        runner.run();

        console.log('<hr/><br/>');

        terminal.innerHTML += `<p>${log.join('<p></p>')}</p>`;
        terminal.scrollTop = terminal.scrollHeight;
    } else {
        throw new Error("Not implemented yet!");
    }
}