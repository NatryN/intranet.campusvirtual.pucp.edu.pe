<!-- JavaScript del proyecto ocr -->

function MisCursosPersonaCiclo (codigo, cicloano, ciclo, tipociclo)
{
   session = document.formresultado.session.value;
   url = "/pucp/ocr/ocwmcurs/ocwmcurs;jsessionid=" + session;
   url = url + "?accion=Ingresar&persona=" + codigo;
   url = url + "&cicloanoMatri=" + cicloano + "&cicloMatri=" + ciclo + "&tipocicloMatri=" + tipociclo;
   url = url + "&cicloanoDict=" + cicloano + "&cicloDict=" + ciclo + "&tipocicloDict=" + tipociclo;
   window.location=url;
}

function PanelCurso(clavecurso)
{
   session = document.formresultado.session.value;
   window.location="/pucp/ocr/ocwcurpa/ocwcurpa;jsessionid=" + session + "?accion=Ingresar&clavecurso=" + clavecurso;
}

function PanelCursoPersona(clavecurso, codigo)
{
   session = document.formresultado.session.value;
   window.location="/pucp/ocr/ocwcurpa/ocwcurpa;jsessionid=" + session + "?accion=Ingresar&clavecurso=" + clavecurso + "&codigo=" + codigo;
}

function PanelCursoPersonaCiclo(clavecurso, codigo, cicloano, ciclo, tipociclo)
{
   session = document.formresultado.session.value;
   window.location="/pucp/ocr/ocwcurpa/ocwcurpa;jsessionid=" + session + "?accion=Ingresar&clavecurso=" + clavecurso + "&codigo=" + codigo + "&cicloano=" + cicloano + "&ciclo=" + ciclo + "&tipociclo=" + tipociclo;
}



