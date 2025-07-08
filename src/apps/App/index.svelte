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

  import Calendar from "./calendar.svelte";
  import Lista from "./lista.svelte";
  import { cargarControl, cambiarTab, initMedico } from "./fns";

  let Control = $state(undefined);

  $effect(async () => {
    if (!Control) {
      Control = await cargarControl();
    }
    await initMedico();
  });
</script>

<div class={["uk-padding-small"]}>
  <ul uk-tab="animation: uk-animation-fade">
    <li><a href onclick={() => cambiarTab(1)}>Citas</a></li>
    <li><a href onclick={() => cambiarTab(2)}>Lista</a></li>
  </ul>

  <Control />
  <div class={["uk-switcher"]}>
    <Calendar />
    <Lista />
  </div>
</div>
