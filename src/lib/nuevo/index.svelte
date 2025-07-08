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

  import Modal from "./modal.svelte";

  import { pacienteForm } from "$store/paciente.svelte.js";
  import { paciente } from "$store/app.svelte.js";
  import { definirBtn } from "./fns.svelte.js";

  const { mostrar, tab } = $props();

  $effect(() => {
    if (!paciente.data) {
      pacienteForm.data = {};
    }
  });
</script>

{#if mostrar(tab)}
  {#await definirBtn() then Btn}
    <div>
      <button
        uk-toggle="target: #mdlPaciente"
        class={["uk-button", "uk-button-primary"]}
      >
        <Btn.Icon size={20} />
        {Btn.Text}
      </button>
      <Modal />
    </div>
  {/await}
{/if}
