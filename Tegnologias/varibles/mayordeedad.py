'''edad = int(input("edad"))
if edad >17:
    print("bienvenida al club de los mayores")
else:
    print("por favor para la casa bien juiciosa")'''


#si la cntidad es mayor que 20 descuento 30 SI NO, 5%
producto = "leche"
cantidad= 1
precio = 5000
subtotal = cantidad*precio
if cantidad > 20:
    descuento=0.3
else:
    desceunto = 0.05
vlrDescuento = subtotal*desceunto
neto = subtotal - vlrDescuento
print(f'subtotal:{subtotal}\nValor descuento{vlrDescuento}\nneto{neto}')