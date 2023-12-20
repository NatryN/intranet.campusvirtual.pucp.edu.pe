//funciones dom
/*function pucpRemoveChildTree (obj) {
    if (!!!this.firstChild) return; //es una hoja sin hijos
    while (!!this.firstChild) {
        $(this.firstChild).removeChildTree();
    }
}

function pucpCreateElementWithText (tag,text) {
    var e = this.createAppendElement(tag);
    if (!!text)e.innerHTML=text;
    return e;
}

function pucpRemoveChilds () {
    while (!!this.firstChild) {
        this.removeChild(this.firstChild);
    }
}

function pucpCreateElement (tag) {
    var e = document.createElement(tag);
    return $(e);
}

function pucpCreateAppendElement (tag) {
    var e = pucpCreateElement(tag);
    this.appendChild(e);
    return e;
}

function pucpCreateOption (value, caption) {
    var opt = this.createAppendElement("option");
    opt.value = value;
    opt.innerHTML = caption;
    return opt;
}

function pucpCreateTable () {
    return this.createAppendElement("table");
}

function pucpCreateTbody () {
    return this.createAppendElement("tbody");
}

function pucpCreateTr () {
    return this.createAppendElement("tr");
}

function pucpCreateTh (text) {
    return this.createElementWithText("th",text);
}

function pucpCreateTd (text) {
    return this.createElementWithText("td",text);
}

function pucpCreateSpan (text) {
    return this.createElementWithText("span",text);
}

function pucpRowAddText (texts,classes) {
    for (var i = 0; i < texts.length; i++) {
        var td = this.createTd(texts[i]);
        if (!!classes && !!classes[i]) {td.className = classes[i];}
    }
}

function pucpCreateInput (type,name,value) {
    var e  = pucpCreateElement("input");
    e.type = type;
    e.name = name;
    e.value = value;
    e.id = name;
    this.appendChild(e);
    return e;
}

function pucpRowAddMultilineText (rowspan,texts,classes) {
    for (var i = 0; i < texts.length; i++) {
        var td = this.createTd(texts[i]);
        td.rowSpan = rowspan;
        if (!!classes && !!classes[i]) {td.className = classes[i];}
    }
}

function $ (id) {
    if (typeof (id) == "string") {
        id = document.getElementById(id);
    }
    if (!!!id.pucpEnabled) {
        id.removeChilds = pucpRemoveChilds;
        id.removeChildTree = pucpRemoveChildTree;
        id.createAppendElement = pucpCreateAppendElement;
        id.createElementWithText = pucpCreateElementWithText;
        //Objetos dom
        id.createInput = pucpCreateInput;
        id.createOption = pucpCreateOption;
        id.createSpan = pucpCreateSpan;
        id.createTable = pucpCreateTable;
        id.createTbody = pucpCreateTbody;
        id.createTd = pucpCreateTd;
        id.createTh = pucpCreateTh;
        id.createTr = pucpCreateTr;
        id.addTextRow = pucpRowAddText;
        id.addMultilineTextRow = pucpRowAddMultilineText;
        id.pucpEnabled = true;
    }
    return id;
}

function encodeParameters () {
    var s = "";
    for (var i = 0; i < arguments.length; i+=2) {
        if (i>0) s+= "&";
        s+= encodeURIComponent(arguments[i]) + "=" + encodeURIComponent(arguments[i+1]);
    }
    return s;
}

function appendParameters () {
    var s = "";
    for (var i = 0; i < arguments.length; i+=2) {
        if (i>0) s+= "&";
        s+= arguments[i];
    }
}

function trim(cadena, tc) {
    if (!!!tc) {
        tc = " ";
    }
    for(i=0; i<cadena.length; ) {
        if(cadena.charAt(i)==tc) cadena=cadena.substring(i+1, cadena.length);
        else break;
    }
    for(i=cadena.length-1; i>=0; i=cadena.length-1) {
        if(cadena.charAt(i)==tc) cadena=cadena.substring(0,i);
    else break;
    }
    return cadena;
}*/

function quitaChecks2 (propiedad) {
    var form = document.forms["filtros"];
    //alert("form:"+form)
    //alert("form.elements:"+ form.elements)
   // var lista = form[propiedad];
   var lista = document.getElementsByName(propiedad);
    //var lista = document.getElementsByTagName(propiedad);
    alert("lista:"+lista)
    // alert("lista[0].checked:"+lista[0].checked)
    if (!!!lista) return;
    if (!!!lista.length) lista = [lista];
     alert("lista:"+lista)
    alert("lista.length:"+lista.length)
   // alert("lista[0].checked:"+lista[0].checked)
    // alert("lista.item:"+lista.item(0))
    for (var i = 0; i < lista.length; i++) {
    	//alert("entro al for")
        lista[i].checked = false;
    }
    lista = undefined;
    
}

//selecciona todos checks de las actividades
function quitaChecks(objeto)
{
	var numDatos = 0;
  //Si hay al menos una fila
  if(objeto!=null){
  	  numDatos = objeto.length; 
	 // Si hay un solo un datos
 	  if(numDatos==null){
		if (objeto.checked)
		{	objeto.checked = false;
		}
	  }else{//Si hay mas de un datos
        if (numDatos>1){
	      for ( var i = 0; i < numDatos; i++ ) { 
    	    if ( objeto[i].checked) {
				objeto[i].checked = false;
            }
          }
	    }
      }
   }
}

/********************************************
* FUNCIONES PARA LA CARGA GENÃ‰RICA DE DATOS
********************************************/

function mostrarAviso(naviso,titulo,mensaje) {
    var aviso = $(naviso);
    var avisoTitulo = $(naviso+"Titulo");
    var avisoMensaje = $(naviso+"Mensaje");
    avisoTitulo.innerHTML=titulo;
    avisoMensaje.innerHTML=mensaje;
    aviso.style.display="block";
}

function ocultarAviso(naviso) {
    var aviso = $(naviso);
    var avisoTitulo = $(naviso+"Titulo");
    var avisoMensaje = $(naviso+"Mensaje");
    avisoTitulo.innerHTML="";
    avisoMensaje.innerHTML="";
    aviso.style.display="none";
}

/*
* Carga la lista de ciclos validos
*/
function cargaCiclos (ciclos, cicloano, ciclo, tipociclo) {
    var selectCiclos = $("ciclo");
    for (var i = 0; i < ciclos.length; i++) {
        var value ="{\"cicloano\":\""+ciclos[i][0]+"\",\"tipociclo\":\""+ciclos[i][1]+"\",\"ciclo\":\""+ciclos[i][2]+"\"}";
        selectCiclos.createOption(value,ciclos[i][3]).selected = (ciclos[i][0]==cicloano) && (ciclos[i][1]==tipociclo) && (ciclos[i][2]==ciclo);
    }
}

/*
* Carga la lista de facultades validas
*/
function cargaFacultades(facultades) {
    var select = $("facultad");
    select.removeChilds();
    select.createOption("false","- Seleccione una facultad -");
    for (var i = 0; i < facultades.length; i++) {
        select.createOption(facultades[i][0],facultades[i][1]);
    }
    seteaFacultadAlumno(); 
}

/*
* Procesa los resultados de la busqueda de cursos e invoca a la funcion que
* genera la tabla de resultados
*/
function cargaDatosBusqueda (req, args) {
 //alert("entro al cargaDatosBusqued")
    var s = "";
    var div = $("container");
    var valor = req.status
    var valorOk = req.statusText
    if (valor != 200) {
    	if (valorOk != "OK") {
    	   running = false;
		   $("loading").style.display="none"; 
		   	var mensaje = req.responseText       
			if(mensaje.indexOf("SinSesion") > 0) {
			 	session = document.filtros.session.value;
				window.location="/pucp/prematri/pmwmatrc/pmwmatrc;jsessionid=" + session +"?accion=VerificaSesion";			 	
		   } else {
	       	mostrarAviso("aviso1","Error " + req.status,"Ocurrió un error al buscar los horarios.\n\n");
	       }
	    }
    }
    else {
        try {
       		var cursos = eval("("+req.responseText+")");
       		//para que desaparezca el icono de espera
        	running = false;
			$("loading").style.display="none"; 
			//si existe alguna exception lanzada a proposito
			var exception = cursos.Exc;
			if (exception) {
				session = document.filtros.session.value;
				window.location="/pucp/prematri/pmwmatrc/pmwmatrc;jsessionid=" + session +"?accion=VerificaSesion&mensaje="+exception+"&servicio=MostrarPortal";
			} else {
				//se cambia de manera q si no se pasan los parametros del ciclo entonces mostrar mensaje de error
				var mensaje = cursos.Mensaje;
				if (mensaje){//no llega correo de error
					mostrarAviso("aviso1","Error de búsqueda",mensaje)
				} else {
					mostrarResultados(div, cursos);         
				}
			}
        }
        catch (ex) {
           running = false;
			$("loading").style.display="none"; 
			var mensaje = req.responseText       
			if(mensaje.indexOf("SinSesion") > 0) {
			 	session = document.filtros.session.value;
				window.location="/pucp/prematri/pmwmatrc/pmwmatrc;jsessionid=" + session +"?accion=VerificaSesion";			 	
			} else {//si llega correo de error cuando hubo algo raro en el java == se caxo
            	mostrarAviso("aviso1","Error de búsqueda","Ocurrió un error inesperado al realizar la búsqueda, por favor intentelo nuevamente.\n\n")//+ex.name + " - "+ex.message+" - "+ex.description)
            }
        }
    }
    $("facultad").focus();
}


/***************************************
* RESPONDE A LOS EVENTOS
***************************************/

function datosCiclo () {
    return eval("("+$("ciclo").value+")");
}

/*****************************
* Lo que controla la espera
*****************************/
var running = false;
var runningCursosIns = false;
var runningGuardar = false;
function startRequest(tipo){
  //1: busqueda de horarios
  //2: busqueda de cursos inscritos..
  //3: al momento de guardar.. 
  if (tipo == "1") {
	if (running) {//si hay otro proceso corriendo no puede correr
		alert("Espere a que la solicitud en curso concluya.");
		return false;
	}
	running=true;//selecciona el proceso
	$("loading").style.display="";//da el aviso de estar cargando
	return true;
  }
  if (tipo == "2") {
	if (runningCursosIns) {//si hay otro proceso corriendo no puede correr
		alert("Espere a que la solicitud en curso concluya.");
		return false;
	}
	runningCursosIns=true;//selecciona el proceso
	$("loadingCursosIns").style.display="";//da el aviso de estar cargando
	return true;  
  }
  if (tipo == "3") {
	if (runningGuardar) {//si hay otro proceso corriendo no puede correr
		alert("Espere a que la solicitud en curso concluya.");
		return false;
	}
	runningGuardar=true;//selecciona el proceso
	$("loadingGrabar").style.display="";//da el aviso de estar cargando
	return true;  
  }
}
/**
*Verifica que todo este bien antes de buscar
*/
function verificarBusqueda() {
    //verificamos que se haya elegido un ciclo
    var cicloArr = datosCiclo();
        if (!!!cicloArr) {
        alert("Debe seleccionar un ciclo de la lista.");
        $("ciclo").focus();
        return false;
    }
    //var facultad = eval("("+$("facultad").value+")");
    var facultad = $("facultad").value
    var espec = $("especialidad").value;
    var especialidad;
    if (espec != null && facultad!= "") {
    	especialidad = eval ("("+espec+")");
    }
    //var especialidad = eval ("("+$("especialidad").value+")");
    
    var clave = trim($("clave").value);
	var nombreCurso = trim($("nombre").value);
	

	// Si se ingresa claves completas de cursos no es necesario que ingrese una facultad
	//Si se ingresa partes de la clave de curso debe ser obligatorio la facultad.
	if (!!!facultad && !!clave && clave.length < 6 ) {
		//alert("fac:"+!!!facultad +", clave:" + !!clave)
		alert ("Debe seleccionar una facultad");
		$("facultad").focus();
        return false; 
	}
	//  Si se elige solo facultad, sin especialidad, ni curso, ni nombre de curso no te debe permitir
	if(!!facultad && !!!especialidad && !!!clave && !!!nombreCurso) {
		alert ("Debe seleccionar una especialidad o ingresar un curso.");
		$("especialidad").focus();
        return false; 
	}
	if (!!!facultad && !!!especialidad && clave.length < 6 ) {
	    alert ("Debe seleccionar una especialidad o ingresar la clave de un curso (6 o más caracteres).");
	    $("especialidad").focus();
        return false;    	   		
	}
	//El campo nombre del curso debe obligar a registrar 3 caracteres como mínimo
	if (!!nombreCurso && nombreCurso.length < 3) {
		alert ("El nombre del curso son de tres caracteres como mínimo ");
		$("nombre").focus();
        return false; 
	}
	//Si se ingresa nombre del curso debe ser obligatorio la facultad
	if (!!!facultad && !!nombreCurso ) {
	  //alert("fac:"+!!!facultad +", clave:" + !!nombreCurso)
		alert ("Debe seleccionar una facultad");
		$("facultad").focus();
        return false; 
	}
	if (!!clave && clave.length < 2) {
		alert (" Los cursos son de dos caracteres como mínimo ");
		$("clave").focus();
        return false; 
	}

    return true;
}
/*
* Responde al submit del formulario
*/
/********************************************************************************/
/************25-06-2012 se le agrega el parametro: listaDelGenerador, ***********/
/*si es != nulo y tiene un valor se llama a la busqueda de cursos para esa lista*/
/********************************************************************************/
function formularioBusquedaSubmit (listaDelGenerador) {
    //se borra cualquier aviso si hubiese
    //alert("entro a la funcion buscar")
    ocultarAviso("aviso1");
    ocultarAviso("avisoResultados")
    ocultarAviso("avisoDataLista")
    //ocultar mensaje de donde se muestra los posibles errores 06-07-2009
    $("mensajeResul").style.display="none";
    $("botonGrabarAbajo").style.display="none";
    var aviso = $("mensajeGrabar");
	aviso.style.display="none";
	//se borra resultado de la busqueda previa
	var div = $("container");
    div.removeChilds();
	
    var f = document.forms["filtros"];

    //verificamos que se haya elegido un ciclo
    var cicloArr = datosCiclo();
    
    //var facultad = eval("("+$("facultad").value+")");
    var facultad = $("facultad").value
    var espec = $("especialidad").value;
    var especialidad;
    if (espec != null && facultad!= "") {
    	especialidad = eval ("("+espec+")");
    }
    var clave = trim($("clave").value);
	var nombre = trim($("nombre").value);
	var nombreCambiado = modificarTildesNombre(nombre);
	
	//25-06-2012 se la listaDelGenerador es no nula y no vacia no se valida nada y se envia la informacion
	if (listaDelGenerador != null && listaDelGenerador != "" ){
		if(!startRequest("1"))return;
		    var qs = encodeParameters(
		        "cicloano",cicloArr.cicloano,
		        "ciclo",cicloArr.ciclo,
		        "tipociclo",cicloArr.tipociclo,
		        "facultad",facultad?facultad:"",
		        "nombre",nombreCambiado,
		        "clave",clave,
		        "etapa",(!!especialidad)?especialidad.etapa:"",
		        "rama",(!!especialidad)?especialidad.rama:"",
		        "especialidad",(!!especialidad)?especialidad.especialidad:"",
		        "cursosGeneradorHorario",listaDelGenerador
		    );
		    //qs = "";
		   // alert("parametros:"+qs)	
		  //alert("empieza lo de ajax")
		    serveForm(cargaDatosBusqueda, [], document.urlBuscarHorarios, qs);
	} else {
	    if (verificarBusqueda()) {
	      //alert("document.urlBuscarHorarios:"+document.urlBuscarHorarios)
	    //1: busqueda de horarios
			if(!startRequest("1"))return;
		    var qs = encodeParameters(
		        "cicloano",cicloArr.cicloano,
		        "ciclo",cicloArr.ciclo,
		        "tipociclo",cicloArr.tipociclo,
		        "facultad",facultad?facultad:"",
		        "nombre",nombreCambiado,
		        "clave",clave,
		        "etapa",(!!especialidad)?especialidad.etapa:"",
		        "rama",(!!especialidad)?especialidad.rama:"",
		        "especialidad",(!!especialidad)?especialidad.especialidad:""
		    );
		    //qs = "";
		   // alert("parametros:"+qs)	
		  //alert("empieza lo de ajax")
		    serveForm(cargaDatosBusqueda, [], document.urlBuscarHorarios, qs);
	    }
    }  
}

function cursoBusquedaOnClick () {
    for (var i = 0; i < this["horarios"].length; i++) {
        var h = this["horarios"][i];
        if (h.style.display=="none") {h.style.display="";}
        else {h.style.display="none";}
    }
}

function buscarCursosInscritos () {
    var ciclo = $("ciclo");
    var value = eval("("+ciclo.value+")")
    if (!!value) {
        var qs = encodeParameters(
            "cicloano",value.cicloano,
            "ciclo",value.ciclo,
            "tipociclo",value.tipociclo
        );
       // qs = "";
        serveForm(
            (
                function (req, args) {
                    req = eval("(" + req.responseText + ")");
                    //ya se obtiene los datos de los cursos inscritos entonces antes 
                    //de pintar se deja de mostrarla imagen de espera de cursos
                   runningCursosIns = false;
					$("loadingCursosIns").style.display="none"; 
					//si existe alguna exception lanzada a proposito
		            var exception = req.Exc;
					if (exception) {
						session = document.filtros.session.value;
						window.location="/pucp/prematri/pmwmatrc/pmwmatrc;jsessionid=" + session +"?accion=VerificaSesion&mensaje="+exception+"&servicio=MostrarPortal";
					} else {
						//esta bien.. sin excepciones lanzadas a proposito.
						mostrarCursosInscritos(req,args);
						//11-11-11 Se crea las sesiones de los cursos para que cuando llame al enlace de inscritos 
						//ya solo pinte los cursos 
						creaEventosMostrarHorariosCursosInscritos(req,args);
					}
					$("TablaBusqueda").style.display=""; 
					$("busqueda").style.display="";				    
                }
            ), 
            [],
            document.urlBuscarCursosInscrito,
            qs
        );
    }
}

function mostrarCursosInscritos (cursos, args) {
    var div = $("cursosInscritos");
    div.removeChilds();
    //se oculta el dov de infractor
    $("divInfractor").style.display="none"; 
    $("divCodictado").style.display="none"; 
    if (cursos.data.length>0) {
        var data = cursos.data;
        var table = div.createTable();
        table.width = "100%"
        var tbody = table.createTbody();
        var tr = tbody.createTr();
        table.className = "pucpTablaTitulo";
        tr.className = "pucpCeldaTitulo";
        tr.addTextRow([
            "Clave",
            "Nombre del Curso",
            "Créd.",
            "Eliminar",
            "Tipo",
            "Horario",
            //"Modalidad", AVR: 27/07/2020 Se retira modalidad
            "<a class=\"pucpCeldaTitulo\" href=\"javascript:AbreVentanaNueva('/pucp/prematri/jsp/html/LeyendaEstado.htm',0,450,350)\">Estado</a>",
            "<a class=\"pucpCeldaTitulo\" href=\"javascript:AbreVentanaNueva('/pucp/prematri/jsp/html/LeyendaPosRelativa.htm',0,450,350)\">Posic. Relat.</a>",
            "Docentes",
            "Sesiones"
        ]);
        document.cursos.eliminarOld = document.cursos.eliminar;
        document.cursos.eliminar = {};
        for (var i = 0; i < data.length; i ++) {
            armarCursoInscrito(tbody,data[i]);
        }
        document.cursos.eliminarOld = null;
        div.style.display="block";
        //si hay mas de un curso se muestra boton arriba 
        $("botonGrabarArriba").style.display="block"; 
    }
    else {
		//como no hay data el boton de arriba no se muestra
		$("botonGrabarArriba").style.display="none"; 
		
        div.innerHTML="<br/>"+
        "<table width = \"100%\" class = \"pucpTablaTitulo\">"+
        "<tr class = \"pucpCeldaTitulo\">"+ 
        "<td>Clave</td><td>Nombre del Curso</td><td>Créd.</td><td>Eliminar</td> "+
        "<td>Tipo</td><td>Horario</td>"+
        //"<td>Modalidad</td>"+ AVR: 27/07/2020 Se retira modalidad
        "<td><a class=\"pucpCeldaTitulo\" href=\"javascript:AbreVentanaNueva('/pucp/prematri/jsp/html/LeyendaEstado.htm',0,450,350)\">Estado</a></td>"+
        "<td><a class=\"pucpCeldaTitulo\" href=\"javascript:AbreVentanaNueva('/pucp/prematri/jsp/html/LeyendaPosRelativa.htm',0,450,350)\">Posic. Relat.</td><td>Docentes</td><td>Sesiones</td></tr>"+
        "</table><br/>"+
        "<table width = \"60%\"><tr><td><div class=\"pucpInfo\" style=\"background-color: #FFFFCC; background-repeat: repeat; background-attachment: scroll; margin-botton: 12px; border: 1px solid #96965E; margin-top: 2px; padding: 5px; background-position: 0%\"><table ><tr><td rowspan=\"2\" valign=\"top\"><img src=\"/pucp/lib/images/i_info.gif\" /></td><td class=\"title\">No se han registrado cursos</td></tr><tr><td class=\"body\">El alumno no ha registrado cursos para el proceso de matrícula.</td></tr></table></div></td></tr></table>";
    }
    mostrarBarraInformativaGeneral(cursos);
    mostrarmsgvacanteCondicionada(cursos);
}

function armarCursoInscrito (tbody, curso) {
    var horarios = curso[3];
    for (var i = 0; i < horarios.length; i++) {
        var horario = horarios [i];
        var tr = tbody.createTr();
        //25-11-11 se compara si es curso permitido ..dependiendo se eso sera el color del tr
        var cursoPermitido = true;
        if (curso[4] == "1") {
        	tr.className="pucpCeldaPreins";
        	cursoPermitido = true;
        } else {
        	tr.className="pucpCeldaNoPermitidoPreins";
        	cursoPermitido = false;
        	//como ya tiene un permitido entonces se mostrara el div de cursos no permitidos
        	$("divInfractor").style.display="block"; 
        }
        
        if (i == 0) {
            tr.addMultilineTextRow(horarios.length, [
                curso[0], //clave
                curso[1], //nombre
                curso[2] //creditos
            ]);
        }
        var td = tr.createTd();
        if (horario[8]=="1") {
            var chk = td.createInput("checkbox","cursosEliminar",curso[0]+horario[0]+horario[1]);
            if (curso[5] == "0") {
            	chk.style.display = "none";
            }
            //Estaba seleccionado
            if (!!(document.cursos.eliminarOld[chk.value])) {
                chk.checked = true;
                document.cursos.eliminar[chk.value] = true;
            }
            //sincronizar la cache con el valor del check
            chk.onclick = function () {
                document.cursos.eliminar[this.value]=this.checked;
            }
        }
       
        //27-06-2013 se agrega el indicador de codictado (horario[9])
        //11-07-2013 se verifica si tiene el indicador de codictado en 1 se mostrara el divCodictado q contiene mensaje de codictado
        var mensajeCodictado = "" 
        if (horario[9] != null && horario[9] == "1") { 
        	mensajeCodictado = " (Codictado)";
        	$("divCodictado").style.display="block";  
        }
        //12-07-2013 se agrega el enlace de detalle en caso el estado es infractor al plan de estudios  es decir no tiene el curso permitido/
        var detalleInfractor = "";
        if (!cursoPermitido) {
        	var cicloArr = datosCiclo();
        	var url = "/pucp/ctrlcurr/ccwcupos/ccwcupos?accion=Ingresar&ventanaEmergente=1&alumno="+document.filtros.codalu.value+
        	"&entrada=1&flagPanelRegreso=C&consultaMatricula=1&rama="+document.filtros.ramaAlu.value+
        	"&especialidad="+document.filtros.especialidadAlu.value+"&etapa="+document.filtros.etapaAlu.value+"&codCurso="+curso[0];
        	detalleInfractor = "&nbsp;<a href =\"javascript:AbreVentanaNueva('"+url+"',0,650,570)\">Detalle</a>";
        	//alert(detalleInfractor)
        }
       
         //buscar cursos inscritos
        //[0]:tipohorario, [1]:horario, [2]:pos rel, [3]:matricula, [4]:docentes, 
        //[5]:sesiones, [6]:modalidad, [7]:estado, [8]:principal, [9]:indcodictado
        tr.addTextRow ([
            document.tipoHorarios[horario[0]],//Tipo horario
            //horario[0]+
            horario[1] + mensajeCodictado,//horario
            //horario[6],//Modalidad AVR: 27/07/2020 Se retira modalidad
            horario[7] + detalleInfractor,//Estado
            !!horario[2]?horario[2]:"--",//Posicion
            !!horario[4]?horario[4]:"--",//Docentes
            !!horario[5]?horario[5]:"--"//Sesiones
        ]);
    }
}

function mostrarBarraInformativaGeneral(cursos) {

    //mostrar barra de arriba donde se tiene informacion geenral de la matricula
    var divCuadroInf = $("cuadroInformativo");
    divCuadroInf.removeChilds();
    var dataCuadro = cursos.data;
    var tableCudro = divCuadroInf.createTable();
	tableCudro.width = "100%"
	var tbodyCuadro = tableCudro.createTbody();
	var trCuadro = tbodyCuadro.createTr(); 
    trCuadro.className = "pucpCeldaGrisPreins";
    var cursosIns = 0;
    var creditIns = 0.0;
    var cursosPrem = 0;
    var creditPrem = 0.0;
    
    for (var i = 0; i < dataCuadro.length; i ++) {
          //ver si el estado es inscrito o prematriculado
          var horarioCurso = dataCuadro[i][3];
          //el estado se toma del primer horario porque son iguales
          var estado = horarioCurso[0][7]
          cursosIns++ ;
          creditIns += dataCuadro[i][2]*1//creditos
           if (estado.toUpperCase() ==  "PREMATRICULADO" || estado.toUpperCase() ==  "MATRICULADO") {
           	cursosPrem++ ;
           	creditPrem +=dataCuadro[i][2]*1//creditos
           }          
    }
    if (esPrematMat=="1"){
		trCuadro.addTextRow([
		   "Cursos Inscritos: "+ cursosIns,
		   "Créditos Inscritos: "+ creditIns,
		   "Cursos Matriculados: " + cursosPrem,
		   "Créditos Matriculados: " + creditPrem
		]);
    }else{
    	trCuadro.addTextRow([
    	              	   "Cursos Inscritos: "+ cursosIns,
    	              	   "Créditos Inscritos: "+ creditIns,
    	              	   "Cursos Prematriculados: " + cursosPrem,
    	              	   "Créditos Prematriculados: " + creditPrem
    	              	]);
    }
}

function validacionAntesGrabar() {

 if (cursoExiste()) {
 	return false;
 }
 if (cursoSeleccionaRepetido()) {
 	return false;
 }
 return true;
}

function cursoExiste() {
var tamCursosInscritos = 0;
var tamCursosAgregar = 0;
var form = document.forms["filtros"];
//////////////////////
//var cadenaEliminar = cadenaCursos("eliminar");
//si la cadena tiene mas de un elemento es decir diferente de "" 
//entonces se toma el arreglo
var cursoIns = null
cursoIns = form.cursosEliminar;

//if (cadenaEliminar != "")
	//cursoIns = form.cursosEliminar;

var cursosAgregar = form.cursosAgregar;

if (cursoIns != null && cursoIns.length != null) {
 //como cuanod se borra todo al final queda registro de un solo curso pero aun no haya nada se debera setear a 0
 if (cursoIns.length == 1 )
 	tamCursosInscritos = 0;
 else
 	tamCursosInscritos =cursoIns.length
} else {
	if (cursoIns == null) 
		tamCursosInscritos = 0;
	else {
		//si no es null CUrsoIns entonces el length es nulo lo q significa q no es un arreglo
		//el problema era cuando se tenia un elemento y se queria agregar uno igual
		//me slaie el mensaje q ya existia lo q esta OK.. pero cuando eliminaba ese curso y em quedaba
		//sin cursos y trataba de agregar el mismo curso me salia ell mismo mensaje.. ilogico porque no tengo cursos
		//inscritos.. entonces para esto se verificara primero
		var hayCursos = document.getElementById("cursosEliminar")
		if (hayCursos != null)
			tamCursosInscritos = 1;
		else 	
			tamCursosInscritos = 0;
	}
}
	
if (cursosAgregar != null && cursosAgregar.length!= null) {
 tamCursosAgregar = cursosAgregar.length
} else  {
  if (cursosAgregar == null)
	tamCursosAgregar = 0;
  else
   tamCursosAgregar = 1;
}
	
 if (tamCursosAgregar>1) {
   for(var i = 0; i<tamCursosAgregar; i++) {
    if (cursosAgregar[i].checked == true) {
     var cursoAdd =  cursosAgregar[i].value.substring(0,6);
     var tipoHorAdd= cursosAgregar[i].value.substring(6,7);  
     if (tamCursosInscritos == 1) {
			var curso = cursoIns.value.substring(0,6);
			var tipoHor = cursoIns.value.substring(6,7);
			if (cursoIns.checked == true && curso == cursoAdd ) {
			} else {
				if (curso == cursoAdd && tipoHor == tipoHorAdd) {
					alert('El curso ('+ cursoAdd +') que desea agregar ya se encuentra registrado.\n');      
   					cursosAgregar[i].focus();
 					return true;
				}
			}     
     } else {
	   for(var j = 0; j<tamCursosInscritos; j++) {
			var curso = cursoIns[j].value.substring(0,6);
			var tipoHor = cursoIns[j].value.substring(6,7);
			if (cursoIns[j].checked == true && curso == cursoAdd) {
			} else {
				if (curso == cursoAdd && tipoHor == tipoHorAdd) {
					alert('El curso ('+ cursoAdd +') que desea agregar ya se encuentra registrado.\n');      
   					cursosAgregar[i].focus();
 					return true;
				}
			}
   		}
   	  }
   	 }
   }

 } else {
 	if (tamCursosAgregar == 1) {
 		if (cursosAgregar.checked == true) {
 			var cursoAdd =  cursosAgregar.value.substring(0,6);
 			var tipoHorAdd= cursosAgregar.value.substring(6,7);  
 			if (tamCursosInscritos == 1 ) {
 				var curso = cursoIns.value.substring(0,6);
 				var tipoHor = cursoIns.value.substring(6,7);
				if (cursoIns.checked == true && curso == cursoAdd) {
				} else {
					if (curso == cursoAdd && tipoHor == tipoHorAdd) {
						alert('El curso ('+cursoAdd +') que desea agregar ya se encuentra registrado.\n');      
	   					cursosAgregar.focus();
	 					return true;
					}
				}
 			} else {
		 	   for(var j = 0; j<tamCursosInscritos; j++) {
					var curso = cursoIns[j].value.substring(0,6);
					var tipoHor = cursoIns[j].value.substring(6,7);
					if (cursoIns[j].checked == true && curso == cursoAdd) {
					} else {
						if (curso == cursoAdd && tipoHor == tipoHorAdd) {
							alert('El curso ('+cursoAdd+') que desea agregar ya se encuentra registrado.\n');      
		   					cursosAgregar.focus();
		 					return true;
						}
					}
		   		}			
 			}
 		}
 	}
 }
 
 return false;
}

function cursoSeleccionaRepetido() {
var tamCursosAgregar = 0;
var cursosAgregar = document.filtros.cursosAgregar;
if (cursosAgregar != null && cursosAgregar.length!= null) {
 tamCursosAgregar = cursosAgregar.length
} else  {
  if (cursosAgregar == null)
	tamCursosAgregar = 0;
  else
   tamCursosAgregar = 1;
}
//ha seleccionado mas de un curso
 if (tamCursosAgregar>1) {
   for(var i = 0; i<tamCursosAgregar; i++) {
    if (cursosAgregar[i].checked == true) {
     var cursoAdd =  cursosAgregar[i].value.substring(0,6);   
     var tipoHorAdd= cursosAgregar[i].value.substring(6,7);  
	   for(var j = i+1; j<tamCursosAgregar; j++) {
		  if (cursosAgregar[j].checked == true) {
			var curso = cursosAgregar[j].value.substring(0,6);
			var tipoHor= cursosAgregar[j].value.substring(6,7);
			
			if (curso == cursoAdd && tipoHor == tipoHorAdd) {
				alert('Se ha detectado que se ha marcado dos horarios para un mismo tipo de horario del curso '+ cursoAdd+'.Debe seleccionar solo un horario por cada tipo de horario del curso.\n');      
   				cursosAgregar[i].focus();
 				return true;
			}
		  }
   		}  	  
   	 }
   }
 }
}

function modificarTildesNombre (texto) {

	texto = texto.toUpperCase();
	texto=texto.replace(/(À|Á|Â|Ã|Ä|Å|Æ)/gi,'a'); // cambio las "A"s exoticas por "A"s sencillas mediante expresiones regulares
	texto=texto.replace(/(È|É|Ê|Ë)/gi,'e'); //lo mismo con las "E" y resto de vocales y la "Ñ"
	texto=texto.replace(/(Ì|Í|Î|Ï)/gi,'i');
	texto=texto.replace(/(Ò|Ó|Ô|Ö)/gi,'o');
	texto=texto.replace(/(Ù|Ú|Û|Ü)/gi,'u');
	
	return texto;
}

function AbreVentanaNueva(pUrl,pMostrarToolbar,pWidht,pHeight)
{  
	if (pMostrarToolbar == 1){
		var ventana = window.open(pUrl,'center','width='+pWidht+',height='+pHeight+',location=yes,status=yes,toolbar=yes,menubar=yes,scrollbars=yes,resizable=yes'); 
	}else{
		var ventana = window.open(pUrl,'_blank','width='+pWidht+',height='+pHeight+',location=no,status=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes'); 	
	}
    ventana.focus();
    return;
}

function mostrarHorarioInscripcion()
{
    //verificamos que se haya elegido un ciclo
    var cicloArr = datosCiclo();
     var session   = document.filtros.session.value;
	AbreVentanaNueva('/pucp/prematri/pmwmatrc/pmwmatrc;jsessionid='+session+'?accion=MostrarHorarioInscripcion&cicloano='+cicloArr.cicloano+'&ciclo='+cicloArr.ciclo+'&tipociclo='+cicloArr.tipociclo,0,998,670)
}
//variable global que se usara para almacenar las sesiones de los cursos para que se puedan ver
//en la ventana popup del horario del alumno.
var sesionesHorario = new Array;
var numero = 0;
function obtenerSoluciones() {
	return sesionesHorario
}

function pagina_onload() {
 if (opener.sesionesHorario.length>0) {
 	var obj = document.getElementById("mensajeNoCursos")
 	obj.style.display="none"; 
 	obj = document.getElementById("calendar")
 	obj.style.display=""; 
    var $calendar = $('#calendar');
    $calendar.clear;
    $calendar.weekCalendar("today");
    //se setea el combo
    document.resultado.tamanio.value = opener.document.filtros.tamanio.value
 }  else {
 	//se muestra mensaje que no ha seleccionado cursos
 	var obj = document.getElementById("mensajeNoCursos")
 	obj.style.display=""; 
 	obj = document.getElementById("calendar")
 	obj.style.display="none"; 
 }
}

function creaEventosMostrarHorariosCursosInscritos (cursos, args) {
	var datos = cursos.data; 
	if (datos.length>0) {
		
		var fechaActual = new Date();
	    //var fechaLunes = new Date(fechaActual.getTime()-((6+(fechaActual.getDay()||7))*24*60*60*1000));
	    var diaActual = fechaActual.getDay();
	    var fechaLunes
	    if (!diaActual) {
		   fechaLunes = new Date(fechaActual.getFullYear(),fechaActual.getMonth(),fechaActual.getDate()-6)
		} else {
		   fechaLunes = new Date(fechaActual.getFullYear(),fechaActual.getMonth(),fechaActual.getDate()- diaActual-6+7)
		}
	    var year = fechaLunes.getFullYear();
	    var month = fechaLunes.getMonth();
	    var day = fechaLunes.getDate();
	
		sesionesHorario = new Array;
		var listaEvento = new Array
		var idem =1;
		var indiceEven = 0;
		for (var i = 0; i < datos.length; i ++) {
		   var curso =  datos[i]
	       var horarios = curso[3];
		   for (var j = 0; j < horarios.length; j++) {
		     var hor = horarios [j];
			 var sesiones = hor[5]//de la forma = LUN 18:00-20:00 Sec.E<BR>MIE 12:00-13:00 Sec P.
			 var arraySesiones = transformaSesion(hor[5]);
			 var secuencia = "";
			 var fechaAux = ""
			 var k = 0;
			 if (arraySesiones.length>0){
			     //por cada sesion del curso se creara un evento
				 for (k = 0; k < arraySesiones.length;k++) {
					var sevent = arraySesiones[k];
					//dia=evento[0],horaini=evento[1],minutoini=evento[2], 
					// horafin = evento[3], minutofin = evento[4]
					//se pregunta si es la misma fecha INF234 EF con INF234 EE sera: INF234 EE,EF
					if (sevent[0]+sevent[1]+sevent[2]+sevent[3]+sevent[4] == fechaAux) {
						secuencia = secuencia+ ", "+sevent[5]
					} else {
						if (k == 0) {
							secuencia = "Sec."+ sevent[5]
						} else {
					
							var dia = day + arraySesiones[k-1][0]*1;
							//titulo= clave + nombre + tipo horario + horario
							var titulo = curso[0]+" "+curso[1]+ "-"+ hor[0] + " "+hor[1]+ " "+secuencia;
							
							var nuevoEvento = { "id":idem,
				               					"start": new Date(year, month, dia, arraySesiones[k-1][1]*1,arraySesiones[k-1][2]*1),
				              					"end": new Date(year, month, dia, arraySesiones[k-1][3]*1,arraySesiones[k-1][4]*1),
				               					"title":titulo ,
					       						"tipohor":hor[0]
				            				  };
				            idem++;
				            listaEvento[indiceEven] = nuevoEvento;
				            indiceEven++;
				            //y se reinicia la secuencia con el valor inicial
							secuencia = "Sec." + sevent[5]
						}
				   }
				   fechaAux = sevent[0]+sevent[1]+sevent[2]+sevent[3]+sevent[4];
				}
				var dia = day + arraySesiones[k-1][0]*1;
				//titulo= clave + nombre + tipo horario + horario
				var titulo = curso[0]+" "+curso[1]+ "-"+ hor[0] + " "+hor[1]+ " "+secuencia;				
				var nuevoEvento = { "id":idem,
				               		"start": new Date(year, month, dia, arraySesiones[k-1][1]*1,arraySesiones[k-1][2]*1),
				              		"end": new Date(year, month, dia, arraySesiones[k-1][3]*1,arraySesiones[k-1][4]*1),
				               		"title":titulo ,
					       			"tipohor":hor[0]
				            	};
				 idem++;
				 listaEvento[indiceEven] = nuevoEvento;
				 indiceEven++;
			}
		  }
	    }
	    //luego que se agregaron todos los cursos de una solucion se agrega al grupo de soluciones
		sesionesHorario[0] = listaEvento;
    } else {
    //si no hay data se reinical el vector global
    sesionesHorario = new Array;
    }
}

function transformaSesion(cadena){
var cad1 = cadena
var arraySesion = new Array;
var cont = 0
  if (cad1 != null) {
	  var sesion=cad1.split('<BR>')
	  for (var i = 0; i<sesion.length; i++ ) {
	  	 arraySesion[cont] = transformaUnaSesion(sesion[i])
	  	 cont++
	  }
  }
  return arraySesion
}

function transformaUnaSesion(sesion) {
    var unaSesion = new Array;
    var parte = sesion.substring(0,3)
	var nundia = obtieneDiaSemanaNum(parte);
	unaSesion[0] = nundia;
	unaSesion[1]= sesion.substring(4,6);//hora inicio
	unaSesion[2]= sesion.substring(7,9);//minuto inicio
	unaSesion[3]= sesion.substring(10,12);//hora fin
	unaSesion[4]= sesion.substring(13,15);  //minuto fin
	unaSesion[5]= trim(sesion.substring(16));  //secuencia

return unaSesion;
}

function obtieneDiaSemanaNum(cadena){

if (cadena != null) {
  if ( cadena=='LUN'){ 
	return '0'
  }else if (cadena=='MAR'){
	return '1'
  }else if (cadena=='MIE'){
	return '2'
  }else if (cadena=='JUE'){
	return '3'
  }else if (cadena=='VIE'){
	return '4'
  }else if (cadena=='SAB'){
	return '5'
  }else if (cadena=='DOM'){
	return '6'
  } else {
  	return '0'
  }
 }else{
	return '0'
  }
}

function mostrarmsgvacanteCondicionada(cursos) {
	  var tienevaccondicionada = false;
	  if (cursos.data.length>0) {
	    var data = cursos.data;
	    for (var i = 0; i < data.length; i ++) {
	      var curso = data[i];
		  var horarios = curso[3];
		  if (!tienevaccondicionada){
	       for (var j = 0; j < horarios.length; j++) {
		     var horario = horarios [j];
			 if (horario[2]=="Vacante condicionada"){
			   tienevaccondicionada = true;	 
			   break;
			 }
		   }
		  }else{
		    break;
		  }
	    }
	  }
	  var divCuadroInf = $("msgvacantecondicionada");
	  divCuadroInf.removeChilds();
	  if (tienevaccondicionada){
	    var tableCudro = divCuadroInf.createTable();
		tableCudro.width = "100%"
		var tbodyCuadro = tableCudro.createTbody();
		var trCuadro = tbodyCuadro.createTr(); 
	    trCuadro.className = "pucpCelda";
		//trCuadro.addTextRow(["<br><font color=\"#4866ad\">Si usted visualiza el mensaje </font><font color=\"red\"><b>\"VACANTE CONDICIONADA\"</b></font> <font color=\"#4866ad\">en la columna \"Posición relativa\" indica que <b>EN ESTE PROCESO</b> la Unidad Académica del curso no ofrece vacantes para tu unidad. En la etapa de modificación de la inscripción la Unidad Académica del curso podria modificar esta oferta. Como por ejemplo, los alumnos de Estudios Generales Letras que adelantan cursos en facultad competirán por vacantes a partir de la etapa de modificación de la inscripción.</font><br>"]);
	    trCuadro.addTextRow(["<br><font color=\"#4866ad\">Si usted visualiza el mensaje </font><font color=\"red\"><b>\"VACANTE CONDICIONADA\"</b></font> <font color=\"#4866ad\">en la columna \"Posición relativa\" indica que la asignación de vacantes dará prioridad a los alumnos de la Unidad del curso.</font><br>"]);
	  }
	}

/*
function createRequest () {
    var xmlHttp=false;
    try{xmlHttp=new XMLHttpRequest();}
    catch(e){
        try{
            xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch(e){
            try{
                xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(e){
                return false;
            }
        }
    }
    return xmlHttp;
}

function serveForm (delegate, args, target, parameters) {
    var req=createRequest();
        req.onreadystatechange=function(){
        if (req.readyState  == 4) {delegate (req, args);}
    }
    req.open("POST",target,true);
    req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    req.send(parameters);
}*/