interface IRunner {
    run(): void;
}

const terminal = <HTMLSelectElement>document.getElementById('terminal');
const selectedPattern = <HTMLInputElement>document.getElementById('pattern');

selectedPattern.onchange = (ev: Event) => {
    terminal.innerHTML = '';
    let selectedValue = selectedPattern.getAttribute('data-val');
    
};

document.getElementById('runner').onclick = () => {

    let ctor = window[selectedPattern.getAttribute('data-val')];

    if (ctor && typeof (ctor) === 'function') {
        let runner: IRunner = new ctor;

        if (runner) {
            let log = [];

            console.log = (value: any) => log.push(typeof value === 'string' ? value : JSON.stringify(value));

            console.log('<br/>');
            runner.run();

            terminal.innerHTML += `<p>${log.join('<p></p>')}</p>`;
            terminal.scrollTop = terminal.scrollHeight;
        }
    } else {
        throw new Error("Not implemented yet!");
    }
}