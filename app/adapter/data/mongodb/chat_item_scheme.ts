import { model, Schema } from "mongoose";

const ChatItemScheme = model(
  "chat_items",
  new Schema({
    session: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: "userModel" },
    userModel: {
      type: String,
      required: true,
      enum: ["couriers", "customers"],
    },
    messsage: { type: String, required: true },
    image: { type: Boolean, default: false },
    sent: { type: String, default: Date.now() },
    read: { type: String, default: null },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);

export default ChatItemScheme;
