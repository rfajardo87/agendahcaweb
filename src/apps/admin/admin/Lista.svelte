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

  import { observaciones } from "$store/admin.svelte.js";
</script>

<div class={["uk-width-1-2"]}>
  <table class={["uk-table", "uk-table-striped", "uk-table-hover"]}>
    <thead>
      <tr>
        <th>Observacion</th>
      </tr>
    </thead>
    <tbody>
      {#each observaciones.data as row (row.observacion)}
        <tr>
          <td>{row.observacion}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
