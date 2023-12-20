var w = null;

/*
  Función para argumentos variables
  Parámetros de entrada: sesion, tipoFiltro y 
  En caso fuese Curso Regular se reciben -> tipoFiltro='C*', cicloano, ciclo, tipociclo, clavecurso
  En caso fuese Curso No Regular se reciben -> tipoFiltro='P*', tipoProceso, IdentificaProceso
*/
function AbrirGruposChat(sesion)
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
      window.location = urlGruposChat;
      //top.frames[1].location=urlGruposChat;
  } 
}


//función que elimina los espacios en blanco de un string
function Trim(s){
  var i=0, aux=(s!=null)?s:"";
  while (i<s.length && s.charAt(i)==' ')
    aux = s.substring(++i);
  return aux;
}
 
//Función que completa con ceros a la izq de una cadena
function  AgregarCadenaIzq(pCadena, pSubCadena, longCadena){
      sCadena = (pCadena!=null)?Trim(pCadena):"";
      for( i=0; i<(longCadena - pCadena.length); i++)
           sCadena = pSubCadena + sCadena;
      return sCadena;
}