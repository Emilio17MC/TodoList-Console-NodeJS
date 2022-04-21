const Tarea = require("./tarea");

/**
 * _listado:
 *   { 'uuid-123712-123123-2': {id: 12, desc: "asd", completadoEn: 92231 } }
 */

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];

      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);

    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();

    this.listadoArr.forEach((tarea, i) => {
      const idx = `${i + 1}`.green;
      const { desc, completado } = tarea;

      const estado = completado ? "Completado".green : "Pendiente".red;
      console.log(`${idx} ${desc} :: ${estado}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    console.log();

    let contador = 0;

    this.listadoArr.forEach((tarea) => {
      const { desc, completado } = tarea;
      const estado = completado ? "Completado".green : "Pendiente".red;

      if (completadas) {
        if (completado) {
          contador += 1;
          console.log(
            `${(contador + ".").green} ${desc} :: ${completado.green}`
          );
        }
      } else {
        if (!completado) {
          contador += 1;
          console.log(`${(contador + ".").green} ${desc} :: ${estado}`);
        }
      }
    });
  }

  toggleComplete(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];

      if (!tarea.completado) {
        tarea.completado = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completado = null;
      }
    });
  }
}

module.exports = Tareas;
