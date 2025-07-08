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

  import Save from "@lucide/svelte/icons/save";
  import { guardarObservacion } from "./observacion";
  import { empleado } from "$store/admin.svelte.js";

  let observacion = $state("");
</script>

<div>
  <textarea
    rows={3}
    placeholder="Observacion"
    bind:value={observacion}
    class={["uk-textarea"]}
  ></textarea>
</div>
<div>
  <button
    disabled={!empleado.data}
    class={["uk-button", "uk-button-primary"]}
    onclick={() => {
      guardarObservacion(observacion);
      observacion = "";
    }}><Save /> Guardar</button
  >
</div>
