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

  let {
    placeholder,
    cargador,
    evento,
    texto,
    valor,
    mostrar: mostrarFn,
    tab,
  } = $props();

  let text = $state("");
  let mostrar = $state("");
</script>

<div class={[mostrarFn(tab) ? "uk-visible" : "uk-hidden"]}>
  {#if mostrar}
    <button
      type="button"
      class={["uk-button", "uk-button-primary"]}
      onclick={() => {
        text = "";
        mostrar = "";
        evento("");
      }}>{mostrar}</button
    >
  {:else}
    <div class="uk-inline">
      <input type="text" class={["uk-input"]} {placeholder} bind:value={text} />
    </div>
    <div uk-dropdown="mode:click">
      <ul class="uk-list">
        {#await cargador(text) then list}
          {#each list as item (item.curp)}
            <li>
              <button
                type="button"
                class={["uk-button", "uk-button-link", "uk-text-primary"]}
                onclick={() => {
                  evento(item[valor]);
                  mostrar = item[texto];
                }}>{item[texto]}</button
              >
            </li>
          {/each}
        {/await}
      </ul>
    </div>
  {/if}
</div>
