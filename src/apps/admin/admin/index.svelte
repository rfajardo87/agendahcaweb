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

  import Selector from "$lib/selector/index.svelte";
  import Template from "$lib/template/index.svelte";
  import QR from "./qr.svelte";
  import Lista from "./Lista.svelte";
  import Horario from "./horarios.svelte";
  import Acciones from "./acciones/acciones.svelte";

  import { cargador, evento } from "./fns";
</script>

<div class={["uk-padding-small", "uk-flex", "uk-flex-column"]}>
  <div class={["uk-flex", "uk-flex-row"]} uk-grid>
    <div>
      <Selector
        placeholder="Empleado"
        {evento}
        {cargador}
        texto="nombre"
        valor="curp"
        mostrar={() => true}
      />
    </div>
    <div class={["uk-button-group"]}>
      <Horario />
      <Template isAdmin={true} />
    </div>
    <QR />
  </div>
  <!--tools-->
  <div class={["uk-flex", "uk-flex-row", "uk-padding-small"]} uk-grid>
    <Lista />
    <Acciones />
  </div>
</div>
