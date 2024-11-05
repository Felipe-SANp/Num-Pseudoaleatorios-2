// Función para generar números pseudoaleatorios usando el algoritmo congruencial multiplicativo
function congruencialMultiplicativo(X0, k, g) {
    let x_a = 0;
    // Calcular los valores de acuerdo a las reglas
    let m = Math.pow(2, g);  // m = 2^g
    let a = 5 + 8 * k;       // a = 5 + 8k (puedes elegir entre esta fórmula o 5 + 8k)
    let n = m / 4;           // Máximo periodo de vida N = m/4
    let numerosPseudoaleatorios = [];
    
    let Xi = X0;  // Iniciar con la semilla

    // Generar los números pseudoaleatorios
    for (let i = 0; i < n; i++) {
        // guardar el valor de xi antes de que se modifique
        x_a = Xi;
        let oper = a * Xi;  // Operación a * Xi
        Xi = oper % m;  // Fórmula del algoritmo congruencial multiplicativo
        let ri = Xi / (m - 1);  // Normalizar el valor entre 0 y 1
        
        // Almacenar el número generado
        numerosPseudoaleatorios.push(ri);

        document.getElementById('t01').innerHTML += filaParametros2(i, a, x_a, m, Xi, ri, oper);
    }
    document.getElementById('t02').innerHTML += filaParametros(a,n,m);
    document.getElementById('t02').style.display = "block";
}

document.getElementById('generarDatosBtn').addEventListener('click', function() {
    var semilla = parseInt(document.getElementById('id-semilla').value);
    var k = parseInt(document.getElementById('id-k').value);
    var g = parseInt(document.getElementById('id-g').value);

    // validar que los valores sean enteros positivos y g sea mayor a 1 y k sea mayor a 0 
    if (isNaN(semilla) || isNaN(k) || isNaN(g) || semilla <= 0 || k <= 0 || g <= 0) {
        alert('Ingrese un número entero positivo para los campos:\n * semilla numero impar\n * k\n * g');
        return;
    }
    
    if(semilla % 2 === 0){
        alert('La semilla debe ser un número impar');
        return;
    }

    document.getElementById('tabla').style.display = "block"; 
    
    document.getElementById('t01').innerHTML =
    `<table id="t01">
        <tr>
            <th>X<sub>i</sub></th> <!-- posicion de x -->
            <th>a * X<sub>i-1</sub></th> <!-- valor de a * xi -->
            <th>a * X<sub>i-1</sub> MOD M</th> <!-- valor (a * xi) MOD M -->
            <th>X<sub>i</sub></th> <!-- valor de xi -->
            <th>X<sub>i</sub> / M-1</th> <!-- valor de xi+1/M-1 -->
            <th>r<sub>i</sub> = X<sub>i</sub> / M-1</th> <!-- valor de ri = xn+1 / M-1-->
        </tr>
    </table>`;

    document.getElementById('t02').innerHTML =
    `<table id="t02">
        <th>Formula</th>
        <th>Valor</th>
    </table>`;

    // TODO: k y g deben ser números enteros, la semilla debe ser un numero entero impar
    congruencialMultiplicativo(semilla, k, g);
});
function filaParametros(a,n,m){
    return `
    <tr><td>M = 2<sup>g</sup></td>  <td>${m}</td></tr>
    <tr><td>a = 5 + 8*k</td>  <td>${a}</td></tr> 
    <tr><td>N = M/4</td>  <td>${n}</td></tr>
    `;
}

function filaParametros2(i, a, x_a, m, Xi, ri, oper) {
    return `
    <tr>
        <td>X<sub>${i+1}</sub></td> <!-- posicion de x -->
        <td>${a} * ${x_a}</td> <!-- valor de a * xi -->
        <td>${oper} MOD ${m}</td> <!-- valor (a * xi) MOD M -->
        <td>${Xi}</td> <!-- valor de xi -->
        <td>${Xi} / ${m-1}</td> <!-- valor de xi+1/M-1 -->
        <td>${ri.toFixed(4)}<!-- valor de ri = xn+1 / M-1-->
    </tr> `;
}