# Teoría de Juegos Aplicada a la Toma de Decisiones del Consumidor: Creencias Subjetivas, Externalidades de Red y Selección Estratégica bajo Incertidumbre

**Autor:** Dilan Alexander Manosalvas Andrade  
**Afiliación Institucional:** Econometrics ECEM  
**Sitio Web:** [https://econometricis.vercel.app/](https://econometricis.vercel.app/)  
**Área:** Microeconomía Avanzada, Economía del Comportamiento y Teoría de la Decisión  
**Fecha:** 2026  
**Clasificación JEL:** C72 (Juegos No Cooperativos), D11 (Comportamiento del Consumidor), D81 (Criterios de Decisión bajo Riesgo e Incertidumbre), D84 (Expectativas y Creencias), L15 (Información y Calidad del Producto).

---

## Resumen (Abstract)

En la microeconomía neoclásica estándar, la teoría de la elección del consumidor postula que los agentes maximizan su utilidad individual en un entorno paramétrico donde los precios y la oferta están determinados exógenamente, sin considerar la interdependencia estratégica. No obstante, en los mercados contemporáneos caracterizados por bienes de red, plataformas digitales y estándares tecnológicos competitivos, la utilidad de un consumidor depende críticamente de las decisiones adoptadas por los demás agentes económicos. 

El presente trabajo de investigación formula un modelo científico formal fundamentado en la **Teoría de Juegos no cooperativos** para examinar la toma de decisiones del consumidor bajo incertidumbre estratégica. Específicamente, se analiza cómo las **creencias subjetivas a priori** ($q \in [0, 1]$) sobre la conducta agregada de los demás participantes determinan el pago esperado ($E[u_i]$) de cada alternativa de consumo y orientan la selección de la estrategia óptima. Mediante una formulación matemática rigurosa, representación en el espacio de pagos con **curvas de indiferencia estratégicas** y una simulación computacional reproducible en Python, se demuestra: (i) la existencia de un umbral crítico de indiferencia $q^*$, (ii) la dominancia estricta de ciertas alternativas intermedias frente a mezclas convexas de estrategias polares, y (iii) cómo las trampas de coordinación pueden inducir a equilibrios subóptimos de mercado (efecto *lock-in*). Finalmente, se evalúan las implicaciones regulatorias en términos de interoperabilidad y bienestar del consumidor.

**Palabras clave:** Teoría de juegos, decisiones del consumidor, creencias subjetivas, pagos esperados, curvas de indiferencia, efectos de red, coordinación estratégica.

---

## Abstract (English)

In standard neoclassical microeconomics, consumer theory posits that economic agents maximize individual utility in a parametric environment where prices and supply are exogenously given, neglecting strategic interdependence. However, in contemporary markets characterized by network goods, digital platforms, and rival technological standards, a consumer's realized utility heavily depends on the choices made by peer agents. 

This research paper presents a formal scientific game-theoretic model to examine consumer decision-making under strategic uncertainty. Specifically, we investigate how subjective prior beliefs ($q \in [0, 1]$) regarding aggregate market behavior govern expected payoffs ($E[u_i]$) and drive the selection of optimal consumption strategies. Utilizing rigorous mathematical formulation, payoff-space indifference curve mapping, and a reproducible computational simulation in Python, we demonstrate: (i) the existence of a critical switching threshold $q^*$, (ii) the strict dominance of intermediate strategies by convex mixtures of extreme strategies, and (iii) how coordination failures can lock consumers into socially inefficient equilibria. Lastly, we discuss policy implications regarding platform interoperability and consumer welfare.

**Keywords:** Game theory, consumer choice, subjective beliefs, expected payoffs, indifference curves, network externalities, strategic coordination.

---

## 1. Introducción y Planteamiento del Problema

El modelo convencional de elección del consumidor (Arrow & Debreu, 1954; Varian, 1992) asume que la función de utilidad individual $U_i(x_i)$ depende exclusivamente de la cesta de bienes $x_i$ adquirida por el propio individuo sujeta a una restricción presupuestaria $p \cdot x_i \le m$. Si bien este enfoque analítico ha sido fundamental para explicar la elasticidad precio y los efectos de sustitución e ingreso en mercados de bienes tradicionales (alimentos, vestimenta básica), resulta insuficiente para capturar la dinámica de los mercados modernos.

En la economía contemporánea, múltiples decisiones de compra presentan **interdependencia estratégica**:
1. **Adopción de estándares y tecnologías:** Elegir un sistema operativo (Android vs. iOS), un formato de almacenamiento físico o de software (Blu-ray vs. HD-DVD, estándares propietarios vs. abiertos).
2. **Plataformas multilaterales:** La elección de participar en una red social, un mercado de comercio electrónico o una billetera digital adquiere mayor valor conforme mayor sea el número de contrapartes que la utilicen (efectos de red directos e indirectos; Rochet & Tirole, 2003; Katz & Shapiro, 1985).
3. **Señalización y bienes posicionales:** Consumo conspicuo donde el beneficio depende de la inferencia que otros agentes hagan sobre el estatus del consumidor (Veblen, 1899; Bagwell & Bernheim, 1996).

En tales contextos, el consumidor no interactúa pasivamente con un sistema impersonal de precios; se enfrenta a un **juego contra el mercado** o contra otros consumidores. La decisión óptima ya no depende únicamente de la preferencia intrínseca por las características físicas del producto, sino de las **creencias subjetivas** que el consumidor formule sobre qué harán los demás agentes.

El objetivo central de esta investigación es modelar analítica y computacionalmente la estructura de decisión de un consumidor representativo que enfrenta incertidumbre sobre el comportamiento del resto del mercado, determinando sus curvas de indiferencia en el espacio de pagos, los umbrales de bifurcación de su mejor respuesta y las condiciones de coordinación óptima.

---

## 2. Marco Teórico y Revisión de Literatura

### 2.1. De la Teoría de la Utilidad Esperada a la Teoría de Juegos
Von Neumann y Morgenstern (1944) sentaron las bases de la Teoría de la Utilidad Esperada (EUT), demostrando que un agente racional bajo riesgo e incertidumbre maximiza la suma ponderada de las utilidades de los posibles estados de la naturaleza. Nash (1950, 1951) extendió este marco al ámbito de la interacción estratégica, donde los "estados de la naturaleza" no son eventos fortuitos, sino las elecciones racionales de otros agentes interactuantes.

### 2.2. Creencias Subjetivas y Equilibrio Bayesiano
Harsanyi (1967-1968) formuló la teoría de juegos con información incompleta, formalizando el concepto de **creencias consistentes** y tipos de jugadores. En la teoría moderna de la elección estratégica, el vector de creencias de un consumidor individual respecto a las decisiones colectivas de la población se modela como una distribución de probabilidad subjetiva $q \in \Delta(S_{-i})$. Cuando el consumidor no posee certeza absoluta sobre la coordinación del mercado, su función de pago se torna estocástica desde su perspectiva cognitiva.

### 2.3. Externalidades de Red y Fallas de Coordinación
Katz y Shapiro (1985, 1986), así como Arthur (1989), demostraron que en presencia de externalidades de red positivas, la utilidad derivada de un bien es una función monótona creciente del tamaño esperado de su base de usuarios instalada. Esto conduce a **juegos de coordinación con equilibrios múltiples** (Schelling, 1960). En estos escenarios, pueden surgir "trampas de ineficiencia" (*lock-in* tecnológico), donde los consumidores quedan atrapados en una tecnología inferior debido a la creencia pesimista de que nadie migrará a la tecnología superior.

---

## 3. Formulación Matemática del Modelo

Consideremos una interacción donde un **Consumidor Representativo** (Jugador 1) debe tomar una decisión de consumo frente al **Mercado / Masa de Consumidores** (Jugador 2).

### 3.1. Espacio de Acciones y Matriz de Pagos
El conjunto de estrategias puras disponibles para el Consumidor 1 es:
$$S_1 = \{U, M, D\}$$
donde:
- $U$ representa la adopción especializada del Estándar o Ecosistema $R$ (p. ej., ecosistema tecnológico A).
- $M$ representa la adopción de una solución neutral, híbrida o de compatibilidad estándar (p. ej., producto genérico).
- $D$ representa la adopción especializada del Estándar o Ecosistema $L$ (p. ej., ecosistema tecnológico B).

El Mercado (Jugador 2) puede coordinarse prioritariamente en dos estados:
$$S_2 = \{L, R\}$$

La matriz bimatricial de pagos $(u_1, u_2)$ se define de acuerdo con la siguiente estructura normalizada:

| Consumidor 1 \ Mercado 2 | Adopta $L$ (Probabilidad $q$) | Adopta $R$ (Probabilidad $1-q$) |
| :---: | :---: | :---: |
| **Estrategia $U$** | $(0, 0)$ | $(4, 4)$ |
| **Estrategia $M$** | $(1, 1)$ | $(1, 1)$ |
| **Estrategia $D$** | $(4, 4)$ | $(0, 0)$ |

### 3.2. Formación de Creencias Subjetivas y Utilidad Esperada
Sea $q \in [0, 1]$ la creencia subjetiva del Consumidor 1 de que el mercado adoptará el Estándar $L$. Consecuentemente, $(1 - q)$ representa la creencia de que el mercado adoptará el Estándar $R$.

La **utilidad esperada** $E[u_1(s_1 \mid q)]$ para cada una de las estrategias puras se deduce analíticamente:

$$\begin{aligned}
E[u_1(U \mid q)] &= 0 \cdot q + 4 \cdot (1 - q) = 4 - 4q \\
E[u_1(M \mid q)] &= 1 \cdot q + 1 \cdot (1 - q) = 1 \\
E[u_1(D \mid q)] &= 4 \cdot q + 0 \cdot (1 - q) = 4q
\end{aligned}$$

### 3.3. Propiedades Matemáticas: Curvas de Indiferencia en el Espacio de Pagos
Sea $(x, y) \in \mathbb{R}^2$ el vector de pagos condicionales, donde $x$ representa el pago si el mercado elige $L$ ($x = u_1(s_1 \mid L)$) e $y$ el pago si el mercado elige $R$ ($y = u_1(s_1 \mid R)$).

En dicho espacio bidimensional, cada estrategia pura corresponde a un punto discreto:
- $U = (0, 4)$
- $M = (1, 1)$
- $D = (4, 0)$

Para una creencia fijada $q \in (0, 1)$, el lugar geométrico de todos los puntos de pago que ofrecen la misma utilidad esperada $k = E[u_1]$ satisface la ecuación lineal:
$$q \cdot x + (1 - q) \cdot y = k$$

Despejando $y$ en función de $x$:
$$y(x) = \frac{k}{1 - q} - \left(\frac{q}{1 - q}\right) x$$

#### Teorema 1 (Pendiente de la Curva de Indiferencia Estratégica)
*La tasa marginal de sustitución entre pagos en el estado $L$ y pagos en el estado $R$ está unívocamente determinada por la razón de momios de las creencias subjetivas:*
$$\frac{dy}{dx} = -\frac{q}{1 - q}$$

*Interpretación económica:* A medida que el consumidor percibe una mayor probabilidad de que el mercado adopte $L$ (mayor $q$), la pendiente se vuelve más negativa (más empinada). Esto implica que el consumidor valora relativamente más los pagos en el estado $L$ respecto a los pagos en el estado $R$.

### 3.4. Evaluación para la Creencia Particular $q = 0.34$
Si el consumidor asigna una probabilidad subjetiva $q = 0.34$ a la coordinación del mercado en $L$:
$$\begin{aligned}
u_1(U \mid q=0.34) &= 0 \times 0.34 + 4 \times 0.66 = 2.64 \\
u_1(M \mid q=0.34) &= 1 \times 0.34 + 1 \times 0.66 = 1.00 \\
u_1(D \mid q=0.34) &= 4 \times 0.34 + 0 \times 0.66 = 1.36
\end{aligned}$$

Dado que $2.64 > 1.36 > 1.00$, la estrategia $U$ se sitúa sobre la curva de indiferencia más alejada del origen (mayor nivel de utilidad esperada). Por consiguiente, la mejor respuesta del consumidor ante la creencia $q = 0.34$ es **adoptar la Estrategia $U$**.

---

## 4. Teoremas de Dominancia y Umbrales Críticos

### 4.1. Umbral Crítico de Indiferencia ($q^*$)
Para determinar cuándo el consumidor transiciona de preferir el Estándar $R$ (estrategia $U$) a preferir el Estándar $L$ (estrategia $D$), igualamos sus utilidades esperadas:
$$E[u_1(U \mid q)] = E[u_1(D \mid q)] \iff 4 - 4q = 4q \iff 8q = 4 \iff q^* = \frac{1}{2} = 0.50$$

En $q^* = 0.50$, la utilidad esperada es $E[u_1] = 2.00$.
- Si $q < 0.50$, el consumidor estrictamente prefiere $U$ (adoptar red $R$).
- Si $q > 0.50$, el consumidor estrictamente prefiere $D$ (adoptar red $L$).
- Si $q = 0.50$, el consumidor es indiferente entre $U$ y $D$.

### 4.2. Dominancia Estricta de la Estrategia Intermedia $M$ por Mezclas Convexas
Un resultado contraintuitivo pero de gran trascendencia analítica es que la estrategia intermedia $M = (1, 1)$, que ofrece certidumbre garantizada de pago 1.00 sin importar la acción del mercado, **nunca es una mejor respuesta** para ningún valor de $q \in [0, 1]$.

#### Demostración:
Consideremos una estrategia mixta $\sigma = \frac{1}{2}U + \frac{1}{2}D$. El pago esperado de esta combinación para cualquier valor de $q$ es:
$$E[u_1(\sigma \mid q)] = \frac{1}{2}E[u_1(U \mid q)] + \frac{1}{2}E[u_1(D \mid q)] = \frac{1}{2}(4 - 4q) + \frac{1}{2}(4q) = 2.00$$

Dado que:
$$E[u_1(\sigma \mid q)] = 2.00 > 1.00 = E[u_1(M \mid q)] \quad \forall q \in [0, 1]$$

La estrategia mixta $\sigma$ **domina estrictamente** a la estrategia pura $M$. En consecuencia, un consumidor racional que maximiza la utilidad esperada jamás elegirá la opción neutral $M$, prefiriendo siempre apostar por la coordinación hacia uno de los estándares o adoptar una combinación probabilística de ellos.

---

## 5. Simulación Computacional y Resultados Numéricos

Para validar empíricamente la analítica anterior, se implementó el modelo algorítmico en Python (`src/simulacion_creencias_consumidor.py`), derivando las siguientes representaciones visuales:

### 5.1. Pago Esperado vs. Creencia Subjetiva $q$
La Figura 1 ilustra las funciones de utilidad esperada para todas las alternativas de consumo en el intervalo de creencias $q \in [0, 1]$.

![Pago Esperado vs Creencia Subjetiva](../assets/grafico_pagos_esperados.png)

*Figura 1: Curvas de utilidad esperada en función de la probabilidad subjetiva $q$. Se identifican con claridad las dos regiones de decisión óptima divididas por el umbral crítico $q^* = 0.50$. La línea de $M$ permanece invariante en 1.00, quedando siempre por debajo de la envolvente superior conformada por $\max(U, D)$.*

### 5.2. Espacio de Pagos y Curvas de Indiferencia Estratégica
La Figura 2 muestra el plano bidimensional $(u_L, u_R)$ y las líneas de nivel de utilidad para la creencia particular $q = 0.34$.

![Espacio de Pagos y Curvas de Indiferencia](../assets/espacio_pagos_indiferencia.png)

*Figura 2: Diagrama de espacio de pagos para $q = 0.34$. La curva de indiferencia que pasa por el punto $U(0, 4)$ alcanza el nivel de utilidad $E[u] = 2.64$, superando sustancialmente a las curvas asociadas a $D(4, 0)$ ($E[u] = 1.36$) y $M(1, 1)$ ($E[u] = 1.00$).*

---

## 6. Aplicaciones a la Economía Real y Comportamiento del Consumidor

### 6.1. Adopción de Plataformas Tecnológicas y Guerra de Estándares
El modelo formalizado explica con precisión fenómenos históricos y contemporáneos de competencia en mercados de dos lados:
- **Guerra de Formatos VHS vs. Betamax / Blu-ray vs. HD-DVD:** A pesar de las ventajas técnicas atribuidas en su momento a formatos como Betamax, las creencias de los consumidores ($q$) respecto a la disponibilidad de títulos y adopción de otros usuarios inclinaron el sistema hacia una cascada informativa y un rápido tipping point.
- **Redes Sociales y Mensajería Instantánea:** La reticencia de los usuarios a migrar de aplicaciones dominantes (p. ej., WhatsApp) hacia alternativas con mayores estándares de privacidad (p. ej., Signal) no obedece a costos monetarios directos (ambas aplicaciones son gratuitas), sino a que la creencia $q$ de que los contactos del usuario migren es baja, haciendo que el pago esperado de adoptar la alternativa sea inferior al de permanecer en la red mayoritaria.

### 6.2. La Trampa del Lock-in y Fallas de Coordinación
Cuando el juego involucra pagos asimétricos donde una tecnología $A$ es socialmente superior a una tecnología $B$ (p. ej., pagos $(5, 5)$ frente a $(4, 4)$), la presencia de información imperfecta puede atrapar al mercado en el equilibrio inferior si los consumidores mantienen creencias pesimistas respecto a la capacidad de coordinación colectiva (Arthur, 1989; Farrell & Saloner, 1985).

---

## 7. Implicaciones de Política Económica y Regulación

1. **Políticas de Interoperabilidad Obligatoria:** Si los reguladores (e.g., la Ley de Mercados Digitales de la Unión Europea - DMA) exigen interoperabilidad entre plataformas de mensajería o pagos móviles, la matriz de pagos se transforma: los consumidores ya no sufren una penalización severa ($0$) al elegir plataformas distintas, mitigando la dependencia de las creencias $q$ y promoviendo la competencia en innovación y privacidad.
2. **Subsidios a la Masa Crítica Inicial:** En la transición hacia tecnologías sostenibles (vehículos eléctricos), los gobiernos actúan sobre las expectativas de los consumidores financiando infraestructura de carga pública. Esto eleva la creencia subjetiva $q$ por encima del umbral crítico $q^*$, desbloqueando la adopción masiva privada.

---

## 8. Conclusiones

1. **Superación del Paradigma Paramétrico:** La integración de la teoría de juegos al análisis del consumidor permite modelar formalmente que, en presencia de externalidades de red, la elección óptima es indisociable de las creencias estratégicas respecto a los demás agentes.
2. **Relevancia Geométrica de las Curvas de Indiferencia:** En el espacio de pagos condicionales, la pendiente de la curva de indiferencia representa la tasa subjetiva de sustitución de estados impuesta por la creencia $q$. Para $q = 0.34$, el consumidor maximiza su utilidad esperada adoptando la estrategia $U$ ($E[u]=2.64$).
3. **Inadmisibilidad de Opciones Neutrales:** Se comprobó formalmente que alternativas intermedias que ofrecen pagos constantes son estrictamente dominadas por estrategias mixtas compuestas por las alternativas de especialización en estándares.
4. **Guía para Políticas Públicas:** Las fallas de coordinación y los equilibrios subóptimos justifican intervenciones regulatorias específicas centradas en la estandarización, interoperabilidad y el anclaje de expectativas de mercado.

---

## 9. Referencias Bibliográficas (Formato APA 7ª Edición)

- Arrow, K. J., & Debreu, G. (1954). Existence of an equilibrium for a competitive economy. *Econometrica: Journal of the Econometric Society*, 265-290.
- Arthur, W. B. (1989). Competing technologies, increasing returns, and lock-in by historical events. *The Economic Journal*, 99(394), 116-131.
- Bagwell, L. S., & Bernheim, B. D. (1996). Veblen effects in a theory of conspicuous consumption. *The American Economic Review*, 86(3), 349-373.
- Farrell, J., & Saloner, G. (1985). Standardization, compatibility, and innovation. *The RAND Journal of Economics*, 16(1), 70-83.
- Harsanyi, J. C. (1967). Games with incomplete information played by “Bayesian” players, I–III. *Management Science*, 14(3), 159-182.
- Katz, M. L., & Shapiro, C. (1985). Network externalities, competition, and compatibility. *The American Economic Review*, 75(3), 424-440.
- Katz, M. L., & Shapiro, C. (1986). Technology adoption in the presence of network externalities. *Journal of Political Economy*, 94(4), 822-841.
- Nash, J. (1950). Equilibrium points in n-person games. *Proceedings of the National Academy of Sciences*, 36(1), 48-49.
- Nash, J. (1951). Non-cooperative games. *Annals of Mathematics*, 54(2), 286-295.
- Rochet, J. C., & Tirole, J. (2003). Platform competition in two-sided markets. *Journal of the European Economic Association*, 1(4), 990-1029.
- Schelling, T. C. (1960). *The Strategy of Conflict*. Harvard University Press.
- Varian, H. R. (1992). *Microeconomic Analysis* (3rd ed.). W. W. Norton & Company.
- Veblen, T. (1899). *The Theory of the Leisure Class: An Economic Study of Institutions*. Macmillan.
- Von Neumann, J., & Morgenstern, O. (1944). *Theory of Games and Economic Behavior*. Princeton University Press.
