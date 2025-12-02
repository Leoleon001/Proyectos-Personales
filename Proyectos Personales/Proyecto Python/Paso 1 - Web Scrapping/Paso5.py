
# Paso 5: En el paso 5 vamos a empezar a usar selenium para hacer web scrapping
# vamos a tomar como ejemplo la web http://quotes.toscrape.com/js/ que es una version de la web de citas famosas pero que usa javascript para cargar las citas
# Selenium es una herramienta que permite automatizar navegadores web, lo que es útil para interactuar con páginas que dependen de JavaScript para cargar contenido dinámico.

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd

driver = webdriver.Chrome()

try:
    # 2. Navegar a la página JS (igual que escribir URL en Chrome)
    url = "http://quotes.toscrape.com/js/"
    driver.get(url)
    wait = WebDriverWait(driver, 10)
    datos_finales = []
    
    while True:
        citas_html = wait.until(EC.visibility_of_all_elements_located((By.CLASS_NAME, 'quote')))

        if len(citas_html) == 0:
            break

        for cita in citas_html:
            texto = cita.find_element(By.CLASS_NAME, 'text').text
            autor = cita.find_element(By.CLASS_NAME, 'author').text
            
            tags_elements = cita.find_elements(By.CLASS_NAME, 'tag')
            tags = [tag.text for tag in tags_elements]
            
            datos_finales.append({
                "Autor": autor,
                "Cita": texto,
                "Tags": tags
            })
        
        try:

            next = wait.until(EC.element_to_be_clickable((By.CLASS_NAME,'next')))
            next.click()
            wait.until(EC.staleness_of(citas_html[0]))
            

        except Exception as e:
            print("No hay mas paginas para scrapear.")
            break
        
    # 5. Crear DataFrame y guardar
    df = pd.DataFrame(datos_finales)
    print("¡Scraping completado con Selenium!")
    print(df.head())
    df.to_excel("citas_famosas_js.xlsx", index=False)

finally:
    # 6. Cerrar navegador
    driver.quit()