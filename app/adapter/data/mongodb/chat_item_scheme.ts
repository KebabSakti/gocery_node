import { model, Schema } from "mongoose";
import ChatItemModel from "../../../entity/chat_item_model";

const scheme = new Schema({
  session: { type: String, required: true },
  sender: {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
  },
  message: { type: String, required: true },
  image: { type: Boolean, default: false },
  sent: { type: String, default: Date.now() },
  read: { type: String, default: null },
  created_at: { type: String, default: Date.now() },
  updated_at: { type: String, default: Date.now() },
});

const ChatItemScheme = model<ChatItemModel>("chat_items", scheme);

export default ChatItemScheme;
