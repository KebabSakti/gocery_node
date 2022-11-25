import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Server } from "socket.io";

class SocketIO {
  private _i: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

  constructor(server: any) {
    this._i = new Server(server, {
      cors: {
        origin: "http://10.0.2.2:1001",
      },
    });
  }

  public get I() {
    return this._i;
  }
}

export default SocketIO;
