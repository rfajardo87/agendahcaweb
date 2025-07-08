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
  import {
    createCalendar,
    createViewWeek,
    createViewMonthGrid,
    viewMonthGrid,
  } from "@schedule-x/calendar";
  import "@schedule-x/theme-default/dist/index.css";
  import { cargarEventos, cargarCalendarios, registrarCita } from "./fns";
  import { fechaGlobal } from "$lib/fecha/fns";
  import { fechaLista } from "$store/app.svelte.js";

  import { medicoCitas } from "$shared/timeout.id.js";

  import {
    pluginEventos as eventos,
    pluginControl as control,
    caller,
  } from "$store/app.svelte.js";

  const calendarApp = createCalendar(
    {
      views: [createViewWeek(), createViewMonthGrid()],
      events: [],
      locale: "es-ES",
      firstDayOfWeek: 1,
      defaultView: viewMonthGrid.name,
      weekOptions: {
        gridHeight: 5000,
        eventOverlap: false,
      },
      monthGridOptions: {
        nEventsPerDay: 1,
      },
      callbacks: {
        async onDoubleClickEvent(calendarEvent) {
          registrarCita(calendarEvent, eventos);
        },
        onSelectedDateUpdate(date) {
          fechaLista.data = date;
          fechaGlobal();
        },
      },
    },
    [control, eventos],
  );

  $effect(async () => {
    document
      .querySelector(".sx__view-selection")
      .addEventListener("click", async () => {
        const callerId = caller[medicoCitas];
        clearTimeout(callerId);

        await cargarEventos();
      });

    if (Object.keys(control.getCalendars())) {
      control.setCalendars(await cargarCalendarios());
    }
  });
</script>

<div class={["calendario"]}>
  <ScheduleXCalendar {calendarApp} />
</div>

<style>
  .calendario :global(.sx__view-container) {
    max-height: 60vh;
    overflow: auto;
  }
</style>
