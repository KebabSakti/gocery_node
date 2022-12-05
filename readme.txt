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

ecommerce
    entity
        product_entity.ts
        bundle_entity.ts
    usecase
        contract
            product_contract.ts
            bundle_contract.ts
        product_usecase.ts
        bundle_usecase.ts
    framework
        mongodb
            scheme
                product_scheme.ts
                bundle_scheme.ts
            repository
                product_repository.ts
                bundle_repository.ts
        socketio
    controller
        product_controller.ts
        bundle_controller.ts
        

    