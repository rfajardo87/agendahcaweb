<!--

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
-->

<div
  class={["uk-flex", "uk-flex-row"]}
  uk-grid
  uk-switcher="connect: #adminApp; animation: uk-animation-fade"
>
  <div>
    <button class={["uk-button", "uk-button-link"]} uk-switcher-item
      >Citas</button
    >
  </div>
  <div>
    <button class={["uk-button", "uk-button-link"]} uk-switcher-item
      >Administracion</button
    >
  </div>
</div>
