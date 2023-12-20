$(function() {	
	if(navigator.userAgent.match(/(iPad|iPhone|iPod)/g))
	{
		$('head').append('<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0">');
		$('.page-content-wrapper').addClass("ios-scroll");
	}
	else
	{
		$('head').append('<meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0">');
		
	}

  $("#wrapper").css("padding-top",""+$("#header").height()+"px");    
  $("#menu-toggle").click(function(){
	toggleMenu();  
  });
	$("#page-content-wrapper").css("height",($(window).height()-$("#header").height())+"px")	
	$("#sidebar-wrapper").css("height",($(window).height()-$("#header").height())+"px")
	$("#frame_mid").css("height",($(window).height()-$("#header").height())+"px")
	$("#frame_mid").css("width",($(window).width()+"px"))
	$(".pucpNombreUsuario").css("max-width",($(".pucpDatosUsuario").width()-$("#menu-toggle").width()-10)+"px");
	
	$("#frame_mid").on("load",function(){
		activarMenu();
		ocultarIconoCarga();
		stoptTime();
	});
	
	if($(window).width() <= 767)
	{
		$(".pucpNombreUsuario").css("max-width",($(".pucpDatosUsuario").width()-$("#menu-toggle").width()-11-10)+"px");
		$.getScript( "/pucp/lib/framework/jquery.mobile/1.4.5/js/jquery.mobile-1.4.5.min.js" )
		.done(function( script, textStatus ) {
			  $(".menuNavPrincipal").on( "swipeleft", function(event){
				hideMenu();				  
			  } );			  
		 })
		.fail(function( jqxhr, settings, exception ) {
			alert("Error");
		});					
	} else {
		$("#frame_mid").on("load",function(){
			var iframe_body = window.frame_mid.document.getElementsByTagName("body")[0];
			$(iframe_body).click(function(event) {
				var target = $(event.target);
				if (!target.parents('.sidebar-wrapper').length && !target.parents('#header').length) {
					hideMenu();			
					}
			});	
		});
		
		$('[data-toggle="tooltip"]').tooltip(); 
	   
	}
});

var enableMenu=true;

$( window ).resize(function() {	
  $("#wrapper").css("padding-top",""+$("#header").height()+"px");
  $("#page-content-wrapper").css("height",($(window).height()-$("#header").height())+"px")
  $("#sidebar-wrapper").css("height",($(window).height()-$("#header").height())+"px")
  $("#frame_mid").css("height",($(window).height()-$("#header").height())+"px")
  $("#frame_mid").css("width",($(window).width()+"px"))
  $(".pucpNombreUsuario").css("max-width",($(".pucpDatosUsuario").width()-$("#menu-toggle").width()-10)+"px");
});

$.fn.overflown=function(){
	var e=this[0];
	return e.scrollHeight>e.clientHeight||e.scrollWidth>e.clientWidth;
	}
	
function actualizarIframe(URL){	
	if(enableMenu) {
		var bool=true;
		if(verificarDisponibilidadIdioma(this.id) && getIdiomaActual()!='es'){
			bool=obtenerRespuestaDisponibilidadIdioma();		
		}
		if(bool){
			mostrarIconoCarga();	
			desactivarMenu();
			$('#frame_mid').attr('src',URL);	
			hideMenu()
			setTimeout(function(){activarMenu();}, 2000); 
		}					
	}	
}

function panelCursoLinkMenuBeta(session, usuario, tipogrupo, nombreid)
{
  //variables por obtener
  sTipoGrupo = new String(Trim(tipogrupo)).toUpperCase();
  sNombreid = Trim(nombreid);
  sUsuario = new String(Trim(usuario)).toUpperCase();
  sClaveCurso = "";
  sTipoProceso = "";
  sIdentificaProceso = "";
  sCicloano = "";
  sCiclo = "";
  sTipoCiclo = "";
  
  //Descomposición del nombreid 
  if((sTipoGrupo=='CU') || (sTipoGrupo=='CH')){
    sClaveCurso = new String(sNombreid).substring(8,14);   
    sCicloano = new String(sNombreid).substring(0,4);
    sCiclo = new String(sNombreid).substring(4,6);
    sTipoCiclo = new String(sNombreid).substring(6,8);
    var ruta ="/pucp/ocr/ocwcurpa/ocwcurpa;jsessionid=" + session + "?accion=Ingresar";
    ruta = ruta + "&clavecurso=" + sClaveCurso + "&codigo=" + sUsuario + "&cicloano=" + sCicloano + "&ciclo=" + sCiclo + "&tipociclo=" + sTipoCiclo;
  }else if((sTipoGrupo=='PR') || (sTipoGrupo=='PH')){
    sTipoProceso = new String(sNombreid).substring(0,3);
    sIdentificaProceso = new String(sNombreid).substring(3,11);
    sIdentificaProceso = new Number(sIdentificaProceso).toString();
    var ruta ="/pucp/procpers/ppwproce/ppwproce;jsessionid=" + session + "?accion=CrearPanelControl&personaconsultada=" + sUsuario;
    ruta = ruta + "&subtipo=" + sTipoProceso + "&identifica=" + sIdentificaProceso;
  }else{
    alert("No puede acceder al panel del curso.");
    return false;
  }
  //si es un tipogrupo valido
	actualizarIframe(ruta);
}

function AbrirGruposChatBeta(sesion)
{ 
  //variables 
  bContinuar = true;
  sRetornarContactos = "";
  sTipoFiltro= "";
  sCicloAno = "";
  sCiclo = "";
  sTipoCiclo = "";
  sClaveCurso = "";
  sTipoProceso = "";
  sIdentificaProceso = "";

  //lee los argumentos variables
  if(arguments.length==1){//si solo se ingreso sesión
    sTipoFiltro = 'TODOS';
  }else{
    sTipoFiltro = new String(Trim(arguments[1])).toUpperCase();
    if(sTipoFiltro=='C*'){//si es tipo curso regular
      sCicloAno = Trim(arguments[2]);
      sCiclo = Trim(arguments[3]);
      sTipoCiclo = Trim(arguments[4]);
      sClaveCurso = new String(Trim(arguments[5])).toUpperCase();
    }else if(sTipoFiltro=='P*'){//si es tipo curso No regular
      sTipoProceso = new String(Trim(arguments[2])).toUpperCase();
      if(sTipoProceso.length!=3){
        alert("No se pueden mostrar los grupos de chat. El dato de tipo proceso enviado no es correcto.");
        bContinuar=false;
      }
      sIdentificaProceso = AgregarCadenaIzq(arguments[3], "0", 8);
    }
  }
  urlGruposChat="/pucp/chat/ctwchat/ctwchat;jsessionid=" + sesion + "?accion=MostrarGruposChat&comboGruposChat=&tipoFiltro=" + sTipoFiltro + "&cicloAno=" + sCicloAno + "&ciclo=" + sCiclo + "&tipoCiclo=" + sTipoCiclo + "&claveCurso=" + sClaveCurso + "&tipoProceso=" + sTipoProceso + "&identificaProceso=" + sIdentificaProceso;
  if (bContinuar==true){
      //window.location = urlGruposChat;
	  actualizarIframe(urlGruposChat);      
  } 
}

var wDGPUCP=null;

function mostrarDriveGPUCP(sesion)
{ 
  if (wDGPUCP && !wDGPUCP.closed){
    //wGPUCP.focus();
	wDGPUCP.blur();
  }else{
    sesion = sesion.replace(/\-/g, "").replace(/\:/g, "").replace(/_/g, "").replace(/\./g, "");
    wDGPUCP = window.open("http://drive.google.com/a/pucp.pe", "DriveGPUCP"+sesion, "width=800,height=540,status=yes,resizable=yes,toolbar=yes,scrollbars=yes,left=10,top=0",false);  
  } 
  wDGPUCP.focus();
}


var funcionTiempo;
var fechahora;

function mostrarHoraPUCPAlt(){	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {	
			document.getElementById('frame_mid').contentWindow.document.getElementById("linkHora").style.display="none";		
			var horatexto=xhttp.responseText.trim();	
			fechahora= new Date(horatexto);			
			var h=fechahora.getHours();
			var m=fechahora.getMinutes();
			var s=fechahora.getSeconds();
			m=checkTime(m);
			s=checkTime(s);			
			document.getElementById('frame_mid').contentWindow.document.getElementById("textoHora").innerHTML = ""+h+":"+m+":"+s;					
			funcionTiempo=setInterval('startTime()',1000);	
			setTimeout('stoptTime()', 10000);			
		}				
	};
	xhttp.open("GET", "/pucp/lib/jsp/PucpHoraAlt.jsp", true);
	xhttp.send();	
}

function stoptTime(){
	var error="";
	try{
		clearInterval(funcionTiempo);  			
	}	
	catch(err){
		error=err.message;
	}
	try{
		document.getElementById('frame_mid').contentWindow.document.getElementById("textoHora").innerHTML="";
		document.getElementById('frame_mid').contentWindow.document.getElementById("linkHora").style.display="inline-block";		
	}
	catch(err){
		error=err.message;
	}		
}

function startTime(){
	fechahora.setSeconds(fechahora.getSeconds() + 1);
	var h=fechahora.getHours();
	var m=fechahora.getMinutes();
	var s=fechahora.getSeconds();
	m=checkTime(m);
	s=checkTime(s);
	document.getElementById('frame_mid').contentWindow.document.getElementById("textoHora").innerHTML=""+h+":"+m+":"+s				
}	

function checkTime(i){
	if(i<10)
		return "0"+i;
	else 
		return i;
}

function activarMenu(){
	enableMenu=true;
}
function desactivarMenu(){
	enableMenu=false;
}

function mostrarIconoCarga(){
	$("#fondo_icono_espera").css("display", "table");		
}

function mostrarIconoCargaMensaje(mensaje){	
	$("#icono_espera").prepend("<div id='mensajeIconoCarga' class='MensajeIconoEspera'>"+mensaje+"</div>")
	$("#fondo_icono_espera").css("display", "table");		
}

function ocultarIconoCarga(){
	try {$("#mensajeIconoCarga").remove();}
	catch(err){}
	$("#fondo_icono_espera").css("display", "none");
}

function toggleMenu(){		
	$("#wrapper").toggleClass("toggled");	
}
	
function hideMenu(){		
	$("#wrapper").removeClass("toggled");	
}
	
$("#menu-toggle").click(function(e) {
	e.preventDefault();
	toggleMenu();
});

function redirigirIFrame(url,iframename){
	var bool=true;
	if(verificarDisponibilidadIdioma(this.id)){
		bool=obtenerRespuestaDisponibilidadIdioma();		
	}
	if(bool){
		$('#'+iframename).css('display','none');
		document.getElementById(iframename).height= 0 + "px";
		document.getElementById(iframename).width= 0 + "px";	
		$('#'+iframename).attr('src',url);
		$('#'+iframename).css('display','');
		hideMenu();	
	}	
}

function expandirContraerSubMenu(nivel,idsubmenu,idflecha){
	for (i = nivel; i < 3; i++) { 
		$(".submenu-nivel-"+i+":not(#"+idsubmenu+")").hide(300);
	}
	
	if(nivel>1){
		$("#sidebar-wrapper .submenu-nivel-"+(nivel-1)+" .fa:not(#"+idflecha+")").removeClass("fa-caret-down")
		$("#sidebar-wrapper .submenu-nivel-"+(nivel-1)+" .fa:not(#"+idflecha+")").addClass("fa-caret-right")	
	}
	else{
		$("#sidebar-wrapper .fa:not(#"+idflecha+")").removeClass("fa-caret-down")
		$("#sidebar-wrapper .fa:not(#"+idflecha+")").addClass("fa-caret-right")	
	}
	$('#'+idsubmenu).toggle(500);
	$('#'+idflecha).toggleClass('fa-caret-right');
	$('#'+idflecha).toggleClass('fa-caret-down');
	//setTimeout(function(){if($("#sidebar-wrapper").overflown()) alert("overflown");},500); 
}

function verificarDisponibilidadIdioma(id){
	return arraySoloEspanol.includes(id);
}

var arraySoloEspanol=["matricula",
						"miuniversidad",
						"agendapucp",
						"personas",
						"carreras",
						"cursos",
						"busqcursosreg",
						"busqactividades",
						"bibvirtual",
						"docBusq",
						"uniacad","","","uniacadvertodas","uniacad","formcont",
						"organizacion",
						"sag",
						"comunicaciones",
						"correo",
						"foro",
						"chat",
						"grupos",
						"agenda",
						"documentos",
						"docpersonal",
						"doccursacti",
						"docfacuouni",
						"cursoactividades",
						"misactividades",
						"pagpersonal",
						"solicitudes",
						"servicios",
						"traacaalum",
						"apropend",
						"manualuso"]

if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
    'use strict';
    var O = Object(this);
    var len = parseInt(O.length) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1]) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
        return true;
      }
      k++;
    }
    return false;
  };
}
