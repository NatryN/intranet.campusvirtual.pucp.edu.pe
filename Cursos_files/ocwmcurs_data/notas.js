<!-- JavaScript del proyecto notas -->

function HistoriaNotas(codigoAlumno)
{
   session = document.formresultado.session.value;
   window.location="/pucp/notas/nowhisno/nowhisno;jsessionid=" + session + "?accion=Ingresar&codigo=" + codigoAlumno;
}

function NotasParcialesAlumno(codigoAlumno,cicloano,ciclo,tipociclo)
{
   session = document.formresultado.session.value;
   window.location="/pucp/notas/nownotpa/nownotpa;jsessionid=" + session + "?accion=Ingresar&codigo=" + codigoAlumno+"&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo;
}

function AlumnosdeCurso(clavecurso,cicloano,ciclo,tipociclo)
{
   session = document.formresultado.session.value;
   window.location="/pucp/notas/nownotfi/nownotfi;jsessionid=" + session + "?accion=Abrir&vernotas=0&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&clavecurso="+clavecurso;
}

function AlumnosdeCursoHorario(clavecurso,cicloano,ciclo,tipociclo,horario)
{
   session = document.formresultado.session.value;
   window.location="/pucp/notas/nownotfi/nownotfi;jsessionid=" + session + "?accion=Abrir&vernotas=0&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&clavecurso="+clavecurso+"&horario="+horario;
}


	function NotasFinalesdeCurso(clavecurso,cicloano,ciclo,tipociclo)
	{
   		session = document.formresultado.session.value;
   		window.location="/pucp/notas/nownotfi/nownotfi;jsessionid=" + session + "?accion=Abrir&vernotas=1&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&clavecurso="+clavecurso;
	}

function NotasParcialesdeCurso(clavecurso,cicloano,ciclo,tipociclo)
	{
   		session = document.formresultado.session.value;
   		window.location="/pucp/notas/nowactpa/nowactpa;jsessionid=" + session + "?accion=Abrir&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&clavecurso="+clavecurso;
	}

function ActasdeNotasdeCurso(codigo,cicloano,ciclo,tipociclo,curso)
	{
   		session = document.formresultado.session.value;
   		window.location="/pucp/notas/nowactas/nowactas;jsessionid=" + session + "?accion=Ingresar&cicloano="+cicloano+"&ciclo="+ciclo+"&tipociclo="+tipociclo+"&codigo="+codigo+"&curso="+curso;
	}