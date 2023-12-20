function body_load(){
  select_orden_change()
  select_cicloano_change()
}
function select_cicloano_change(){
  var cadena = document.formulario.unformatcicloanociclo.options[document.formulario.unformatcicloanociclo.selectedIndex].value
  document.formulario.cicloano.value = cadena.substr(0,4)
  document.formulario.ciclo.value=cadena.substr(4,2)
  document.formulario.tipociclo.value=cadena.substr(6,2)  
}
function select_orden_change(){
  document.formulario.orden.value =document.formulario.unformatorden.options[document.formulario.unformatorden.selectedIndex].value
}
function clavecurso_onchange() {
	var cadena =  new String(document.formulario.unformatclavecurso.value);
	document.formulario.clavecurso.value=cadena.toUpperCase();   
   if (cadena.length==6){
      document.formulario.accion.value="Abrir";
     // document.formulario.submit();
   }
   else{
      document.formulario.accion.value="Buscar";
	}	 
}
function nombrecurso_onchange() {
	var cadena =  new String(document.formulario.unformatnombre.value)
	document.formulario.nombrecurso.value=cadena.toUpperCase()
}
function horario_onchange() {
	var cadena =  new String(document.formulario.unformathorario.value)
	document.formulario.horario.value=cadena.toUpperCase()
}
function boton_presionado() {
  var cadena=new String(document.formulario.unformatclavecurso.value)
  if (cadena.length==6)
    document.formulario.accion.value="Abrir";
  else
    document.formulario.accion.value="Buscar";  
	document.formulario.submit()
}
function texto_onclick(clave){
  document.formulario.clavecurso.value=clave
  document.formulario.submit()
}
function on_ordenar(nuevoorden){
  if (document.formularioorden.orden.value==nuevoorden){
   if (document.formularioorden.ascdesc.value=="ASC")
      document.formularioorden.ascdesc.value="DESC"
   else
      document.formularioorden.ascdesc.value="ASC"      
  }
  else{
    document.formularioorden.orden.value=nuevoorden;
    document.formularioorden.ascdesc.value="ASC";
  }
  document.formularioorden.submit()
}
		 
function mostrarInformacion(){
opc=document.formularioorden.opcRendimi.value;

if(opc=="0") {document.formularioorden.opcRendimi.value="1";}
else {document.formularioorden.opcRendimi.value="0"}

document.formularioorden.submit()

}

 function IrAPagina(){
 document.formulariofotos.pagina.value=document.salto.numpagina.options[document.salto.numpagina.selectedIndex].value;
 document.formulariofotos.submit();
 }
 
 
function IrAPaginaNumero(pagina){
 document.formulariofotos.pagina.value=pagina;
 document.formulariofotos.submit();
 } 

function copiar_disco(){
document.formulariocopiar.accion.value="copiar";
document.formulariocopiar.submit()
}

function copiar_notas(){

document.formulariocopiar.accion.value="copiarNota";
document.formulariocopiar.submit()

}




function filtrar_horario(hora,form)
{
 form.accion.value="Abrir"
 form.horario.value=hora
 form.submit()
}


function enviar_mail(sesion){
	var i= new Number(document.formresultado.total.value);
	j=0;
	marcado=false;
	if (i==1){
  
  		marcado=document.alumnos.seleccionados.checked
	}
	else{
  		while (j<i){
    		marcado=marcado|document.alumnos.seleccionados[j].checked
    		j++
  		}
	}
	if (marcado){
		var sendto= new String();
		j=0;
//////////////////////////////////////////////
		if (i==1){
			if (document.alumnos.seleccionados.checked)
				sendto=document.alumnos.seleccionados.value;
		}
		else{
			token='';		
  			while (j<i){
				if(document.alumnos.seleccionados[j].checked){
					sendto=sendto+token+document.alumnos.seleccionados[j].value;
					token=','
				}	
    			j++
  			}  			
		}
		if (sesion=='1'){
			document.correo.dirPara.value=sendto;
     // alert(document.correo.accion.value);
			document.correo.submit();
		}
		else
			self.location.href='mailto:'+sendto;		
	}
	else
		alert('Seleccione los alumnos a los que desee enviar un mail');
}

function SeleccionaTodos(form)
{
     for(i=0 ; i<form.elements.length; i++)
     {
       if(form.elements[i].type == "checkbox" && form.elements[i].name == "seleccionados")
       {
         if (form.opcion.value=="1")
               form.elements[i].checked = true;
         else
              form.elements[i].checked = false;
       }
     }
     
     if(form.opcion.value=="1")
      form.opcion.value="0";
     else
      form.opcion.value="1";
}

function abrirTrabajoInvestigacion(codAlumno, curso, cicloAnho, ciclo, tipoCiclo){

  window.location= "/pucp/ocr/ocwsegba/ocwsegba?accion=AccionAbrirTrabajoInvestigacion&clavecurso="+curso+"&cicloano="+cicloAnho+"&ciclo="+ciclo+"&tipociclo="+tipoCiclo+"&codAlumno="+codAlumno;
	
}


