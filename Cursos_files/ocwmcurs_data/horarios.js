<!-- JavaScript del proyecto horarios -->

function HorariosAula(facultad, ciclo)
{
   session = document.formresultado.session.value;
   "/pucp/general/gewpealu/gewpealu;jsessionid=" + session + "?accion=MostrarResultadosHorariosAula&facultad=" + facultad + "&ciclo=" + ciclo + "&checkClases=1";
}

function HorariosdeCurso(curso, cicloano,ciclo,tipociclo)
{
session = document.formresultado.session.value;
window.location="/pucp/horarios/howcurho/howcurho;jsessionid=" + session + "?accion=MostrarResultadosCursoHor&tiposelec=clave&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&formatedlistacursos="+curso+"&orden=un";	
}

function HorariosdeFacultad(facultad, cicloano,ciclo,tipociclo)
{
session = document.formresultado.session.value;
window.location="/pucp/horarios/howcurho/jsp/EsperaBusqueda.jsp;jsessionid=" + session 
+"?accion=MostrarResultadosCursoHor&cicloano="
+cicloano
+"&ciclo="
+ciclo
+"&tipociclo="
+tipociclo
+"&facultad="
+facultad
+"&rama=&especialidad=&especialidaddescri=&etapa=&etapadescri=&orden=un&tiposelec=uAcad&listacursos=&formatedlistacursos=";
	
}

function EstadisticasCursodeFacultad(facultad, cicloano,ciclo,tipociclo)
{
session = document.formresultado.session.value;
window.location="/pucp/horarios/howcurst/jsp/EsperaBusqueda.jsp;jsessionid=" + session + "?accion=MostrarResultadosCursoEstadisticas&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&facultad="+facultad+"&tiposeleccion=Facultad";	
}

function CursosDictados(docente,cicloano,ciclo,tipociclo)
{
session = document.formresultado.session.value;
window.location="/pucp/horarios/howcurdi/howcurdi;jsessionid=" + session + "?accion=MostrarResultadosCursoDictados&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&tiposeleccion=uAcad&docente="+docente+"&facultad=all&formatednombrecurso=";	
}

function HistoriaDictado(docente)
{
session = document.formresultado.session.value;
window.location="/pucp/horarios/howcurdi/howcurdi;jsessionid=" + session + "?accion=MostrarResultadosCursoDictados&cicloano=all&ciclo=&tipociclo=&tiposeleccion=uAcad&docente="+docente+"&facultad=all&formatednombrecurso=";	
}


function EstadisticaCurso(curso,cicloano,ciclo,tipociclo)
{
session = document.formresultado.session.value;
window.location="/pucp/horarios/howcurst/howcurst;jsessionid=" + session + "?accion=MostrarResultadosCursoEstadisticas&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&tiposeleccion=Clavecurso&formatedlistacursos="+curso;	
}

function EstadisticaCurso(curso,cicloano,ciclo,tipociclo)
{
	session = document.formresultado.session.value;
	window.location="/pucp/horarios/howcurst/howcurst;jsessionid=" + session + "?accion=MostrarResultadosCursoEstadisticas&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&tiposeleccion=Clavecurso&formatedlistacursos="+curso;	

}

function PanelCursoCiclo(clavecurso, cicloano, ciclo, tipociclo)
{
   session = document.formresultado.session.value;
   window.location="/pucp/ocr/ocwcurpa/ocwcurpa;jsessionid=" + session + "?accion=Ingresar&clavecurso=" + clavecurso+ "&cicloano=" +cicloano + "&ciclo=" + ciclo + "&tipociclo=" + tipociclo;
}

function PanelFacultadCiclo(facultad, cicloano, ciclo, tipociclo)
{
   var session = document.formresultado.session.value;
   var enintranet = document.formresultado.enintranet.value;
   window.location="/pucp/general/gewfacul/gewfacul;jsessionid=" + session + "?accion=AbrirPanel&facultad=" + facultad + "&enintranet=" + enintranet+"&enconstruccion=0"+ "&cicloano=" +cicloano + "&ciclo=" + ciclo + "&tipociclo=" + tipociclo ;
}

function AbreVentanaNuevaTamanioNormal(url,MostrarToolbar)
{  
	if (MostrarToolbar == 1){
		var ventana = window.open(url,'center','location=yes,status=yes,toolbar=yes,menubar=yes,scrollbars=yes,resizable=yes'); 
	}else{
		var ventana = window.open(url,'_blank','location=no,status=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes'); 	
	}
    ventana.focus();
    return;
}

function AbreVentanaNueva(pUrl,pMostrarToolbar,pWidht,pHeight)
{  
	if (pMostrarToolbar == 1){
		var ventana = window.open(pUrl,'center','width='+pWidht+',height='+pHeight+',location=yes,status=yes,toolbar=yes,menubar=yes,scrollbars=yes,resizable=yes'); 
	}else{
		var ventana = window.open(pUrl,'_blank','width='+pWidht+',height='+pHeight+',location=no,status=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes'); 	
	}
    ventana.focus();
    return;
}

