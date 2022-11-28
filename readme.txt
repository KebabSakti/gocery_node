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

ORDER FLOW
===============================
order submit -> cash    -> update status bayar (PENDING) 
                        -> update status order (AKTIF) 
                        -> notif ke kurir/kantor  
                        -> kurir antar order
                        -> update status order (PROGRESS)
                        -> kurir selesai antar order
                        -> kurir terima pembayaran
                        -> update status order (COMPLETED)
                        -> update status bayar (PAID)
                        
             -> noncash -> update status order (PENDING)
                        -> update status bayar (PENDING) 
                        -> customer bayar
                        -> update status bayar (PAID) 
                        -> update status order (AKTIF) 
                        -> notif ke kurir/kantor  
                        -> kurir antar order
                        -> update status order (PROGRESS)
                        -> kurir selesai antar order
                        -> kurir terima pembayaran
                        -> update status order (COMPLETED)