import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const classController = new ClassesController();
const connectionsController = new ConnectionsController();

routes.post('/classes', classController.create);
routes.get('/classes', classController.read);

routes.post('/connections', connectionsController.create)
routes.get('/connections', connectionsController.read);

export default routes;