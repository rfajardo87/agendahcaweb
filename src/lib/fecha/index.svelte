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

  import ChevronLeft from "@lucide/svelte/icons/chevron-left";
  import ChevronRight from "@lucide/svelte/icons/chevron-right";
  import { fechaLista } from "$store/app.svelte.js";
  import { moverUno, fechaGlobal } from "./fns";

  let { mostrar, tab } = $props();
</script>

{#if mostrar(tab)}
  <div
    class={["uk-flex", "uk-flex-row", "uk-grid-small", "uk-flex-middle"]}
    uk-grid
  >
    <div>
      <button
        type="button"
        class={["uk-button", "uk-button-link", "uk-text-primary"]}
        onclick={() => moverUno()}><ChevronLeft /></button
      >
    </div>
    <div>
      <input
        type="date"
        class={["uk-input"]}
        bind:value={fechaLista.data}
        onchange={() => fechaGlobal()}
      />
    </div>
    <div>
      <button
        type="button"
        class={["uk-button", "uk-button-link", "uk-text-primary"]}
        onclick={() => moverUno(true)}><ChevronRight /></button
      >
    </div>
  </div>
{/if}
