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
import { api } from "$api/api";
import { session } from "$store/session.svelte.js";
import { componentes } from "$store/componentes.svelte.js";
import { medico } from "$store/app.svelte.js";

const cargarComponentes = async () => {
  try {
    const rsp = await api.get(`/componentes/${session.data.perfil_id}`);
    componentes.data = await rsp.data;

    const main = componentes.data.find(
      (componente) => componente.componente === 1,
    );
    return (
      await import(`$app/${main?.nombre ?? session.data.perfil}/index.svelte`)
    ).default;
  } catch (e) {
    console.log(e);
  }
};

const verificarSession = async () => {
  try {
    const sessionCookie = Cookie.get("session");
    if (sessionCookie) {
      const rsp = await api.post("/checksession", { session: sessionCookie });
      session.data = await rsp.data;
      if (session.data.perfil_id === 2) {
        medico.data = session.data.curp;
      }
      return true;
    }
  } catch (e) {
    console.log(e);
  }
  return false;
};

const existeCadenaSession = () => {
  return Cookie.get("session");
};

export { cargarComponentes, verificarSession, existeCadenaSession };
