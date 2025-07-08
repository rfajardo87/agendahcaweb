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

  import Clock from "@lucide/svelte/icons/clock";
  import { archivo, empleado } from "$store/admin.svelte.js";
  import { enviarHorarios } from "./fns";

  $effect(() => {
    enviarHorarios();
  });
</script>

<div uk-form-custom="target:true">
  <input
    type="file"
    accept="csv"
    aria-label="archivo horarios"
    onchange={(e) => {
      archivo.data = e.currentTarget.files[0];
    }}
    disabled={!empleado.data}
  />
  <button
    type="button"
    class={["uk-button", "uk-button-default", empleado.data && "btn-horario"]}
    ><Clock /> Horarios</button
  >
</div>

<style>
  .btn-horario {
    background-color: #ad49e1;
    color: white;
  }
</style>
