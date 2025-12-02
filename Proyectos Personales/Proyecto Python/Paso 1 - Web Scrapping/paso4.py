
# Paso 3: En el paso 4 vamos a ver a como extraer datos de una tabla de una pagina web

import requests
from bs4 import BeautifulSoup
import pandas as pd


url = "https://es.wikipedia.org/wiki/Anexo:Videojuegos_para_PlayStation"
encabezados= {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}


try:
    response = requests.get(url,headers=encabezados)
    if response.status_code == 200:

        soup = BeautifulSoup(response.text, 'html.parser')
        tablas = soup.find_all('table', {'class': lambda x: x and 'wikitable' in x})
        datos = []
        for tabla in tablas:
            filas = tabla.find_all('tr')
            for fila in filas:
                columnas = fila.find_all(['td', 'th'])
                if len(columnas) > 1:
                    datos_fila = [columna.get_text(strip=True) for columna in columnas]
                    datos.append(datos_fila)
        
        df = pd.DataFrame(datos)
        df.to_csv("videojuegos_playstation.csv", index=False, header=False)
        print("¡Archivo guardado!")

    else:
        print("Error al conectar con la pagina "+url)
        print("Todo el contenido de la respuesta:" + response.text)

except Exception as e:
    print("Error al hacer la petición: "+str(e))
    exit()
