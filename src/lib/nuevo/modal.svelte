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

  import Asterisk from "@lucide/svelte/icons/asterisk";
  import ToggleLeft from "@lucide/svelte/icons/toggle-left";
  import ToggleRight from "@lucide/svelte/icons/toggle-right";
  import Save from "@lucide/svelte/icons/save";
  import { pacienteForm as paciente } from "$store/paciente.svelte.js";

  import { guardarPaciente, cargarPaciente } from "./fns.svelte.js";
  console.log({ paciente });
</script>

{#await cargarPaciente() then}
  <div id="mdlPaciente" uk-modal>
    <div class="uk-modal-dialog">
      <div class={["uk-modal-title", "uk-padding-small"]}>
        {#if paciente.data.curp}Editar{:else}Nuevo{/if} paciente
      </div>
      <div class={["uk-modal-body"]}>
        <p class={["uk-text-default", "uk-text-danger"]}>
          <Asterisk size={16} /> Datos obligatorios
        </p>
        <div class={["uk-flex", "uk-flex-column", "uk-grid-medium"]} uk-grid>
          <div>
            <label class={["uk-form-label"]} for="txtExp"
              >N&uacute;mero de expediente</label
            >
            <input
              type="text"
              id="txtExp"
              class={["uk-input"]}
              placeholder="Expediente"
              bind:value={paciente.data.expediente}
            />
          </div>
          <div>
            <label class={["uk-form-label"]} for="txtNombre"
              >Nombre completo paciente <sup
                ><Asterisk color="red" size={16} /></sup
              ></label
            >
            <input
              type="text"
              id="txtNombre"
              class={["uk-input", !paciente.data.nombre && "uk-form-danger"]}
              placeholder="Nombre"
              bind:value={paciente.data.nombre}
            />
          </div>
          <div>
            <label class={["uk-form-label"]} for="txtCURP"
              >CURP<sup><Asterisk color="red" size={16} /></sup></label
            >
            <input
              type="text"
              id="txtCURP"
              class={["uk-input", !paciente.data.curp && "uk-form-danger"]}
              placeholder="CURP"
              bind:value={paciente.data.curp}
            />
          </div>
          <div>
            <label class={["uk-form-label"]} for="txtContacto"
              >Tel&eacute;fono o correo electr&oacute;nico<sup
                ><Asterisk color="red" size={16} /></sup
              ></label
            >
            <input
              type="text"
              id="txtContacto"
              class={["uk-input", !paciente.data.contacto && "uk-form-danger"]}
              placeholder="Contacto"
              bind:value={paciente.data.contacto}
            />
          </div>
          <div>
            <label class={["uk-form-label"]} for="txtSec"
              >Tel&eacute;fono o correo electr&oacute;nico secundario</label
            >
            <input
              type="text"
              id="txtSec"
              class={["uk-input"]}
              placeholder="Contacto Secundario"
              bind:value={paciente.data.secundario}
            />
          </div>
          <div>
            <label class={["uk-form-label"]} for="txtDomicilio"
              >Domicilio (direcci&oacute;n)</label
            >
            <input
              type="text"
              id="txtDomicilio"
              class={["uk-input"]}
              placeholder="Domicilio"
              bind:value={paciente.data.domicilio}
            />
          </div>
          <div>
            <label for="txtNacimiento">Fecha de nacimiento</label>
            <input
              type="date"
              id="txtNacimiento"
              class={["uk-input"]}
              placeholder=""
              bind:value={paciente.data.nacimiento}
            />
          </div>
          <div>
            <button
              id="btnGenero"
              class={["uk-button", "uk-button-link"]}
              onclick={() => (paciente.data.genero = !paciente.data.genero)}
            >
              {#if paciente.data.genero}
                <ToggleLeft size={36} color="#F806CC" strokeWidth={2} />
              {:else}
                <ToggleRight size={36} color="#4E71FF" strokeWidth={2} />
              {/if}
            </button>
            <label for="btnGenero"
              >{paciente.data.genero ? "Femenino" : "Masculino"}</label
            >
          </div>
        </div>
      </div>
      <div class={["uk-modal-footer"]}>
        <button
          class={["uk-button", "uk-button-primary"]}
          disabled={!paciente.data.nombre ||
            !paciente.data.curp ||
            !paciente.data.contacto}
          onclick={() => {
            guardarPaciente(paciente);
            paciente.data = { genero: true };
          }}><Save /> Guardar</button
        >
      </div>
    </div>
  </div>
{/await}
