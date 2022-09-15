import { Column, Entity, ManyToOne, EntitySchemaOptions, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => SocioEntity, socio => socio.clubs)
  socio: SocioEntity;
}
