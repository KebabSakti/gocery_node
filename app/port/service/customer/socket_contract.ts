abstract class SocketContract {
  abstract joinRoom(roomName: string): void;

  abstract leaveRoom(roomName: string): void;

  abstract emitEvent(eventName: string, payload?: any): void;

  abstract listenEvent(eventName: string, payload?: any): void;
}

export default SocketContract;
