var mensajeSoloEspanol="The following functionality is only available in Spanish. Do you wish to continue?";

function obtenerRespuestaDisponibilidadIdioma(){	
	return confirm(mensajeSoloEspanol);
}

function mostrarAlertaIdioma(urlOFuncion,parametros){	
	if(urlOFuncion instanceof Function){
		if (parametros !== undefined) {
			urlOFuncion.apply(this, parametros);
		} else {
			urlOFuncion.apply(this);
		}	
	}
	else{			
			location.href=urlOFuncion;
	}
}