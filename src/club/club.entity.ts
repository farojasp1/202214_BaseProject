import { Column, Entity, ManyToMany, EntitySchemaOptions, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { SocioEntity } from 'src/socio/socio.entity';

@Entity()
export class ClubEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  foundationDate: Date;

  @Column()
  imagen: string;

  @Column()
  description: string;

  @ManyToMany(() => SocioEntity, (socio) => socio.clubs)
  @JoinTable()
  socios: SocioEntity[];
}
