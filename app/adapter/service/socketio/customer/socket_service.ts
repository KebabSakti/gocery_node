import SocketContract from "../../../../port/service/customer/socket_contract";

class SocketService implements SocketContract {
  joinRoom(roomName: string): void {
    throw new Error("Method not implemented.");
  }

  leaveRoom(roomName: string): void {
    throw new Error("Method not implemented.");
  }

  emitEvent(eventName: string, payload?: any): void {
    throw new Error("Method not implemented.");
  }

  listenEvent(eventName: string, payload?: any): void {
    throw new Error("Method not implemented.");
  }
}

export default SocketService;
