import { model, Schema } from "mongoose";
import ChatModel from "../../../entity/chat_model";

const scheme = new Schema({
  session: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, refPath: "userModel" },
  userModel: {
    type: String,
    required: true,
    enum: ["couriers", "customers"],
  },
  chats: [{ type: Schema.Types.ObjectId, ref: "chat_items" }],
  created_at: { type: String, default: Date.now() },
  updated_at: { type: String, default: Date.now() },
});

const ChatScheme = model<ChatModel>("chats", scheme);

export default ChatScheme;
