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
    var self = this;
    this.io.use(async function (socket, next) {
      var token = socket.handshake.auth.token;
      try {
        const payload: any = jwt.verify(
          token,
          String(process.env.JWTSECRETKEY)
        );
        socket.handshake.query.userId = payload.id;
        self.memCache.put(`user/${socket.handshake.query.userId}/${socket.id}`, socket.id);
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
            {
              socketId: socket.id,
              status: false
            }
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
      //Gửi cho brower biết có thiết bị kết nối
      this.handleDeviceConnected(socket)
      //Khi thiết bị được bật/tắt từ phần cứng
      this.handleMessageFromDevice(socket);
      socket.on("disconnect", () => {
        this.memCache.del(
          `device/${socket.handshake.query.token}/${socket.handshake.query.userId}`
        );
        this.handleDeviceConnected(socket);
      });
    });
  }
  
  //Handle Emit
  public handleDeviceConnected(socket: any){
    const devicesOnlineKey = this.memCache.keys().filter((key: any) => {
      return (
        key.startsWith("device/") &&
        key.endsWith(`/${socket.handshake.query.userId}`)
      );
    });
    const data = [];
    for(var deviceKey of devicesOnlineKey){
      data.push({
        key: deviceKey,
        status: this.memCache.get(deviceKey)
      })
    }
    const userOnline: any = this.memCache.keys().filter((key: any) => {
      return(
        key.startsWith(`user/${socket.handshake.query.userId}`)
      )
    })
    for(var userCacheKey of userOnline) {
      let socketId: any = this.memCache.get(userCacheKey);
      this.io.to(socketId).emit('eventDeviceOnline', data);
    }
  }
  public handleEmitDeviceOnline(socket: any) {
    const devicesOnlineKey = this.memCache.keys().filter((key: any) => {
      return (
        key.startsWith("device/") &&
        key.endsWith(`/${socket.handshake.query.userId}`)
      );
    });
    const data = [];
    for(var deviceKey of devicesOnlineKey){
      data.push({
        key: deviceKey,
        status: this.memCache.get(deviceKey)
      })
    }
    socket.emit("eventDeviceOnline", data);
  }
  public handleControlDevice(socket: any){
    var self = this;
    socket.on("control", function(data: any){
      var deviceId = data.id;
      var cache: any = self.memCache.get(`device/${deviceId}/${socket.handshake.query.userId}`)
      if(cache != null) {
        self.ioDevice.to(cache.socketId).emit("userControl", data.value)
        cache.status = data.value;
        self.memCache.put(`device/${deviceId}/${socket.handshake.query.userId}`, cache)
      }
    })
  }
  //Handle On
  public handleMessageFromDevice(socket: any){
    var self = this;
    socket.on("onChange", function(data: any){
      var deviceId = socket.handshake.query.token;
      var data = data;
      var userId = socket.handshake.query.userId;
      var keyCaches: any = self.memCache.keys().filter((key: any) => key.startsWith(`user/${userId}`));
      if(keyCaches.length > 0) {
        for(let key of keyCaches){
          let socketId: any = self.memCache.get(key);
          var cache: any = self.memCache.get(`device/${deviceId}/${userId}`)
          cache.status = data;
          self.memCache.put(`device/${deviceId}/${userId}`,cache);
          self.io.to(socketId).emit('statusDeviceChange', {
            key: `device/${deviceId}/${userId}`,
            status: data
          })
        }
      }
    })
  }
}
export default SocketServer;
