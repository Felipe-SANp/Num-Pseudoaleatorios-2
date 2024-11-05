function congruencialAditivo(semillas, m, n) {
    let XnMap = {};
    let Xn2Map = {};
    const buffer = new Array(semillas.length);

    for (let i = 0; i < semillas.length; i++) {
        buffer[i] = Number(semillas[i]);
    }

    let i = semillas.length;
    let a = 0;
    while (true) {
        let xn = buffer[i - 1];
        let xn2 = buffer[i - semillas.length];
        const x_i_n = xn + xn2;
        const nuevoValor = x_i_n % m;
        const result = nuevoValor / (m - 1);

        if (XnMap.hasOwnProperty(xn) && Xn2Map.hasOwnProperty(xn2) ) {
            alertBlucle(XnMap[xn], a);

            document.getElementById('t01').innerHTML += filaParametros(a, i, xn, xn2, x_i_n, m, nuevoValor, result);
            styleID('result' + XnMap[xn]);
            styleID('result' + a);
            break;
        }

        if (n != null && i >= semillas.length + n) {
            break;
        }

        buffer.push(nuevoValor);
        
        document.getElementById('t01').innerHTML += filaParametros(a, i, xn, xn2, x_i_n, m, nuevoValor, result);
        
        XnMap[xn] = a;
        XnMap[xn2] = a;
        
        i++;
        a++;
    }
}


// Módulo para manejar la generación de columnas
var GeneradorColumnas = (function () {

    function generarColumnas() {
        var semillas = parseInt(document.getElementById("id-semilla").value);

        // Validación de la semilla
        if (isNaN(semillas) || semillas <= 0) {
            alert("La cantidad de semillas debe ser un número entero positivo");
            return;
        }

        document.getElementById('tabla').style.display = 'block';
        document.getElementById('valores').style.display = 'block';

        document.getElementById('t02').innerHTML =
        `<table id="t02">
            <tr>
                <th>X<sub>i</sub></th>
                <th>Valor</th>
            </tr>
        </table>`;

        crearSemillas(parseInt(semillas));
        document.getElementById("id-row-est").style.display = "block";
        document.getElementById("tabla-1").style.display = "block";
        document.getElementById("tabla-2").style.display = "block";
    }

    function crearSemillas(seed) {
        for (var k = 1; k < seed + 1; k++) {
            var fila = `
            <tr>
                <td>X<sub>${k}</sub></td>
                <td><div class="col-auto"><input type="number" class="form-control" id="id-semilla${k}" placeholder="semilla ${k}"></div></td>
            </tr>`;
            document.getElementById('t02').innerHTML += fila;
        }
    }

    return {
        generarColumnas: generarColumnas
    };

})();

// función para obtener los datos y ejecutar el algoritmo
document.getElementById('generarDatosBtn').addEventListener('click', function() {
    var m = parseInt(document.getElementById("id-m").value);
    var n = parseInt(document.getElementById("id-n").value);

    var size = parseInt(document.getElementById("id-semilla").value);
    const semillasInic = outSedd(size); // almacen para las semillas iniciales 

    // validar semillas iniciales 
    if (semillasInic === null){
        alert("Ingrese la cantidad de semillas iniciales requeridas");
        return;
    }

    if (isNaN(m) ||m <= 0  || n <= 0) {
        alert("Ingrese los valores de m y n.\n * Ambos deben ser números enteros positivos.");
        return;
    }

    document.getElementById('tabla2').style.display = 'block';
    document.getElementById('t01').innerHTML =
        `<table id="t01">
            <tr>
                <th>X<sub>i</sub></th>
                <th>X<sub>i+1</sub> + X<sub>i-n</sub></th>
                <th>(X<sub>i+1</sub> + X<sub>i-n</sub>) MOD m</th>
                <th>X<sub>i+1</sub></th>
                <th>X<sub>i</sub>/m-1</th>
                <th>r<sub>i</sub> = X<sub>i</sub>/m-1</th>
            </tr>
        </table>`;
    
    congruencialAditivo(semillasInic, m, n);
});

function outSedd(size){
    const seed = []; // almacen para las semillas iniciales 
    for (var k = 0; k < size; k++) {
        var valS = parseInt(document.getElementById("id-semilla" + (k + 1)).value);
        if (isNaN(valS)) {return null;}
        seed[k] = parseInt(valS);
    }
    return seed;
}

function filaParametros(a, i, xn, xn2, x_i_n, m, nuevoValor, result) {
    return `
    <tr id="result${a}">
        <td>X<sub>${i + 1}</sub></td>
        <td>${xn} + ${xn2}</td>
        <td>${x_i_n} mod ${m}</td>
        <td>${nuevoValor}</td>
        <td>${nuevoValor} / ${m-1}</td>
        <td>${result.toFixed(4)}</td>
    </tr>`;
}

// Eventos de botones
document.getElementById("generarColumnasBtn").addEventListener("click", GeneradorColumnas.generarColumnas);