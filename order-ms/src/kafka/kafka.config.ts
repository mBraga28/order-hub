import { KafkaOptions, Transport } from '@nestjs/microservices';

export const kafkaConfig: KafkaOptions = {
    transport: Transport.KAFKA,
    options: {
        client: {
            clientId: 'order-ms',
            brokers: ['localhost:9092'],
        },
        consumer: {
            groupId: 'order-ms-consumer',
        },
    },
};

