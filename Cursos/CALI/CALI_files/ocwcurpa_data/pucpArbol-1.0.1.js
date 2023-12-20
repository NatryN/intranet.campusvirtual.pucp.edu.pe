/**
La librería requiere como minimo jquery 1.9.1. Para las siguientes funcionalidades opcionales se requieren de las siguientes librerias:
-Busqueda con autocompletar: jquery ui-1.11.4 o mayor
-Permitir reorganizar las opciones: jquery ui-1.11.4 o mayor
-Guardar y obtener preferencias: nada extra
 */
var instanciaArbolMenu=null;//Interfaz de la libreria

//Polyfill includes
if (!String.prototype.includes) {
	String.prototype.includes = function() {
		'use strict';
		return String.prototype.indexOf.apply(this, arguments) !== -1;
	};
}
//Método clonar para arrays
if (!Array.prototype.clone){
	Array.prototype.clone = function() {
		return this.slice(0);
	};
}

//Polyfill indexof
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(searchElement, fromIndex) {
		var k;
		// 1. Let o be the result of calling ToObject passing
		//    the this value as the argument.
		if (this == null) {
		  throw new TypeError('"this" is null or not defined');
		}
		var o = Object(this);
		// 2. Let lenValue be the result of calling the Get
		//    internal method of o with the argument "length".
		// 3. Let len be ToUint32(lenValue).
		var len = o.length >>> 0;
		// 4. If len is 0, return -1.
		if (len === 0) {
		  return -1;
		}
		// 5. If argument fromIndex was passed let n be
		//    ToInteger(fromIndex); else let n be 0.
		var n = fromIndex | 0;
		// 6. If n >= len, return -1.
		if (n >= len) {
		  return -1;
		}
		// 7. If n >= 0, then Let k be n.
		// 8. Else, n<0, Let k be len - abs(n).
		//    If k is less than 0, then let k be 0.
		k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
		// 9. Repeat, while k < len
		while (k < len) {
			// a. Let Pk be ToString(k).
			//   This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the
			//    HasProperty internal method of o with argument Pk.
			//   This step can be combined with c
			// c. If kPresent is true, then
			//    i.  Let elementK be the result of calling the Get
			//        internal method of o with the argument ToString(k).
			//   ii.  Let same be the result of applying the
			//        Strict Equality Comparison Algorithm to
			//        searchElement and elementK.
			//  iii.  If same is true, return k.
			if (k in o && o[k] === searchElement) {
				return k;
			}
			k++;
		}
		return -1;
	};
}
//Polyfill filter
if (!Array.prototype.filter) {
	Array.prototype.filter = function(fun/*, thisArg*/) {
	'use strict';

	if (this === void 0 || this === null) {
	  throw new TypeError();
	}

	var t = Object(this);
	var len = t.length >>> 0;
	if (typeof fun !== 'function') {
	  throw new TypeError();
	}

	var res = [];
	var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
	for (var i = 0; i < len; i++) {
	  if (i in t) {
		var val = t[i];

		// NOTE: Technically this should Object.defineProperty at
		//       the next index, as push can be affected by
		//       properties on Object.prototype and Array.prototype.
		//       But that method's new, and collisions should be
		//       rare, so use the more-compatible alternative.
		if (fun.call(thisArg, val, i, t)) {
		  res.push(val);
		}
	  }
	}

	return res;
	};
}

function inicializarArbolMenu(){
	/**
	*Crea una instancia del arbol menu
	*@class 
	*@classdesc Clase encargara de crear y mantener un arbol de opciones. Adicionalmente ofrece funcionalidades para imprimir 
	*una representacion en HTML de uno o varios arboles haciendo uso de sus metodos de impresion por defecto o alguno que haya sido configurado por el usuario.
	*/
	function ArbolMenu(){
		var forest=[];//Contenedor de los arboles
		var rutas=[];//Contendor de las rutas de cada elemento de un arbol('arbol','elemento 1'.....,'elemento padre')
		var configuracion={};//Usado para almacenar las preferencias del usuario(orden de items e items desplegados)
		var prefCargadas=false;
		var accentMap= {"á": "a","é": "e","í": "i","ó": "o","ú": "u"};//Mapa de equivalencia entre caracteres con tílde y los que no la tienen
		var normalize = function( term ) {//Funcion que permite el autocompletar usando palabras con o sin tilde
			var ret = "";
			for ( var i = 0; i < term.length; i++ ) {
				ret += accentMap[ term.charAt(i) ] || term.charAt(i);
			}
			return ret;
		};

		var funcionesImpresion=[];
		var inicializadoAutocompletar=false;
		var idPanel;
		var idSesion;
		var indGuardarConf=false;
		var defArbol={numColumnas:3,claseColumnas:"col-md-4 col-sm-6 col-xs-12"};

		/**
		*@description
		*Permite configurar opciones adicionales en la libreria
		*@param {object} datosConf- Contiene  los datos de las opciones adicionales
		*@param {boolean} [datosConf.indGuardarConf=false] - indica si se activa la funcionalidad de guardado de preferencias para esta intancia de la libreria.
		*@param {string} [datosConf.idSesion] - ID unico de sesion para poder diferenciar una cookie de una sesion anterior.
		*@param {string} datosConf.idPanel - ID UNICO usado para guardar la configuracion en BD.
		*/
		function pConfigurarLibreria(datosConf){
			if(typeof datosConf !== "undefined"){
				if(typeof datosConf.idPanel !== "undefined"){
					idPanel=datosConf.idPanel;
				}
				if(typeof datosConf.idSesion !== "undefined"){
					idSesion=datosConf.idSesion;
				}
				if(typeof datosConf.indGuardarConf !== "undefined"){
					indGuardarConf=datosConf.indGuardarConf;
				}

			}
		}

		/**
		*@description
		*Permite configurar el numero de columnas que se imprimiran por cada arbol. En caso no desee usar las columnas creadas por la libreria asigne el numero 0.
		*@param nColumnas: numero de columnas.
		*@param cColumna: clase que se le asignará a las columnas.
		*/
		function pConfigurarNumeroColumnas(nColumnas,cColumna){
			if(typeof nColumnas !== "undefined" && pEsNumero(nColumnas)){
				defArbol.numColumnas=nColumnas;
			}
			if(typeof cColumna !== "undefined" && typeof cColumna == "string"){
				defArbol.claseColumnas=cColumna;
			}
		}

		/**
		*@description
		*Permite crear un nuevo arbol. Para trabajar con la libreria siempre sera necesario crear al menos un arbol
		*@param {string} idArbol - La ID del nuevo arbol, esta debe ser única.
		*@param {string} titulo - El titulo del nuevo arbol, usado en la creacion de la busqueda de elementos.
		*@param {object} [conf] Configuracion opcional del arbol.
		*@param {boolean} [conf.reorganizable=false] - Permite que el usuario reorganize los elementos entre las columnas. En caso no se hayan creado columnas la configuración se aplicará al contenedor. Se omiten los elementos con clase 'notSortable'
		*@param {boolean} [conf.preferencias=false] - Permite que el arbol haga uso de preferencias guardadas por el usuario(orden e items desplegados)
		*@param {boolean} [conf.organizarColumnas=false] - Indica si durante la impresion del arbol la libreria decide en que columna debe ir cada elemento. Se da preferencia a la configuración del usurio, en caso exista.
		*/
		function pNuevoArbol(idArbol,titulo,conf){
			if(typeof forest[idArbol] == "undefined" && idArbol!=="todos"){
				var nuevoArbol=[];
				nuevoArbol["titulo"]=titulo;
				nuevoArbol["id"]=idArbol;
				nuevoArbol["items"]=[];
				//Configuracion por defecto
				nuevoArbol["numcolumnas"]=defArbol.numColumnas;
				nuevoArbol["clasecolumnas"]=defArbol.claseColumnas;
				nuevoArbol["reorganizable"]=Boolean(0);
				nuevoArbol["preferencias"]=Boolean(0);
				nuevoArbol["organizarColumnas"]=Boolean(0);
				if(typeof conf !== "undefined"){
					//Configuración opcional
					if(typeof conf["reorganizable"] !=="undefined"){
						nuevoArbol["reorganizable"]=Boolean(conf["reorganizable"]);
						if(nuevoArbol["reorganizable"]){
							if(!nuevoArbol["clasecolumnas"].includes(" sortable")){
								nuevoArbol["clasecolumnas"]+=" sortable";
							}
							if(!nuevoArbol["clasecolumnas"].includes(" connectedSortable")){
								nuevoArbol["clasecolumnas"]+=" connectedSortable";
							}
						}
					}
					if(typeof conf["preferencias"] !=="undefined"){
						nuevoArbol["preferencias"]=Boolean(conf["reorganizable"]);
					}
					if(typeof conf["numcolumnas"] !=="undefined"&& pEsNumero(conf["numcolumnas"])){
						nuevoArbol["numcolumnas"]=conf["numcolumnas"];
					}
					if(typeof conf["clasecolumnas"] !=="undefined" && typeof conf["clasecolumnas"]=="String"){
						nuevoArbol["clasecolumnas"]=conf["clasecolumnas"];
					}
					if(typeof conf["organizarColumnas"] !=="undefined"){
						nuevoArbol["organizarColumnas"]=Boolean(conf["organizarColumnas"]);
					}
				}
				forest[idArbol]=nuevoArbol;
				forest.push(nuevoArbol);
			}
			else{
				try{
					console.log("Arbol '"+idArbol+"' ya existe");
				}catch(err){
					alert("Arbol '"+idArbol+"' ya existe");
				}
			}
		}

		/**
		*@description Permite agregar elementos. La distincion entre los elementos de primer nivel y los demas es que estos pueden ser asignados a un arbol y columna especificos.
		*@param {string} idMenu - Es la id del elemento, el cual debe ser único en toda la pagina.
		*@param {string} texto - El texto del elemento.
		*@param {string} url - La url o funcion JS que debe ejecutar el elemento. En caso el elemento tenga hijos, en la versión por defecto, no se tomara en cuenta este parametro.
		*@param {object} [conf] - Objeto que contiene datos adicionales que pueden modificar las caracteristicas del item.
		*@param {boolean} [conf.desplegado=false] - Indica si el objeto, al imprimirse, debe estar desplegado o no. Solo es válido si el elemento es desplegable.
		*@param {boolean} [conf.oculto=false] - Indica si el objeto, al imprimirse, debe estar oculto o no.
		*@param {number} [conf.numColumna=0] - La columna a la cual debe agregarse el elemento. En caso se obvie se pondrá el valor 0.
		*@param {string} [conf.idArbol=<ID del primer arbol creado>] - La ID del arbol al cual se agregara el elemento.
		*@param {string} [conf.claseExtra=<clase por defecto de la librería>] - clases de CSS que se agregaran al contenedor principal de este elemento.
		*@param {object} [conf.datosExtra] - Objecto que sirve para guardar información extra. No se utiliza en la versión por defecto del arbol. Implementado para facilitar modificaciones por parte de los usuarios.
		*/
		function pAgregarElementoPrimerNivel(idMenu,texto,url,conf){
			var arbol;

			if(rutas[idMenu]){
				throw "Ya existe un elemento '"+idMenu+"'.";
			}

			//Creamos el registro de indice para el item
			rutas[idMenu]=[];

			if(typeof conf =="undefined"){//fallback para cuando conf no es enviado
				conf={};
			}

			if(forest.length==0){
				throw "No hay ningun arbol registrado";
			}

			if( typeof conf.idArbol == "undefined" || conf.idArbol== ""){
				arbol=forest[0];
			}
			else{
				if(typeof forest[conf.idArbol] !== "undefined"){
					arbol=forest[conf.idArbol];
				}
				else{
					throw "El arbol '"+conf.idArbol+"' no existe.";
				}
			}

			//Guardamos el arbol donde se encuentra el elemento
			rutas[idMenu].push({id:arbol["id"],indice:0,texto:arbol["titulo"]});

			//Creamos el contenedor de los datos de item
			var item=[];
			item["id"]=idMenu;
			item["texto"]=texto?texto:"Elemento Nro"+(arbol["items"].length+1);
			item["url"]=url;
			item["numColumna"]=0;
			item["desplegado"]=Boolean(0);
			item["oculto"]=Boolean(0);

			if(typeof conf.datosExtra !== "undefined"){
				item["datosExtra"]=conf.datosExtra;
			}
			if(typeof conf.claseExtra !== "undefined"){
				item["claseExtra"]=conf.claseExtra;
			}
			if(typeof conf.numColumna !== "undefined"){
				item["numColumna"]=conf.numColumna;
			}
			if(typeof conf.desplegado !== "undefined"){
				item["desplegado"]=Boolean(conf.desplegado);
			}
			if(typeof conf.oculto !== "undefined"){
				item["oculto"]=Boolean(conf.oculto);
			}


			var contenedorItems=arbol["items"];

			//Guardamos el indice del elemento
			rutas[idMenu].push({id:item["id"],indice:contenedorItems.length,texto:item["texto"]});
			//agregamos el elemento al arbol
			contenedorItems.push(item);
			arbol[idMenu]=item;
		}

		/**
		*@description
		*Permite agregar elementos.
		*@param {string}idMenu - Es la id del elemento, la cual debe ser unica en toda la pagina.
		*@param {string}texto - El texto del elemento.
		*@param {string}url - La url o funcion JS que debe ejecutar el elemento. En caso el elemento tenga hijos, en la versión por defecto, no se tomara en cuenta este parametro.
		*@param {string}idPadre - La ID del elemento al cual se agregará como hijo.
		*@param {object}[conf] - Objeto que contiene datos adicionales que pueden modificar las caracteristicas del item.
		*@param {boolean}[conf.desplegado=false] - Indica si el objeto, al imprimirse, debe estar desplegado o no. Solo es válido si el elemento es desplegable.
		*@param {boolean}[conf.oculto=false] - Indica si el objeto, al imprimirse, debe estar oculto o no.
		*@param {string}[conf.extraerContenidoDe] - Indica el objeto del cual se debe extraer el contenido. Descarta las propiedades "texto" y "url".
		*@param {string}[conf.claseExtra] - clases de CSS que se agregaran al contenedor principal de este elemento.
		*@param {object}[conf.datosExtra] - Objecto que sirve para guardar información extra(opcional - No se utiliza en la versión por defecto del arbol. Implementado para facilitar modificaciones por parte de los usuarios).
		*/
		function pAgregarElemento(idMenu,texto,url,idPadre,conf){
			//verificamos que no exista otro elemento con su misma ID
			if(rutas[idMenu]){
				throw "Ya existe un elemento '"+idMenu+"'.";
			}

			//Creamos el contenedor de los datos de item
			var item=[];
			item["id"]=idMenu;
			item["texto"]=texto;
			item["url"]=url;
			item["desplegado"]=Boolean(0);
			item["oculto"]=Boolean(0);

			if(typeof conf =="undefined"){//fallback para cuando conf no es enviado
				conf={};
			}

			if(typeof conf.datosExtra !== "undefined"){
				item["datosExtra"]=conf.datosExtra;
			}
			if(typeof conf.extraerContenidoDe !== "undefined"){
				item["extraerContenidoDe"]=conf.extraerContenidoDe;
			}
			if(typeof conf.claseExtra !== "undefined"){
				item["claseExtra"]=conf.claseExtra;
			}
			if(typeof conf.desplegado !== "undefined"){
				item["desplegado"]=Boolean(conf.desplegado);
			}
			if(typeof conf.oculto !== "undefined"){
				item["oculto"]=Boolean(conf.oculto);
			}

			//Creamos el registro de indice para el item
			rutas[idMenu]=[];

			//segundo nivel o mas
			var rutaPadre=rutas[idPadre];

			if(!rutaPadre){
				throw "El elemento padre '"+idPadre+"' indicado para el elemento '"+idMenu+"' no existe.";
			}

			//Guardamos el indice del padre como parte del indice del elemento
			rutas[idMenu]=rutaPadre.clone();

			//obtenemos al padre
			var cursor=forest[rutaPadre[0]["id"]];
			for(i = 1; i < rutaPadre.length; i++){
				cursor=cursor["items"][rutaPadre[i]["indice"]];
			}
			if(typeof cursor["items"]== "undefined"){
				cursor["items"]=[];
			}
			rutas[idMenu].push({id:item["id"],indice:cursor["items"].length,texto:item["texto"]});
			cursor["items"].push(item);
		}
		
		/**
		*Permite obtener la ruta que se debe serguir en un arbol para obtener un elemento en especifico
		*@param idElemento - Id del elemento del cual se está buscando su ruta.
		*/
		function pObtenerRutaElemento(idElemento){
			if(typeof rutas[idElemento] !== "undefined"){
				return rutas[idElemento].clone();
			}
			else return null;
		}

		/**
		*@description
		*Permite imprimir en arbol indicado de acuerdo a las funciones de impresion establecidas por la libreria o el usuario.
		*@param {string}idDivContenedor - Es la id del elemento dentro del cual se imprimirá el arbol.
		*@param {object}[conf] - Objeto que contiene datos adicionales que pueden modificar el metodo de impresion usado o el arbol a imprimir.
		*@param {string}[conf.idArbol=<Id del primer arbol creado>] - Id del arbol a imprimir. En caso se omita, se imprimira el ultimo arbol creado.
		*@param {string}[conf.grupo] - Indica el grupo de funciones de impresion a utiliza. En caso se omita se utilizará la impresión por defecto.
		*/
		function pImprimirArbol(idDivContenedor,conf){

			var divContenedor=$("#"+idDivContenedor);
			var arbol;
			var idFinalArbol;
			var grupoImpresion;
			if(forest.length==0){
				throw "No hay ningun arbol registrado";
			}

			if(typeof conf =="undefined"){//fallback para cuando conf no es enviado
				conf={};
			}

			if(!conf.idArbol){
				arbol=forest[forest.length-1];
				idFinalArbol=arbol["id"];
				arbol["indImpreso"]=true;
			}
			else{
				if(typeof forest[conf.idArbol] !== "undefined"){
					arbol=forest[conf.idArbol];
					idFinalArbol=conf.idArbol;
					arbol["indImpreso"]=true;
				}
				else{
					throw "El arbol '"+conf.idArbol+"' no existe"
				}
			}

			grupoImpresion=conf.grupo;

			arbol["contenedor"]=divContenedor;
			//Creamos las columnas
			numColumnas=arbol["numcolumnas"];

			for(i=0;i<numColumnas;i++){
				var divColum=document.createElement("DIV");
				$(divColum).attr("id",idFinalArbol+"_divColum"+(i+1));
				$(divColum).addClass(arbol["clasecolumnas"]);
				$(divColum).attr("idArbol",idFinalArbol);
				$(divContenedor).append(divColum);
			}

			var procesarPrimerNivel= function(elemento,contenedor){
				var colaElementos=[];
				var elementoContenedor;
				var auxContenedor;
				var cont=0;
				//Detectamos la funcion a utilizar
				var fnNivel=pObtenerFuncion(colaElementos.length+1,grupoImpresion);
				/*Cargamos propiedades guardadas por el usuario*/
				var confDesplegado=(configuracion[idFinalArbol] && configuracion[idFinalArbol]["desplegados"])?configuracion[idFinalArbol]["desplegados"]:[];
				if(confDesplegado.indexOf(elemento["id"])>=0){
					elemento["desplegado"]=Boolean(1);
				}
				var contenedor=fnNivel.call(fnNivel,elemento,contenedor);
				if(typeof elemento["items"]!=="undefined" && elemento["items"].length>0 && contenedor!==null){
					colaElementos.push({atrElemento:elemento,atrContador:cont,atrContenedor:contenedor});
					var listaSubitems=colaElementos[colaElementos.length-1].atrElemento["items"];
					while (colaElementos.length>0) {
						if(cont>=listaSubitems.length) {
							var elementoRetirar=colaElementos.pop();
							cont=elementoRetirar.atrContador;
							elementoContenedor=elementoRetirar.atrContenedor;
							listaSubitems=colaElementos.length>0?colaElementos[colaElementos.length-1].atrElemento["items"]:[];
						}
						else{
							var item=listaSubitems[cont];
							//obtenemos la funcion que generará
							fnNivel=pObtenerFuncion(colaElementos.length+1,grupoImpresion);
							cont++;
							if(typeof fnNivel!=="undefined"){//Se ha definido una funcion para imprimir el nivel
								if(colaElementos.length==1 ){
									elementoContenedor=contenedor;
								}
								if(confDesplegado.indexOf(item["id"])>=0){
									item["desplegado"]=Boolean(1);
								}
								auxContenedor=fnNivel.call(fnNivel,item,elementoContenedor);
								if(typeof item["items"]!=="undefined" && item["items"].length>0){
									colaElementos.push({atrElemento:item,atrContador:cont,atrContenedor:elementoContenedor});
									listaSubitems=colaElementos[colaElementos.length-1].atrElemento["items"]
									elementoContenedor=auxContenedor;
									cont=0;
								}
							}
						}
					}
				}
			}
			//Carga de preferencias
			if(!prefCargadas){
				pObtenerPreferencias();
				prefCargadas=true;
			}

			//En caso se permita asignar automaticamente los items a las columnas, obtenemos la cantidad de items por columna
			var itemsxColumna=[];
			if(arbol["organizarColumnas"]&&numColumnas>0){
				var div=Math.floor(arbol["items"].length/numColumnas);
				for(var i=0;i<numColumnas;i++){
					itemsxColumna[""+(i+1)]=div;
				}
				var mod=arbol["items"].length%numColumnas;
				for(var i=0;(i<numColumnas && mod>0);i++){
					itemsxColumna[""+(i+1)]=itemsxColumna[""+(i+1)]+1;
					mod--;
				}
			}


			//Procesamos primero las preferencias, en caso existan
			var yaProcesados=[];
			var itemsAgregadosxcolumna=[];
			if(typeof configuracion[idFinalArbol] !== "undefined"){
				//Agregamos los items en el orden guardado
				var orderItemsPref=configuracion[idFinalArbol]["ordenItems"];
				for(var i=0;(i<orderItemsPref.length&& i<=numColumnas);i++){
					if(orderItemsPref[i]!=null){
						var idColumContenedor=idFinalArbol+"_divColum"+i;
						if(i==0){
							idColumContenedor=idDivContenedor;
						}
						itemsAgregadosxcolumna[""+i]=0;
						for(var j=0;j<orderItemsPref[i].length;j++){
							var idElemento=orderItemsPref[i][j];
							if(typeof arbol[idElemento]!== "undefined"){//En caso el item guardado en las preferencias ya no exista este no es procesado
								procesarPrimerNivel(arbol[idElemento],document.getElementById(idColumContenedor));
								yaProcesados[orderItemsPref[i][j]]='1';
								//contamos cuantos items han sido asignados por columna
								itemsAgregadosxcolumna[""+i]=itemsAgregadosxcolumna[""+i]+1;
							}
						}
					}
				}
			}


			//Procesamos los restantes
			var indColum=0;
			for(var indexItemArbol=0;indexItemArbol<arbol["items"].length;indexItemArbol++){
				var item=arbol["items"][indexItemArbol];
				if(typeof yaProcesados[item["id"]] == "undefined"){
					if(numColumnas>0){
						var idColumContenedor=idFinalArbol+"_divColum1";
						if(arbol["organizarColumnas"]){
							if(itemsxColumna[""+(indColum+1)]<=0){
								indColum++;
							}
							itemsxColumna[""+(indColum+1)]=itemsxColumna[""+(indColum+1)]-1;
							idColumContenedor=idFinalArbol+"_divColum"+(indColum+1);
							procesarPrimerNivel(item,document.getElementById(idColumContenedor));
						}else{
							if(typeof item["numColumna"] !=="undefined"){idColumContenedor=idFinalArbol+"_divColum"+item["numColumna"];}
							procesarPrimerNivel(item,document.getElementById(idColumContenedor));
						}
					}else{
						procesarPrimerNivel(item,divContenedor);
					}
				}
			}
			//Inicializamos la funcionalidad de reorganizacion de los elementos del menu
			if(arbol["reorganizable"]){
				var idColumSortable= ".sortable[idArbol='"+idFinalArbol+"']";
				if(numColumnas>0){
					var idColumConnectedSortable=".connectedSortable[idArbol='"+idFinalArbol+"']";
					$(idColumSortable).sortable({connectWith: idColumConnectedSortable,items: ">:not(.notSortable)"}).disableSelection();
				}else{
					$("#"+idDivContenedor).sortable({items: ">:not(.notSortable)"}).disableSelection();
				}

			}
		}

		/**
		*@description
		*Permite imprimir un cuadro de busqueda con autocompletar para uno o todos los arboles instanciados en la pagina.
		*
		*@param {string}idContenedor - Es la id del elemento dentro del cual se imprimirá el cuadro de busqueda.
		*@param {object}[conf] - Objeto que contiene las posibles configuraciones para la creación del cuadro de búsqueda.
		*@param {string}[conf.idArbol] - Indica la Id del arbol sobre el cual se creará el cuadro de búsqueda.
		*@param {boolean}[conf.indTodosArboles=false] - Indica si el cuadro de búsqueda debe crearse tomando en cuenta todos los arboles creados en  la página. Posee mayor prioridad que el atributo "idArbol".
		*@param {boolean}[conf.indOmitirArbolNoImpreso=false] - Indica si solo se deben toman en cuenta los arboles impresos. Tiene menos prioridad que el atributo "idArbol".
		*@param {number}[conf.numMinBusq] - Indica la cantidad mínima de caracteres a ingresar antes de activar el autocompletar. Por defecto: 3
		*@param {string}[conf.anadirA] - Selector del elemento al cual se debe incluir el menu de autocompletado. Si es nulo o no seteado el menu de autocompletado se añadirá al elemento Document.
		*/
		function pImprimirCuadrodeBusqueda(idContenedor,conf){
			if(!inicializadoAutocompletar){
				$.widget( "custom.catcomplete", $.ui.autocomplete, {
					_create: function() {
						this._super();
						this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category,.ui-autocomplete-tree)" );
					},
					_renderMenu: function( ul, items ) {
					  var that = this,
						currentTree = "";
						currentCategory = "";
						$.each( items, function( index, item ) {
							var li;
							if ( item.tree != currentTree ) {
								$(ul).append( "<li class='ui-autocomplete-tree'>" + item.tree + "</li>" );
								currentTree = item.tree;
							}
							if ( item.category != currentCategory ) {
								$(ul).append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
								currentCategory = item.category;
							}
							li = that._renderItemData( ul, item );
							if ( item.category ) {
								li.attr( "aria-label", item.category + " : " + item.label );
							}
						});
					}
				});
				inicializadoAutocompletar=true;
			}
			var arbol;
			if(typeof conf =="undefined"){
				conf={};
			}

			if(typeof conf.idArbol=="undefined" || conf.idArbol==""){
				arbol=forest[0];
				idFinalArbol=arbol["id"];
			}
			else{
				if(typeof forest[conf.idArbol] !== "undefined"){
					arbol=forest[conf.idArbol];
					idFinalArbol=conf.idArbol;
				}
				else{
					if(typeof conf.indTodosArboles =="undefined" || !conf.indTodosArboles){
						try{
						console.log("Arbol '"+conf.idArbol+"' no existe");
						}
						catch(err){
							alert("Arbol '"+conf.idArbol+"' no existe");
						}
						return;
					}
				}
			}
			var data=[];
			var generarDataxArbol=function(arbolL,agregarNombreArbol){
				var colaElementos=[];
				var colaContador=[];
				var colaContenedor=[];
				var elementoContenedor;
				var auxContenedor;
				colaElementos.push(arbolL);
				var cont=0;
				var dataL=[];
				var agregarNombreArbolL=false;
				if(typeof agregarNombreArbol !== "undefined"){
					agregarNombreArbolL=agregarNombreArbol;
				}
				while (colaElementos.length>0) {
					if(cont>=colaElementos[colaElementos.length-1]["items"].length) {
						colaElementos.pop();
						if(colaContador.length>0)cont=colaContador.pop();
						if(colaContenedor.length>0)elementoContenedor=colaContenedor.pop();
					}
					else{
						var item=colaElementos[colaElementos.length-1]["items"][cont];
						if(typeof item["items"]!=="undefined" && item["items"].length>0){
							colaElementos.push(item)
							colaContador.push(cont+1);
							cont=-1;
						}else{
							if(colaElementos.length==1 ){
								if(agregarNombreArbol){
									dataL.push({ label: item["texto"], category: "",tree:arbolL["titulo"],id:item["id"]});
								}
								else{
									dataL.push({ label: item["texto"], category: "",tree:"",id:item["id"]});
								}
							}
							else{
								if(agregarNombreArbol){
									dataL.push({ label: item["texto"], category: colaElementos[colaElementos.length-1]["texto"],tree:arbolL["titulo"],id:item["id"]});
								}
								else{
									dataL.push({ label: item["texto"], category: colaElementos[colaElementos.length-1]["texto"],tree:"",id:item["id"]});
								}
							}
						}
						cont=cont+1;
					}
				}
				return dataL;
			}
			if(typeof conf.indTodosArboles !=="undefined" && conf.indTodosArboles){
				for(var i=0;i<forest.length;i++){
					if(typeof conf.indOmitirArbolNoImpreso !=="undefined" && conf.indOmitirArbolNoImpreso && typeof arbol["indImpreso"] !== "undefined" && arbol["indImpreso"]){
						continue;
					}
					data=data.concat(generarDataxArbol(forest[i],true));
				}
			}
			else{
				data=data.concat(generarDataxArbol(arbol,false));
			}
			var numMinBusq=3;
			if(typeof conf.numMinBusq !== "undefined" && pEsNumero(conf.numMinBusq)){
				numMinBusq=conf.numMinBusq;
			}

			var anadirA=null;
			if(typeof conf.anadirA !== "undefined"){
				anadirA=conf.anadirA;
			}
			$( "#"+idContenedor ).catcomplete({
				delay: 0,
				minLength: numMinBusq,
				appendTo:anadirA,
				  select: function( event, ui ) {
					$( "#"+idContenedor ).val( ui.item.value );
					$( "#"+ui.item.id ).click();
				  },
			   source: function( request, response ) {
				var searchTerm=$.ui.autocomplete.escapeRegex( request.term ).trim();
				var words=searchTerm.split("\\ ");
				words.filter(function(value){return value.length>0;});
				var queryString="\\b"+words.join(".*\\b");
				var matcher = new RegExp(queryString, "i" );
				response( $.grep( data, function( value ) {
				  value = value.label || value.value || value;
				  return matcher.test( value ) || matcher.test( normalize( value ) );
				}) );
			  }
			});
			//resuelve problemas con la tecla enter
			$("#"+idContenedor).keydown(function(event){
				if(event.keyCode == 13) {
				  event.preventDefault();
				  return false;

				}
			 });

		}

		/**
		*@description
		*Permite guardar las preferencias del usuario para uno o todos los arboles de la pagina
		*@param funcionProcesarRespuesta - Funcion que procesará la respuesta de la operación de guardado.
		*@param [idArbol] - Representa la id del arbol sobre el cual se guardaran las preferencias. En caso se omita este valor se guardaran los datos para todos los arboles de la pagina.
		*/
		function pGuardarPreferencias(funcionProcesarRespuesta,idArbol){
			var guardarPrefxArbol=function(pIdArbol){
				var divContenedor=$(forest[pIdArbol]["contenedor"]);
				configuracion[pIdArbol]={};
				//obtenemos el orden de los items de primer nivel;
				configuracion[pIdArbol]["ordenItems"]=[];
				var  columnas=$(divContenedor).children("div[idArbol='"+pIdArbol+"']");
				if(columnas.length>0){
					$(columnas).each(function(index){
						var numColum=$(this).attr("id").replace(pIdArbol+"_divColum","");
						configuracion[pIdArbol]["ordenItems"][numColum]=[];
						var item=$(this).find(".tituloN1");
						for(var indexItem=0;indexItem<item.length;indexItem++){
							configuracion[pIdArbol]["ordenItems"][numColum].push($(item[indexItem]).attr("id"));
						}
					});
				}
				else{
					var item=$(divContenedor).find(".tituloN1");
					configuracion[pIdArbol]["ordenItems"]["0"]=[];
					for(var indexItem=0;indexItem<item.length;indexItem++){
						configuracion[pIdArbol]["ordenItems"]["0"].push($(item[indexItem]).attr("id"));
					}
				}

				//obtenemos la lista de item desplegados;
				if($(divContenedor).find(".desplegado").length>0){
					configuracion[pIdArbol]["desplegados"]=[];
					$(divContenedor).find(".desplegado").each(function(index){
						configuracion[pIdArbol]["desplegados"].push($(this).attr("id"));
					});
				}
			}
			if(typeof idPanel !=="undefined" && indGuardarConf){
				if(typeof idArbol =="undefined"){
					for(var i=0;i<forest.length;i++){
						if(forest[i]["preferencias"]){
							guardarPrefxArbol(forest[i]["id"]);
						}
					}
				}
				else{
					if(forest[idArbol]["preferencias"]){
						guardarPrefxArbol(idArbol);
					}
				}
				
				var jsonConfiguracion=JSON.stringify(configuracion);
				//Guardamos en BD
				pucpSetUsuarioConfiguracion(idPanel,jsonConfiguracion, funcionProcesarRespuesta);
				//Guardamos en cookie
				if(typeof idSesion =="undefined"){
					var now = new Date();
					var time = now.getTime();
					time += 3600 * 1000;
					now.setTime(time);
					setCookie(idPanel,jsonConfiguracion,now.toUTCString());
				}else{
					configuracion["sessionID"]=idSesion;
					setCookie(idPanel,jsonConfiguracion);
				}
			}
		}
		/**
		*@description
		*Permite obtener las preferencias del usuario para todos los arboles de la pagina
		*/
		function pObtenerPreferencias(){
			if(typeof idPanel !=="undefined" && indGuardarConf){
				configuracion={};
				var jsonConfiguracion="";
				if(typeof pucpGetUsuarioConfiguracion == "function"){
					jsonConfiguracion=pucpGetUsuarioConfiguracion(idPanel);
					if(jsonConfiguracion.length>0)configuracion=JSON.parse(jsonConfiguracion);
				}
				if(jsonConfiguracion.length==0){
					var cookie=getCookie(idPanel);
					if(cookie.length>0){
						configuracion=JSON.parse(getCookie(idPanel));
						if(configuracion["sessionID"]!==idSesion){
							configuracion={};
							setCookie(idPanel,"");
						}
					}
				}

			}
		}

		/**Permite eliminar las preferencias del usuario para todos los arboles de la pagina
		@param {function}funcionProcesarRespuesta - funcion que procesará la respuesta de la operación de guardado.
		*/
		function pRestablecerPreferencias(funcionProcesarRespuesta){
			if(typeof idPanel !=="undefined" && indGuardarConf){
				pucpSetUsuarioConfiguracion(idPanel,'', funcionProcesarRespuesta);
				setCookie(idPanel,"");
			}
		}

		function setCookie(cname, cvalue,cexpires) {
			if(typeof cexpires !=="undefined"){
				document.cookie = cname + "=" + cvalue+"; expires=" + cexpires;
			}
			else{
				document.cookie = cname + "=" + cvalue;
			}

		}

		function getCookie(cname) {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for(var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}
			return "";
		}

		function checkCookie() {
			var user = getCookie("username");
			if (user != "") {
				alert("Welcome again " + user);
			} else {
				user = prompt("Please enter your name:", "");
				if (user != "" && user != null) {
					setCookie("username", user, 365);
				}
			}
		}
		/**Permite asignar grupos de funciones de impresión para distintos niveles.
		@param {number}nivel - Nivel para el cual sera válida la función.
		@param {function}funcion - Función que se encargará de la impresión del nivel.
		@param {string}nomGrupo - Id del alias que se le dará al nuevo conjunto de funciones.
		*/
		function pAsignarFuncion(nivel, funcion, nomGrupo){
			if(typeof nivel == "undefined" || !(parseInt(nivel)>=0) || typeof funcion !== "function" || typeof nomGrupo !== "string"){
				throw "Uno o más parametros estan faltando, no tienen valor o tienen un valor incorrecto.";
			}
			if(typeof funcionesImpresion[nomGrupo] == "undefined"){
				funcionesImpresion[nomGrupo]=[];
			}
			funcionesImpresion[nomGrupo]["fn"+nivel]=funcion;
		}

		function pObtenerFuncion(nivel, nomGrupo){
			if(typeof nivel == "undefined"|| !(parseInt(nivel)>=0)){
				throw "Debe enviar el parametro nivel para obtener la funcion de impresion.";
			}
			if(!nomGrupo || typeof nomGrupo !== "string"){
				nomGrupo="default"
			}
			if(typeof funcionesImpresion[nomGrupo] == "undefined"){
				throw "El grupo de impresion '"+nomGrupo+"'ingresado no existe.";
			}

			return funcionesImpresion[nomGrupo]["fn"+nivel];
		}

		/*--Funciones por defecto para imprimir un nivel--*/
		/**
		*@description
		*Funcion que permite imprimir los elementos que se encuentre en el nivel 1 de un arbol
		*@param elemento - componente de un arbol que contiene los datos a imprimir.
		*@param contenedor - elemento DOM en el cual se agregara la version impresa del parametro elemento.
		*/
		function imprimirPrimerNivel(elemento,contenedor){
			var divMain=document.createElement("DIV");
			divMain.className="contenedor-primario";
			$(contenedor).append(divMain);
			var divTitulo=document.createElement("DIV");
			$(divMain).append(divTitulo);
			divTitulo.setAttribute("id",elemento["id"]);
			divTitulo.className="tituloN1";
			var textoTitulo=document.createElement("A");
			$(textoTitulo).html(elemento["texto"]);
			$(divTitulo).append(textoTitulo);
			if(elemento["oculto"]){
				divMain.className+=" contenedorOculto";
			}
			if(typeof elemento["claseExtra"] !== "undefined"){
				divMain.className+=" "+elemento["claseExtra"];
			}
			if(typeof elemento["items"] !== "undefined" && elemento["items"].length>0){
				divTitulo.onclick=function(event){
					var divFuente=this;
					$(this).siblings(".subitemsN1").slideToggle("fast",function(){$(divFuente).toggleClass("desplegado");$(this).css("display","");});
				};

				textoTitulo.setAttribute("role","menu");
				var iconoDespliegue=document.createElement("SPAN");
				iconoDespliegue.className="glyphicon glyphicon-triangle-bottom"
				iconoDespliegue.setAttribute("aria-hidden","true");
				$(divTitulo).append(iconoDespliegue);

				var iconoDespliegue=document.createElement("SPAN");
				iconoDespliegue.className="glyphicon glyphicon-triangle-top"
				iconoDespliegue.setAttribute("aria-hidden","true");
				$(divTitulo).append(iconoDespliegue);

				var divHijos=document.createElement("DIV");
				divHijos.className="subitemsN1";
				$(divMain).append(divHijos);
				var listHijos=document.createElement("UL");
				$(divHijos).append(listHijos);

				if(elemento["desplegado"]){
					divTitulo.className+=" desplegado";
				}

				return listHijos;
			}
			else{
				textoTitulo.setAttribute("role","link");
				textoTitulo.setAttribute("href",elemento["url"]);
				divTitulo.onclick=function(event){
					if(event.target.nodeName!=="A" && event.target.nodeName!=="a"){
						textoTitulo.click();
					}
				};
				return null;
			}

		}


		/**
		*@description
		*Funcion que permite imprimir los elementos que se encuentre en el nivel 2 de un arbol
		*@param elemento - componente de un arbol que contiene los datos a imprimir.
		*@param contenedor - elemento DOM en el cual se agregara la version impresa del parametro elemento.
		*/
		function imprimirSegundoNivel(elemento,contenedor){
			var contenedorItem=document.createElement("LI");

			$(contenedor).append(contenedorItem);
			var subcontenedorItem=document.createElement("DIV");
			$(contenedorItem).append(subcontenedorItem);
			subcontenedorItem.setAttribute("id",elemento["id"]);
			if(elemento["oculto"]){
				contenedorItem.className+=" contenedorOculto";
			}
			if(typeof elemento["claseExtra"] !== "undefined"){
				contenedorItem.className+=" "+elemento["claseExtra"];
			}

			if(typeof elemento["extraerContenidoDe"] == "undefined"){
				var textoItem=document.createElement("A");
				$(textoItem).html(elemento["texto"]);
				$(subcontenedorItem).append(textoItem);

				if(typeof elemento["items"] !== "undefined" && elemento["items"].length>0){
					textoItem.setAttribute("role","menu");

					var iconoDespliegue=document.createElement("SPAN");
					iconoDespliegue.className="glyphicon glyphicon-triangle-bottom"
					iconoDespliegue.setAttribute("aria-hidden","true");
					$(subcontenedorItem).append(iconoDespliegue);

					var iconoDespliegue=document.createElement("SPAN");
					iconoDespliegue.className="glyphicon glyphicon-triangle-top"
					iconoDespliegue.setAttribute("aria-hidden","true");
					$(subcontenedorItem).append(iconoDespliegue);

					subcontenedorItem.onclick=function(event){
						var divFuente=this;
						$(this).siblings(".subitemsN2").slideToggle("fast",function(){$(divFuente).toggleClass("desplegado");$(this).css("display","");});
					};

					var contenedorHijos=document.createElement("UL");
					contenedorHijos.className="subitemsN2"
					$(contenedorItem).append(contenedorHijos);

					if(elemento["desplegado"]){
						subcontenedorItem.className+=" desplegado";
					}
					return contenedorHijos;
				}
				else{
					if(typeof elemento["url"] !=="undefined" && elemento["url"]!=""){
						textoItem.setAttribute("role","link");
						textoItem.setAttribute("href",elemento["url"]);
						subcontenedorItem.onclick=function(event){
							if(event.target.nodeName!=="A" && event.target.nodeName!=="a"){
								textoItem.click();
							}
						};
					}
					return null;
				}
			}else{
				//var clnNode=elemento["extraerContenidoDe"].cloneNode(true);
				var chldNodes=elemento["extraerContenidoDe"].childNodes;
				for(var i=0;i<chldNodes.length;i++){
					$(subcontenedorItem).append(chldNodes[i]);
				}
				return null;
			}
		}

		/**
		*@description
		*Funcion que permite imprimir los elementos que se encuentre en el nivel 2 de un arbol
		*@param elemento - componente de un arbol que contiene los datos a imprimir.
		*@param contenedor - elemento DOM en el cual se agregara la version impresa del parametro elemento.
		*/
		function imprimirTercerNivel(elemento,contenedor){
			var contenedorItem=document.createElement("LI");
			contenedorItem.setAttribute("id",elemento["id"]);
			$(contenedor).append(contenedorItem);
			var textoItem=document.createElement("A");
			$(textoItem).html(elemento["texto"]);
			$(contenedorItem).append(textoItem);

			if(elemento["oculto"]){
				contenedorItem.className+=" contenedorOculto";
			}

			if(typeof elemento["claseExtra"] !== "undefined"){
				contenedorItem.className+=" "+elemento["claseExtra"];
			}

			if(typeof elemento["url"] !=="undefined" && elemento["url"]!=""){
				textoItem.setAttribute("role","link");
				textoItem.setAttribute("href",elemento["url"]);
				contenedorItem.onclick=function(event){
					if(event.target.nodeName!=="A" && event.target.nodeName!=="a"){
						textoItem.click();
					}
				};
			}else{
				contenedorItem.className="noDisponible";
			}
		}
		/*--Fin funciones por defecto para imprimir un nivel--*/
		/*---Verificador de funciones: verifica si una funcion ha sido sobreescrita-*/
		function verificarIntegridadFuncionesPrincipales(){
			var resultado=true;
			resultado=(this.plConfigurarNumeroColumnas==pConfigurarNumeroColumnas)&&(this.plNuevoArbol==pNuevoArbol)
				&&(this.plAgregarElementoPrimerNivel==pAgregarElementoPrimerNivel)
				&&(this.plAgregarElemento==pAgregarElemento)
				&&(this.plGuardarPreferencias==pGuardarPreferencias)
				&&(this.plObtenerPreferencias==pObtenerPreferencias)
				&&(this.plRestablecerPreferencias==pRestablecerPreferencias)
				&&(this.plConfigurarLibreria==pConfigurarLibreria);
			return resultado;
		}
		/*---Fin Verificador de funciones: verifica si una funcion ha sido sobreescrita-*/
		//Funciones extra
		function pEsNumero(n) {
			return typeof(n) === 'number' &&isFinite(n) &&Math.round(n) === n;
		}

		//Configuracion de funciones de impresion por defecto
		funcionesImpresion["default"]=[];
		funcionesImpresion["default"]["fn1"]=imprimirPrimerNivel;
		funcionesImpresion["default"]["fn2"]=imprimirSegundoNivel;
		funcionesImpresion["default"]["fn3"]=imprimirTercerNivel;
		//Funciones privilegiadas
		this.plConfigurarNumeroColumnas=pConfigurarNumeroColumnas;
		this.plNuevoArbol=pNuevoArbol;
		this.plAgregarElementoPrimerNivel=pAgregarElementoPrimerNivel;
		this.plAgregarElemento=pAgregarElemento;
		this.plImprimirArbol=pImprimirArbol;
		this.plImprimirCuadrodeBusqueda=pImprimirCuadrodeBusqueda;
		this.plGuardarPreferencias=pGuardarPreferencias;
		this.plObtenerPreferencias=pObtenerPreferencias;
		this.plRestablecerPreferencias=pRestablecerPreferencias;
		this.plAsignarFuncion=pAsignarFuncion;
		this.plConfigurarLibreria=pConfigurarLibreria;
		this.plObtenerRutaElemento=pObtenerRutaElemento;
	}

	instanciaArbolMenu=new ArbolMenu();
}

/*Permite configurar opciones adicionales en la libreria
@param datosConf: Contiene  los datos de las opciones adicionales. Actualmente estas son:
					-nombreCookie: un nombre para la cookie usada para guardar localmente los datos. Requerido como sustituto del guardado en BD en las pruebas.
					-idSesion: ID unico de sesion para poder diferenciar una cookie de una sesion anterior.
					-idPanel: ID unico usado para guardar la configuracion en BD. Actualmente desactivado.
*/
function configurarLibreria(datosConf){
	return instanciaArbolMenu.plConfigurarLibreria.apply(this, arguments);
}

/**
*@description
*Permite configurar el numero de columnas que se imprimiran por cada arbol. En caso no desee usar las columnas creadas por la libreria asigne el numero 0.
*@param nColumnas: numero de columnas.
*@param cColumna: clase que se le asignará a las columnas.
*/
function configurarNumeroColumnas(nColumnas,cColumna){
	return instanciaArbolMenu.plConfigurarNumeroColumnas.apply(this, arguments);
}


/**
*@description
*Permite crear un nuevo arbol. Para trabajar con la libreria siempre sera necesario crear al menos un arbol
*@param {string} idArbol - La ID del nuevo arbol, esta debe ser única.
*@param {string} titulo - El titulo del nuevo arbol, usado en la creacion de la busqueda de elementos.
*@param {object} [conf] Configuracion opcional del arbol.
*@param {boolean} [conf.reorganizable=false] - Permite que el usuario reorganize los elementos entre las columnas. En caso no se hayan creado columnas la configuración se aplicará al contenedor. Se omiten los elementos con clase 'notSortable'
*@param {boolean} [conf.preferencias=false] - Permite que el arbol haga uso de preferencias guardadas por el usuario(orden e items desplegados)
*@param {boolean} [conf.organizarColumnas=false] - Indica si durante la impresion del arbol la libreria decide en que columna debe ir cada elemento. Se da preferencia a la configuración del usurio, en caso exista.
*/
function nuevoArbol(idArbol,titulo,conf){
	return instanciaArbolMenu.plNuevoArbol.apply(this, arguments);
}

/**
*@description Permite agregar elementos. La distincion entre los elementos de primer nivel y los demas es que estos pueden ser asignados a un arbol y columna especificos.
*@param {string} idMenu - Es la id del elemento, el cual debe ser único en toda la pagina.
*@param {string} texto - El texto del elemento.
*@param {string} url - La url o funcion JS que debe ejecutar el elemento. En caso el elemento tenga hijos, en la versión por defecto, no se tomara en cuenta este parametro.
*@param {object} [conf] - Objeto que contiene datos adicionales que pueden modificar las caracteristicas del item.
*@param {boolean} [conf.desplegado=false] - Indica si el objeto, al imprimirse, debe estar desplegado o no. Solo es válido si el elemento es desplegable.
*@param {boolean} [conf.oculto=false] - Indica si el objeto, al imprimirse, debe estar oculto o no.
*@param {number} [conf.numColumna=0] - La columna a la cual debe agregarse el elemento. En caso se obvie se pondrá el valor 0.
*@param {string} [conf.idArbol=<ID del primer arbol creado>] - La ID del arbol al cual se agregara el elemento.
*@param {string} [conf.claseExtra=<clase por defecto de la librería>] - clases de CSS que se agregaran al contenedor principal de este elemento.
*@param {object} [conf.datosExtra] - Objecto que sirve para guardar información extra. No se utiliza en la versión por defecto del arbol. Implementado para facilitar modificaciones por parte de los usuarios.
*/
function agregarElementoPrimerNivel(idMenu,texto,url,conf){
	return instanciaArbolMenu.plAgregarElementoPrimerNivel.apply(this, arguments);
}

/**
*@description
*Permite agregar elementos.
*@param {string}idMenu - Es la id del elemento, la cual debe ser unica en toda la pagina.
*@param {string}texto - El texto del elemento.
*@param {string}url - La url o funcion JS que debe ejecutar el elemento. En caso el elemento tenga hijos, en la versión por defecto, no se tomara en cuenta este parametro.
*@param {string}idPadre - La ID del elemento al cual se agregará como hijo.
*@param {object}[conf] - Objeto que contiene datos adicionales que pueden modificar las caracteristicas del item.
*@param {boolean}[conf.desplegado=false] - Indica si el objeto, al imprimirse, debe estar desplegado o no. Solo es válido si el elemento es desplegable.
*@param {boolean}[conf.oculto=false] - Indica si el objeto, al imprimirse, debe estar oculto o no.
*@param {string}[conf.extraerContenidoDe] - Indica el objeto del cual se debe extraer el contenido. Descarta las propiedades "texto" y "url".
*@param {string}[conf.claseExtra] - clases de CSS que se agregaran al contenedor principal de este elemento.
*@param {object}[conf.datosExtra] - Objecto que sirve para guardar información extra(opcional - No se utiliza en la versión por defecto del arbol. Implementado para facilitar modificaciones por parte de los usuarios).
*/
function agregarElemento(idMenu,texto,url,idPadre,conf){
	return instanciaArbolMenu.plAgregarElemento.apply(this, arguments);
}

/**
*Permite obtener la ruta que se debe serguir en un arbol para obtener un elemento en especifico
*@param idElemento - Id del elemento del cual se está buscando su ruta.
*/
function obtenerRutaElemento(idElemento){
	return instanciaArbolMenu.plObtenerRutaElemento.apply(this, arguments);
}

/**
*@description
*Permite imprimir en arbol indicado de acuerdo a las funciones de impresion establecidas por la libreria o el usuario.
*@param {string}idDivContenedor - Es la id del elemento dentro del cual se imprimirá el arbol.
*@param {object}[conf] - Objeto que contiene datos adicionales que pueden modificar el metodo de impresion usado o el arbol a imprimir.
*@param {string}[conf.idArbol=<Id del primer arbol creado>] - Id del arbol a imprimir. En caso se omita, se imprimira el ultimo arbol creado.
*@param {string}[conf.grupo] - Indica el grupo de funciones de impresion a utiliza. En caso se omita se utilizará la impresión por defecto.
*/
function imprimirArbol(idDivContenedor,idArbol){
	return instanciaArbolMenu.plImprimirArbol.apply(this, arguments);
}

/**
*@description
*Permite imprimir un cuadro de busqueda con autocompletar para uno o todos los arboles instanciados en la pagina.
*
*@param {string}idContenedor - Es la id del elemento dentro del cual se imprimirá el cuadro de busqueda.
*@param {object}[conf] - Objeto que contiene las posibles configuraciones para la creación del cuadro de búsqueda.
*@param {string}[conf.idArbol] - Indica la Id del arbol sobre el cual se creará el cuadro de búsqueda.
*@param {boolean}[conf.indTodosArboles=false] - Indica si el cuadro de búsqueda debe crearse tomando en cuenta todos los arboles creados en  la página. Posee mayor prioridad que el atributo "idArbol".
*@param {boolean}[conf.indOmitirArbolNoImpreso=false] - Indica si solo se deben toman en cuenta los arboles impresos. Tiene menos prioridad que el atributo "idArbol".
*@param {number}[conf.numMinBusq] - Indica la cantidad mínima de caracteres a ingresar antes de activar el autocompletar. Por defecto: 3
*@param {string}[conf.anadirA] - Selector del elemento al cual se debe incluir el menu de autocompletado. Si es nulo o no seteado el menu de autocompletado se añadirá al elemento Document.
*/
function imprimirCuadrodeBusqueda(idContenedor,conf){
	return instanciaArbolMenu.plImprimirCuadrodeBusqueda.apply(this, arguments);
}

/**
*@description
*Permite guardar las preferencias del usuario para uno o todos los arboles de la pagina
*@param funcionProcesarRespuesta - Funcion que procesará la respuesta de la operación de guardado.
*@param [idArbol] - Representa la id del arbol sobre el cual se guardaran las preferencias. En caso se omita este valor se guardaran los datos para todos los arboles de la pagina.
*/
function guardarPreferencias(funcionProcesarRespuesta,idArbol){
	return instanciaArbolMenu.plGuardarPreferencias.apply(this, arguments);
}

/**
*@description
*Permite obtener las preferencias del usuario para todos los arboles de la pagina
*/
function obtenerPreferencias(){
	return instanciaArbolMenu.plObtenerPreferencias.apply(this, arguments);
}

/**Permite eliminar las preferencias del usuario para todos los arboles de la pagina
@param {function}funcionProcesarRespuesta - funcion que procesará la respuesta de la operación de guardado.
*/
function restablecerPreferencias(funcionProcesarRespuesta){
	return instanciaArbolMenu.plRestablecerPreferencias.apply(this, arguments);
}

/**Permite asignar grupos de funciones de impresión para distintos niveles.
@param {number}nivel - Nivel para el cual sera válida la función.
@param {function}funcion - Función que se encargará de la impresión del nivel.
@param {string}nomGrupo - Id del alias que se le dará al nuevo conjunto de funciones.
*/
function asignarFuncion(nivel, funcion,idArbol){
	return instanciaArbolMenu.plAsignarFuncion.apply(this, arguments);
}
