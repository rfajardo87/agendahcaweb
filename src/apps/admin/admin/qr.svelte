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

  import QrCode from "svelte-qrcode";
  import QR from "@lucide/svelte/icons/qr-code";
  import { api } from "$api/api";
  import { empleado } from "$store/admin.svelte.js";

  let ruta = $state("");
</script>

<div>
  <button
    class={["uk-button", "uk-button-primary"]}
    uk-toggle="target: .mdlQR"
    disabled={!empleado.data}
    onclick={() => (ruta = `/qr/${empleado.data}`)}
  >
    <QR />
    Acceso QR
  </button>

  <div uk-modal class={["mdlQR"]}>
    <div class={["uk-modal-dialog"]}>
      <div class={["uk-modal-title", "uk-padding-small"]}>Acceso QR</div>
      <div class={["uk-modal-body"]}>
        {#await api.get(ruta)}
          <div class={["uk-text-primary", "uk-text-center"]} uk-spinner></div>
        {:then cadena}
          <div
            class={[
              "uk-align-center",
              "uk-flex",
              "uk-flex-row",
              "uk-flex-center",
            ]}
          >
            <QrCode value={cadena.data} size={300} />
          </div>
        {/await}
      </div>
    </div>
  </div>
</div>
