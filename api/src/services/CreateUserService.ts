import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const userExists = await usersRepository.findOne({ where: { email } });

    if (userExists) {
      throw new AppError('User already exists');
    }

    const passwordHashed = await hash(password, 8);

    const user = await usersRepository.create({
      name,
      email,
      password: passwordHashed,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
