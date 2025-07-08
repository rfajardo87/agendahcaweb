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

import { api } from "$api/api";
import { citas, fechaLista } from "$store/app.svelte.js";
import { statusCtx } from "$store/status.ctx.svelte.js";

const mostrarDia = () => {
  return citas.data.filter((cita) => cita.fecha === fechaLista.data);
};

const finalizarCita = async (id) => {
  try {
    await api.put(`/finalizar/${id}/fin`);
    statusCtx.valor = {
      status: "Finalizado",
      color: "#95BDFF",
    };
  } catch (e) {
    console.log(e);
  }
};

export { mostrarDia, finalizarCita };
