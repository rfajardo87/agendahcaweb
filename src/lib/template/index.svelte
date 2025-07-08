<script>
/*
// Copyright (C) 2025  Rubén  de Jesús Fajardo Jaime
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

  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import Clock from "@lucide/svelte/icons/clock";

  import { session } from "$store/session.svelte.js";

  let { isAdmin = false } = $props();
  const Icon = isAdmin ? ChevronDown : Clock;
</script>

<div>
  <a
    href={`/api/template/horario?session=${session.data.session}`}
    class={[
      "uk-button",
      "uk-button-default",
      "btn-template",
      isAdmin && "uk-padding-remove",
    ]}
    target="_blank"
  >
    <Icon />
    {#if !isAdmin}
      Plantilla
    {/if}
  </a>
</div>

<style>
  .btn-template {
    background-color: #ad49e1;
    color: white;
  }
</style>
