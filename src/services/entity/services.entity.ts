import { Business } from 'src/business/entity/business.entity';
import { Meeting } from 'src/meetings/entity/meetings.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';


@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // שם השירות

  @Column({ type: 'text', nullable: true })
  description: string; // תיאור השירות

  @Column('decimal', { precision: 10, scale: 2 })
  price: number; // מחיר השירות

  @Column({ default: true })
  isActive: boolean; // האם השירות פעיל

  @OneToMany(() => Meeting, (meeting) => meeting.service, { onDelete: 'CASCADE',  nullable: true, })
  meetings: Meeting[];
}
