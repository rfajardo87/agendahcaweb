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

import BriefCaseMedical from "@lucide/svelte/icons/briefcase-medical";
import User from "@lucide/svelte/icons/user";
import {
  cargarMedicoPaciente,
  asignarMedico,
  asignarPaciente,
  mostrarEnPestana,
} from "./fns";

const props = {
  Medico: {
    placeholder: "Medico",
    Icon: BriefCaseMedical,
    cargador: (value) => cargarMedicoPaciente(value, "medico"),
    texto: "nombre",
    valor: "curp",
    evento: asignarMedico,
    mostrar: mostrarEnPestana,
  },
  Paciente: {
    placeholder: "Paciente",
    Icon: User,
    cargador: (value) => cargarMedicoPaciente(value, "paciente"),
    texto: "nombre",
    valor: "curp",
    evento: asignarPaciente,
    mostrar: mostrarEnPestana,
  },
  Nuevo: {
    mostrar: mostrarEnPestana,
  },
  Fecha: {
    mostrar: mostrarEnPestana,
  },
};

export { props };
