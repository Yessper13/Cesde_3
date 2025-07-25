nombrePro = input("Producto")
precio = int(input("Precio"))
cantidad = int(input("Cantidad"))
#datos de proceso
descuento = 0.15
iva=0.19
subtotal=precio*cantidad
vlrDescuento = subtotal * descuento

vlrIva = (subtotal - vlrDescuento)*iva
neto = subtotal - vlrDescuento + vlrIva

print("Detalles de factura".center(60,'*'))
print (f'Producto -> {nombrePro}')
print (f'Precio -> {precio}')
print (f'Cantidad -> {cantidad}')
print (f'Sub Total ->{subtotal}')
print (f'vlr descuento 15% ->{vlrDescuento}')
print (f'valor iva 19% ->{vlrIva}')
print (f'Neto a pagar ->{neto}')
print("gracias por la compra".center(60,'*'))

