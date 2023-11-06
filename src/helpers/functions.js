import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// funciones que puedo usar en mi proyecto



// funcion para mostrar sweetalert
export function show_alerta(mensaje, icono, foco = '') {

  onFocus(foco);
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title: mensaje,
    icon: icono
  });

}

function onFocus(foco) {
  if (foco !== '') {
    document.getElementById(foco).focus();
  }
}
