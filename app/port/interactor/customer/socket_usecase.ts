import SocketContract from "../../service/customer/socket_contract";

class SocketUsecase {
  private socket: SocketContract;

  constructor(socket: SocketContract) {
    this.socket = socket;
  }

  joinRoom(roomName: string): void {
    this.socket.joinRoom(roomName);
  }

  leaveRoom(roomName: string): void {
    this.socket.leaveRoom(roomName);
  }

  emitEvent(eventName: string, payload?: any): void {
    this.socket.emitEvent(eventName, payload);
  }

  listenEvent(eventName: string, payload?: any): void {
    this.socket.listenEvent(eventName, payload);
  }
}

export default SocketUsecase;
