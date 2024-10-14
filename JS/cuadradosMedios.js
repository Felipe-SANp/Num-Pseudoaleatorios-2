// Función para generar números pseudoaleatorios usando el método de cuadrados medios
function cuadradosMedios(semilla, n) {
    let D = semilla.toString().length; // Número de dígitos de la semilla
    let X = semilla;
    let X_a = semilla;
    let XnMap = {}; // Mapa para rastrear los números generados

    let i = 0;
    while (true) {
        let Y = X * X; // Elevar la semilla al cuadrado
        let YStr = Y.toString();
        X_a = X;

        // Asegurarse de tener los dígitos (rellenar con ceros)
        if (D % 2 == 0 && YStr.length % 2 != 0 || (D % 2 == 1 && YStr.length % 2 != 1)) {
            YStr = YStr.padStart(YStr.length + 1, '0');
        }

        // Extraer los D dígitos del centro
        let centro = Math.floor(YStr.length / 2);
        let inicio = Math.max(0, centro - Math.floor(D / 2));
        let Xn = YStr.substring(inicio, inicio + D);

        // Generar el número pseudoaleatorio entre 0 y 1
        let rn = `0.${Xn}`;

        // Actualizar la semilla
        X = parseInt(Xn);

        if (XnMap.hasOwnProperty(X_a)) {
            alertBlucle(XnMap[X_a], i);
            
            document.getElementById('t01').innerHTML += filaParametros(i, X_a, Y, Xn, rn);
            styleID('result' + XnMap[X_a]);
            styleID('result' + i);
            break;
        }
        if (n != null && i >= n) {
            break;
        }

        // agregar fila a la tabla de resultados
        document.getElementById('t01').innerHTML += filaParametros(i, X_a, Y, Xn, rn);

        // Agregar Xn al mapa
        XnMap[X_a] = i;

        i++;
    }
}

document.getElementById('generarDatosBtn').addEventListener('click', function () {
    var semilla = parseInt(document.getElementById('id-semilla').value);
    var n = parseInt(document.getElementById('id-n').value);

    if (isNaN(semilla) ||semilla.toString().length <= 3) {
        alert('Ingrese la semilla.\n * Un número entero positivo de mas de 3 dígitos.');
        return;
    }
    document.getElementById('tabla').style.display = 'block';

    document.getElementById('t01').innerHTML =
    `<table id="t01">
        <tr>
            <th>X<sub>n</sub></th> <!-- posicion de x -->
            <th>X<sub>i</sub></th> <!-- valor de x -->
            <th>X<sub>i</sub><sup>2</sup></th> <!-- valor de x^2 -->
            <th>X<sub>i</sub></th> <!-- valor de x extraido los 4 digitos-->
            <th>r<sub>i</sub></th> <!-- valor de r -->
        </tr>
    </table>`;

    cuadradosMedios(semilla, n);
});

function filaParametros(i, X_a, Y, Xn, rn){
    return `
    <tr id="result${i}">
        <td>X<sub>${i}</sub></td> <!-- posicion de x -->
        <td>${X_a}</td> <!-- valor de x -->
        <td>${Y}</td> <!-- valor de x^2 -->
        <td>${Xn}</td> <!-- valor de x extraido los 4 digitos-->
        <td>${rn}</td> <!-- valor de r -->
    </tr> `;
}