<!-- JavaScript del proyecto general -->

function PanelPersona(codigo)
{
   session = document.formresultado.session.value;
   window.location="/pucp/general/gewpealu/gewpealu;jsessionid=" + session + "?accion=AbrirPanel&codigo=" + codigo;
}

function PanelCual(codigo)
{
   session = document.formresultado.session.value;
   window.location="/pucp/general/gewpealu/gewpealu;jsessionid=" + session + "?accion=ElegirPanel&codigo=" + codigo;
}

function SeteaCiclo(){
  var doc = document.formpanel;
  var cadena =  doc.cmbCiclo.options[doc.cmbCiclo.selectedIndex].value;
  doc.CicloAno.value=cadena.substr(0,4);
  doc.Ciclo.value=cadena.substr(4,2);
  doc.TipoCiclo.value=cadena.substr(6,2);
}


