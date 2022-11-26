import { Entity } from 'typeorm';
import { DateEntity } from './date.entity';

@Entity('payment', { schema: 'public' })
export class Payment extends DateEntity {}
