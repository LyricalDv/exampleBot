const fs = require('fs').promises; //Importamos el modulo fs para leer los archivos
const path = require('path'); //Importamos el modulo path para poder usar los archivos
const Event = require('./Event.js'); //Importamos la clase Event, la cual usaremos para definir las propiedades.
const SlashCommand = require('./SlashCommand.js') //Importamos la clase slashCommand, la cual usaremos para definir las propiedades.


module.exports = class Util {

	constructor(client) {
		this.client = client; //Usamos un constructor para definir client como una ropiedad de la clase.
	}

	isClass(obj) { //Una función para verificar si lo que recibimos es una clase
		return typeof obj === 'function' && typeof obj.prototype === 'object' && obj.toString().substring(0, 5) === 'class';
	}

	get directory() {
		return `${path.dirname(require.main.filename)}${path.sep}`;//una función para leer la carpeta actual
	}

	

	async *loadFiles(dir) { //Una función para cargar todos los archivos
		const files = await fs.readdir(dir);
		for (const file of files) {
			const pathToFile = path.join(dir, file);
			const isDirectory = (await fs.stat(pathToFile)).isDirectory();
			if (isDirectory) {
				yield* this.loadFiles(pathToFile);
			} else {
				yield pathToFile;
			}
		}
	}

	async loadSlashCommands(){ //Función para guardar las propiedades de los comandos de barra dentro del caché
		for await (const slashFile of this.loadFiles(`${this.directory}commandSlash`)){//Hacemos un bucle para leer todos los archivos de la carpeta
			delete require.cache[slashFile];
			const { name } = path.parse(slashFile) //Obtenemos el nombre
			const File = require(slashFile)
			if(!this.isClass(File)) throw new TypeError(`Comando ${name} no exporta una clase.`);//Condicional para saber si el archivo que usamos en el comando no está exportando una clase
			const command = new File(this.client, name.toLowerCase()); //Variable donde guardamos el nombre
			if (!(command instanceof SlashCommand)) throw new TypeError(`Comando ${name} no está en slashCommands.`);//Verificamos si el comando está siendo una instancia del evento padre
			this.client.slashCommands.set(command.name, command) //Aquí lo establecemos
		}
	}

	async loadEvents() {//Función para guardar las propiedades de los eventos dentro del caché
		for await (const eventFile of this.loadFiles(`${this.directory}events`)) {//Hacemos un bucle para leer todos los archivos de la carpeta
			delete require.cache[eventFile];
			const { name } = path.parse(eventFile);//Obtenemos el nombre
			const File = require(eventFile);
			if (!this.isClass(File)) throw new TypeError(`Evento ${name} no exporta una clase.`);//Condicional para saber si el archivo que usamos en el evento no está exportando una clase
			const event = new File(this.client, name);//Variable donde guardamos el nombre
			if (!(event instanceof Event)) throw new TypeError(`Evento ${name} no es una instancia de Event.`);//Verificamos si el comando está siendo una instancia del evento padre
			this.client.events.set(event.name, event); //Aquí lo establecemos

			event.emitter[event.type](name, (...args) => event.run(...args));
		}
	}
};