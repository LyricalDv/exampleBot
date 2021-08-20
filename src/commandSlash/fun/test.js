const SlashCommand = require('../../structures/SlashCommand'); //Llamamos la clase SlashCommand

module.exports = class Test extends SlashCommand { //Creamos una clase llamada Test, la cual extenderá la clase SlashCommand
    constructor(...args) {//Constructor para las propiedades
      super(...args, { //Super para establecerlas
        name: 'Test', //Propiedades que puedes establecer en la clase SlashCommand
        description: `¿Te molesta alguien? Esta emoción es perfecta para la ocasión.`,
        guildOnly: true,
      });
    }

    async run(interaction) {//Función quue utilizamos en interactionCreate para poder usar la interacccion
    interaction.reply("si")//Respondemos al comando con interaction.reply
  }
}; //Ver más información en la documentación