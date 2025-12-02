
# Paso 1: Web Scrapping Básico
# Aca se muestra un ejemplo simple de web scrapping
# Probamos como conectarnos a la web http://quotes.toscrape.com/ y extraemos las citas famosas y algunos detalles

import requests
from bs4 import BeautifulSoup
import pandas as pd

try:
    # 1. REQUESTS: Obtener la web
    url = "http://quotes.toscrape.com/"
    response = requests.get(url)

except Exception as e:
    print("Error al hacer la petición: "+str(e))
    print("Posible solución: Revisar la url a la que intente conectarse")
    exit()

if response.status_code == 200:
    # 2. BEAUTIFULSOUP: Extraer datos
    soup = BeautifulSoup(response.text, 'html.parser')

    # Encontramos todas las cajas de citas (inspeccionando la web, vemos que son div class="quote")
    citas_html = soup.find_all('div', class_='quote')

    datos_finales = []
    tags = []
    for cita in citas_html:
        # Dentro de cada caja, buscamos el texto y el autor
        tags = []
        texto = cita.find('span', class_='text').text
        autor = cita.find('small', class_='author').text
        tags_html = cita.find_all('a', class_='tag')
        for tag in tags_html:
            tags.append(tag.text)

        # Guardamos en nuestra lista
        datos_finales.append({
            "Autor": autor,
            "Cita": texto,
            "Tags": tags
        })

    # 3. PANDAS: Organizar y Guardar
    df = pd.DataFrame(datos_finales)

    # Mostramos resultado en consola
    print("¡Scraping completado!")
    print(df.head())

    # Guardamos
    df.to_excel("citas_famosas.xlsx", index=False)
else:
    print("Error al conectar con la pagina "+url)
    print("Todo el contenido de la respuesta:" + response.text)