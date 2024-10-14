
// Función para verificar si un número es impar
function esImpar(numero) {
    if (numero % 2 === 0) {
        alert("El valor de 'c' debe ser un número impar.");
        return false;
    }
    return true;
}

// Función para verificar si un número es par
function esPar(numero) {
    if (numero % 2 !== 0) {
        alert("El valor de 'a' debe ser un número par.");
        return false;
    }
    return true;
}

// Funcion para validar b, (b-1) mod 4 = 1
function validarB(b) {
    if ((b - 1) % 4 !== 1) {
        return false;
    }
    alert("El valor de 'b' no debe cumplir con la condición:\n * (b-1) mod 4 = 1.");
    return true;
}


// Algoritmo congruencial cuadrático
function congruencialCuadratico(X0, g, a, b, c) {
    let m = Math.pow(2, g);  // m = 2^g
    let n = m + 1;
    let numerosPseudoaleatorios = [];
    let Xi = X0;  // Semilla inicial
    let x_i = 0;
    let x_c = 0;
    let x_a = 0;
    let x_b = 0;

    for (let i = 0; i < n; i++) {
        // Fórmula del algoritmo congruencial cuadrático
        x_i = Xi;
        x_c = Xi ** 2;
        x_a = a * x_c;
        x_b = x_a + b * Xi + c;
        Xi = x_b % m;  
        let ri = Xi / (m - 1);  // Normalizar el valor entre 0 y 1
        numerosPseudoaleatorios.push(ri);  // Almacenar el número generado

        const fila = `
        <tr">
            <td>X<sub>${i}</sub></td> <!-- posicion de x -->
            <td>${a} * ${x_c}</td> <!-- representacion a * xi^2 -->
            <td>${x_a} + ${b} * ${x_i} + ${c}</td> <!-- representacion de a * xi^2 + b * xi + c -->
            <td>${x_b} MOD ${m}</td> <!-- representacion de resultado MOD M -->
            <td>${Xi}</td> <!-- resultado de lo anterior -->
            <td>${Xi} / ${m-1}</td> <!-- ri = Xi+1/M-1 -->
            <td>${ri}</td> <!-- ri -->
        </tr> `;
            document.getElementById('t01').innerHTML += fila;
    }

    return numerosPseudoaleatorios;
}

document.getElementById('generarDatosBtn').addEventListener('click', function() {
    var semilla = parseInt(document.getElementById('id-semilla').value);
    var g = parseInt(document.getElementById('id-m').value);
    var a = parseInt(document.getElementById('id-a').value);
    var b = parseInt(document.getElementById('id-b').value);
    var c = parseInt(document.getElementById('id-c').value);

    if(isNaN(semilla) || semilla <= 0 || isNaN(g) || g <= 0 || isNaN(a) || a <= 0  || isNaN(b) || b <= 0 || isNaN(c) || c <= 0) {
        alert("Ingrese un número entero positivo para los campos:\n * Semilla: valor entero\n * g: valor entero\n * a: par\n * b: (b-1) mod 4 = 1 \n * c: impar");
        return
    }

    // validar que los valores sean enteros positivos
    if (!esPar(a) || !esImpar(c) || validarB(b)){
        return;
    }
    document.getElementById('tabla').style.display = "block";
    document.getElementById('t01').innerHTML =
    `<table id="t01">
        <tr>
            <th>X<sub>i</sub></th> <!-- posicion de x -->
            <th>a * X<sub>i</sub><sup>2</sup></th> <!-- representacion a * xi^2 -->
            <th>a * X<sub>i</sub><sup>2</sup> + b + c</th> <!-- representacion de a * xi^2 + b * xi + c -->
            <th>a * X<sub>i</sub><sup>2</sup> + b + c MOD m</th> <!-- representacion de resultado MOD M -->
            <th>X<sub>i+1</sub></th> <!-- resultado de lo anterior -->
            <th>r<sub>i</sub> = X<sub>i+1</sub> / M-1</th> <!-- ri = Xi+1/M-1 -->
            <th>r<sub>i</sub></th> <!-- ri -->
        </tr>
    </table>`;
    congruencialCuadratico(semilla, g, a, b, c);
});