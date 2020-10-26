import { Router } from 'express';

const usersRoutes = Router();

usersRoutes.get('/', (request, response) => {
  response.json({ ok: true });
});

export default usersRoutes;
