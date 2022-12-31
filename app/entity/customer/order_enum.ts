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

enum PaymentCategory {
  VA = "Virtual Account",
  EWALLET = "E-Wallet",
  QR = "QR Code",
  RETAIL = "Retail Outlet",
  DIRECT = "Direct Bank Transfer",
}

export { PaymentStatus, OrderStatus, PaymentCategory };
