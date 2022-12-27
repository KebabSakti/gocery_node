interface ChatSendOption {
  chatId?: string;
  session: string;
  sender: {
    _id: string;
    name: string;
    role: string;
  };
  message: string;
}

export default ChatSendOption;
