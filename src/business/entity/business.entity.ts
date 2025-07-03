import { Service } from 'src/services/entity/services.entity';
import { User } from 'src/users/entity/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany } from 'typeorm';


@Entity()
export class Business {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  logoUrl: string;

  @Column()
  category: string;
  @Column()
  description: string;

  @Column({ nullable: true })
  openingHours: string;

  @Column({ nullable: true })
  website: string;

// @OneToMany(() => Service, (service) => service.business)
//   services: Service[];

//   @ManyToOne(() => User, (user) => user.businesses)
//   owner: User;
}
