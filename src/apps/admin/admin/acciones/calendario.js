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

import { toast } from "svelte-sonner";
import { empleado, fechaRef } from "$store/admin.svelte.js";
import { colores } from "$store/colores.svelte.js";
import { api } from "$api/api";

const bloquearDia = async (dia, isComision) => {
  try {
    if (!empleado.data) {
      toast.warning("Seleciona un empleado");
      return;
    }
    const rsp = await api.post(`/empleado/${empleado.data}/dia/${dia}`, {
      isComision,
    });
    return await rsp.data;
  } catch (e) {
    console.log(e);
  }
};

const iconColor = (isCom) => {
  if (colores.data) {
    const index = isCom ? "com" : "aus";
    return colores.data.find((color) => color.codigo === index).main;
  }
  return "";
};

const cargarAgenda = async (empleado) => {
  try {
    const rsp = await api.get(
      `/empleado/${empleado}/calendar/${fechaRef.ano}/${fechaRef.mes}`,
    );
    const data = await rsp.data;
    console.log({ data });
    return data.map((record) => ({
      id: record.id,
      start: record.dia,
      end: record.dia,
      title: record.comision ? "Comision" : "Ausente",
      calendarId: record.comision ? "com" : "aus",
    }));
  } catch (e) {
    console.log(e);
  }
};

const actualizarFecha = (fecha) => {
  const dato_fecha = fecha.split("-");
  fechaRef.mes = dato_fecha[1];
  fechaRef.ano = dato_fecha[0];
};

const calendarios = async () => {
  const cals = {};
  const cols = await colores.data;
  if (cols) {
    (await cols).forEach((color) => {
      cals[color.codigo] = {
        colorName: color.codigo,
        lightColors: {
          ...color,
        },
      };
    });
  }
  return cals;
};

export { bloquearDia, iconColor, cargarAgenda, actualizarFecha, calendarios };
