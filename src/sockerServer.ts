import { Namespace, Server, Socket } from "socket.io";
import memoryCache from "memory-cache";
import { DbContext as _context } from "./entity/datasource";
import { Devices } from "./entity/Devices";
import * as jwt from "jsonwebtoken";
class SocketServer {
  private io: Server;
  private memCache = new memoryCache.Cache();
  private ioDevice: Namespace;
  constructor(httpServer: any) {
    this.io = new Server(httpServer, {
      cors: {
        origin: "http://localhost:8080",
      },
    });
    this.ioDevice = this.io.of("/device");
    this.IOMiddleware();
    this.listen();
    this.IODeviceMiddleware();
    this.listenIODevice();
  }
  public IOMiddleware() {
    this.io.use(async function (socket, next) {
      var token = socket.handshake.auth.token;
      try {
        const payload: any = jwt.verify(
          token,
          String(process.env.JWTSECRETKEY)
        );
        socket.handshake.query.userId = payload.id;
        next();
      } catch (error) {
        next(new Error("Unauthorized"));
      }
    });
  }
  public listen(): void {
    console.log("Socket Server is start");
    this.io.on("connection", (socket) => {
      //Các thiết bị đang online
      this.handleEmitDeviceOnline(socket);
      this.handleControlDevice(socket);
      socket.on("disconnect", () => {});
    });
  }
  public IODeviceMiddleware() {
    var self = this;
    this.ioDevice.use(async function (socket, next) {
      try {
        var device = await _context.getRepository(Devices).findBy({
          id: String(socket.handshake.query.token),
        });
        if (device.length > 0) {
          self.memCache.put(
            `device/${socket.handshake.query.token}/${device[0].userId}`,
            socket.id
          );
          socket.handshake.query.userId = device[0].userId;
          next();
        } else next(new Error("Unauthorized"));
      } catch (error) {
        next(new Error("Unauthorized"));
      }
    });
  }
  public listenIODevice() {
    this.ioDevice.on("connection", (socket) => {
      socket.on("disconnect", () => {
        this.memCache.del(
          `device/${socket.handshake.query.token}/${socket.handshake.query.userId}`
        );
      });
    });
  }
  
  //Handle Emit
  public handleEmitDeviceOnline(socket: any) {
    const devicesOnline = this.memCache.keys().filter((key: any) => {
      return (
        key.startsWith("device/") &&
        key.endsWith(`/${socket.handshake.query.userId}`)
      );
    });
    socket.emit("eventDeviceOnline", devicesOnline);
  }
  public handleControlDevice(socket: any){
    socket.on("control", function(data: object){
      console.log(data)
    })
  }
  //Handle On
}
export default SocketServer;
