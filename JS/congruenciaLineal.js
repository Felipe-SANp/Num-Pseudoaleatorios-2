// Función para calcular el máximo común divisor (MCD)
function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

function esPrimo(n) {
    for(let i = 2; i < n; i++)
        if(n % i === 0) return false;
    return n > 1;
}

// Función para encontrar el número primo a la izquierda/derecha más cercano a m
function primoMasCercano(m) {
    let num = m;
    while (!esPrimo(num) && num > 2) {
      num--;
    }
    return num;
}

// Función para generar números pseudoaleatorios usando el algoritmo de congruencia lineal
function congruenciaLineal(X0, k, g) {
    let x_a = 0;
    let m = Math.pow(2, g);     // m = 2^g
    let n = m;                  // N = m = 2^g
    let a = 1 + 4 * k;          // a = 1 + 4k
    let c = primoMasCercano(m); // Seleccionamos primo mas cercano a m
    let numerosPseudoaleatorios = [];
    let Xi = X0;  // Semilla inicial

    // Verificar que c es relativamente primo con m o que ambos son 2
    if ((gcd(c, m) !== 1) && !(c == 2 && m == 2)) {
        console.error("Error: 'c' no es relativamente primo con 'm'.");
        return;
    }
    
    for (let i = 0; i < n; i++) {
        let oper = a * Xi + c;  // Operación a * Xi + c
        x_a = Xi; // almacenar xi antes de que se modifique
        Xi = oper % m;  // Fórmula de congruencia lineal
        let ri = Xi / (m - 1);  // Normalizar el valor entre 0 y 1
        
        // Almacenar el número generado
        numerosPseudoaleatorios.push(ri);  

        document.getElementById('t01').innerHTML += filaParametros2(a, i, x_a, c, m, oper, Xi, ri);
    }
    // crear la tabla para mostrar los valores calculados 
    document.getElementById('t02').innerHTML += filaParametros(a,c,n,m);
    document.getElementById('t02').style.display = "block";

    return numerosPseudoaleatorios;
}

document.getElementById('generarDatosBtn').addEventListener('click', function() {
    var semilla = parseInt(document.getElementById('id-semilla').value);
    var k = parseInt(document.getElementById('id-k').value);
    var g = parseInt(document.getElementById('id-g').value);

    // validar que los valores sean enteros positivos y g sea mayor a 1 y k sea mayor a 0 
    if (isNaN(semilla) || isNaN(k) || isNaN(g) || semilla <= 0 || k <= 0 || g <= 0) {
        alert('Ingrese un número entero positivo para los campos:\n * semilla\n * k\n * g');
        return;
    }

    document.getElementById('tabla').style.display = 'block';
    
    document.getElementById('t01').innerHTML =
    `<table id="t01">
        <tr>
            <th>X<sub>n</sub></th> <!-- posicion de x -->
            <th>a * X<sub>i</sub> + C</th> <!-- valor de a * xn + c -->
            <th>a * X<sub>i</sub> + C MOD M</th> <!-- valor a * xn + c MOD M -->
            <th>X<sub>i+1</sub></th> <!-- valor de xn+1 -->
            <th>X<sub>i+1</sub> / M-1</th> <!-- representacion de xn+1 / M-1-->
            <th>r<sub>i</sub> = X<sub>i+1</sub> / M-1</th> <!-- valor de ri = xn+1 / M-1-->
        </tr>
    </table>`;

    document.getElementById('t02').innerHTML =
    `<table id="t02">
        <th>Formula</th>
        <th>Valor</th>
    </table>`;

    congruenciaLineal(semilla, k, g);
});

function filaParametros(a,c,n,m){
    return `
    <tr><td>M = 2<sup>g</sup></td>  <td>${m}</td></tr>
    <tr><td>a = 1 + 4*k</td>  <td>${a}</td></tr> 
    <tr><td>C = N. primo cercano a M</td>  <td>${c}</td></tr>
    <tr><td>N = M = 2<sup>g</sup></td>  <td>${n}</td></tr>
    `;
}

function filaParametros2(a, i, x_a, c, m, oper, Xi, ri){
    return `
    <tr>
        <td>X<sub>${i}</sub></td> <!-- posicion de x -->
        <td>${a} * ${x_a}</sub> + ${c}</td> <!-- valor de a * xn + c -->
        <td>${oper} MOD ${m}</td> <!-- valor a * xn + c MOD M -->
        <td>${Xi}</td> <!-- valor de xn+1-->
        <td>${Xi} / ${m - 1}</td> <!-- representacion de xn+1 / M-1-->
        <td>${ri.toFixed(4)}</td> <!-- valor de ri = xn+1 / M-1-->
    </tr> `;
}