import { Server } from "socket.io";

class SocketServer {
  private io: Server;
  constructor(httpServer: any) {
    this.io = new Server(httpServer, {});
    this.listen();
  }
  public listen(): void {
    console.log("Socket Server is start");
    this.io.on("connection", (socket) => {
      console.log("Co socket ket noi")
    });
  }
}
export default SocketServer;
