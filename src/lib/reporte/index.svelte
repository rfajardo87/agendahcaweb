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

  import ExcelIcon from "@lucide/svelte/icons/file-spreadsheet";
</script>

<div>
  <button
    class={["uk-button", "uk-button-default", "btn-reporte"]}
    type="button"><ExcelIcon /> Reporte</button
  >
</div>

<style>
  .btn-reporte {
    background-color: green;
    color: white;
  }
</style>
