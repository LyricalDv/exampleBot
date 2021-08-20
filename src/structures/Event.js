module.exports = class Event {//Creamos una clase llamada Event
  constructor(client, name, options = {}) {//Definimos todas las propiedades que tendrá, la cual irá en un objeto
    this.name = name;
    this.partials = ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER', 'GUILD_MESSAGE_REACTIONS'],
    this.client = client;
    this.type = options.once ? 'once' : 'on';
    this.emitter = (typeof options.emitter === 'string' ? this.client[options.emitter] : options.emitter) || this.client;
  }

  async run(message, args) { //Definimos la función con la cual se ejecutará todos los eventos que creemos
    throw new Error(`El método de ejecución no se ha implementado en ${this.name}`);
  }

  reload() {
    return this.store.load(this.file.path);
  }
};