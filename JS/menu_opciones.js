// obtener el boton de exportar y la tabla
const $btnExportar = document.querySelector("#btnExportar"),
$tabla = document.querySelector("#t01");

// evento click al boton exportar
$btnExportar.addEventListener("click", function() {
let tableExport = new TableExport($tabla, {
    exportButtons: false, // No queremos botones
    filename: "Numeros Pseudoaleatorios", //Nombre del archivo de Excel
    sheetname: "Numeros Pseudoaletorios", //Título de la hoja
});
let datos = tableExport.getExportData();
let preferenciasDocumento = datos.tabla.xlsx;
tableExport.export2file(preferenciasDocumento.data, preferenciasDocumento.mimeType, preferenciasDocumento.filename, preferenciasDocumento.fileExtension, preferenciasDocumento.merges, preferenciasDocumento.RTL, preferenciasDocumento.sheetname);
});

// funcion dar otro estilo a una fila por id 
function styleID(id) {
    document.getElementById(id).style.color = "white";
    document.getElementById(id).style.background = "gray";
}

function alertBlucle(index, index_2){
    alert('Algoritmo terminado.\n * Se encontró un bucle entre X' + index +' y X' + index_2 +'\n * se detiene la generación de números');
}