import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class DateEntity extends BaseEntity {
  @UpdateDateColumn({ name: 'lastupdated' })
  lastUpdated: Date;

  @CreateDateColumn()
  created: Date;
}
