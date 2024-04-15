import Bull, { Job, Queue as BullQueue } from 'bull';
import { IQueue } from './IQueue';

export class BullQueueAdapter<T> implements IQueue<T> {
    private queue: BullQueue;

    constructor(queueName: string) {
        console.log(`Creando la cola: ${queueName}`);
        this.queue = new Bull(queueName, 'redis://127.0.0.1:6379');
    }

    async add(data: T): Promise<void> {
        console.log(`Añadiendo a la cola: ${data}`);
        await this.queue.add(data);
    }

    process(callback: (data: T) => Promise<void>): void {
        this.queue.process(async (job: Job) => {
            console.log(`Procesando la cola ${job.data}`);
            console.log(`Procesando la cola ${JSON.stringify(job.data)}`);
            await callback(job.data);
        });
    }
}
