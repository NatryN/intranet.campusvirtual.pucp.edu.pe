<!-- JavaScript de la app. ocwcurpa -->

function select_cicloano_change(){
  var cadena = document.formcurso.ComboCiclo.options[document.formcurso.ComboCiclo.selectedIndex].value
  var session    = document.formcurso.session.value;  
  var clavecurso = document.formcurso.clavecurso.value;

  document.formcurso.cicloano.value = cadena.substr(0,4)
  document.formcurso.ciclo.value=cadena.substr(5,2)
  document.formcurso.tipociclo.value=cadena.substr(8,2)

  var cicloano = document.formcurso.cicloano.value;  
  var ciclo = document.formcurso.ciclo.value;  
  var tipociclo = document.formcurso.tipociclo.value;           
  var cSoloVigentes = document.formcurso.cSoloVigentes.value;
 
  try{top.mostrarIconoCarga();}catch(e){};
  
  window.location="/pucp/ocr/ocwcurpa/ocwcurpa;jsessionid="+session+"?accion=Ingresar&clavecurso=" + clavecurso+"&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+ "&cSoloVigentes="+cSoloVigentes;
}

function BuscarCurso( )
{
  var clavecurso = document.formcurso.clavecurso.value;
  window.location="/pucp/ocr/ocwbucur/ocwbucur?accion=Ingresar";
}

function AbrirDetalleCurso( )
{
  var clavecurso = document.formcurso.clavecurso.value;
  window.location="/pucp/ocr/ocwcurde/ocwcurde?accion=Ingresar&clavecurso=" + clavecurso;
}

function DocumentodeCurso( )
{
 var session    = document.formcurso.session.value;
 var clavecurso = document.formcurso.clavecurso.value;
 var indExploracion = '2';
 var indLectura = '1';

window.location="/pucp/pubweb/puwpubli/puwpubli;jsessionid="+session+"?accion=ExplorarDocumentosT&clave="+clavecurso + "&indExploracion=" + indExploracion;
}

function AgendaCurso(b)
{
 var session    = document.formcurso.session.value;
 var clavecurso = document.formcurso.clavecurso.value;
 var cicloano = document.formcurso.cicloano.value;  
 var ciclo = document.formcurso.ciclo.value;  
 var tipociclo = document.formcurso.tipociclo.value;      
 window.location="/pucp/eventos/evwevnts/evwevnts;jsessionid="+session+"?accion=IngresarMiAgenda&curso="+cicloano+ciclo+tipociclo+clavecurso;

// if(b=='1')
//  window.location="/pucp/eventos/evwevnts/evwevnts;jsessionid="+session+"?accion=IngresarMiAgenda&curso="+cicloano+ciclo+tipociclo+clavecurso;
// else {
//  document.formcurso.action="/pucp/ocr/ocwcurpa/jsp/AccionMostrarMensaje.jsp;jsessionid="+session;
//  document.formcurso.submit();
// }
}

function TareasCurso( )
{
 var session    = document.formcurso.session.value;
 var clavecurso = document.formcurso.clavecurso.value;
 var cicloano = document.formcurso.cicloano.value;  
 var ciclo = document.formcurso.ciclo.value;  
 var tipociclo = document.formcurso.tipociclo.value;      
 window.location="/pucp/tareas/tawbutar/tawbutar;jsessionid="+session+"?accion=BuscarTareas&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&clavecurso="+clavecurso+"&indFecha=S&tipocurso=C";
}
function pagina_onload( )
{
 select_cicloano_change()
}

function AbrirNuevoChat()
{  
 var sesion    = document.formcurso.session.value;
 var clavecurso = document.formcurso.clavecurso.value;
 var cicloano   = document.formcurso.cicloano.value;
 var ciclo      = document.formcurso.ciclo.value;
 var tipociclo  = document.formcurso.tipociclo.value;
return "javascript:AbrirGruposChat('" + sesion + "','C*','" + cicloano + "','" + ciclo + "','" + tipociclo + "','" + clavecurso + "')"; 
}

function AGrupos()
{  
 var sesion    = document.formcurso.session.value;
 var clavecurso = document.formcurso.clavecurso.value;
 var cicloano   = document.formcurso.cicloano.value;
 var ciclo      = document.formcurso.ciclo.value;
 var tipociclo  = document.formcurso.tipociclo.value;
return "javascript:VerMisContactos('" + sesion + "','0','C*','" + cicloano + "','" + ciclo + "','" + tipociclo + "','" + clavecurso + "')"; 
}


function AbrirCurriculos( )
{
 var session    = document.formcurso.session.value;
 var clavecurso = document.formcurso.clavecurso.value;

 return "/pucp/ctrlcurr/ccwcurso/ccwcurso;jsessionid=" + session + "?accion=Ingresar&indicaActivo=1&clavecurso=" + clavecurso ;

}

function EquivalenciasdeCurso()
{
 var session    = document.formcurso.session.value;
 var clavecurso = document.formcurso.clavecurso.value;

return "/pucp/ctrlcurr/ccwequiv/ccwequiv;jsessionid="+session+"?accion=Consultar&seleccion=1&cursos="+clavecurso ;
}

function HorariosdeCurso( )
{
 var session    = document.formcurso.session.value;
 var clavecurso = document.formcurso.clavecurso.value;
 var cicloano   = document.formcurso.cicloano.value;
 var ciclo      = document.formcurso.ciclo.value;
 var tipociclo  = document.formcurso.tipociclo.value;

 return "/pucp/horarios/howcurho/howcurho;jsessionid=" + session + "?accion=MostrarResultadosCursoHor&tiposelec=clave&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&formatedlistacursos="+clavecurso+"&orden=un";	
}

function ProfesoresdeCurso( )
{
 var session    = document.formcurso.session.value;
 var clavecurso = document.formcurso.clavecurso.value;
 var cicloano   = document.formcurso.cicloano.value;
 var ciclo      = document.formcurso.ciclo.value;
 var tipociclo  = document.formcurso.tipociclo.value;

 return "/pucp/horarios/howcurpr/howcurpr;jsessionid=" + session + "?accion=MostrarResultadosCursoProfesor&clavecurso="+clavecurso+"&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo;	
}

function AlumnosdeCurso()
{
 var session    = document.formcurso.session.value;
 var clavecurso = document.formcurso.clavecurso.value;
 var cicloano   = document.formcurso.cicloano.value;
 var ciclo      = document.formcurso.ciclo.value;
 var tipociclo  = document.formcurso.tipociclo.value;

 return "/pucp/notas/nownotfi/nownotfi;jsessionid=" + session + "?accion=Abrir&vernotas=0&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&clavecurso="+clavecurso;
}

function FormaCalificacion()
{
 var session    = document.formcurso.session.value;
 var clavecurso = document.formcurso.clavecurso.value;
 var cicloano   = document.formcurso.cicloano.value;
 var ciclo      = document.formcurso.ciclo.value;
 var tipociclo  = document.formcurso.tipociclo.value;

 return "/pucp/notas/nowevalu/nowevalu;jsessionid=" + session + "?accion=AbrirFormula&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&curso="+clavecurso;
}

function NotasFinalesdeCurso()
{
 var session    = document.formcurso.session.value;
 var clavecurso = document.formcurso.clavecurso.value;
 var cicloano   = document.formcurso.cicloano.value;
 var ciclo      = document.formcurso.ciclo.value;
 var tipociclo  = document.formcurso.tipociclo.value;
 var codigo     = document.formcurso.codigo.value;
 var tipoCurso  = document.formcurso.tipocurso.value;
 
 return "/pucp/notas/nownotfi/nownotfi;jsessionid=" + session + "?accion=Abrir&vernotas=1&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&clavecurso="+clavecurso+"&codigodocente="+codigo+"&tipocurso="+tipoCurso;
}

function NotasParcialesdeCurso()
{
 var session    = document.formcurso.session.value;
 var clavecurso = document.formcurso.clavecurso.value;
 var cicloano   = document.formcurso.cicloano.value;
 var ciclo      = document.formcurso.ciclo.value;
 var tipociclo  = document.formcurso.tipociclo.value;
 var codigo     = document.formcurso.codigo.value;

 return "/pucp/notas/nowactpa/nowactpa;jsessionid=" + session + "?accion=Abrir&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&clavecurso="+clavecurso+"&codigodocente="+codigo;
}

function ActasdeNotasdeCurso()
{
 var session    = document.formcurso.session.value;
 var codigo     = document.formcurso.codigo.value;
 var clavecurso = document.formcurso.clavecurso.value;
 var cicloano   = document.formcurso.cicloano.value;
 var ciclo      = document.formcurso.ciclo.value;
 var tipociclo  = document.formcurso.tipociclo.value;

 return "/pucp/notas/nowactas/nowactas;jsessionid=" + session + "?accion=Ingresar&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&codigo="+codigo+"&curso="+clavecurso;
}

function RegistrodeActasdeNotas()
{
 var session    = document.formcurso.session.value;
 var codigo     = document.formcurso.codigo.value;
 var clavecurso = document.formcurso.clavecurso.value;
 var cicloano   = document.formcurso.cicloano.value;
 var ciclo      = document.formcurso.ciclo.value;
 var tipociclo  = document.formcurso.tipociclo.value;
 var tipocurso 	= document.formcurso.tipocurso.value; 
 var nombreCurso = document.formcurso.nombreCurso.value;
 var accion = "R";
  
 if(tipocurso == "18"){
	 return "/pucp/ocr/ocwsegba/ocwsegba;jsessionid=" + session + "?accion=AccionEditarTrabajoInvestigacion&clavecurso=" + clavecurso+"&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo;
  }
 else{
	 return "/pucp/notas/nowracta/nowracta;jsessionid=" + session + "?accion=Ingresar&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&codigo="+codigo+"&curso="+clavecurso;
 }
}

function RecalificacionRegistro()
{
  var session    = document.formcurso.session.value;
  var clavecurso = document.formcurso.clavecurso.value;
  var cicloano   = document.formcurso.cicloano.value;
  var ciclo      = document.formcurso.ciclo.value;
  var tipociclo  = document.formcurso.tipociclo.value;
  var codigo     = document.formcurso.codigo.value;

  return "/pucp/notas/nowsreca/nowsreca;jsessionid=" + session + "?accion=IngresarSolicitudRecalificacion&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&clavecurso="+clavecurso;
}

function RecalificacionConsulta()
{
  var session    = document.formcurso.session.value;
  var clavecurso = document.formcurso.clavecurso.value;
  var cicloano   = document.formcurso.cicloano.value;
  var ciclo      = document.formcurso.ciclo.value;
  var tipociclo  = document.formcurso.tipociclo.value;
  var codigo     = document.formcurso.codigo.value;

  return "/pucp/notas/nowsreca/nowsreca;jsessionid=" + session + "?accion=ConsultarSolicitudRecalificacion&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&clavecurso="+clavecurso;
}

function EstadisticasdeCurso()
{
 var session    = document.formcurso.session.value;
 var clavecurso = document.formcurso.clavecurso.value;
 var cicloano   = document.formcurso.cicloano.value;
 var ciclo      = document.formcurso.ciclo.value;
 var tipociclo  = document.formcurso.tipociclo.value;

 return "/pucp/estadist/eswcurst/eswcurst;jsessionid=" + session + "?accion=MostrarResultadosCursoEstadisticas&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&tiposeleccion=Clavecurso&formatedlistacursos="+clavecurso;
// return "/pucp/horarios/howcurst/howcurst;jsessionid=" + session + "?accion=MostrarResultadosCursoEstadisticas&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&tiposeleccion=Clavecurso&formatedlistacursos="+clavecurso;
}

function EstadisticasdeCursoEspeci()
{
 var session    = document.formcurso.session.value;
 var clavecurso = document.formcurso.clavecurso.value;
 var cicloano   = document.formcurso.cicloano.value;
 var ciclo      = document.formcurso.ciclo.value;
 var tipociclo  = document.formcurso.tipociclo.value;

return "/pucp/estadist/eswexcur/eswexcur;jsessionid=" + session + "?accion=MostrarResultadosExCur&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&tiposeleccion=Clavecurso&formatedlistacursos="+clavecurso;
// return "/pucp/horarios/howexcur/howexcur;jsessionid=" + session + "?accion=MostrarResultadosExCur&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&tiposeleccion=Clavecurso&formatedlistacursos="+clavecurso; 
}

function EncuestaDocente()
{
  var session    = document.formcurso.session.value;
  var clavecurso = document.formcurso.clavecurso.value;
  var cicloano   = document.formcurso.cicloano.value;
  var ciclo      = document.formcurso.ciclo.value;
  var tipociclo  = document.formcurso.tipociclo.value;
  var codigo     = document.formcurso.codigo.value;

  return "/pucp/estadist/eswenpro/eswenpro;jsessionid=" + session + "?accion=MostrarPrevio&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&clavecurso="+clavecurso;
}

function ActualizacionHorarioEncuesta()
{
  var session    = document.formcurso.session.value;
  var clavecurso = document.formcurso.clavecurso.value;
  var cicloano   = document.formcurso.cicloano.value;
  var ciclo      = document.formcurso.ciclo.value;
  var tipociclo  = document.formcurso.tipociclo.value;
  var codigo     = document.formcurso.codigo.value;
  
  return "/pucp/estadist/eswfisdo/eswfisdo;jsessionid=" + session + "?accion=AgregarHorarioDocCursoAct&cicloAnho=" + cicloano + "&ciclo=" + ciclo + "&tipociclo=" + tipociclo + "&clavecurso=" + clavecurso;
}

function loginForo()
{
  var clavecurso = document.formcurso.clavecurso.value;  
  var usuario = document.formcurso.usuario.value;  
  return "http://foro.pucp.edu.pe/?cod_usuario=" + usuario + "&curso=" + clavecurso;  
}

function loginChat()
{
  var clavecurso = document.formcurso.clavecurso.value;  
  var usuario = document.formcurso.usuario.value;  
  return "http://chat.pucp.edu.pe/?cod_usuario=" + usuario + "&curso=" + clavecurso;  
}  

// Pedido por Gino Ravelo - Silabo de curso
function SilaboDeCurso()
{
 var session    = document.formcurso.session.value;
 var clavecurso = document.formcurso.clavecurso.value;
 var cicloano = document.formcurso.cicloano.value;  
 var ciclo = document.formcurso.ciclo.value;  
 var tipociclo = document.formcurso.tipociclo.value;      
 return "/pucp/ocr/ocwproga/ocwproga;jsessionid="+session+"?accion=Buscar"+
     "&curso="+clavecurso+"&cicloAcad="+cicloano+ciclo+tipociclo+
    "&accionPA=06&indUbicacion=4";
}

//Asistencia
function TomarAsistencia()
{
 var session    = document.formcurso.session.value;
 var clavecurso = document.formcurso.clavecurso.value;
 var cicloano = document.formcurso.cicloano.value;  
 var ciclo = document.formcurso.ciclo.value;  
 var tipociclo = document.formcurso.tipociclo.value;      
 return "/pucp/asisalum/aswtmalu/aswtmalu;jsessionid="+session+"?accion=ConsultarSesion"+
     "&clavecurso="+clavecurso+"&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+
    "&tipoCurso=R";
}


function AsistenciaxAlumno()
{
	var session = document.formcurso.session.value;
	var clavecurso = document.formcurso.clavecurso.value;
	var cicloano = document.formcurso.cicloano.value;  
	var ciclo = document.formcurso.ciclo.value;  
	var tipociclo = document.formcurso.tipociclo.value;
 	return "/pucp/asisalum/aswtmalu/aswtmalu;jsessionid="+session+"?accion=ObtenerAlumno"+
			"&clavecurso="+clavecurso+"&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+
			"&tipoCurso=R";
}

function Estadistica()
{
	var session = document.formcurso.session.value;
	var clavecurso = document.formcurso.clavecurso.value;
	var cicloano = document.formcurso.cicloano.value;  
	var ciclo = document.formcurso.ciclo.value;  
	var tipociclo = document.formcurso.tipociclo.value;
 	return "/pucp/asisalum/aswtmalu/aswtmalu;jsessionid="+session+"?accion=Estadistica"+
			"&clavecurso="+clavecurso+"&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+
			"&tipoCurso=R";
}

/*function InscritosPractica()
{
	var session = document.formcurso.session.value;
	var clavecurso = document.formcurso.clavecurso.value;
	var cicloano = document.formcurso.cicloano.value;  
	var ciclo = document.formcurso.ciclo.value;  
	var tipociclo = document.formcurso.tipociclo.value;
	return "/pucp/jefprac/jpwadmin/jpwadmin;jsessionid="+session+"?accion=BuscarConsulta&tipoBusqueda=C&cicloSel="+
			cicloano+ciclo+tipociclo+"&detalladoHorario=D&mostrar=I&cursosBusqueda="+clavecurso;
 	//return "/pucp/jefprac/jpwadmin/jpwadmin;jsessionid="+session+"?accion=BuscarConsulta&tipoBusqueda=C&cicloSel="+
	//		cicloano+ciclo+tipociclo+"&detalladoHorario=D&mostrar=S&cursosBusqueda="+clavecurso;
}*/

function AtencionReclamoNotas()
{
	var session = document.formcurso.session.value;
	var clavecurso = document.formcurso.clavecurso.value;
	var cicloano = document.formcurso.cicloano.value;  
	var ciclo = document.formcurso.ciclo.value;  
	var tipociclo = document.formcurso.tipociclo.value;
	return "/pucp/notas/nowsolre/nowsolre;jsessionid=" + session + "?accion=Consultar&cicloAno="+cicloano+"&ciclo="+
	ciclo+"&tipoCiclo="+tipociclo+"&claveCurso="+clavecurso;

}

function InscripcionJefePractica()
{
	var session = document.formcurso.session.value;
	return "/pucp/jefprac/jpwins/jpwins;jsessionid="+session+"?accion=MostrarInscripcion";
}

function SeleccionJefePractica()
{
	var session = document.formcurso.session.value;
	var clavecurso = document.formcurso.clavecurso.value;
	var cicloano = document.formcurso.cicloano.value;  
	var ciclo = document.formcurso.ciclo.value;  
	var tipociclo = document.formcurso.tipociclo.value;
	return "/pucp/jefprac/jpwadmin/jpwadmin;jsessionid="+session+"?accion=BuscarConsulta&tipoBusqueda=C&cicloSel="+
			cicloano+ciclo+tipociclo+"&detalladoHorario=D&mostrar=I&cursosBusqueda="+clavecurso;
 	//return "/pucp/jefprac/jpwadmin/jpwadmin;jsessionid="+session+"?accion=BuscarConsulta&tipoBusqueda=C&cicloSel="+
	//		cicloano+ciclo+tipociclo+"&detalladoHorario=D&mostrar=S&cursosBusqueda="+clavecurso;
}

function InscritosJefePractica()
{
	var session = document.formcurso.session.value;
	var clavecurso = document.formcurso.clavecurso.value;
	var cicloano = document.formcurso.cicloano.value;  
	var ciclo = document.formcurso.ciclo.value;  
	var tipociclo = document.formcurso.tipociclo.value;		
	return "/pucp/jefprac/jpwadmin/jpwadmin;jsessionid="+session+"?accion=BusquedaCursoAdmin&cicloSel="+cicloano+ciclo+tipociclo+"&curso="+clavecurso+"&cicloAno="+cicloano+"&ciclo="+ciclo+"&tipoCiclo="+tipociclo+"&flagPanelCurso=1";
}

function AbrirInformacionGeneral( ){
 var session    = document.formcurso.session.value;
 var clavecurso = document.formcurso.clavecurso.value;

 return "/pucp/ocr/ocwinfcur/ocwinfcur;jsessionid=" + session + "?accion=ConsultarAsignaturaPropuesta&indicaActivo=1&clavecurso=" + clavecurso ;

}

 //Asistencia Responsive
 function TomarAsistenciaResponsive()
 {
	  var session    = document.formcurso.session.value;
	  var clavecurso = document.formcurso.clavecurso.value;
	  var cicloano = document.formcurso.cicloano.value;  
	  var ciclo = document.formcurso.ciclo.value;  
	  var tipociclo = document.formcurso.tipociclo.value;

	  var prop = "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=550,height=600"; 
	   var url = "/pucp/asisalum/aswtmalu/aswtmalu;jsessionid=" + session + "?accion=AsistenciaResponsive"+
	"&clavecurso="+clavecurso+"&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+
	"&tipoCurso=R&indMovil=1";

	  var prop = "width="+ (screen.width-screen.width/3) + ",height=" + (screen.height-screen.height/3) + ",left=" + (((screen.width)-(screen.width-screen.width/3))/2) + ",top=" + (((screen.height) -(screen.height-screen.height/3))/2)+",toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes";
	  window.open(url,"Asistencia_Móvil",prop);
  }
 
 $(document).ready(function(){
	  //////////////////////////////////////////////////////////////
	  // Funciones para expandir o contraer todos los paneles
	  ////////////////////////////////////////////////////////////
	  // Expandir todos los paneles	
	  $("#ExpandirTodasOpciones").click(function(){
	   	//Expandir el panel de Sumilla y características generales
			if (($("#a-Caracteristicas").hasClass('collapsed'))) {
				$( "#a-Caracteristicas" ).click();
	    	}
		
	    //Expandir panel de Herramientas académicas del ciclo	
			if (($("#a-ApoyoDictado").hasClass('collapsed'))) {
				$( "#a-ApoyoDictado" ).click();
	    	}
		
		//Expandir panel de Programa para el ciclo
			if (($("#a-Informacion").hasClass('collapsed'))) {
				$( "#a-Informacion" ).click();
	    	}
	    
	    //Expandir panel de Notas y estadísticas en el ciclo
			if (($("#a-Notas").hasClass('collapsed'))) {
				$( "#a-Notas" ).click();
	    	}
			
		//Expandir panel de Jefes de práctica
			if (($("#a-Jefatura").hasClass('collapsed'))) {
				$( "#a-Jefatura" ).click();
	    	}
		    
		//Expandir panel de Anuncios
			if (($("#a-Anuncios").hasClass('collapsed'))) {
				$( "#a-Anuncios" ).click();
	    	}
		})
		
		//Contraer todos los paneles	
	    $("#ContraerTodasOpciones").click(function(){
	    //Contraer panel de Sumilla y características generales
	    	if (!$("#a-Caracteristicas").hasClass('collapsed')) {
	    		$( "#a-Caracteristicas" ).click();
	    	}
		//Contraer panel de Herramientas académicas del ciclo
			if (!$("#a-ApoyoDictado").hasClass('collapsed')) {
	    		$( "#a-ApoyoDictado" ).click();
	    	}
	    
		//Contraer panel de Programa para el ciclo
		    if (!$("#a-Informacion").hasClass('collapsed')) {
	    		$( "#a-Informacion" ).click();
	    	}
		//Contraer panel de Notas y estadísticas en el ciclo
		    if (!$("#a-Notas").hasClass('collapsed')) {
	    		$( "#a-Notas" ).click();
	    	}
		//Contraer panel de Jefes de práctica
		    if (!$("#a-Jefatura").hasClass('collapsed')) {
	    		$( "#a-Jefatura" ).click();
	    	}
		//Contraer panel de Anuncios
		    if (!$("#a-Anuncios").hasClass('collapsed')) {
	    		$( "#a-Anuncios" ).click();
	    	}
		})
	});
 
 function select_checkVigentes_change(){
	  var cadena = document.formcurso.ComboCiclo.options[document.formcurso.ComboCiclo.selectedIndex].value
	  var session    = document.formcurso.session.value;  
	  var clavecurso = document.formcurso.clavecurso.value;
	  var checkSoloVigentes = document.formcurso.checkSoloVigentes.checked; 
	  
	  if (checkSoloVigentes)
		  document.formcurso.cSoloVigentes.value = "1";
	  else
		  document.formcurso.cSoloVigentes.value = "0";

	  var cicloano = document.formcurso.cicloano.value;  
	  var ciclo = document.formcurso.ciclo.value;  
	  var tipociclo = document.formcurso.tipociclo.value;
	  var cSoloVigentes = document.formcurso.cSoloVigentes.value;
	  
	  try{top.mostrarIconoCarga();}catch(e){};
	  
	  window.location="/pucp/ocr/ocwcurpa/ocwcurpa;jsessionid="+session+"?accion=Ingresar&clavecurso=" + clavecurso+"&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+ "&cSoloVigentes="+cSoloVigentes;
	}
 
 function registrarExamenOralPanel(){
	 
	 var session = document.formcurso.session.value;
	 var clavecurso = document.formcurso.clavecurso.value;
	 var cicloano = document.formcurso.cicloano.value;  
	 var ciclo = document.formcurso.ciclo.value;  
	 var tipociclo = document.formcurso.tipociclo.value;
	 
	 return "/pucp/servacad/sevadmin/sevadmin;jsessionid=" + session + "?accion=BuscarExamenOral&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&clavecurso="+clavecurso+"&indRegistro=1";
 }
 
 
 function inscripcionExamenOralPanel(){
	 
	 var session = document.formcurso.session.value;
	 var clavecurso = document.formcurso.clavecurso.value;
	 var cicloano = document.formcurso.cicloano.value;  
	 var ciclo = document.formcurso.ciclo.value;  
	 var tipociclo = document.formcurso.tipociclo.value;
	 
	 return "/pucp/servacad/sevinscr/sevinscr;jsessionid=" + session + "?accion=ListarExamenesOrales&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&clavecurso="+clavecurso;
 }
 