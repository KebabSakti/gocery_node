customer event
=========================
listen:
- order:updated
- payment:updated
- chat:updated
emit:
- user:joined
- chat:updated
- order:updated

courier event
=========================
listen:
- order status changed
- receive chat message
emit:
- user join
- completed order
- send chat message
- order status changed