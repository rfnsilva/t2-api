import { MigrationInterface, getMongoRepository } from "typeorm";
import * as bcrypt from "bcrypt";

import { User } from "../entities/User";

export class insertUserForLogin1610360209159 implements MigrationInterface {
  public async up(): Promise<void> {
    const passwordHash = await bcrypt.hash("123456", 8);

    const user = {
      name: "admin",
      email: "admin@admin.com",
      phone: "admin",
      cpf: "admin",
      password: passwordHash,
    };

    const userRepository = getMongoRepository(User);
    await userRepository.save(user);
  }

  public async down(): Promise<void> {
    const userRepository = getMongoRepository(User);

    const user = await userRepository.find({
      where: {
        email: "admin@admin.com",
      },
    });

    await userRepository.delete(user[0].id);
  }
}
