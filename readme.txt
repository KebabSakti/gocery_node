ORDER FLOW
============================================================
order submit -> cash    -> update status order (AKTIF) 
                        -> update status bayar (PENDING) 
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


domain
    auth
        auth_entity.ts
        auth_contract.ts
application
    auth
        auth_usecase.ts
adapter
    auth
        auth_controller.ts
infrastructure
    mongodb
        auth
            auth_mongodb.ts
            auth_scheme.ts
    jwt
        auth
            auth_jwt.ts
        
        