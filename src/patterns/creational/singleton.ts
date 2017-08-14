import { IRunner } from '../../runner';

class Service {
    private static _instance: Service;

    public static getService(): Service {
        if (!Service._instance) {
            console.log('<span style="color: orange">Creating a service instance</span>');
            Service._instance = new Service();
        }
        return Service._instance;
    }
}

export class SingletonPattern implements IRunner {
    public run(): void {

        console.log('Assigning service1 instance');
        const service1 = Service.getService();

        console.log('Assigning service2 instance');
        const service2 = Service.getService();

        const isSameInstace = service1 === service2 ? 'is' : 'is not';
        console.log(`service1 ${isSameInstace} the same instance as service2`);
    }
}