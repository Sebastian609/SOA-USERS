import { Router } from 'express';
import { SocketController } from '../infrastructure/controller/socket.controller';

export class SocketRoutes {
  private router: Router;
  private socketController: SocketController;

  constructor(socketController: SocketController) {
    this.router = Router();
    this.socketController = socketController;

    this.router.post('/refresh-stock', this.socketController.refreshStock.bind(this.socketController)); 
    this.router.post('/send-message', this.socketController.sendMessage.bind(this.socketController)); 
    this.router.post('/send-room', this.socketController.sendMessageToRoom.bind(this.socketController)); 
    this.router.post('/send-broadcast', this.socketController.sendBroadcast.bind(this.socketController));// Ruta para enviar un mensaje
  }

  public getRoutes(): Router {
    return this.router;
  }
}
