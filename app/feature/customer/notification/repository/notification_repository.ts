abstract class NotificationRepository<T, G> {
  abstract send(payload: T): G;
}

export default NotificationRepository;
