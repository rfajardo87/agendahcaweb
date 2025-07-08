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

import CalSync from "@lucide/svelte/icons/calendar-sync";
import { toast } from "svelte-sonner";
import { api } from "$api/api";
import { cargarAgenda } from "$app/admin/admin/acciones/calendario";
import {
  empleado,
  observaciones,
  archivo,
  eventosAdmin,
} from "$store/admin.svelte.js";
import { fechaRef } from "$store/app.svelte.js";

const cargador = async (empleado) => {
  try {
    const rsp = await api.get(`/empleado/${empleado}`);
    return await rsp.data;
  } catch (e) {
    console.log(e);
  }
};

const evento = async (value) => {
  try {
    empleado.data = value;
    observaciones.data = [];
    eventosAdmin.set([]);
    if (!value) {
      return;
    }
    /*observaciones*/
    const rsp = await api.get(
      `/solicitud/${empleado.data}/${fechaRef.ano}/${fechaRef.mes}`,
    );
    observaciones.data = await rsp.data;
    /*dias ausente*/
    const dias = await cargarAgenda(value);
    eventosAdmin.set(dias);
  } catch (e) {
    console.log(e);
  }
};

const enviarHorarios = () => {
  try {
    if (!archivo.data) {
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const archivoContent = e.target.result;
        await api.post(`/template/${empleado.data}/cargar`, { archivoContent });
        toast.success("Horarios registrados", { icon: CalSync });
      } catch (e) {
        console.log(e);
        toast.error("Error al cargar horarios", {
          icon: CalSync,
        });
      } finally {
        archivo.data = undefined;
      }
    };

    console.log(archivo.data);
    reader.readAsText(archivo.data);
  } catch (e) {
    console.log(e);
  }
};

export { cargador, evento, enviarHorarios };
