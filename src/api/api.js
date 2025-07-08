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

import axios from "axios";
import Cookie from "js-cookie";
import { addHours, isBefore } from "date-fns";
import { caller } from "$store/app.svelte.js";

const api = axios.create({
  //baseURL: "./api/",
	baseURL:'http://172.17.0.3:8000',
  headers: {
    session: Cookie.get("session"),
  },
});

const periodico = async (props) => {
  try {
    const {
      fn,
      tiempo = 1000 * 60 * 5,
      limite = addHours(new Date(), 8),
      id = "default",
    } = props;

    await fn();

    if (isBefore(new Date(), limite)) {
      const idCaller = setTimeout(() => {
        periodico(props);
      }, tiempo);
      caller[id] = idCaller;
    }
  } catch (e) {
    console.log(e);
  }
};

export { api, periodico };
