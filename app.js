const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  mostrarListadoChecklist,
  confirmar,
} = require("./helpers/inquirer");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");

require("colors");

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    // Imprimir el menú
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        // Crear opcipon
        const desc = await leerInput("Descripción:");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarPendientesCompletadas(true);
        break;
      case "4":
        tareas.listarPendientesCompletadas(false);
        break;
      case "5":
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleComplete(ids);
        break;
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar("¿Estás seguro que desea eliminar?");

          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea eliminada");
          }
        }

        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");

  // pausa();
};

main();
