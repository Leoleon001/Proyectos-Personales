import requests
from bs4 import BeautifulSoup

url = "https://www.python.org"

# El disfraz (User-Agent)
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    print("¡Conexión exitosa!")
    html_content = response.text # Aquí está todo el código HTML sucio
else:
    print(f"Error: {response.status_code}")

# Creamos la "sopa" (parseamos el HTML)
soup = BeautifulSoup(html_content, 'html.parser')

# Ejemplo: Buscar el título principal h1
titulo = soup.find('h1').text
print(f"Título: {titulo}")

# Ejemplo: Buscar todos los enlaces del menú
# Supongamos que están en etiquetas <a> con clase "menu-link"
# (Esto es hipotético, depende de cada web)
enlaces = soup.find_all('a') 

lista_datos = []

for link in enlaces[:5]: # Solo los primeros 5 para el ejemplo
    texto_link = link.text.strip() # .strip() quita espacios vacíos
    url_link = link.get('href')
    
    # Guardamos en un diccionario
    lista_datos.append({
        "Texto": texto_link,
        "URL": url_link
    })

print(lista_datos)

import pandas as pd

# Convertir la lista de diccionarios en DataFrame
df = pd.DataFrame(lista_datos)

# Ver las primeras filas
print(df.head())

# Exportar a Excel o CSV
df.to_csv("datos_python.csv", index=False) # index=False quita la numeración 0,1,2... de la izquierda
df.to_excel("datos_python.xlsx", index=False)

print("¡Archivo guardado!")