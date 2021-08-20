const { Client, Collection, Options, LimitedCollection } = require("discord.js")//Importamos todas las clases
const Util = require('./Util'); //Requerimos la clase Util
const config = require("../../config.js") //Importamos el archivo config para obtener el token

const token = config.token //Una variable para almacenar el token

module.exports = class exampleClient extends Client { //Creamos una clase, la cual extenderá la clase Client que importamos el modulo discord.js
	constructor(options = {}, sentry) {//Constructor para definir las propiedades
	  super({
      intents: [//Definimos los intents
        'GUILDS',
        'GUILD_MESSAGES'
      ],
    });

    //Propiedades que usaremos globalmente con this.client o client en el archivo index
    this.slashCommands = new Collection() //Nueva colección para almacenar los comandos de barra
    this.validate(options) //propiedad para despues validar todas las opciones que se irá agregando
    this.events = new Collection() //Nueva colección para almacenar los eventos
    this.utils = new Util(this) //Utilizamos la clase Util y la establecemos como propiedad
  }

  validate(options) {//Función para validar las opciones
    if (typeof options !== 'object') throw new TypeError('Las opciones deben ser de tipo Objeto.')//Condicional para verificar que las opciones que ingresamos estén en objetos

    if (!token) throw new Error('Ingresa un token.')
    this.token = token
  }

  async start(token = this.token) {//Creamos una función para decirle al bot que se encienda
    this.utils.loadEvents()//Cargamos los eventos
    this.utils.loadSlashCommands() //Cargamos los comandos
    this.login(token)//Nos logueamos en discord
  }
};