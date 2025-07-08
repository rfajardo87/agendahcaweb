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

import { parseISO, addMinutes, format } from "date-fns";
import { componentes } from "$store/componentes.svelte.js";
import {
  citas,
  medico,
  paciente,
  fechaRef,
  pluginEventos,
  pluginControl,
  pestana,
} from "$store/app.svelte.js";
import { colores } from "$store/colores.svelte.js";
import { session } from "$store/session.svelte.js";
import { api } from "$api/api";

const cargarControl = async () => {
  try {
    const ctrl = componentes.data.find((componente) => componente.padre === 1);
    if (ctrl) {
      return (await import(`$lib/${ctrl.ruta}/index.svelte`)).default;
    }
    return undefined;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

const cambiarTab = (tabIndex) => (pestana.current = tabIndex);

const cargarCitas = async (monthView) => {
  try {
    const rsp = await api.get(
      `/cita/${medico.data}/agenda/${fechaRef.ano}/${fechaRef.mes}`,
    );
    const data = await rsp.data;
    citas.data = data;
    if (monthView) {
      const vistaCalendario = data.map((cita) => ({
        ...cita,
        ...formatoEvento1(cita),
        calendarId: cita.status_id === "rea" ? "rea" : cita.issub ? "ss" : "pv",
        title: cita.issub ? "Subsecuente" : "Primera vez",
        people: [cita.paciente],
      }));

      const all = [...pluginEventos.getAll(), ...vistaCalendario];
      pluginEventos.set(all);
    }
  } catch (e) {
    console.log(e);
  }
};

const cargarEventos = async () => {
  pluginEventos.set([]);
  const medicoCurp = medico.data;
  if (!medicoCurp) {
    return;
  }

  const monthView = pluginControl.getView() !== "month-grid";

  await cargarVistaMes();
  await cargarCitas(monthView);
  if ([1, 3].includes(session.data.perfil_id) && monthView) {
    await cargarDisponibles();
  }
};

const formatoEvento = (fecha) => format(fecha, "yyyy-MM-dd HH:mm");

const formatoEvento1 = ({ fecha, hora, issub, inicio }) => {
  const fechaEvento = parseISO(`${fecha} ${hora ?? inicio}`);
  return {
    start: formatoEvento(fechaEvento),
    end: formatoEvento(addMinutes(fechaEvento, issub ? 20 : 40)),
  };
};

const cargarDisponibles = async () => {
  try {
    const ruta = `/cita/${medico.data}/disponibles/${fechaRef.ano}/${fechaRef.mes}`;
    const rsp = await api.get(ruta);
    const evDisponibles = (await rsp.data).map((espacio, index) => ({
      ...espacio,
      id: `${espacio.calendarId}${index}`,
      ...formatoEvento1(espacio),
    }));
    console.log(pluginEventos.getAll());
    const all = [...pluginEventos.getAll(), ...evDisponibles];
    pluginEventos.set(all);
  } catch (e) {
    console.log(e);
  }
};

const cargarCalendarios = async () => {
  try {
    const rsp = await api.get("/citacolor");
    const data = await rsp.data;
    colores.data = data;
    const calendars = {};
    data.forEach((cal) => {
      calendars[cal.codigo] = {
        colorName: cal.codigo,
        lightColors: {
          ...cal,
        },
      };
    });
    return calendars;
  } catch (e) {
    console.log(e);
  }
};

const registrarCita = async (evento, eventos) => {
  try {
    if (!medico.data || !paciente.data) {
      return;
    }
    const rsp = await api.post("/cita", {
      medico: medico.data,
      paciente: paciente.data,
      fecha: evento.fecha,
      hora: evento.hora,
      issub: evento.issub,
    });
    const data = await rsp.data;
    const cita = {
      ...data,
      ...formatoEvento1(data),
      calendarId: data.issub ? "ss" : "pv",
      title: data.issub ? "Subsecuente" : "Primera vez",
      people: [data.paciente],
    };
    eventos.remove(evento.id);
    eventos.add(cita);
  } catch (e) {
    console.log(e);
  }
};

const cargarVistaMes = async () => {
  try {
    const ruta = `/cita/${medico.data}/mensual/${fechaRef.ano}/${fechaRef.mes}`;
    const rsp = await api.get(ruta);
    const data = await rsp.data;
    data.forEach((cita, index) => {
      pluginEventos.add({
        ...cita,
        id: `vistMes${index}`,
        start: cita.fecha,
        end: cita.fecha,
      });
    });
  } catch (e) {
    console.log(e);
  }
};

const initMedico = async () => {
  if (session.data.perfil_id === 2) {
    await cargarEventos();
  }
};

export {
  cargarControl,
  cargarCitas,
  cargarEventos,
  cargarCalendarios,
  registrarCita,
  cambiarTab,
  initMedico,
};
