const nombreInput = document.getElementById('nombre');
const lugarInput = document.getElementById('lugarNacimiento');
const obtenerCoordenadasBtn = document.getElementById('obtenerCoordenadas');
const enviarBtn = document.getElementById('enviar');
nombreInput.addEventListener('input', function() {
    setGui()
});

lugarInput.addEventListener('input', function() {
    // Verificamos si el valor del input no está vacío
    setGui()
});

document.getElementById('obtenerCoordenadas').addEventListener('click', function() {
    var lugar = document.getElementById('lugarNacimiento').value;
    obtenerCoordenadas(lugar);
});

function setGui(){
    const dlat=parseInt(document.getElementById('lat').value)
    const dlon=parseInt(document.getElementById('lon').value)
    if (lugarInput.value.trim() !== '' && nombreInput.value.trim() !== '' && !(dlat===-1&&dlon===-1)) {
        obtenerCoordenadasBtn.disabled = false;
        enviarBtn.disabled = false;
    }else{
        obtenerCoordenadasBtn.disabled = true;
        enviarBtn.disabled = true;
    }
}

function obtenerCoordenadas(lugar) {
    var xhr = new XMLHttpRequest();
    var url = "/getDataMapCoords?lugar=" + encodeURIComponent(lugar);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                //alert('Json: '+JSON.stringify(response))
                if(response.coords.lat===-1 && response.coords.lon===-1){
                    document.getElementById('salida').textContent = 'Error! Hay un error con el dato del lugar de nacimiento. El sistema no puede obtener las coordenadas geográficas correctamente. Corrige el nombre del lugar o intenta con otro lugar lo más cercano posible al lugar de nacimiento.';
                }else{
                    document.getElementById('salida').textContent = 'Latitud: '+response.coords.lat+' Longitud: '+response.coords.lon;
                    document.getElementById('lat').value = response.coords.lat;
                    document.getElementById('lon').value = response.coords.lon;
                    document.getElementById('ciudad').value = document.getElementById('lugarNacimiento').value
                }
            }else{
                document.getElementById('salida').textContent = 'Error! Hay un error con el dato del lugar de nacimiento. El sistema no puede obtener las coordenadas geográficas correctamente. Corrige el nombre del lugar o intenta con otro lugar lo más cercano posible al lugar de nacimiento.';
                console.error('Error al obtener las coordenadas del lugar.');
            }
            setGui()
        }
    };

    xhr.open('GET', url, true);
    xhr.send();
}
function setDev(){
    document.getElementById('nombre').value = 'Ricardo'
    document.getElementById('lugarNacimiento').value = 'Malargue Mendoza'
    document.getElementById('dia').value = 20
    document.getElementById('mes').value = 6
    document.getElementById('anio').value = 1975
    document.getElementById('hora').value = 23
    document.getElementById('minutos').value = 4
    document.getElementById('gmt').value = -3
}
setDev()