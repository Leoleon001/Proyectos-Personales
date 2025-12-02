
# Paso 3: En el paso 3 vamos a probar conecarnos a una pagina sin un User-Agent
# Aca veremos l a importancia de usar un User-Agent al hacer web scrapping
# Probamos como conectarnos a la web https://www.abc.com.py/nacionales/2025/12/01/clinicas-responde-sobre-la-millonaria-perdida-por-medicamentos-vencidos/ y veremos como afecta no tener un user Agent
# Al momento de conectarse a una pagina siempre se tiene que tener en cuenta el header de la peticion
# el header de la peticion es un conjunto de datos que se envian al servidor para identificar el cliente



import requests
from bs4 import BeautifulSoup
import pandas as pd

url = "https://books.toscrape.com/"

try:
    
    response = requests.get(url)

    if response.status_code == 200:
        # 2. BEAUTIFULSOUP: Extraer datos
        soup = BeautifulSoup(response.text, 'html.parser')
        print(soup.text)
        # Encontramos todas las cajas de citas (inspeccionando la web, vemos que son div class="quote")
        # Si no hay mas citas en la pagina encontrada, entonces salimos del bucle

    else:
        print("Error al conectar con la pagina "+url)
        print("Todo el contenido de la respuesta:" + response.text)
        exit()
    
except Exception as e:
    #Si ocurre una excepcion despues de haber conectadose exitosamente una vez, continuamos con el programa con normalidad
    print("Error al hacer la petición: "+str(e))
    print("Posible solución: Revisar la url a la que intente conectarse")
    exit()

