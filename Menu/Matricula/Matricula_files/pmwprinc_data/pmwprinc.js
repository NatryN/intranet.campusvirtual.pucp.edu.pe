function EnlacePaginaInsc(url)
{
//  var session = document.formEvento.session.value;

  window.location=url;

/*
   if (confirm("Esta seguro que desea eliminar el evento?"))
  {    
    window.location="/pucp/eventos/evwevnts/evwevnts;jsessionid=" + session + "?accion=EliminarEvento" + "&amp;" + "evento=" + evento + "&amp;"+ "tipoCreador=A";    
  }
*/
  return;
} 

//función para llamar a la aplicación de inscripción
function EnlacePaginaInscripcion( )
{
  var session = document.formPortal.session.value;
  window.location="/pucp/prematri/pmwinscr/pmwinscr;jsessionid=" + session + "?accion=MostrarInscripcion";
  return;
}

//función para llamar a la nueva aplicación de inscripción
function EnlaceNuevaPaginaInscripcion( )
{
  var session = document.formPortal.session.value;
  //window.location="/pucp/prematri/pmwmatri/jsp/matricula.jsp;jsessionid=" + session;
  //var session = document.formPortal.session.value;
  window.location="/pucp/prematri/pmwmatrc/pmwmatrc;jsessionid=" + session+ "?accion=MostrarInscripcion";

  return;
}

//función para llamar a la nueva aplicación de inscripción
function EnlaceAmpliacionInscripcion( )
{
  var session = document.formPortal.session.value;
  //window.location="/pucp/prematri/pmwmatri/jsp/matricula.jsp;jsessionid=" + session;
  //var session = document.formPortal.session.value;
  window.location="/pucp/prematri/pmwmatrc/pmwmatrc;jsessionid=" + session+ "?accion=IngresarAmpliacionMatricula";

  return;
}

function EnlaceResultadosMatricula(esPopUp){
	
	var session = document.formPortal.session.value;
	var url="/pucp/prematri/pmwmatrc/pmwmatrc;jsessionid=" + session+ "?accion=MostarResultadosMatricula&esPopUp="+esPopUp;
	
	if (esPopUp==1){
		//EnlacePaginaWeb(url);
		createPopupMiddleScreen(url, 'Resultados matrícula', 1000, 600);
	}else{
		window.location=url;
	}
	return;
}

function createPopupMiddleScreen(pageURL, pageTitle, 
        popupWinWidth, popupWinHeight) { 
    var left = (screen.width - popupWinWidth) / 2; 
    var top = (screen.height - popupWinHeight) / 4; 
      
    var myWindow = window.open(pageURL, pageTitle,  
            'resizable=yes, width=' + popupWinWidth 
            + ', height=' + popupWinHeight + ', top=' 
            + top + ', left=' + left); 
}

function descargarArchivo (pCodDocument, pcicloano, pciclo, ptipociclo){
	 
	 var session = document.formPortal.session.value;
	 var aplicacion = "PMWPRINC"
	  window.location="/pucp/prematri/pmwparam/pmwparam;jsessionid=" + session + "?accion=DescargaArchivo&codDocumento="
	  +pCodDocument+"&codAplicacion="+aplicacion+"&cicloAnoInscripcion="+pcicloano+"&cicloInscripcion="+pciclo+"&tipoCicloInscripcion="+ptipociclo;
	  return;

}

function GuiaEstudiante(){
    var form=document.formPortal;
    var session=form.session.value;               
    
    window.location  = "/pucp/pubweb/puwpubli/puwpubli;jsessionid="+session+"?accion=ExplorarDocumentos&indExploracion=3&clave=03&enIntranet=1";
    return;

}


function llamarFuncionEnlaceInscripcion(){
	var urlInscripcion=document.getElementById("urlInscripcion").value;
	llamarFuncion(urlInscripcion);
}

function llamarFuncion(functionName){
	
	executeFunctionByName(functionName, window);
}


function executeFunctionByName(functionName, context /*, args */) {
  var args = Array.prototype.slice.call(arguments, 2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for(var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(context, args);
}
