function chatLink(sesion, grupoNumero)
{
/*
  // Verificamos que no se use el navegador Netscape 4.x
  var name = navigator.appName;
  var vers = navigator.appVersion;
  vers = vers.substring(0,1); // or 0,4  could return 4.5 instead of just 4

  if (name == "Netscape" && vers == '4') 
    //alert("Para cargar el Chat PUCP debe usar uno de estos navegadores:\n- Internet Explorer 5.0 o superior.\n- Netscape 6.0 o superior.");
    alert("Para cargar el Chat PUCP en un navegador Netscape debe utilizar una versión 6.0 o mayor.");
  else
*/
  
    window.open(
	"/pucp/chat/jsp/ChatPucpClient.jsp;jsessionid="+sesion+"?grupoNumero="+grupoNumero, 
	"ChatPucpFrame", 
	"location=no,status=no,resizable=no,toolbar=no,scrollbars=no,top=0,left=0,width=0,height=0",
	1 );  
  
}
