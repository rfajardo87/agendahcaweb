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

import { createEventsServicePlugin } from "@schedule-x/events-service";

import { getMonth, getYear } from "date-fns";

export let empleado = $state({ data: undefined });

export let observaciones = $state({ data: [] });

export let agenda = $state({ data: [] });

const fecha = new Date();

export let fechaRef = $state({ mes: getMonth(fecha) + 1, ano: getYear(fecha) });

export let archivo = $state({ data: undefined });

export let eventosAdmin = $state(createEventsServicePlugin());
