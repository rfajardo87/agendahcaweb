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

import { componentes } from "$store/componentes.svelte.js";
import { citas, medico, paciente, pestana } from "$store/app.svelte.js";
import { api } from "$api/api";
import { cargarEventos } from "$app/App/fns";

const cargarComponentes = async () => {
  try {
    return Promise.all(
      componentes.data
        .filter((componente) => componente.padre === 2)
        .sort((a, b) => a.orden - b.orden)
        .map(async (componente) => ({
          Cmp: (await import(`$lib/${componente.ruta}/index.svelte`)).default,
          tab: componente.tab,
          nombre: componente.nombre,
        })),
    );
  } catch (e) {
    console.log(e);
  }
};

const cargarMedicoPaciente = async (value, ruta) => {
  try {
    const rsp = await api.get(`/${ruta}/${value}`);
    return await rsp.data;
  } catch (e) {
    console.log(e);
  }
};

const asignarMedico = async (valor) => {
  medico.data = valor;
  if (!valor) {
    citas.data = [];
  }
  await cargarEventos();
};

const asignarPaciente = (valor) => (paciente.data = valor);

const mostrarEnPestana = (value) => value === 0 || pestana.current === value;

export {
  cargarComponentes,
  cargarMedicoPaciente,
  asignarMedico,
  asignarPaciente,
  mostrarEnPestana,
};
