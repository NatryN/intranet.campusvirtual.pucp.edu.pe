function muestraDocentes(cicloano,ciclo,tipociclo,clavecurso,tipohorario,horario) {
  // la sesion para la ventana
  var sesion = document.formresultado.session.value;
  // link a ser llamado 
  var url = "/pucp/horarios/howcurpr/howcurpr;jsessionid="+sesion+"?accion=MostrarResultadosCursoProfesor";
	url += "&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&clavecurso="+clavecurso;
  if (tipohorario!=null) {
	url += "&tipohorario="+tipohorario;
  }
  if (horario!=null){
	url += "&horario="+horario;
  }
  // se agrega el indicador de que la ventana es emergente
  url += "&ventanaEmergente=1";
  //alert(url);
  // Se quita caracteres raros para poder abrir la ventana
  sesion = sesion.replace(/\-/g, "").replace(/\:/g, "").replace(/_/g, "").replace(/\./g, "");
  // se abre la ventana
  var wBuscarCursos = window.open(url,'VentanaDocentesCurso'+clavecurso+sesion,'location=no,status=yes,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,width=650,height=500,top=25,left=25');
  // el foco
  wBuscarCursos.focus();
}

function leyendaModalidad() {
  // la sesion para la ventana
  var sesion = document.formresultado.session.value;
  // link a ser llamado 
  var url = "/pucp/horarios/jsp/html/LeyendaModalidadDictado.htm;jsessionid="+sesion;
  //alert(url);
  // Se quita caracteres raros para poder abrir la ventana
  sesion = sesion.replace(/\-/g, "").replace(/\:/g, "").replace(/_/g, "").replace(/\./g, "");
  // se abre la ventana
  var wModalidad = window.open(url,'VentanaModalidad'+sesion,'location=no,status=yes,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,width=450,height=350,top=25,left=25');
  // el foco
  wModalidad.focus();
}


//NUEVO PANEL DE CURSOS

//Si reload es 1, la pestaña que se esta activando volverá se cargar tenga o no data
//Si reload es 0, si la pestaña que se esta activando tiene data, no se recargará 
function procesarCambioPestana(tabActivar, tabAnterior, reload){
	if (tabActivar=="tabMatriculado"){
		document.formresultado.sPestana.value="1";
	}
	if (tabActivar=="tabDictando"){
		document.formresultado.sPestana.value="2";
	}
	if (tabActivar=="tabParticipando"){
		document.formresultado.sPestana.value="3";
	}
	if (tabActivar=="tabCursos"){
		document.formresultado.sPestana.value="4";
	}
	if (tabActivar=="tabProcesos"){
		document.formresultado.sPestana.value="5";
	}
	if (tabActivar=="tabPendMatricula"){
		document.formresultado.sPestana.value="6";
	}
	
	actualizaOpciones(tabActivar);
	var tieneData = verificaDataPestana(tabActivar);
	if (!tieneData || reload==1){
		cargaPestana(tabActivar, tabAnterior);
	}
}

function verificaDataPestana(tabActivar){
	var nombreDiv=tabActivar.replace("tab","div");
	var divTabla=$("#"+nombreDiv);
	var tieneData=false;
	$(divTabla).find(".tablaData table").each(function(){
		tieneData=true;
	});
	
	return tieneData;
	
}

function actualizaOpciones(tabActivar){
	var li=null;
	var opcion=null;
	var textoOpcion="";
	
	$(".opcionCabecera.opcionActiva").removeClass("opcionActiva");
	
	if (tabActivar=="tabMatriculado"){
		opcion=$("#opcionTabMatriculado");
		li=$("#liOpcionTabMatriculado");
	}
	if (tabActivar=="tabDictando"){
		opcion=$("#opcionTabDictando");
		li=$("#liOpcionTabDictando");
	}
	if (tabActivar=="tabParticipando"){
		opcion=$("#opcionTabParticipando");
		li=$("#liOpcionTabParticipando");
	}
	if (tabActivar=="tabCursos"){
		opcion=$("#opcionTabCursos");
		li=$("#liOpcionTabCursos");
	}
	if (tabActivar=="tabProcesos"){
		opcion=$("#opcionTabProcesos");
		li=$("#liOpcionTabProcesos");
	}
	if (tabActivar=="tabPendMatricula"){
		opcion=$("#opcionTabPendMatricula");
		li=$("#liOpcionTabPendMatricula");
	}
	
	textoOpcion=$(opcion).text();
	textoOpcion=textoOpcion.toUpperCase();
	
	if ($("#opcionesMenuCurAct").hasClass("sinCaret")){
		$("#opcionesMenuCurAct").html(textoOpcion);
	}else{
		$("#opcionesMenuCurAct").html(textoOpcion + " <span class='caret'></span>");
	}
	
	$(li).addClass("opcionActiva");
}

$(document).on( 'show.bs.tab', 'a[data-toggle="tab"]', function (e) {
	var tabActivar=e.target; // newly activated tab
	var tabAnterior=e.relatedTarget; // previous active tab
	procesarCambioPestana(tabActivar.id, tabAnterior.id, "0");
});


function primeraPestana(){
	var tabAnterior=null;
	var tabActivar=null;
	$('#tabsPublicidad .active a').each(function(){
		tabActivar=$(this)[0].id;
	});
	procesarCambioPestana(tabActivar, tabAnterior,"0");
	
}

function cargaPestana(tabActivar, tabAnterior){
	var urlIn = document.formresultado.action+'?'+$(document.formresultado).serialize();
	//alert(urlIn);
	try{top.mostrarIconoCarga();}catch(e){};
	realizaRequestDataPestana(urlIn, tabActivar, tabAnterior);
}

function realizaCambioPestana(idPestanaActivar){
	var idBusqueda='#'+idPestanaActivar;
	$(idBusqueda).tab('show');
}


function realizaRequestDataPestana(urlIn, tabActivar, tabAnterior){
	
	$.ajax({
          url: urlIn,
          global: false,
          type: 'POST',
          contentType: "charset=utf-8",
          dataType: 'xml',
          async:true,
          cache:false,
          success: function(archXML){
			var result=$(archXML).find('datos');
			var error=result.find('error').text();
			if (error=="0"){
				var codigoHTML="";
				var codigoCabeceraHTML="";
				if (tabActivar=="tabMatriculado"){
					codigoHTML=result.find('tablaMatCurRegulares').text();
					codigoCabeceraHTML=result.find('cabeceraMatCurRegulares').text();
					cambiaPestana(tabActivar, tabAnterior, 'tablaMatriculadoRegulares' ,codigoHTML, codigoCabeceraHTML)
					codigoHTML=result.find('tablaMatCurNoRegulares').text();
					codigoCabeceraHTML=result.find('cabeceraMatCurNoRegulares').text();
					cambiaPestana(tabActivar, tabAnterior, 'tablaMatriculadoNoRegulares' ,codigoHTML,codigoCabeceraHTML)
				}
				if (tabActivar=="tabDictando"){
					codigoHTML=result.find('tablaDicCurRegulares').text();
					codigoCabeceraHTML=result.find('cabeceraDicCurRegulares').text();
					cambiaPestana(tabActivar, tabAnterior, 'tablaDictandoRegulares' ,codigoHTML,codigoCabeceraHTML)
					codigoHTML=result.find('tablaDicCurNoRegulares').text();
					codigoCabeceraHTML=result.find('cabeceraDicCurNoRegulares').text();
					cambiaPestana(tabActivar, tabAnterior, 'tablaDictandoNoRegulares' ,codigoHTML,codigoCabeceraHTML)
				}
				if (tabActivar=="tabParticipando"){
					codigoHTML=result.find('tablaParticipando').text();
					codigoCabeceraHTML=result.find('cabeceraParticipando').text();
					cambiaPestana(tabActivar, tabAnterior, 'tablaParticipando' ,codigoHTML,codigoCabeceraHTML)
				}
				if (tabActivar=="tabCursos"){
					codigoHTML=result.find('tablaAdmCursos').text();
					codigoCabeceraHTML=result.find('cabeceraAdmCursos').text();
					cambiaPestana(tabActivar, tabAnterior, 'tablaAdmCurso' ,codigoHTML,codigoCabeceraHTML)
					codigoHTML=result.find('tablaAdmEspecialidad').text();
					codigoCabeceraHTML=result.find('cabeceraAdmEspecialidad').text();
					cambiaPestana(tabActivar, tabAnterior, 'tablaAdmEspeci' ,codigoHTML,codigoCabeceraHTML)
				}
				if (tabActivar=="tabProcesos"){
					codigoHTML=result.find('tablaAdmProcesos').text();
					codigoCabeceraHTML=result.find('cabeceraAdmProcesos').text();
					cambiaPestana(tabActivar, tabAnterior, 'tablaAdmProcesos' ,codigoHTML,codigoCabeceraHTML)
				}
				if (tabActivar=="tabPendMatricula"){
					codigoHTML=result.find('tablaPendMatricula').text();
					codigoCabeceraHTML=result.find('cabeceraPendMatricula').text();
					cambiaPestana(tabActivar, tabAnterior, 'tablaPendMatricula' ,codigoHTML,codigoCabeceraHTML)
				}
				
				
				try{top.ocultarIconoCarga();}catch(e){};
			}else{
				try{top.ocultarIconoCarga();}catch(e){};
				alert(error);
			}
			
          },
          error:function(request,error){
        	  top.ocultarIconoCarga();  
        	  alert('ocurrió un error inesperado o puede haber perdido sesión, inténtelo más tarde');                        
          }
	});
}


function cambiaPestana(tabActivar, tabAnterior,idDivTabla,codigoHTML,codigoCabeceraHTML){
	var codTabla=replaceAll(replaceAll(replaceAll(codigoHTML,"__%__%", "&"),"%%%%","<"),"====",">");
	var codCabecera=replaceAll(replaceAll(replaceAll(codigoCabeceraHTML,"__%__%", "&"),"%%%%","<"),"====",">");
	cargaDataPestana(tabActivar.replace("tab","div"),idDivTabla,codTabla,codCabecera);
	//if (tabAnterior!=null) borraDataPestana(tabAnterior.replace("tab","div"));
}



function cargaDataPestana(divActivar, idDivTabla, html, cabeceraHtml){
	var nombre='#'+divActivar;
	$(nombre).find('#'+idDivTabla).each(function(){
		$(this).html(html);
	});
	$(nombre).find('#'+idDivTabla.replace("tabla","cabecera")).each(function(){
		$(this).html(cabeceraHtml);
	});
}

function borraDataPestana(divBorrar){
	var nombre='#'+divBorrar;
	$(nombre).find('.table-responsive').each(function(){
		$(this).html("");
	});
	$(nombre).find('.cabeceraTablaData').each(function(){
		$(this).html("");
	});
}

function toggleColumnas(nombreTabla, boton){
	var nombre= "#"+nombreTabla;
	var mostroColumnas="0";
	$(nombre).find(".mostrarOpcionalMovilOculto").each(function(){
		$(this).removeClass("mostrarOpcionalMovilOculto");
		$(this).addClass("mostrarOpcionalMovil");
		mostroColumnas="1";
	});
	if (mostroColumnas=="0"){
		$(nombre).find(".mostrarOpcionalMovil").each(function(){
			$(this).removeClass("mostrarOpcionalMovil");
			$(this).addClass("mostrarOpcionalMovilOculto");
		});
	}
	
	if (mostroColumnas=="0"){ //Cambio boton para que vaya de derecha a Izquieda
		$(boton).removeClass("botonReducir");
		$(boton).addClass("botonExpandir");
	}else{
		//Cambio boton para que vaya de Izquierda a Derecha
		$(boton).removeClass("botonExpandir");
		$(boton).addClass("botonReducir");
	}	
}


function replaceAll(str,search,replacement){
	
	return str.split(search).join(replacement);
}


//función ara mostrar las especialidades de una unidad en un popup
function verCursosEspecialidad(rama, especialidad, etapa, nombreEspecialidad)
{
   var session = document.formresultado.session.value;
   var persona = document.formresultado.persona.value;
   var cmbTipoCicloAdmEspeci = document.formresultado.cmbTipoCicloAdmEspeci;
    
   var urlEspecialidad = "/pucp/ocr/ocwmcurs/ocwmcurs;jsessionid=" + session + "?accion=MostrarCursosEspecialidad&persona=" + persona+"&rama="+rama+"&especialidad="+especialidad+"&etapa="+etapa+"&nombreEspecialidad="+nombreEspecialidad+"&cmbTipoCicloAdmEspeci="+cmbTipoCicloAdmEspeci.options[cmbTipoCicloAdmEspeci.selectedIndex].value;
   var ventana = window.open(urlEspecialidad,'center','width=700,height=600,location=no,status=no,toolbar=no,menubar=no,scrollbars=yes,resizable=no');
   
}

function fbuscarCurso(idInputBusqueda, nombreClase){
	var textoBuscar = $("#"+idInputBusqueda).val().toUpperCase();
	var busquedaClase="."+nombreClase;
	
	$(".encontrado").each(function(){
		$(this).removeClass("encontrado");
	});
	
	$(busquedaClase).each(function(){
		valor= $(this).text().toUpperCase();
		if (valor.split(textoBuscar).length>1){
			$(this).parent( "tr" ).css("display","");
			$(this).parent( "tr" ).addClass("encontrado");
		}else{
			if (!($(this).parent( "tr" ).hasClass("encontrado"))){
				$(this).parent( "tr" ).css("display","none");
			}
		}
	});
}

function padrePanelCursoPersonaCiclo(claveCurso,persona,codCiclo){
	var cicloano="";
	var ciclo="";
	var tipociclo="";
	
	if (codCiclo!=null && codCiclo!=""){
		cicloano=codCiclo.substring(0, 4);
		ciclo=codCiclo.substring(4, 6);
		tipociclo=codCiclo.substring(6, 8);
	}
	
	opener.PanelCursoPersonaCiclo(claveCurso,persona,cicloano,ciclo,tipociclo);
	window.close();
}

