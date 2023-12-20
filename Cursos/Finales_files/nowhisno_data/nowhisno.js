function link_estadistica(cicloano,ciclo,tipociclo,clavecurso,facultad,merito,horario){
document.estadistica.cicloano.value=cicloano;
document.estadistica.ciclo.value=ciclo;
document.estadistica.tipociclo.value=tipociclo;
document.estadistica.clavecurso.value=clavecurso;
document.estadistica.facultad.value=facultad;
if (merito=='2')
	document.estadistica.Horario.value=horario;
else
	document.estadistica.Horario.value='';
document.estadistica.submit();
}
function link_estadistica_old(cicloano,ciclo,tipociclo,clavecurso,facultad){
}