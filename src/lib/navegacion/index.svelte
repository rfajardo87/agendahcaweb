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

  import Hospital from "@lucide/svelte/icons/hospital";
  import Cerrar from "./cerrar.svelte";
  import { componentes } from "$store/componentes.svelte.js";

  let { sessionActiva } = $props();
  let Menu = $state(undefined);

  $effect(async () => {
    if (sessionActiva) {
      const componentes_list = await componentes.data;
      if (componentes_list) {
        const madmin = componentes_list.find(
          (componente) => componente.nombre === "Navmin",
        );
        if (madmin) {
          Menu = (await import(`$lib/${madmin.ruta}/index.svelte`)).default;
        }
      }
    }
  });
</script>

<nav class={["uk-background-primary", "uk-light"]} uk-navbar>
  <div class={["uk-navbar-left", "uk-padding-small"]}>
    <Hospital class={["uk-margin-right"]} size={40} />
    SiAHCA
  </div>
  {#if sessionActiva}
    <div class={["uk-navbar-right", "uk-padding-small"]}>
      <Menu />
      <Cerrar />
    </div>
  {/if}
</nav>
