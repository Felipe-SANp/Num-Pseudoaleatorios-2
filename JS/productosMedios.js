// Función para obtener los D dígitos del centro de un número
function obtenerDigitosCentrales(numero, D) {
    let numStr = numero.toString();  // Asegurarse que tenga al menos 2*D dígitos
    let inicio = Math.floor((numStr.length - D) / 2);
    return parseInt(numStr.substring(inicio, inicio + D));
}

// Algoritmo de productos medios
function productosMedios(X0, X1, n) {
    let D = X0.toString().length;  // Número de dígitos de la semilla
    let x0 = 0;
    let x1 = 0;
    let i = 0;
    for (let i = 0; i < n; i++) {
        let Y = X0 * X1;  // Multiplicar las dos semillas

        if (D % 2 == 0 && Y.toString().length % 2 != 0 || (D % 2 == 1 && Y.toString().length % 2 != 1)) {
            Y = Y.toString().padStart(Y.toString().length + 1, '0');
        }

        let X2 = obtenerDigitosCentrales(Y, D);  // Obtener los D dígitos del centro
        let ri = X2 / Math.pow(10, D);  // Generar el número pseudoaleatorio

        // guardar valores de x0 y x1
        x0 = X0;
        x1 = X1;

        // Actualizar las semillas para la siguiente iteración
        X0 = X1;
        X1 = X2;
       
        if (n != null && i >= n) {
            break;
        }
        // Agregar fila a la tabla de resultados
        document.getElementById('t01').innerHTML += filaParametros(i, x0, x1, Y, X2, ri);
    }
}

// TODO: Validar que las semillas sean de la misma longitud
document.getElementById('generarDatosBtn').addEventListener('click', function () {
    var semilla = parseInt(document.getElementById('id-semilla').value);
    var semilla2 = parseInt(document.getElementById('id-semilla2').value);
    var n = parseInt(document.getElementById('id-n').value);
    
    // validar semillas, con longitud > 3, y ambas de la misma longitud
    if (validarDatos(semilla, semilla2)) {
            alert('Ingrese la semilla.\n * Un número entero positivo de mas de 3 dígitos\n * Misma longitud entre las semillas.');
        return;
    }  

    if (isNaN(n) || n <= 0) {
        alert("Valor no valido para N\n * Ingrese un valor entero positivo para n");
        return;
    }
    document.getElementById('tabla').style.display = 'block';
    document.getElementById('t01').innerHTML =
    `<table id="t01">
        <tr>
            <th>X<sub>n</sub></th>
            <th>X<sub>i</sub></th>
            <th>X<sub>i+1</sub></th>
            <th>X<sub>i</sub> * X<sub>i+1</sub></th>
            <th>X<sub>i+2</sub></th>
            <th>r<sub>i</sub></th>
        </tr>
    </table>`;

    productosMedios(semilla, semilla2, n);
});

function validarDatos(semilla, semilla2) {
    return isNaN(semilla) || isNaN(semilla2) || 
        semilla.toString().length <= 3 || semilla2.toString().length <= 3 || 
        semilla.toString().length != semilla2.toString().length;
}

function filaParametros(i, x0, x1, Y, X2, ri) {
    return `
    <tr id ="result${i}">
        <td>X<sub>${i}</sub></td>
        <td>${x0}</td>
        <td>${x1}</td>
        <td>${Y}</td>
        <td>${X2}</td>
        <td>${ri.toFixed(4)}</td>
    </tr> `;
}