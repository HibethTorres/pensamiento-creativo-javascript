/**
 * Objeto Literal usado como un Despacho de Funciones (Function Dispatcher)
 * Nota: Las claves DEBEN seguir siendo camelCase o PascalCase para coincidir con la normalización.
 */
const circuloMagico = {
    'Viento': (objetivo) => {
        console.log(`🌬️ ¡Viento, séllate! El objetivo (${objetivo}) es envuelto y neutralizado.`);
        return { cartaUsada: 'Viento', resultado: 'Neutralizado' };
    },

    'Salto': (destino) => {
        console.log(`🤸 Carta Salto. ¡Elevando a Sakura para alcanzar el ${destino} con agilidad!`);
        return { cartaUsada: 'Salto', resultado: 'Movimiento Rápido' };
    },

    'Fuego': (intensidad) => {
        if (intensidad < 5) {
            console.log(`🔥 Llama de Fuego. Un pequeño resplandor para iluminar.`);
        } else {
            console.log(`🌋 ¡Fuego, ataca! Llamas intensas de nivel ${intensidad} desatadas.`);
        }
        return { cartaUsada: 'Fuego', resultado: 'Daño/Iluminación' };
    },

    // Estrategia por defecto
    'NoReconocida': (cartaInvalida) => {
        console.error(`❌ Kero-chan dice: ¡Error! La carta "${cartaInvalida}" no está en el grimorio.`);
        return { cartaUsada: 'Error', resultado: 'Carta Inválida' };
    }
};

// --- FUNCIÓN DE INVOCACIÓN OPTIMIZADA ---

/**
 * Función que usa el objeto 'circuloMagico' con las siguientes optimizaciones:
 * 1. Normalización de entrada (Robustez)
 * 2. Uso del operador || para simplificar el fallback (Concisión)
 */
function invocarCarta(nombreCarta, ...parametros) {
    
    // 💡 OPTIMIZACIÓN 1: Normalización de la clave (ej. 'viento' -> 'Viento', 'SALTO' -> 'Salto')
    // Esto asegura que la búsqueda por clave siempre funcione, ignorando mayúsculas/minúsculas.
    const claveNormalizada = nombreCarta.charAt(0).toUpperCase() + nombreCarta.slice(1).toLowerCase();
    
    // 💡 OPTIMIZACIÓN 2: Simplificación de Invocación usando el operador OR (||)
    // Busca la acción; si es 'undefined' (carta no existe), usa la función 'NoReconocida'.
    const accion = circuloMagico[claveNormalizada] || circuloMagico.NoReconocida;
    
    // Si la acción encontrada NO es la estrategia por defecto, la registramos.
    if (accion !== circuloMagico.NoReconocida) {
        console.log(`\nInvoca: **${claveNormalizada}**`);
        // Ejecutamos la acción con sus parámetros
        return accion(...parametros); 
    }
    
    // Si la acción es 'NoReconocida', se llama con el nombre de carta original
    return accion(nombreCarta);
}

// --- EJEMPLOS DE USO (Demostrando la Robustez) ---

console.log('--- Pruebas Normales ---');
// 1. Invocación exitosa: 'Viento'
const resultadoViento = invocarCarta('Viento', 'esfera oscura');
console.log('Resultado:', resultadoViento);

// 2. Invocación exitosa: 'Fuego' con un parámetro
const resultadoFuego = invocarCarta('Fuego', 8);
console.log('Resultado:', resultadoFuego);

console.log('\n--- Pruebas de Robustez (Case Insensitive) ---');
// 3. Invocación con minúsculas (Manejado por Optimización 1)
const resultadoSaltoMinusculas = invocarCarta('salto', 'techo del museo');
console.log('Resultado:', resultadoSaltoMinusculas);

// 4. Invocación con mayúsculas parciales (Manejado por Optimización 1)
const resultadoFuegoMixto = invocarCarta('fUeGo', 3);
console.log('Resultado:', resultadoFuegoMixto);

console.log('\n--- Pruebas de Fallback (Concisión) ---');
// 5. Invocación de una carta no mapeada (Manejado por Optimización 2)
const resultadoNocturno = invocarCarta('Nocturno');
console.log('Resultado:', resultadoNocturno);