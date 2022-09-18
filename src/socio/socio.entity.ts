import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClubEntity } from 'src/club/club.entity';


@Entity()
export class SocioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  birthdate: Date;

  @ManyToOne(() => ClubEntity, club => club.socios)
  club: ClubEntity;
}
