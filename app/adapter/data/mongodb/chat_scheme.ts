import { model, Schema } from "mongoose";
import ChatModel from "../../../entity/chat_model";

const scheme = new Schema({
  session: { type: String, required: true },
  chats: {
    default: [],
    type: [{ type: Schema.Types.ObjectId, ref: "chat_items" }],
  },
  ended: { type: Boolean, default: false },
  created_at: { type: String, default: Date.now() },
  updated_at: { type: String, default: Date.now() },
});

const ChatScheme = model<ChatModel>("chats", scheme);

export default ChatScheme;
