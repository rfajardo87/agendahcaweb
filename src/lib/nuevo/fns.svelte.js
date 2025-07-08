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
import { toast } from "svelte-sonner";
import UserCheck from "@lucide/svelte/icons/user-round-check";
import Plus from "@lucide/svelte/icons/plus";
import UserPencil from "@lucide/svelte/icons/user-round-pen";
import { paciente as pacienteState } from "$store/app.svelte.js";
import { pacienteForm } from "$store/paciente.svelte.js";

const guardarPaciente = async (paciente) => {
  try {
    const fn = pacienteState.data ? api.put : api.post;

    let ruta = "/paciente";
    let msg = "Paciente registrado";

    if (pacienteState.data) {
      ruta += `/${pacienteState.data}`;
      msg = "Paciente actualizado";
    }

    await fn(ruta, paciente);
    toast.success(msg, {
      icon: UserCheck,
    });
  } catch (e) {
    console.log(e);
  }
};

const definirBtn = () => {
  if (pacienteState.data) {
    return {
      Icon: UserPencil,
      Text: "Editar",
    };
  }
  return {
    Icon: Plus,
    Text: "Nuevo",
  };
};

const cargarPaciente = async () => {
  try {
    if (!pacienteState.data) {
      return;
    }
    const rsp = await api.get(`/paciente/${pacienteState.data}`);
    pacienteForm.data = await rsp.data.at(0);
  } catch (e) {
    console.log(e);
  }
};

export { guardarPaciente, cargarPaciente, definirBtn };
