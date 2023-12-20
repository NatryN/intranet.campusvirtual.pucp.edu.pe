function loginForo(usuario, curso)
{
  var d = new Date();
  window.open("http://foro.pucp.edu.pe/?cod_usuario=" + usuario + "&curso=" + curso , "loginForo" + d.valueOf(), "status=yes,resizable=yes,toolbar=yes,scrollbars=yes,top=0,left=0,width=790,height=525",1);  
}

function loginChat(usuario, curso)
{
  var d = new Date();
  window.open("http://chat.pucp.edu.pe/?cod_usuario=" + usuario + "&curso=" + curso, "loginChat" + d.valueOf(), "status=yes,resizable=yes,toolbar=no,scrollbars=yes,top=0,left=0,width=790,height=450",1);  
}  

function cargarTutorial()
{
    window.open("http://agora.pucp.edu.pe/tutorial/campusvirtual/inicio.php", "tutorial", "status=1,resizable=1,toolbar=1,scrollbars=1,menubar=0,top=50,left=50,width=1100,height=700", 1 ).focus();    
}

function cargarTutorialIdiomas()
{
    window.open("http://idiomas.pucp.edu.pe/matricula/extranet-idiomas/", "tutorial", "status=no,resizable=yes,toolbar=yes,scrollbars=yes,menubar=yes,top=10,left=0,width=790,height=490", 1 ).focus();    
}

function cargarPoliticasIdiomas(sesion) {
    window.open("/pucp/idiomas/idwpdptc/jsp/Politicas.jsp;jsessionid=" + sesion, "politicasIdiomas", "status=yes,resizable=yes,toolbar=no,scrollbars=yes,top=0,left=0,width=600,height=550", 1).focus();
}

function crearNuevaVentanaIntranet()
{
  var d = new Date();
  window.open(
	top.location.href, 
	"login" + d.valueOf(), 
	"location=no,status=yes,resizable=yes,toolbar=yes,scrollbars=yes,width=790,height=520",
  false );  
}

function getInternetExplorerVersion_SAG() {    
  var rv = -1; // Return value assumes failure.    
  if (navigator.appName == 'Microsoft Internet Explorer') {
    var ua = navigator.userAgent;
    var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
       rv = parseFloat(RegExp.$1);    
  }    
  return rv;
}

function cargarSAG(sesion)
{
  urlSAG="/pucp/estadist/sagpucp/sagpucp;jsessionid=" + sesion + "?accion=IngresarMSTR";
  sesion = sesion.replace(/\-/g, "").replace(/\:/g, "").replace(/_/g, "").replace(/\./g, "");
  wSAG = window.open(urlSAG, "SAG"+sesion, "width=760,height=500,status=yes,resizable=yes,toolbar=yes,scrollbars=yes,left=20,top=20",false);  
/*
  var ver = getInternetExplorerVersion_SAG();
  if (ver >= 8.0)
    window.open("/pucp/estadist/sagpucp/jsp/AvisoSAG.jsp", "AvisoSAG", "status=no,resizable=no,toolbar=no,scrollbars=no,top=0,left=45,width=650,height=700", 1).focus();  
*/
}

function cerrarSesion(sesion)
{
  top.location="/pucp/usuarios/uswlogin/uswlogin;jsessionid=" + sesion + "?accion=CerrarSesion";
}

function refrescarFrameSuperior()
{
  window.top.frames[0].location=window.top.frames[0].location;
}

function cargarNormasCorreo()
{
    window.open("http://www.dirinfo.pucp.edu.pe/normasCorreo.htm", "normasCorreo", "status=yes,resizable=yes,toolbar=yes,scrollbars=yes,menubar=yes,top=10,left=0,width=790,height=490", 1 ).focus();    
}