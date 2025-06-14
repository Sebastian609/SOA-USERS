import { Request, Response } from "express";
import { SocketService } from "../../service/socket.service";
import { Message } from "../../model/message.model";

export class SocketController {
  private service: SocketService;

  constructor(io: any) {
    this.service = new SocketService(io);
  }

  public sendMessage(req: Request, res: Response): any {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    this.service.sendMessageToUser(userId, message);
    return res.status(200).json({ success: true, message: "Mensaje enviado" });
  }

  public sendMessageToRoom(req: Request, res: Response): any {
    const { title, content, saleId, room } = req.body;

    if (!title || !content || !saleId || !room) {
      return res.status(400).json({ error: "Faltan datos", status: false });
    }

    this.service.sendMessageToRoom(new Message(title, content, saleId), room);
    return res.status(200).json({ success: true, message: "Mensaje enviado" });
  }

  public sendBroadcast(req: Request, res: Response): any {
    const { title, content, saleId } = req.body;
    console.log(req.body);
    

    if (!title || !content || !saleId) {
      return res.status(400).json({ error: "Faltan datos", status: false });
    }

    const message = new Message(title, content, saleId);
    this.service.broadcastMessage(message);

    return res.status(200).json({ status: true, message: "Mensaje enviado" });
  }

  public refreshStock(req: Request, res: Response): any {
    
    const message = new Message("refresh", "refresh", 123123);
    this.service.refreshStock(message);

    return res.status(200).json({ status: true, message: "refrescando stock" });
  }
}
