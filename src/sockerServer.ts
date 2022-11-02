import { Namespace, Server, Socket } from "socket.io";
import memoryCache from "memory-cache"
class SocketServer {
  private io: Server;
  private memCache = new memoryCache.Cache()
  private ioUser: Namespace;
  private ioDevice: Namespace;
  constructor(httpServer: any) {
    this.io = new Server(httpServer, {});
    this.ioDevice = this.io.of("/device")
    this.ioUser = this.io.of("/user")
    this.listen();
    this.listenIODevice();
    this.listenIOUser();
  }
  public listen(): void {
    console.log("Socket Server is start");
    this.io.on("connection", (socket) => {
      this.memCache.put(`device/${socket.id}`, socket.id);
      console.log(this.memCache.keys())
      console.log("Co socket ket noi");
      socket.on("disconnect", () => {
        console.log("Co socket ngat ket noi");
        this.memCache.del(`device/${socket.id}`);
        console.log(this.memCache.keys())
      });
      this.handleEvent(socket);
    });
  }
  public listenIODevice(){
    this.ioDevice.on("connection", (socket) => {
      console.log("Có device kết nôi")
    })
  }
  public listenIOUser(){
    this.ioDevice.on("connection", (socket) => {
      console.log("Có user kết nôi")
    })
  }
  public handleEvent(socket: Socket): void {
    socket.on("event/openlock", (data) => {
      console.log(data);
    });
  }
}
export default SocketServer;
