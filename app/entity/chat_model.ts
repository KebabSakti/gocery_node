import ChatItemModel from "./chat_item_model";

interface ChatModel {
  _id?: string;
  session?: string;
  user?: string;
  chats?: ChatItemModel[];
  ended?: boolean;
  created_at?: string;
  updated_at?: string;
}

export default ChatModel;
