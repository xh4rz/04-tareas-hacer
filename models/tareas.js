const Tarea = require('./tarea');
require('colors');

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

	cargarTareasFromArray(tareas = []) {
		tareas.forEach((tarea) => {
			this._listado[tarea.id] = tarea;
		});
	}

	crearTarea(desc = '') {
		const tarea = new Tarea(desc);

		this._listado[tarea.id] = tarea;
	}

	listadoCompleto() {
		console.log('\n');

		this.listadoArr.forEach((tarea, i) => {
			const idx = `${i + 1}.`.green;

			const { desc, completadoEn } = tarea;

			const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;

			console.log(`${idx} ${desc} :: ${estado}`);
		});
	}

	listarPendientesCompletadas(completadas = true) {
		console.log('\n');

		this.listadoArr
			.filter((i) => (completadas ? i.completadoEn : !i.completadoEn))
			.forEach((tarea, i) => {
				const idx = `${i + 1}.`.green;

				const { desc, completadoEn } = tarea;

				const estado = completadoEn ?? 'Pendiente'.red;

				console.log(`${idx} ${desc} :: ${estado}`);
			});
	}

	borrarTarea(id = '') {
		if (this._listado[id]) {
			delete this._listado[id];
		}
	}
}

module.exports = Tareas;
