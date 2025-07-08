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

  import Circle from "@lucide/svelte/icons/circle";
  import { finalizarCita } from "./lista";

  import { statusCtx } from "$store/status.ctx.svelte.js";

  const { cita } = $props();
  statusCtx.valor = cita;
</script>

<td>
  {statusCtx.valor.status}
  <button
    type="button"
    class={["uk-button", "uk-button-link"]}
    disabled={!["ini", "prg"].includes(statusCtx.valor.status_id)}
    onclick={() => finalizarCita(cita.id)}
  >
    <Circle
      fill={statusCtx.valor.color}
      color={statusCtx.valor.color}
      size={12}
    />
  </button>
</td>
