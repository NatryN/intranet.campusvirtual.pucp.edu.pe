<!-- JavaScript del proyecto prematri -->

function MisProxCursosPersona (codigo,panel)
{
   session = document.formresultado.session.value;
   url = "/pucp/prematri/pmwprcur/pmwprcur;jsessionid=" + session;
   url = url + "?accion=MostrarProximosCursos&persona=" + codigo;
   url = url + "&panel=" + panel;
   window.location=url;
}


function EnlacePaginaWeb(url)
{

  var ventana = window.open(url,'center','width=620,height=500,location=no,status=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes');  
  ventana.focus();
   return;
}

function EnlacePopUp(url,ancho,alto)
{

  var ventana = window.open(url,'center','width='+ancho+',height='+alto+',location=no,status=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes');  
  ventana.focus();
   return;
}
