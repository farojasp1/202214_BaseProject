import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @OneToMany(() => ClubEntity, club => club.socios)
  clubs: ClubEntity[];
}
