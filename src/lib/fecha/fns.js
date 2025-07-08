/*
// Copyright (C) 2025 Rubén de Jesús Fajardo Jaime
//
// Este programa es software libre: puedes redistribuirlo y/o modificarlo
// bajo los términos de la Licencia Pública General de GNU tal como está
// publicada por la Fundación para el Software Libre, ya sea la versión 3
// de la Licencia, o (a tu elección) cualquier versión posterior.
//
// Este programa se distribuye con la esperanza de que sea útil, pero
// SIN GARANTÍA ALGUNA; sin siquiera la garantía implícita de
// COMERCIABILIDAD o IDONEIDAD PARA UN PROPÓSITO PARTICULAR. Véase la
// Licencia Pública General de GNU para más detalles.
//
// Debes haber recibido una copia de la Licencia Pública General de GNU
// junto con este programa. Si no, consulta <https://www.gnu.org/licenses/>.
*/

import { format } from "date-fns";
import { cargarEventos } from "$app/App/fns";
import { fechaLista, fechaRef, pluginControl } from "$store/app.svelte.js";

const moverUno = (dir) => {
  const elementos = fechaGlobal(false);
  elementos[1] = Number(elementos[1]) - 1;
  elementos[2] = dir ? Number(elementos[2]) + 1 : Number(elementos[2]) - 1;
  const nwFecha = new Date(...elementos);
  fechaLista.data = format(nwFecha, "yyyy-MM-dd");
  fechaGlobal();
};

const fechaGlobal = (definir = true) => {
  const elementos = fechaLista.data.split("-");
  const datos = {
    mes: Number(elementos[1]),
    ano: Number(elementos[0]),
  };
  if (definir && (fechaRef.ano !== datos.ano || fechaRef.mes !== datos.mes)) {
    fechaRef.mes = datos.mes;
    fechaRef.ano = datos.ano;
    pluginControl.setDate(fechaLista.data);
    cargarEventos();
  }
  return elementos;
};

export { moverUno, fechaGlobal };
