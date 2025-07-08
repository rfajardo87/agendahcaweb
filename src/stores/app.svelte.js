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

import { getMonth, getYear, format } from "date-fns";
import { createCalendarControlsPlugin } from "@schedule-x/calendar-controls";
import { createEventsServicePlugin } from "@schedule-x/events-service";

let medico = $state({ data: "" });

let paciente = $state({ data: "" });

let citas = $state({ data: [] });

let disponibles = $state({ data: [] });

const fecha = new Date();

let fechaRef = $state({ mes: getMonth(fecha) + 1, ano: getYear(fecha) });

let pluginEventos = $state(createEventsServicePlugin());

let pluginControl = $state(createCalendarControlsPlugin());

let caller = $state({});

let pestana = $state({ current: 1 });

let fechaLista = $state({ data: format(new Date(), "yyyy-MM-dd") });

export {
  medico,
  paciente,
  citas,
  disponibles,
  fechaRef,
  pluginEventos,
  pluginControl,
  caller,
  pestana,
  fechaLista,
};
