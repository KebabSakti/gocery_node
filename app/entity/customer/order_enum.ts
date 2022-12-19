enum OrderStatus {
  PENDING = "pending",
  ACTIVE = "active",
  PROGRESS = "progress",
  COMPLETED = "completed",
  CANCELED = "canceled",
}

enum PaymentStatus {
  UNPAID = "unpaid",
  PENDING = "pending",
  PAID = "paid",
  CANCELED = "canceled",
  EXPIRED = "expired",
}

export { PaymentStatus, OrderStatus };
