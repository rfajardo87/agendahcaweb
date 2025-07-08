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

  import { Toaster } from "svelte-sonner";
  import Session from "$app/session/index.svelte";
  import Navegacion from "$lib/navegacion/index.svelte";
  import { counter } from "$store/session.svelte.js";

  import {
    cargarComponentes,
    verificarSession,
    existeCadenaSession,
  } from "./fns";

  let App = $state(Session);
  let loading = $state();
  let sessionActiva = $state(false);

  $effect(async () => {
    if (counter.valor > 0) {
      return;
    }
    if (!existeCadenaSession()) {
      counter.valor += 1;
    }
    sessionActiva = await verificarSession();

    if (sessionActiva) {
      App = await cargarComponentes();
    }
  });
</script>

<Navegacion {sessionActiva} />
<main class={["uk-container"]}>
  <Toaster
    position="top-right"
    richColors={true}
    toastOptions={{ classNames: { toast: "toast" } }}
  />
  <App bind:sessionActiva bind:loading />
  {#if loading}
    <div class={["uk-align-center", "uk-text-primary"]}>
      <span uk-spinner="ratio:2"></span>
    </div>
  {/if}
</main>
