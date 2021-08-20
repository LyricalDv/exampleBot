const Bot = require("./structures/Bot") // Nombramos la constante como Bot y requerimos el achivo Bot de la carpeta structures
const client = new Bot() //Creamos un nuevo cliente con la clase que creamos en Bot.js

client.on("messageCreate", async (message) => { // Creamos un evento message para subir los comandos de barra y las aplicaciones a discord
	if(!client.application?.owner) await client.application?.fetch()//Condicional en la que establecemos, si el cliente no encuentra al crador de la aplicacion (Bot) en el caché, lo busca.
	if(message.content.toLowerCase() === `.upload` && message.author.id === client.application?.owner.id){//Condicional para el mensaje y verificar que el creador del mensaje sea el mimso creador de la aplicación.
    	let slash = [] // Creamos un array para guardar todos nuestros comandos
    	client.slashCommands.filter(x => x.guildOnly).forEach(e => { //Hacemos un filtro, para obtener solo los comandos que tengan la propiedad guildOnly (Esto solo para establecer los comandos en los servidores y no globalmente)
        slash.push({//Pusheamos los comandos con sus respectivas propiedades
            name: e.name,
            type: e.type,
            description: e.type === 1 ? e.description : "", //Una condicional(terniario) para verificar el tipo de interacción y evitar errores con las interacciones de tipo aplicación
            options: e.options
        })
    })
    client.guilds.cache.forEach(async guild => {//Buscamos en el caché todos los servidores en los que se encuentra el bot
        await client.guilds.cache.get(guild.id)?.commands.set(slash).catch(err => console.log(err)) //Lo establecemos
    })
    message.channel.send('comandos setiado')
    }
})

client.start() //Realizamos Client.start() para encender el bot con la función que establecimos en Bot.js