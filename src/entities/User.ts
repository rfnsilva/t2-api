import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity("user")
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column("varchar", { nullable: false })
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
