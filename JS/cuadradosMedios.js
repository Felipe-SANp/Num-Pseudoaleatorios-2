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
            <th>X<sub>n</sub></th>
            <th>X<sub>i</sub></th>
            <th>X<sub>i</sub><sup>2</sup></th>
            <th>X<sub>i</sub></th>
            <th>r<sub>i</sub></th>
        </tr>
    </table>`;

    cuadradosMedios(semilla, n);
});

function filaParametros(i, X_a, Y, Xn, rn){
    let ri = parseFloat(`0.${Xn}`); // convertir Xn a número decimal, para redondear
    return `
    <tr id="result${i}">
        <td>X<sub>${i}</sub></td> 
        <td>${X_a}</td> 
        <td>${Y}</td> 
        <td>${Xn}</td> 
        <td>${ri.toFixed(4)}</td>
    </tr> `;
}