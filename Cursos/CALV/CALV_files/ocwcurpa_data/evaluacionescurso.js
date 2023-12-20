function EvaluacionesCurso()
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
  window.location=ruta;
}

