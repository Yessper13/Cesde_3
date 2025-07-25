nombre = input("ingresa tu nombre")

nota1 = float(input("nota 1"))
nota2 = float(input("nota 2"))
nota3 = float(input("nota 3"))
conocimiento = float(nota1*0.20)
desempeño = float(nota2*0.30)
producto = float(nota3*0.50)
definitiva = float((conocimiento + desempeño + producto))
if definitiva >= 3.0:
    observacion = "Ganaste la materia"
else:
    observacion = "Perdio por bago"
print("nombre".center(10,'*'))

print("                    Nota  vlr%")
print(f'Conocimiento 20% -> {nota1} -- {conocimiento:.1f}')
print(f'Pesempeño        -> {nota2} -- {desempeño:.1f}')
print(f'Producto         -> {nota3} -- {producto:.1f}')
print(f'definitiva       -> {definitiva:.1f}')
print(f'observacion      -> {observacion}')