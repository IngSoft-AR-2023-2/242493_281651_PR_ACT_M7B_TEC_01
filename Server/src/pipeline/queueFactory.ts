import { BullQueueAdapter } from '../queues-provider/bullQueueAdapter';
import { IQueue } from '../queues-provider/IQueue';
import { RabbitMQQueueAdapter } from '../queues-provider/RabbitQueueAdapter';

export class QueueFactory {
    static getQueueFactory<T>(queueName: string): IQueue<T> {
        // return new BullQueueAdapter<T>(queueName);
        return new RabbitMQQueueAdapter<T>(queueName);
    }
}
