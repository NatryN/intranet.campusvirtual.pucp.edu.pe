//js de la pantalla padre contiene los arrays y el llamado a la pantalla contactos
var arrayCPucpCodigos = new Array();
var arrayCPucpEmails = new Array();
var arrayCPucpNombres = new Array();
var arrayCNoPucpCodigos = new Array();
var arrayCNoPucpEmails = new Array();
var arrayCNoPucpNombres = new Array();
var arrayGrupoCodigos = new Array();
var arrayGrupoEmails = new Array();
var arrayGrupoNombres = new Array();
var arrayGrupoEmailsInteg = new Array();
var arrayGrupoPropiedades = new Array();
var arrayCCoWebEmails = new Array();
var arrayCCoWebNombres = new Array();
var w = null;


//función que crea una ventana direccionada a ver el detalle de un grupo
//recibe sesion, código del grupo y un indicador (0:Breve detalle, 1:Mas Información)
function VerDetalleGrupo(sesion, pCodigoGrupo, pIndicaTipoVista)
{ 
  if(pIndicaTipoVista == "0"){
    urlDetalleGrupo="/pucp/grupos/grwgrupo/grwgrupo;jsessionid=" + sesion + "?accion=AbrirGrupo&grupo=" + pCodigoGrupo + "&tipoVista=Parcial&indicaCerrar=1";
  }else{
    urlDetalleGrupo="/pucp/grupos/grwgrupo/grwgrupo;jsessionid=" + sesion + "?accion=AbrirGrupo&grupo=" + pCodigoGrupo + "&tipoVista=Total&indicaCerrar=1";
  }
  if (w && !w.closed){
    w.location = urlDetalleGrupo;
    w.focus();
  }else{
    //sesion = sesion.replace(/-/g, "").replace(/:/g, "").replace(/_/g, "").replace(/./g, "");
    sesion = sesion.replace(/\-/g, "").replace(/\:/g, "").replace(/_/g, "").replace(/\./g, "");
    w = window.open(urlDetalleGrupo, "MisContactos"+sesion, "width=600,height=540,status=no,resizable=yes,toolbar=no,scrollbars=yes,left=100,top=0",false);  
    w.focus();

  } 
}
 

function MostrarValores()
{
  alert('Valores Padre: Arreglo PUCP:' + arrayCPucpCodigos + ' - ' + arrayCPucpNombres + ' - ' + arrayCPucpEmails + 
  ' Arreglo NoPucp:'+ arrayCNoPucpCodigos + ' - ' + arrayCNoPucpNombres + ' - ' + arrayCNoPucpEmails);     
}

/*
  Función de prueba para argumentos variables
  Parámetros de entrada: sesion, retornarContactos, tipoFiltro y 
  En caso fuese Curso Regular se reciben -> tipoFiltro='C*', cicloano, ciclo, tipociclo, clavecurso
  En caso fuese Curso No Regular se reciben -> tipoFiltro='P*', tipoProceso, IdentificaProceso
*/
function VerMisContactos(sesion)
{ 
  //variables 
  bContinuar = true;
  sParametro2 = "";
  sRetornarContactos = "";
  sVerCursosNoExplicitos = "";
  sTipoFiltro= "";
  sCicloAno = "";
  sCiclo = "";
  sTipoCiclo = "";
  sClaveCurso = "";
  sTipoProceso = "";
  sIdentificaProceso = "";

  //lee los argumentos variables
  //if(arguments.length==VerMisContactos.length){//si solo se ingreso sesión
  if(arguments.length==1){//si solo se ingreso sesión
    sTipoFiltro = 'TODOS';
  }else{
    sParametro2 = Trim(arguments[1]);
    if((sParametro2=="")||(sParametro2==null)){//por default
      sRetornarContactos="1";
      sVerCursosNoExplicitos="1";
    }else{
      if(sParametro2.length > 1){
        sRetornarContactos=sParametro2.substring(0,1); //primer dígito
        sVerCursosNoExplicitos=sParametro2.substring(1,2); //segundo dígito
      }else{//solo recibió un dígito
        sRetornarContactos=sParametro2.substring(0,1); 
        sVerCursosNoExplicitos="1";//por default            
      }
    }
    sTipoFiltro = new String(Trim(arguments[2])).toUpperCase();
    if(sTipoFiltro=='C*'){//si es tipo curso regular
      sCicloAno = Trim(arguments[3]);
      sCiclo = Trim(arguments[4]);
      sTipoCiclo = Trim(arguments[5]);
      sClaveCurso = new String(Trim(arguments[6])).toUpperCase();
    }else if(sTipoFiltro=='P*'){//si es tipo curso No regular
      sTipoProceso = new String(Trim(arguments[3])).toUpperCase();
      if(sTipoProceso.length!=3){
        alert("No se pueden mostrar los contactos. El dato de tipo proceso enviado no es correcto.");
        bContinuar=false;
      }
      sIdentificaProceso = AgregarCadenaIzq(arguments[4], "0", 8);
    }
  }
  if((sRetornarContactos=="")||(sRetornarContactos==null)){sRetornarContactos="1";}
  if((sVerCursosNoExplicitos==null)||(Trim(sVerCursosNoExplicitos)=="")){sVerCursosNoExplicitos="1";}
  //urlMisContactos="/pucp/grupos/grwgrupo/grwgrupo;jsessionid=" + sesion + "?accion=VerMisContactos&comboGruposCurso=&retornarContactos=" + sRetornarContactos + "&tipoFiltro=" + sTipoFiltro + "&cicloAno=" + sCicloAno + "&ciclo=" + sCiclo + "&tipoCiclo=" + sTipoCiclo + "&claveCurso=" + sClaveCurso + "&tipoProceso=" + sTipoProceso + "&identificaProceso=" + sIdentificaProceso;
  urlMisContactos="/pucp/grupos/grwgrupo/jsp/EsperaVerMisContactos.jsp;jsessionid=" + sesion + "?accion=VerMisContactos&comboGruposCurso=&retornarContactos=" + sRetornarContactos + "&tipoFiltro=" + sTipoFiltro + "&cicloAno=" + sCicloAno + "&ciclo=" + sCiclo + "&tipoCiclo=" + sTipoCiclo + "&claveCurso=" + sClaveCurso + "&tipoProceso=" + sTipoProceso + "&identificaProceso=" + sIdentificaProceso + "&sVerCursosNoExplicitos=" + sVerCursosNoExplicitos;
  if (bContinuar==true){
    if (w && !w.closed){
      w.location = urlMisContactos;
      w.focus();
    }else{
      //elimina el guión de la sesión
      sesion = sesion.replace(/\-/g, "").replace(/\:/g, "").replace(/_/g, "").replace(/\./g, "");
      //sesion.replace(/[:_\.\-]/g, "");
      w = window.open(urlMisContactos, "MisContactos"+sesion, "width=600,height=540,status=no,resizable=yes,toolbar=no,scrollbars=yes,left=100,top=0",false);
      w.focus();
    }
  } 
}


//función que elimina los espacios en blanco de un string
function Trim(s){
  sCadena=(s!=null)?s:"";
  var i=0, aux=sCadena; 
  while (i<sCadena.length && sCadena.charAt(i)==' ')
    aux = sCadena.substring(++i);
  return aux;
}
 
//Función que completa con ceros a la izq de una cadena
function  AgregarCadenaIzq(pCadena, pSubCadena, longCadena){
      sCadena = (pCadena!=null)?Trim(pCadena):"";
      for( i=0; i<(longCadena - pCadena.length); i++)
           sCadena = pSubCadena + sCadena;
      return sCadena;
}