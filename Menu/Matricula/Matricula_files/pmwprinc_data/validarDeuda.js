function validaImpedimentos(){
	
	var url="/pucp/prematri/pmwprinc/pmwprinc;jsessionid="+session+"?accion=ValidarImpedimentos";
	//var url="/pucp/prematri/pmwprinc/pmwprinc?accion=ValidarImpedimentos";
	try{top.mostrarIconoCarga();}catch(excepcion){};
	realizaRequestImpedimentos(url,null);
}

function realizaRequestImpedimentos(urlPasado){
	
	$.ajax({
          url: urlPasado,
          global: false,
          type: 'POST',
          //data: formData,
          contentType: false,
          processData:false,
          dataType: 'xml',
          async:true,
          cache:false,
          success: function(archXML){
        	  var result=$(archXML).find('datos');
        	  var error=result.find('error').text();
        	  
        	  if (error==""){
        		  var sImpedimentos=result.find('impedimentos').text();
        		  if ($.trim(sImpedimentos)==""){
        			  $("#enlaceImpedimento").hide();
        			  $("#mensajeImpedimiento").hide();
        			  $("#mensajeNoImpedimiento").show();
        		  }else{
        			  $("#enlaceImpedimento").hide();
        			  $("#mensajeNoImpedimiento").hide();
        			  $("#mensajeImpedimiento").text(sImpedimentos).show();
        		  }
        		  try{top.ocultarIconoCarga();}catch(excepcion){}
        	  }else{
        		  alert('Ocurrió un error inesperado o puede haber perdido sesión, inténtelo más tarde');
        		  try{top.ocultarIconoCarga();}catch(excepcion){}
        	  }
			  
          },
          error:function(request,error){
        	  alert('Ocurrió un error inesperado o puede haber perdido sesión, inténtelo más tarde');
        	  try{top.ocultarIconoCarga();}catch(excepcion){}
          }
	});		
}