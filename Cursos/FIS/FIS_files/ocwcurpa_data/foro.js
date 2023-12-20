<!-- JavaScript para acceder al foro-->

function foroCurso()
{
  var form = document.formcurso;
  var session = form.session.value;
  var clavecurso = form.clavecurso.value;
  var cicloano = form.cicloano.value;
  var ciclo = form.ciclo.value;
  var tipociclo = form.tipociclo.value;
  var ruta ="/pucp/foro/fowtema/fowtema;jsessionid=" + session + "?accion=Ingresar";
  ruta = ruta + "&clavecurso=" + clavecurso;
  ruta = ruta + "&cicloano=" + cicloano + "&ciclo=" + ciclo + "&tipociclo=" + tipociclo;
  window.location=ruta;
}

function foroProceso()
{
  var form = document.formPanelInscripcion;
  var session = form.session.value;
  var tipoproceso = form.psSubTipo.value;
  var identificaproceso = form.psIdentifica.value;
  var ruta ="/pucp/foro/fowtema/fowtema;jsessionid=" + session + "?accion=Ingresar";  
  ruta = ruta + "&tipoproceso=" + tipoproceso + "&identificaproceso=" + identificaproceso;
  window.location=ruta;
}

function foroInscrito()
{
  var form = document.formPanelInscripcion;
  var session = form.session.value;
  var tipoproceso = form.tipoproceso.value;
  var identificaproceso = form.identificaproceso.value;
  var ruta ="/pucp/foro/fowtema/fowtema;jsessionid=" + session + "?accion=Ingresar";    
  ruta = ruta + "&tipoproceso=" + tipoproceso + "&identificaproceso=" + identificaproceso;
  window.location=ruta;
}

function Ingresarforo(session,grupo)
{
//  var session = form.session.value;
  var ruta ="/pucp/foro/fowtema/fowtema;jsessionid=" + session + "?accion=Ingresar";    
  ruta = ruta + "&grupo=" + grupo;
  window.location=ruta;
}
