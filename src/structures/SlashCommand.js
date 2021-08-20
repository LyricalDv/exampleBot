module.exports = class SlashCommand { //Creamos una clase llamada SlashCommmand
    constructor(client, name, options = {}) { //Definimos todas las propiedades que tendrá, la cual irá en un objeto
        this.client = client;
        this.name = options.name || name;
        this.description = options.description || "";
        this.options = options.options || []
        this.type = options.type || 1;
        this.cooldown = "cooldown" in options ? options.cooldown : 5 || 5;
        this.ownerOnly = options.ownerOnly || false;
        this.guildOnly = options.guildOnly || false;
        this.appOnly = options.appOnly || false;
        this.nsfwOnly = options.nsfwOnly || false;
        this.voiceOnly = options.voiceOnly || false;
        this.botPermission = options.botPermission || ['SEND_MESSAGES', 'EMBED_LINKS'];
        this.userPermission = options.userPermission  || null;
    } 
}