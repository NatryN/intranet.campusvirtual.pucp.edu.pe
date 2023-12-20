//Para los enlaces de evaluaciones y encuestas dentro del panel del Curso

function EvaluacionesDelCurso()
{
  var doc = document.formcurso;
  var session = doc.session.value;
  var codigo = doc.codigo.value;
  var clavecurso = doc.clavecurso.value;
  var cicloano = doc.cicloano.value;
  var ciclo = doc.ciclo.value;
  var tipociclo = doc.tipociclo.value;
  var ruta ="/pucp/evaldist/edwevalu/edwevalu;jsessionid=" + session + "?accion=Ingresar";
  ruta = ruta + "&codigo=" + codigo;
  ruta = ruta + "&cicloano=" + cicloano + "&ciclo=" + ciclo + "&tipociclo=" + tipociclo;
  ruta = ruta + "&clavecurso=" + clavecurso;
  ruta = ruta + "&tipoevaluacion=P";
  window.location=ruta;
}

function EncuestasDelCurso()
{
  var doc = document.formcurso;
  var session = doc.session.value;
  var codigo = doc.codigo.value;
  var clavecurso = doc.clavecurso.value;
  var cicloano = doc.cicloano.value;
  var ciclo = doc.ciclo.value;
  var tipociclo = doc.tipociclo.value;
  var ruta ="/pucp/evaldist/edwevalu/edwevalu;jsessionid=" + session + "?accion=Ingresar";
  ruta = ruta + "&codigo=" + codigo;
  ruta = ruta + "&cicloano=" + cicloano + "&ciclo=" + ciclo + "&tipociclo=" + tipociclo;
  ruta = ruta + "&clavecurso=" + clavecurso;
  ruta = ruta + "&tipoevaluacion=E";
  window.location=ruta;
}

//Para los enlaces de evaluaciones y encuestas dentro del panel de Procesos

function EvaluacionesDelProceso()
{
	  var doc = document.forms[0];
	  var session = doc.session.value;
	  var codigo = doc.codigo.value;
	// var codigo = doc.personaconsultada.value;
	  var tp = doc.tipoproceso.value;
	  var ip = doc.identificaproceso.value;
	  
	  var ruta;
	  /****Prueba encuestas especializadas*****/
	  if (tp=='077')
	  		ruta ="/pucp/encespec/eswenejc/eswenejc;jsessionid=" + session + "?accion=IngresarEncuestas";
	  else	{
		  ruta ="/pucp/evaldist/edwevalu/edwevalu;jsessionid=" + session + "?accion=Ingresar";
		  ruta = ruta + "&tipoevaluacion=P";  
	  }
	  /************Fin************************/
	  
	  ruta = ruta + "&codigo=" + codigo;
	  ruta = ruta + "&tipoproceso=" + tp + "&identificaproceso=" + ip;	  
	  
	  window.location=ruta;	
}

function EncuestasDelProceso()
{
	  var doc = document.forms[0];
	  var session = doc.session.value;
	  var codigo = doc.codigo.value;
	// var codigo = doc.personaconsultada.value;
	  var tp = doc.tipoproceso.value;
	  var ip = doc.identificaproceso.value;
	  
	  var ruta;
	  /****Prueba encuestas especializadas*****/
	  if (tp=='077')
	  		ruta ="/pucp/encespec/eswenejc/eswenejc;jsessionid=" + session + "?accion=IngresarEncuestas";
	  else	{
		  ruta ="/pucp/evaldist/edwevalu/edwevalu;jsessionid=" + session + "?accion=Ingresar";
		  ruta = ruta + "&tipoevaluacion=E";  
	  }
	  /************Fin************************/
	  
	  ruta = ruta + "&codigo=" + codigo;
	  ruta = ruta + "&tipoproceso=" + tp + "&identificaproceso=" + ip;	  
	  
	  window.location=ruta;	
}