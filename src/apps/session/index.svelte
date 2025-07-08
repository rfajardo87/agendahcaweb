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

  import Cookie from "js-cookie";
  import { addHours } from "date-fns";
  import Minus from "@lucide/svelte/icons/minus";
  import { toast } from "svelte-sonner";
  import { api } from "$api/api";
  import { session, counter } from "$store/session.svelte.js";
  import { medico } from "$store/app.svelte.js";

  let { sessionActiva = $bindable(), loading = $bindable() } = $props();
  let pin = $state([]);
  let indexFocus = 0;

  const iniciarSession = async () => {
    try {
      loading = true;
      const rsp = await api.post("/session", { pss: pin.join("") });
      session.data = await rsp.data;
      api.defaults.headers.session = session.data.session;
      Cookie.set("session", session.data.session, {
        expires: addHours(new Date(), 2),
      });
      sessionActiva = true;
      if (session.data.perfil_id) {
        medico.data = session.data.curp;
      }
      counter.valor = 0;
    } catch (e) {
      toast.error("Error al iniciar session");
      pin = [];
      indexFocus = 0;
      sessionActiva = false;
      console.log(e);
    } finally {
      loading = false;
    }
  };

  $effect(async () => {
    if (pin.length === 6) {
      await iniciarSession();
    }
    const elemento = document.getElementById(`val${indexFocus}`);
    if (elemento) {
      elemento.focus();
      indexFocus += 1;
    }
  });
</script>

<div
  class={[
    "uk-flex-center",
    "uk-padding-small",
    "uk-grid-small",
    "uk-flex",
    "uk-flex-middle",
  ]}
  uk-grid
>
  {#each [0, 1, 2] as index (index)}
    <div>
      <input
        id={`val${index}`}
        bind:value={pin[index]}
        type="text"
        class={["uk-input", "uk-form-width-xsmall", "uk-text-center"]}
        maxlength={1}
      />
    </div>
  {/each}
  <div><Minus /></div>
  {#each [3, 4, 5] as index (index)}
    <div>
      <input
        id={`val${index}`}
        bind:value={pin[index]}
        type="text"
        class={["uk-input", "uk-form-width-xsmall", "uk-text-center"]}
        maxlength={1}
      />
    </div>
  {/each}
</div>
