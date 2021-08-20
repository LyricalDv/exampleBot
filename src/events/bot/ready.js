const Event = require("../../structures/Event")//Llamamos la clase Event para definir las propiedades

module.exports = class Ready extends Event {//Creamos la clase ready, la cual extenderá la clase Event
	async run(){//Ejecutamos la función run() que declaramos en la clase Event
		console.log('tamo ready')//El contenido
	}
}