import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRoutes = Router();

usersRoutes.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUsersService = new CreateUserService();

  const user = await createUsersService.execute({ name, email, password });

  delete user.password;

  return response.json(user);
});

export default usersRoutes;
