
# Paso 2: Iteración multiple de varias paginas web
# Aca se continua con la pagina web, pero ahora se continua con varias paginas
# Probamos como conectarnos a la web http://quotes.toscrape.com/ y extraemos las citas famosas y algunos detalles

import requests
from bs4 import BeautifulSoup
import pandas as pd

url = "http://quotes.toscrape.com/"
page = 1
boolean = False
datos_finales = []
try:
    while (True):
        # 1. REQUESTS: Obtener la web
        if page > 1:
            target_url = url + "page/" + str(page) + "/"
        else:
            target_url = url
        response = requests.get(target_url)

        if response.status_code == 200:
            boolean = True
            # 2. BEAUTIFULSOUP: Extraer datos
            soup = BeautifulSoup(response.text, 'html.parser')

            # Encontramos todas las cajas de citas (inspeccionando la web, vemos que son div class="quote")
            citas_html = soup.find_all('div', class_='quote')
            # Si no hay mas citas en la pagina encontrada, entonces salimos del bucle
            if len(citas_html) == 0:
                # 3. PANDAS: Organizar y Guardar
                df = pd.DataFrame(datos_finales)

                # Mostramos resultado en consola
                print("¡Scraping completado!")
                print(df.head())

                # Guardamos
                df.to_excel("citas_famosas.xlsx", index=False)
                df.to_csv("citas_famosas.csv", index=False)
                break

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

            page += 1
            
        else:
            print("Error al conectar con la pagina "+url)
            print("Todo el contenido de la respuesta:" + response.text)
            exit()
        
except Exception as e:
    #Si ocurre una excepcion despues de haber conectadose exitosamente una vez, continuamos con el programa con normalidad
    if boolean:
        pass
    else:
        print("Error al hacer la petición: "+str(e))
        print("Posible solución: Revisar la url a la que intente conectarse")
        exit()

