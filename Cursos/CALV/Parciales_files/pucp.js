<!-- JavaScript del sistema PUCP -->
var wGPUCP = null;

function Cierre()
{
   //window.close();
   top.close();
   //return true;
}

function pucpAlert(msg)
{
  alert("Mensaje desde el Campus Virtual PUCP: " + msg); 
  return; 
}

function mostrarHoraPUCP()
{
  var propiedades = "width=155,height=120,menubar=no,status=no,resizable=no,toolbar=no,scrollbars=no,left=338,top=230";
  var w = window.open("/pucp/lib/jsp/PucpHora.jsp", "PucpHora", propiedades,false);
  w.focus();
}

function mostrarCorreoGPUCP(sesion)
{ 
  if (wGPUCP && !wGPUCP.closed){
    //wGPUCP.focus();
	wGPUCP.blur();
  }else{
    sesion = sesion.replace(/\-/g, "").replace(/\:/g, "").replace(/_/g, "").replace(/\./g, "");
    wGPUCP = window.open("http://mail.google.com/a/pucp.pe", "CorreoGPUCP"+sesion, "width=800,height=540,status=yes,resizable=yes,toolbar=yes,scrollbars=yes,left=10,top=0",false);  
  } 
  wGPUCP.focus();
}