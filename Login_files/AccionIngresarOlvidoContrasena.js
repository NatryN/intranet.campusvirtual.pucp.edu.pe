function IngresarOlvidoContrasena()
{ 		
	window.open(
			"http://campusvirtual.pucp.edu.pe/pucp/usuarios/uswolvid/uswolvid?accion=IngresarOlvidoContrasena&identificacion=&msg=", "Olvido",
			"location=no,status=yes,resizable=no,toolbar=yes,scrollbars=no,top=200,left=15,width=770,Height=400").focus();		
}

function IngresarOlvidoContrasenaEn()
{ 	
	if(confirm('The following content is not available in English. It will be displayed in Spanish.'))
	window.open(
			"http://campusvirtual.pucp.edu.pe/pucp/usuarios/uswolvid/uswolvid?accion=IngresarOlvidoContrasena&identificacion=&msg=", "Olvido",
			"location=no,status=yes,resizable=no,toolbar=yes,scrollbars=no,top=200,left=15,width=770,Height=400").focus();		
}

function IngresarModificarContrasena()
{
	//Colocar la URL a la aplicación de modificación de contraseña LDAP
	window.open(
			"http://campusvirtual.pucp.edu.pe/login?accion=Ingresar&u=&i=&s=","Modificación", 
			"location=no,status=yes,resizable=no,toolbar=yes,scrollbars=no,top=200,left=15,width=770,Height=400").focus();
}

function redirigir(){	
	var url = location.href;
	var parameter;
	if (url.indexOf("service")!=-1) parameter="service";
	else parameter="TARGET";
	var indexGoogle = url.indexOf("www.google.com"); //Aparece en SAML1.1
	
	if (indexGoogle!=-1) window.location = "http://mail.google.com/a/pucp.pe";
	
	var index = url.indexOf("?");
	var index2 = url.indexOf("?locale=");

	if (index==-1 || index2>0) window.location = "https://pandora.pucp.edu.pe/pucp/";
	else{
		index = url.indexOf(parameter,index) + parameter.length;
		if (url.charAt(index) == "="){
			// Obtiene el valor del parametro
			var result = url.indexOf("&",index);
			if (result == -1){result=url.length;};		
			var servicio = url.substring(index + 1,result);	
			servicio=unescape(servicio);				
			document.location.href= servicio;
			}	
	}
	} 

function urlModificarPWD(servicio,id)
{
	document.location.href= "http://campusvirtual.pucp.edu.pe/login?accion=Ingresar&u=&i=&s=";
	//document.location.href= "https://cibeles.pucp.edu.pe/CambioPWD/modificarPWD.jsp?service="+servicio+"&id="+id;
	}