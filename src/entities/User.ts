import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { nullable: true })
  name: string;

  @Column("varchar", { unique: true })
  email: string;

  @Column("varchar", { unique: true })
  phone: string;

  @Column("varchar", { unique: true })
  cpf: string;

  @Column("varchar")
  password: string;
}
