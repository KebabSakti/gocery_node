ORDER FLOW
============================================================
order submit -> cash    -> update status bayar (PENDING) 
                        -> update status order (AKTIF) 
                        -> notif ke kurir/kantor  
                        -> kurir pilih orderan  
                        -> update status order (PROGRESS)
                        -> notif ke customer  
                        -> kurir antar order
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
                        -> kurir pilih orderan  
                        -> update status order (PROGRESS)
                        -> notif ke customer  
                        -> kurir antar order
                        -> kurir selesai antar order
                        -> kurir terima pembayaran
                        -> update status order (COMPLETED)
============================================================