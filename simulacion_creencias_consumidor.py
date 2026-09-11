"""
Simulación de Teoría de Juegos Aplicada a Decisiones del Consumidor:
Creencias Subjetivas, Pagos Esperados y Curvas de Indiferencia Estratégicas.

Autor: Dilan Alexander Manosalvas Andrade
Afiliación: Econometrics ECEM
Sitio Web: https://econometricis.vercel.app/

Inspirado en los modelos de teoría de la decisión y juegos de coordinación de:
Von Neumann & Morgenstern (1944), Schelling (1960), Katz & Shapiro (1985).
"""

import os
import numpy as np
import matplotlib.pyplot as plt

# Configuración estética científica
plt.style.use('seaborn-v0_8-whitegrid' if 'seaborn-v0_8-whitegrid' in plt.style.available else 'default')
plt.rcParams['font.family'] = 'DejaVu Sans'
plt.rcParams['font.size'] = 11
plt.rcParams['axes.titlesize'] = 13
plt.rcParams['axes.labelsize'] = 11

def ensure_dirs():
    os.makedirs('assets', exist_ok=True)

def calcular_pagos_esperados(q):
    """
    Calcula la utilidad esperada de cada estrategia del Jugador 1 (Consumidor)
    dada su creencia q de que el Jugador 2 (Otro Consumidor / Mercado) elija L.
    
    Estrategias del Consumidor:
    - U (Estrategia Alta / Estándar A): Pago si L = 0, Pago si R = 4
    - M (Estrategia Moderada / Híbrida): Pago si L = 1, Pago si R = 1
    - D (Estrategia Baja / Estándar B): Pago si L = 4, Pago si R = 0
    """
    pago_U = 0.0 * q + 4.0 * (1.0 - q)
    pago_M = 1.0 * q + 1.0 * (1.0 - q)
    pago_D = 4.0 * q + 0.0 * (1.0 - q)
    return {"U": pago_U, "M": pago_M, "D": pago_D}

def graficar_creencias_vs_pagos(guardar_ruta="assets/grafico_pagos_esperados.png"):
    """
    Genera el gráfico del Pago Esperado E[u] vs la Probabilidad Subjetiva q in [0, 1].
    Muestra los umbrales de decisión del consumidor.
    """
    q_vals = np.linspace(0, 1, 300)
    eu_U = 0.0 * q_vals + 4.0 * (1.0 - q_vals)
    eu_M = np.ones_like(q_vals) * 1.0
    eu_D = 4.0 * q_vals + 0.0 * (1.0 - q_vals)

    fig, ax = plt.subplots(figsize=(9, 5.5), dpi=300)

    ax.plot(q_vals, eu_U, label=r'Estrategia $U$ (Adopción Red $R$): $4(1-q)$', color='#2b5c8f', lw=2.5)
    ax.plot(q_vals, eu_M, label=r'Estrategia $M$ (Opción Neutral): $1.00$', color='#e67e22', lw=2.5, ls='--')
    ax.plot(q_vals, eu_D, label=r'Estrategia $D$ (Adopción Red $L$): $4q$', color='#27ae60', lw=2.5)

    # Punto de corte U y D en q = 0.5
    ax.scatter([0.5], [2.0], color='#8e44ad', s=80, zorder=5)
    ax.annotate(r'Umbral Crítico $q^* = 0.50$' + '\n' + r'$E[u_U] = E[u_D] = 2.0$',
                xy=(0.5, 2.0), xytext=(0.52, 2.7),
                arrowprops=dict(arrowstyle="->", color='#8e44ad', lw=1.5),
                fontsize=10, fontweight='bold',
                bbox=dict(boxstyle="round,pad=0.3", fc="#f4ecf7", ec="#8e44ad", lw=1))

    # Regiones óptimas
    ax.axvspan(0.0, 0.5, color='#2b5c8f', alpha=0.08, label='Zona Óptima: Elegir U ($q < 0.5$)')
    ax.axvspan(0.5, 1.0, color='#27ae60', alpha=0.08, label='Zona Óptima: Elegir D ($q > 0.5$)')

    ax.set_title('Modelo de Elección Estratégica del Consumidor:\nPago Esperado en función de la Creencia Subjetiva $q$', pad=15)
    ax.set_xlabel('Creencia del Consumidor $q = P(\\text{Mercado adopta } L)$', fontweight='bold')
    ax.set_ylabel('Utilidad / Pago Esperado $E[u_1]$', fontweight='bold')
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 4.5)
    ax.legend(frameon=True, loc='upper center', bbox_to_anchor=(0.5, -0.15), ncol=2)
    plt.tight_layout()
    plt.savefig(guardar_ruta, bbox_inches='tight')
    plt.close()
    print(f"Gráfico guardado en: {guardar_ruta}")

def graficar_espacio_pagos_indiferencia(q_eval=0.34, guardar_ruta="assets/espacio_pagos_indiferencia.png"):
    """
    Reproduce rigurosamente el diagrama de espacio de pagos (Payoff if L vs Payoff if R)
    con curvas de indiferencia del consumidor para una creencia q dada (por defecto q = 0.34).
    """
    # Coordenadas de los puntos estratégicos (Pago L, Pago R)
    puntos = {
        'U': (0, 4),
        'M': (1, 1),
        'D': (4, 0)
    }

    fig, ax = plt.subplots(figsize=(8.5, 6.5), dpi=300)

    # Graficar puntos
    colores_puntos = {'U': '#2980b9', 'M': '#2980b9', 'D': '#2980b9'}
    for nombre, (x, y) in puntos.items():
        ax.scatter(x, y, color=colores_puntos[nombre], s=90, zorder=5)
        offset_x = 0.12 if nombre != 'M' else 0.12
        offset_y = 0.12 if nombre != 'M' else 0.12
        ax.annotate(f'${nombre}$', (x + offset_x, y + offset_y), fontsize=13, fontweight='bold', color='#1a5276')

    # Curvas de indiferencia para la creencia q
    # E[u] = q * x + (1-q) * y  ==>  y = (E[u] - q*x) / (1-q)
    x_vals = np.linspace(0, 5, 200)
    colores_indif = {'U': '#8e44ad', 'M': '#9b59b6', 'D': '#a569bd'}

    for nombre, (x0, y0) in puntos.items():
        eu = q_eval * x0 + (1.0 - q_eval) * y0
        y_indif = (eu - q_eval * x_vals) / (1.0 - q_eval)
        # Filtrar valores positivos o razonables para visualización
        mask = (y_indif >= -0.2) & (y_indif <= 5.2)
        lw = 2.4 if nombre == 'U' else 1.5
        ls = '-' if nombre == 'U' else '--'
        ax.plot(x_vals[mask], y_indif[mask], color=colores_indif[nombre], lw=lw, ls=ls,
                label=f'Indiferencia {nombre}: $E[u] = {eu:.2f}$')

    # Detalle de la mejor estrategia
    pagos = calcular_pagos_esperados(q_eval)
    mejor_estrategia = max(pagos, key=pagos.get)

    texto_info = (
        f"Creencia evaluada: $q = {q_eval:.2f}$\n"
        f"• $u_1(U | q={q_eval:.2f}) = 0 \\times {q_eval:.2f} + 4 \\times {1-q_eval:.2f} = {pagos['U']:.2f}$\n"
        f"• $u_1(M | q={q_eval:.2f}) = 1 \\times {q_eval:.2f} + 1 \\times {1-q_eval:.2f} = {pagos['M']:.2f}$\n"
        f"• $u_1(D | q={q_eval:.2f}) = 4 \\times {q_eval:.2f} + 0 \\times {1-q_eval:.2f} = {pagos['D']:.2f}$\n\n"
        f"Resultado: La estrategia ${mejor_estrategia}$ maximiza la utilidad esperada\n"
        f"al ubicarse sobre la curva de indiferencia más alta."
    )

    ax.text(0.48, 0.72, texto_info, transform=ax.transAxes, fontsize=10.5,
            verticalalignment='top',
            bbox=dict(boxstyle="round,pad=0.5", fc="#fcf3cf", ec="#f39c12", lw=1.2))

    ax.set_title(f'Espacio de Pagos y Curvas de Indiferencia del Consumidor ($q = {q_eval}$)', pad=15)
    ax.set_xlabel('Pago si el Mercado / Jugador 2 elige $L$', fontweight='bold')
    ax.set_ylabel('Pago si el Mercado / Jugador 2 elige $R$', fontweight='bold')
    ax.set_xlim(-0.2, 5.2)
    ax.set_ylim(-0.2, 5.2)
    ax.grid(True, linestyle=':', alpha=0.6)
    ax.legend(loc='lower left', frameon=True)
    plt.tight_layout()
    plt.savefig(guardar_ruta, bbox_inches='tight')
    plt.close()
    print(f"Gráfico guardado en: {guardar_ruta}")

if __name__ == "__main__":
    ensure_dirs()
    print("Ejecutando simulación de Teoría de Juegos y Decisiones del Consumidor...")
    graficar_creencias_vs_pagos()
    graficar_espacio_pagos_indiferencia(q_eval=0.34)
    print("¡Simulaciones y gráficos generados exitosamente!")
