import { Service } from 'src/services/entity/services.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity()
export class Meeting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientName: string;

  @Column({nullable:true})
  clientEmail: string;

  @Column({ type: 'date' })
  date: Date;
  @Column({ type: 'time' })
  startTime: string;
  @Column({ type: 'time' })
  endTime: string;

  @Column({ nullable: true })
  notes: string;

  @ManyToOne(() => Service, (service) => service.meetings, { onDelete: 'CASCADE' })
  service: Service;
}
