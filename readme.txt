customer event
=========================
listen:
- order status changed
- payment status changed
- receive chat message
emit:
- user join
- send chat message
- cancel order

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