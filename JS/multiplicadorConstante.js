// Función para obtener los D dígitos del centro de un número
function obtenerDigitosCentrales(numero, D) {
    let numStr = numero.toString();  // Asegurarse que tenga al menos 2*D dígitos
    let inicio = Math.floor((numStr.length - D) / 2);
    return parseInt(numStr.substring(inicio, inicio + D));
}

// Algoritmo de multiplicador constante
function multiplicadorConstante(X0, a, n) {
    let D = X0.toString().length;  // Número de dígitos de la semilla
    let XnMap = {};  // Usar un objeto para almacenar los valores de Xn y evitar duplicados
    let x_a = 0;
    let i = 0;

    while (true) {
        let Y = X0 * a;  // Multiplicar la semilla por la constante
        if (D % 2 == 0 && Y.toString().length % 2 != 0 || (D % 2 == 1 && Y.toString().length % 2 != 1)) {
            Y = Y.toString().padStart(Y.toString().length + 1, '0');
        }

        let X1 = obtenerDigitosCentrales(Y, D);  // Obtener los D dígitos del centro
        let ri = X1 / Math.pow(10, D);  // Generar el número pseudoaleatorio

        // almacenar el valor de la semilla actual
        x_a = X0;

        // Actualizar la semilla para la siguiente iteración
        X0 = parseInt(X1);

        if (XnMap.hasOwnProperty(x_a)) {  // Verificar si el valor ya ha sido generado antes
            alert('Algoritmo terminado.\n * Se detectó un bucle entre X' + XnMap[x_a] +
                ' e X' + i +
                '\n * se detiene la generación de números');
            
            document.getElementById('t01').innerHTML += filaParametros(i, a, x_a, Y, X0, ri);
            styleID('result' + XnMap[x_a]);
            styleID('result' + i);
            break;
        }

        if (n != null && i >= n) {
            break;
        }

        document.getElementById('t01').innerHTML += filaParametros(i, a, x_a, Y, X0, ri);

        // almacenamos la semilla con el indice i en XnMap
        XnMap[x_a] = i;  // Usamos X0 como clave en el objeto XnMap para evitar duplicados
        i++;
    }
}

document.getElementById('generarDatosBtn').addEventListener('click', function () {
    var semilla = parseInt(document.getElementById('id-semilla').value);
    var constante = document.getElementById('id-constante').value;
    var n = parseInt(document.getElementById('id-n').value);

    // validar si semilla e constante tiene la misma longitud sea > 3
    if (validarDatos(semilla, constante)) {
        alert('Ingrese la semilla y constante\n * Un número entero positivo de mas de 3 dígitos\n * Misma longitud entre los valores.');
        return;
    }

    // validar n 
    if (!isNaN(n) && n <= 0) {
        alert('Ingrese el número de iteraciones de forma correcta.\n * Un número entero positivo.');
        return;
    }

    document.getElementById('tabla').style.display = 'block';

    document.getElementById('t01').innerHTML =
        `<table id="t01">
            <tr>
                <th>X<sub>n</sub></th> <!-- posicion de x -->
                <th>a * X<sub>i</sub></th> <!-- representacion de mulpicacion -->
                <th>x<sub>i+1</th> <!-- valor de mulpicacion -->
                <th>producto</th> <!-- valor de xi+1 -->
                <th>r<sub>i</sub></th> <!-- valor de r -->
            </tr>
        </table>`;

    multiplicadorConstante(semilla, constante, n);
});

function validarDatos(semilla, constante) {
    return isNaN(semilla) || semilla.toString().length <= 3 || 
        isNaN(constante) || constante.toString().length <= 3 || 
        semilla.toString().length != constante.toString().length;
}

function filaParametros(i, a, x_a, Y, X0, ri) {
    return `
    <tr id="result${i}">
        <td>X<sub>${i}</sub></td> <!-- posicion de x -->
        <td>${a} * ${x_a}</td> <!-- representacion de multiplicacion -->
        <td>${Y}</td> <!-- valor de multiplicacion -->
        <td>${X0}</td> <!-- valor de xi+1 -->
        <td>${ri.toFixed(4)}</td> <!-- valor de r -->
    </tr> `;
}