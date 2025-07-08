<script>
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

  import { ScheduleXCalendar } from "@schedule-x/svelte";
  import { createCalendar, createViewMonthGrid } from "@schedule-x/calendar";
  import { createCalendarControlsPlugin } from "@schedule-x/calendar-controls";
  import ToggleLeft from "@lucide/svelte/icons/toggle-left";
  import ToggleRight from "@lucide/svelte/icons/toggle-right";
  import {
    bloquearDia,
    iconColor,
    actualizarFecha,
    cargarAgenda,
    calendarios,
  } from "./calendario";

  import { eventosAdmin } from "$store/admin.svelte.js";

  const { empleado } = $props();

  let isComision = $state(false);
  let ToggleIcon = $state(ToggleLeft);
  const control = createCalendarControlsPlugin();

  const calendarApp = createCalendar(
    {
      events: [],
      views: [createViewMonthGrid()],
      locale: "es-ES",
      callbacks: {
        async onSelectedDateUpdate(date) {
          actualizarFecha(date);
          await cargarAgenda(empleado);
        },
        async onDoubleClickDate(date) {
          eventosAdmin.add(await bloquearDia(date, isComision));
        },
      },
    },
    [eventosAdmin, control],
  );

  $effect(async () => {
    control.setCalendars(await calendarios());
  });
</script>

<div>
  <button
    class={["uk-button", "uk-button-link"]}
    onclick={() => {
      isComision = !isComision;
      ToggleIcon = isComision ? ToggleRight : ToggleLeft;
    }}
  >
    <ToggleIcon color={iconColor(isComision)} />
    {#if isComision}
      Comisi&oacute;n
    {:else}
      Ausente
    {/if}
  </button>
</div>
<div>
  <ScheduleXCalendar {calendarApp} />
</div>
