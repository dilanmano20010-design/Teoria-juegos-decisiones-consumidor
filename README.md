# Teoría de Juegos Aplicada a las Decisiones del Consumidor
### *Creencias Subjetivas, Efectos de Red y Selección Estratégica bajo Incertidumbre*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python: 3.9+](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://www.python.org/)
[![Status: Research Completed](https://img.shields.io/badge/Status-Investigaci%C3%B3n%20Completada-brightgreen.svg)]()
[![Field: Microeconomics / Game Theory](https://img.shields.io/badge/Econom%C3%ADa-Teor%C3%ADa%20de%20Juegos-red.svg)]()
[![Author: Dilan Alexander Manosalvas Andrade](https://img.shields.io/badge/Autor-Dilan%20Alexander%20Manosalvas%20Andrade-blueviolet.svg)](https://econometricis.vercel.app/)
[![Institution: Econometrics ECEM](https://img.shields.io/badge/Instituci%C3%B3n-Econometrics%20ECEM-orange.svg)](https://econometricis.vercel.app/)
[![Website](https://img.shields.io/badge/Web-econometricis.vercel.app-00bcd4.svg)](https://econometricis.vercel.app/)

> **Autor:** [Dilan Alexander Manosalvas Andrade](https://econometricis.vercel.app/)  
> **Institución:** Econometrics ECEM  
> **Sitio Web Oficial:** [https://econometricis.vercel.app/](https://econometricis.vercel.app/)  

---

## 📌 Descripción del Proyecto

En la microeconomía estándar, la elección del consumidor se estudia típicamente de forma aislada, donde los individuos maximizan utilidad condicionados únicamente a los precios de mercado y su presupuesto. Sin embargo, en la economía digital y moderna, **las decisiones de consumo están fuertemente interconectadas**: la utilidad de comprar una tecnología, adoptar una red social o elegir una plataforma depende de cuántos otros consumidores hagan lo mismo (**externalidades de red** y **juegos de coordinación**).

Este repositorio alberga una **investigación científica formal en Microeconomía y Teoría de Juegos**, que modela cómo las **creencias subjetivas a priori** ($q$) determinan la **utilidad esperada** ($E[u]$), la elección de estrategias óptimas y la formación de **curvas de indiferencia en el espacio de pagos**.

Incluye:
- 🌐 **Plataforma Web Interactiva (GitHub Pages):** Simulador visual en vivo con cálculo dinámico de utilidades esperadas y curvas de indiferencia en tiempo real ([`index.html`](index.html)).
- 📄 **Artículo Científico Completo:** Accede al texto formal en [`docs/investigacion_cientifica.md`](docs/investigacion_cientifica.md).
- 🐍 **Simulación Numérica en Python:** Código reproducible en [`src/simulacion_creencias_consumidor.py`](src/simulacion_creencias_consumidor.py).
- 📊 **Gráficos de Alta Resolución:** Visualizaciones del espacio de pagos y curvas de indiferencia en `assets/`.
- 🚀 **Guía para GitHub & GitHub Pages:** Instrucciones paso a paso en [`GUIA_GITHUB.md`](GUIA_GITHUB.md).

---

## 🔬 Formulación Teórica del Modelo

### 1. Matriz de Pagos Normalizada

Consideramos un consumidor representativo que interactúa estratégicamente con la masa de mercado. El consumidor dispone de tres estrategias puras:
* **$U$**: Adoptar el estándar tecnológico $R$.
* **$M$**: Adoptar una solución neutra o intermedia.
* **$D$**: Adoptar el estándar tecnológico $L$.

El mercado (demás consumidores) se coordina hacia el estándar $L$ con probabilidad subjetiva $q$, o hacia el estándar $R$ con probabilidad $(1 - q)$:

| Consumidor \ Mercado | Mercado elige $L$ ($q$) | Mercado elige $R$ ($1-q$) |
| :---: | :---: | :---: |
| **Estrategia $U$** | $(0, 0)$ | $(4, 4)$ |
| **Estrategia $M$** | $(1, 1)$ | $(1, 1)$ |
| **Estrategia $D$** | $(4, 4)$ | $(0, 0)$ |

---

### 2. Ecuaciones de Pago Esperado

Para una creencia subjetiva $q \in [0, 1]$:
$$E[u_1(U \mid q)] = 0 \cdot q + 4 \cdot (1 - q) = 4 - 4q$$
$$E[u_1(M \mid q)] = 1 \cdot q + 1 \cdot (1 - q) = 1.00$$
$$E[u_1(D \mid q)] = 4 \cdot q + 0 \cdot (1 - q) = 4q$$

#### Caso de Estudio ($q = 0.34$):
Para un consumidor que estima una creencia $q = 0.34$:
* $u_1(U \mid q=0.34) = 0(0.34) + 4(0.66) = \mathbf{2.64}$
* $u_1(M \mid q=0.34) = 1(0.34) + 1(0.66) = \mathbf{1.00}$
* $u_1(D \mid q=0.34) = 4(0.34) + 0(0.66) = \mathbf{1.36}$

> **Resultado:** Con $q = 0.34$, la estrategia **$U$** proporciona la mayor utilidad esperada al ubicarse en la curva de indiferencia más alta.

---

## 📈 Resultados Visuales y Simulación

### Curvas de Indiferencia en el Espacio de Pagos ($q = 0.34$)
La tasa marginal de sustitución estratégica entre pagos en estado $L$ y estado $R$ tiene pendiente:
$$\text{Pendiente} = -\frac{q}{1 - q} = -\frac{0.34}{0.66} \approx -0.515$$

![Espacio de Pagos y Curvas de Indiferencia](assets/espacio_pagos_indiferencia.png)

### Envolvente de Decisión y Umbral Crítico ($q^* = 0.50$)
Al graficar el pago esperado para todo $q \in [0, 1]$, se observa claramente que el punto de transición óptimo ocurre en $q^* = 0.50$:

![Pago Esperado vs Creencia Subjetiva](assets/grafico_pagos_esperados.png)

*Hallazgo clave:* La estrategia intermedia $M$ es **estrictamente dominada** por una combinación mixta $\frac{1}{2}U + \frac{1}{2}D$ que rinde siempre $2.00 > 1.00$.

---

## 📂 Estructura del Repositorio

```text
INGESTIGACION GITHUG/
│
├── README.md                           # Presentación principal del proyecto
├── GUIA_GITHUB.md                      # Manual paso a paso para subir a GitHub
├── LICENSE                             # Licencia de código abierto MIT
├── requirements.txt                    # Dependencias de Python
│
├── docs/
│   └── investigacion_cientifica.md     # Documento académico formal completo (APA 7)
│
├── src/
│   └── simulacion_creencias_consumidor.py  # Algoritmo de cálculo y graficación
│
└── assets/
    ├── espacio_pagos_indiferencia.png  # Gráfico de curvas de indiferencia
    └── grafico_pagos_esperados.png     # Gráfico de envolvente de pagos esperados
```

---

## 🚀 Cómo Reproducir la Simulación Localmente

1. **Clonar o descargar** este repositorio en tu computadora.
2. **Instalar dependencias necesarias:**
   ```bash
   pip install -r requirements.txt
   ```
3. **Ejecutar la simulación:**
   ```bash
   python src/simulacion_creencias_consumidor.py
   ```
   Los gráficos actualizados se guardarán automáticamente en la carpeta `assets/`.

---

## 📚 Cita Académica

Si utilizas este trabajo, modelo o gráficos para tus proyectos o tesis, puedes citarlo como:

```bibtex
@article{manosalvas2026teoriajuegos,
  title={Teor\'ia de Juegos Aplicada a la Toma de Decisiones del Consumidor: Creencias Subjetivas, Externalidades de Red y Selecci\'on Estrat\'egica bajo Incertidumbre},
  author={Manosalvas Andrade, Dilan Alexander},
  institution={Econometrics ECEM},
  url={https://econometricis.vercel.app/},
  year={2026}
}
```

---

## 📄 Licencia
Distribuido bajo la Licencia [MIT](LICENSE). Libre para propósitos educativos, de investigación académica y desarrollo profesional.
