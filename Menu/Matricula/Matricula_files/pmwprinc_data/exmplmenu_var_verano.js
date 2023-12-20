/***********************************************************************************
*	(c) Ger Versluis 2000 version 5.41 24 December 2001	          *
*	For info write to menus@burmees.nl		          *
*	You may remove all comments for faster loading	          *		
***********************************************************************************/

	var NoOffFirstLineMenus=4;			// Number of first level items
	var HighBgColor='#4A96AC';			// Background color when mouse is over
	var HighSubBgColor='#4A96AC';			// Background color when mouse is over on subs
	var LowBgColor='#2C7D92';		        // Background color when mouse is not over
	var LowSubBgColor='#2C7D92';			// Background color when mouse is not over on subs
	var FontLowColor='white';			// Font color when mouse is not over
	var FontSubLowColor='white';			// Font color subs when mouse is not over
	var FontHighColor='white';			// Font color when mouse is over
	var FontSubHighColor='white';			// Font color subs when mouse is over
	var BorderColor='#2C7D92';			// Border color
	var BorderSubColor='white';			// Border color for subs
	var BorderWidth=1;				// Border width
	var BorderBtwnElmnts=1;			        // Border between elements 1 or 0
	var FontFamily="arial,comic sans ms,technical"	// Font family menu items
	var FontSize=9;				        // Font size menu items
	var FontBold=1;				        // Bold menu items 1 or 0
	var FontItalic=0;				// Italic menu items 1 or 0
	var MenuTextCentered='left';			// Item text position 'left', 'center' or 'right'
	var MenuCentered='center';			// Menu horizontal position 'left', 'center' or 'right'
	var MenuVerticalCentered='top';		// Menu vertical position 'top', 'middle','bottom' or static
	var ChildOverlap=.2;				// horizontal overlap child/ parent
	var ChildVerticalOverlap=.2;			// vertical overlap child/ parent
	var StartTop=50;				// Menu offset x coordinate
//	var StartTop=110;				// Menu offset x coordinate  
	var StartLeft=1;				// Menu offset y coordinate
	var VerCorrect=0;				// Multiple frames y correction
	var HorCorrect=0;				// Multiple frames x correction
	var LeftPaddng=3;				// Left padding
	var TopPaddng=2;				// Top padding
	var FirstLineHorizontal=1;			// SET TO 1 FOR HORIZONTAL MENU, 0 FOR VERTICAL
	var MenuFramesVertical=1;			// Frames in cols or rows 1 or 0
	var DissapearDelay=1000;			// delay before menu folds in
	var TakeOverBgColor=1;			// Menu frame takes over background color subitem frame
	var FirstLineFrame='navig';			// Frame where first level appears
	var SecLineFrame='space';			// Frame where sub levels appear
	var DocTargetFrame='space';			// Frame where target documents appear
	var TargetLoc='';				// span id for relative positioning
	var HideTop=0;				// Hide first level when loading new document 1 or 0
	var MenuWrap=1;				// enables/ disables menu wrap 1 or 0
	var RightToLeft=0;				// enables/ disables right to left unfold 1 or 0
	var UnfoldsOnClick=0;			// Level 1 unfolds onclick/ onmouseover
	var WebMasterCheck=0;			// menu tree checking on or off 1 or 0
	var ShowArrow=0;				// Uses arrow gifs when 1
	var KeepHilite=1;				// Keep selected path highligthed
	var Arrws=['tri.gif',5,10,'tridown.gif',10,5,'trileft.gif',5,10];	// Arrow source, width and height


function BeforeStart(){return}
function AfterBuild(){return}
function BeforeFirstOpen(){return}
function AfterCloseAll(){return}

var session=document.formPortal.session.value;
var alumno=document.formPortal.alumno.value;

var cicloanoNotas=document.formPortal.cicloAnoNotas.value;
var cicloNotas=document.formPortal.cicloNotas.value;
var tipocicloNotas=document.formPortal.tipoCicloNotas.value;
var NombreCicloNotas = "Notas " + cicloanoNotas + "-" + cicloNotas.substring(1);

var cicloanoInsc=document.formPortal.cicloAnoInscripcion.value;
var cicloInsc=document.formPortal.cicloInscripcion.value;
var tipocicloInsc=document.formPortal.tipoCicloInscripcion.value;

// Menu tree
//	MenuX=new Array(Text to show, Link, background image (optional), number of sub elements, height, width);
//	For rollover images set "Text to show" to:  "rollover:Image1.jpg:Image2.jpg"

Menu1=new Array("Datos del Alumno","","",5,18,180);
//	Menu1_1=new Array("Turno de Matrícula","/pucp/rendimi/rewrenac/rewrenac;jsessionid=" + session + "?accion=Ingresar&codigo="+alumno,"",0,18,200);
	//Menu1_1=new Array("Turno de Matrícula","/pucp/rendimi/rewrenac/rewrenac;jsessionid=" + session + "?accion=VerTurno&tiporend=1&cicloano="+cicloanoInsc+"&ciclo="+cicloInsc+"&tipociclo="+tipocicloInsc+"&codigo="+alumno,"",0,18,200);  
	Menu1_1=new Array("Turno de Matrícula","javascript:EnlacePaginaWeb('/pucp/rendimi/rewturno/rewturno;jsessionid=" + session + "?accion=VerTurno&cicloano="+cicloanoInsc+"&ciclo="+cicloInsc+"&tipociclo="+tipocicloInsc+"&codigo="+alumno+"&tiporend=1')","",0,18,180);	
	Menu1_2=new Array("Cursos Permitidos","/pucp/ctrlcurr/ccwcurpe/ccwcurpe;jsessionid=" + session + "?accion=Ingresar&cicloano="+cicloanoInsc+"&ciclo="+cicloInsc+"&tipociclo="+tipocicloInsc+"&codigo="+alumno,"",0);
//  Menu1_2=new Array("Cursos Permitidos","/pucp/ctrlcurr/ccwcurpe/ccwcurpe;jsessionid=" + session + "?accion=Ingresar&codigo="+alumno,"",0); 
	Menu1_3=new Array(NombreCicloNotas,"/pucp/notas/nowhisno/nowhisno;jsessionid=" + session + "?accion=Ingresar&codigo="+alumno+"&cicloano="+cicloanoNotas+"&ciclo="+cicloNotas+"&tipociclo="+tipocicloNotas,"",0);
//	Menu1_3=new Array("Notas 2005-2","/pucp/notas/nowhisno/nowhisno;jsessionid=" + session + "?accion=Ingresar&codigo="+alumno+"&cicloano="+cicloanoNotas+"&ciclo="+cicloNotas+"&tipociclo="+tipocicloNotas,"",0);
	Menu1_4=new Array("Documentos de Pago","/pucp/cobralum/cawdocpg/cawdocpg;jsessionid=" + session + "?accion=Buscar&Codigo="+alumno+"&misdatos=0","",0);
	Menu1_5=new Array("Objetos Adeudados","/pucp/cobralum/cawoblig/cawoblig;jsessionid=" + session + "?accion=Ingresar&Codigo="+alumno+"&misdatos=1","",0);

//Menu2=new Array("Cursos y Horarios","/pucp/horarios/howcurho/howcurho;jsessionid=" + session + "?accion=MostrarCriteriosCursoHor&cicloano="+cicloanoInsc+"&ciclo="+cicloInsc+"&tipociclo="+tipocicloInsc+"&facultad=","",0,18,200);
//Menu2=new Array("Cursos y Horarios","javascript:EnlacePaginaWeb('/pucp/horarios/howcurho/howcurho;jsessionid=" + session + "?accion=MostrarCriteriosCursoHor&cicloano="+cicloanoInsc+"&ciclo="+cicloInsc+"&tipociclo="+tipocicloInsc+"&facultad=&ventanaEmergente=1')","",0,18,200);

Menu2=new Array("Cursos y Horarios","","",4,0,140);
	Menu2_1=new Array("Consulta de horarios","javascript:EnlacePaginaWeb('/pucp/horarios/howcurho/howcurho;jsessionid=" + session + "?accion=MostrarCriteriosCursoHor&cicloano="+cicloanoInsc+"&ciclo="+cicloInsc+"&tipociclo="+tipocicloInsc+"&facultad=&ventanaEmergente=1')","",0,18,250);
	Menu2_2=new Array("Programación del semestre académico","javascript:EnlacePaginaWeb('/pucp/horarios/howcalen/howcalen;jsessionid=" + session + "?accion=MostrarCriteriosCalendarioFacultad&cicloano="+cicloanoInsc+"&ciclo="+cicloInsc+"&tipociclo="+tipocicloInsc+"&facultad=&ventanaEmergente=1')","",0);
	Menu2_3=new Array("Estadística de cursos","javascript:EnlacePaginaWeb('/pucp/estadist/eswcurst/eswcurst;jsessionid=" + session + "?accion=MostrarCriteriosCursoEstadisticas&cicloano="+cicloanoInsc+"&ciclo="+cicloInsc+"&tipociclo="+tipocicloInsc+"')","",0);
	Menu2_4=new Array("Generador de horarios","javascript:EnlacePaginaWeb('/pucp/horarios/howgenho/howgenho;jsessionid=" + session + "?accion=MostrarHorarioAcademico')","",0);	

	

/*
Menu3=new Array("Servicios","","",1,0,180);
Menu3_1=new Array("Banco del Libro","/pucp/bcolibro/blwreser/blwreser;jsessionid=" + session+"?accion=Ingresar&retorno=1","",0,18,170);    
*/
//	Menu3_1=new Array("Banco del Libro","/pucp/bcolibro/blwreser/jsp/SolicitudReserva.jsp;jsessionid=" + session,"",0,18,170);

Menu3=new Array("Excepciones","","",1,0,170);
	Menu3_1=new Array("Solicitudes de excepción de matrícula","/pucp/ctrlcurr/ccwsolex/ccwsolex;jsessionid=" + session + "?accion=ResultadosSolicitudes&codigo="+alumno+"&cicloano="+cicloanoInsc+"&ciclo="+cicloInsc+"&tipociclo="+tipocicloInsc,"",0,18,250);
//	Menu3_1=new Array("Excepciones al Reglamento","/pucp/infracto/mawexcep/mawexcep;jsessionid=" + session + "?accion=Ingresar&codigo="+alumno+"&cicloano="+cicloanoInsc+"&ciclo="+cicloInsc+"&tipociclo="+tipocicloInsc,"",0,18,250);
//	Menu3_3=new Array("Solicitud de Matrícula en dos Unidades","/pucp/ctrlcurr/ccwsolex/ccwsolex;jsessionid=" + session + "?accion=ResultadosSolicitudes&codigo="+alumno+"&cicloano="+cicloanoInsc+"&ciclo="+cicloInsc+"&tipociclo="+tipocicloInsc,"",0);  
//	Menu3_4=new Array("Infracciones Reglam.","javascript:window.open('http://www.pucp.edu.pe/escgrad/','Matricula','top=0,left=0,width=600,height=400,toolbar=yes,location=no,status=yes,menubar=no,scrollbars=yes,resizable=yes')","",0);  


/*
	Menu4_1=new Array("Seguro Renta Estudiantil","/pucp/cobralum/cawsgren/cawsgren;jsessionid=" + session + "?accion=Ingresar&cicloano=","",0,18,170);
	Menu4_2=new Array("Seguro Contra Accidentes", "/pucp/cobralum/cawsgret/cawsgret;jsessionid=" + session + "?accion=Ingresar","",0);
	Menu4_3=new Array("Seguro Odontológico","/pucp/cobralum/cawsgodo/cawsgodo;jsessionid=" + session + "?accion=Ingresar","",0);
*/

Menu4=new Array("Contáctanos","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=imagen@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",16,0,140);



Menu4_1=new Array("Arquit. y Urbanismo","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=arquitectura@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,160);

//AVR 12-11-2015
//Menu4_3=new Array("Arte","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon26@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);
Menu4_2=new Array("Arte y Diseño","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=mesadepartesfad@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,160);

Menu4_3=new Array("Artes Escénicas","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=sa-fares@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,160);
/*Menu4_3_1=new Array("Teatro","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=tuc@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,155);
Menu4_3_2=new Array("Danza","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=danza@pucp.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu4_3_3=new Array("Música","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=esmusica@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu4_3_4=new Array("Creación y Producción Es.","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=creacionyproduccion@pucp.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);*/

//AVR 20-07-2016
//Menu4_5=new Array("Cienc. Art. Comunic.","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon21@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);
Menu4_4=new Array("Cienc. Art. Comunic.","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon21@pucp.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,160);

//AVR 05-03-2021
Menu4_5=new Array("Ciencias Contables","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon13@pucp.edu.pe&dirCC=sec_academica13@pucp.edu.pe&dirCCO=&asunto=&mensaje=","",0,18,160);

Menu4_6=new Array("Cienc. e Ingeniería","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=informes-fci@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",13,18,160);
Menu4_6_1=new Array("Física","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12fis@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,155);
Menu4_6_2=new Array("Ing. Biomédica","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12bio@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu4_6_3=new Array("Ing. Civil","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12civ@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu4_6_4=new Array("Ing. Electrónica","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12ele@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu4_6_5=new Array("Ing. Estadística","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12est@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu4_6_6=new Array("Ing. Geológica","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12geo@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu4_6_7=new Array("Ing. Industrial","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12ind@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu4_6_8=new Array("Ing. Informática","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12inf@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu4_6_9=new Array("Ing. Mecánica","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12mec@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu4_6_10=new Array("Ing. Mecatrónica","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12mtr@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu4_6_11=new Array("Ing. Minas","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12min@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu4_6_12=new Array("Ing. Telecomunicaciones","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12tel@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu4_6_13=new Array("Matemáticas","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12mat@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu4_6_14=new Array("Química","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12qui@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);


Menu4_7=new Array("Ciencias Sociales","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=mesadepartessociales@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,160);

Menu4_8=new Array("Derecho","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon15@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,160);

//AVR 20-07-2016
Menu4_9=new Array("Educación","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=educa@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,160);
/*
Menu4_9_1=new Array("Ed. Inicial","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=edinicial@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,140);
Menu4_9_2=new Array("Ed. primaria","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=edprimaria@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);
Menu4_9_3=new Array("Filosofía y Cienc. Soc.","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=edfilo@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);
Menu4_9_4=new Array("Historia y Geografia","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=edhistoria@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);
Menu4_9_5=new Array("Inglés","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=edingles@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);
Menu4_9_6=new Array("Lengua y Literatura","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=edlengua@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);
Menu4_9_7=new Array("Matemáticas","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=edmatem@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);
*/

//AVR 20-07-2016
//Menu4_10=new Array("Esc. de Posgrado","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon10@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,140);
Menu4_10=new Array("Esc. de Posgrado","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=secretarioacademicoep@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,160);

Menu4_11=new Array("Est. Gen. Ciencias","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=eeggcc-responde@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,160);

Menu4_12=new Array("Est. Gen. Letras","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=eeggll@pucp.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,160);

Menu4_13=new Array("Gast, Hotel y Turis","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=sa-facughot@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,160);

Menu4_14=new Array("Gestión y Alta Dirección","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=sacademica.fgad@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,160);

Menu4_15=new Array("Let. y C. Humanas","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=letras@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,160);

Menu4_16=new Array("Psicología","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=psicologia@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,160);


/*
Menu3=new Array("Contáctanos","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=imagen@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",13,0,140);

Menu3_1=new Array("Esc. de Graduados","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon10@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,140);

Menu3_2=new Array("Cienc. e Ingeniería","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",10,18,125);
Menu3_2_1=new Array("Ing. Informática","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12inf@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,155);
Menu3_2_2=new Array("Ing. Electrónica","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12ele@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu3_2_3=new Array("Ing. Industrial","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12ind@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu3_2_4=new Array("Ing. Civil","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12civ@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu3_2_5=new Array("Ing. Minas","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12min@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu3_2_6=new Array("Ing. Mecánica","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12mec@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu3_2_7=new Array("Química","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12qui@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu3_2_8=new Array("Física","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12fis@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu3_2_9=new Array("Matemáticas","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12mat@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu3_2_10=new Array("Ing. Telecomunicaciones","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12tel@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);

Menu3_3=new Array("Adm. y Contabilidad","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon13@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,140);

Menu3_4=new Array("Ciencias Sociales","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon14@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,140);

Menu3_5=new Array("Derecho","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon15@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,140);

Menu3_6=new Array("Educación","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon16@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",7,18,140);
Menu3_6_1=new Array("Ed. Inicial","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=edinicial@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,140);
Menu3_6_2=new Array("Ed. primaria","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=edprimaria@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);
Menu3_6_3=new Array("Matemáticas","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=edmatem@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);
Menu3_6_4=new Array("Historia y Geografía","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=edhistoria@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);
Menu3_6_5=new Array("Filosofía y Cienc. Soc.","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=edfilo@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);
Menu3_6_6=new Array("Inglés","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=edingles@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);
Menu3_6_7=new Array("Lengua y Literatura","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=edlengua@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);

Menu3_7=new Array("Let. y C. Humanas","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon17@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",2,18,125);
Menu3_7_1=new Array("Humanidades","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon17@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);
Menu3_7_2=new Array("Psicología","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=psicologia@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);

Menu3_8=new Array("Est. Gen. Letras","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon18@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);

Menu3_9=new Array("Est. Gen. Ciencias","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon20@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);

Menu3_10=new Array("Cienc. Art. Comunic.","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon21@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);

Menu3_11=new Array("Arte","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon26@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);

Menu3_12=new Array("Arquit. y Urbanismo","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon23@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);

Menu3_13=new Array("Gestión y Alta Dirección","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=fgad@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);
*/
//Menu4=new Array("              ","","",0,18,200);

/*
Menu4=new Array("Contáctanos","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=imagen@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",12,0,140);

Menu4_1=new Array("Esc. de Graduados","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon10@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,140);

Menu4_2=new Array("Cienc. e Ingeniería","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",10,18,125);
Menu4_2_1=new Array("Ing. Informática","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12inf@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,155);
Menu4_2_2=new Array("Ing. Electrónica","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12ele@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu4_2_3=new Array("Ing. Industrial","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12ind@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu4_2_4=new Array("Ing. Civil","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12civ@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu4_2_5=new Array("Ing. Minas","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12min@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu4_2_6=new Array("Ing. Mecánica","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12mec@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu4_2_7=new Array("Química","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12qui@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu4_2_8=new Array("Física","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12fis@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu4_2_9=new Array("Matemáticas","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12mat@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);
Menu4_2_10=new Array("Ing. Telecomunicaciones","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon12tel@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0);

Menu4_3=new Array("Adm. y Contabilidad","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon13@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,140);

Menu4_4=new Array("Ciencias Sociales","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon14@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,140);

Menu4_5=new Array("Derecho","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon15@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,140);

Menu4_6=new Array("Educación","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon16@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",7,18,140);
Menu4_6_1=new Array("Ed. Inicial","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=edinicial@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,140);
Menu4_6_2=new Array("Ed. primaria","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=edprimaria@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);
Menu4_6_3=new Array("Matemáticas","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=edmatem@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);
Menu4_6_4=new Array("Historia y Geografia","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=edhistoria@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);
Menu4_6_5=new Array("Filosofía y Cienc. Soc.","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=edfilo@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);
Menu4_6_6=new Array("Inglés","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=edingles@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);
Menu4_6_7=new Array("Lengua y Literatura","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=edlengua@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);

Menu4_7=new Array("Let. y C. Humanas","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon17@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",2,18,125);
Menu4_7_1=new Array("Humanidades","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon17@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);
Menu4_7_2=new Array("Psicología","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=psicologia@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);

Menu4_8=new Array("Est. Gen. Letras","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon18@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);

Menu4_9=new Array("Est. Gen. Ciencias","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon20@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);

Menu4_10=new Array("Cienc. Art. Comunic.","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon21@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);

Menu4_11=new Array("Arte","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon26@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);

Menu4_12=new Array("Arquit. y Urbanismo","/pucp/correo/cowcoreo/cowcoreo;jsessionid=" + session + "?accion=NuevoMensaje&dirPara=buzon23@pucp.edu.pe&dirCC=&dirCCO=&asunto=&mensaje=","",0,18,125);

*/
