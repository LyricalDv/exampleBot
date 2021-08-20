const Event = require('../../structures/Event') //Llamamos la clase Event
const { Permissions } = require("discord.js"); //Llamamos la librería discord.js e importamos la clase Pemissions

module.exports = class Interaction extends Event {//Creamos la clase Interaction, la cual extenderá la clase Event
	constructor(...args) {
		super(...args)
	}

	async run(interaction) { // utilizamos la funcion run que hicimos en la clase Event
		if(interaction.isCommand()){//Usando el parametro interaction del evento interactionCreate, verificamos que la interacción sea un comando de barra, con la función isCommand(), utilizando la librería discord.js
			await this.client.application?.commands.fetch()//Resolvemos la promesa usando await para buscar los comandos del bot

			// Variables que utilizaremos para evitar poniendo las mismas cosas varias veces

			const guild = this.client.guilds.cache.get(interaction.guildId) //Buscamos la guild en el cache
			const cmd = this.client.slashCommands.get(interaction.commandName) //Buscamos el comando dentro de la collection que establecimos en el cliente
			const channel = this.client.channels.cache.get(interaction.channelId) //Buscamos el canal dentro del cache
			const member = this.client.users.cache.get(interaction.user.id) //Buscamos el usuario dentro del cache
			const guildMember = await guild.members.fetch(interaction.user.id); //Bucamos el miembro dentro del cache

			//Todo dentro de interaction, para saber más buscar en la documentación de discord.js
			
			/////////////////

			//Funciones para ahorrarnos el mismo codigo dentro de varios comandos de barra, la explicación de esto la consigues en la documentación

			if(cmd.nsfwOnly){
				if(!channel.nsfw) return interaction.reply({content: 'puerko', ephemeral: true})
			}

			if(cmd.voiceOnly){
				if(!guildMember.voice.channel) return interaction.reply({content: `${this.client.emote.interdasting} **Necesitas estar en un canal de voz para ejecutar \`${command.name}\`.**`, ephemeral: true})
			}

			if(cmd.botPermission){
				const missingPermissions = channel.permissionsFor(interaction.applicationId).missing(cmd.botPermission).map(p => permissions[p]);
          		if (missingPermissions.length !== 0) return interaction.reply({embeds: [{ description: `${this.client.emote.bunnyPoke} Oops! No tengo los permisos necesarios para ejecutar **${command.name}** u.u`, fields: [{name: `Requiero los siguientes permisos:`, value: `**\`\`\`${missingPermissions.map(p => `${p}`).join('\n')}\`\`\`**`}]}], ephemeral: true})
			}

			if (cmd.userPermission) {
          		const missingPermissions = channel.permissionsFor(member).missing(cmd.userPermission).map(p => permissions[p]);
          		if (missingPermissions.length !== 0) return interaction.reply({embeds: [{ description: `${this.client.emote.bunnyPoke} No tienes los permisos para ejecutar **${command.name}** u.u`, fields: [{name: `Requiere los siguientes permisos:`, value: `**\`\`\`${missingPermissions.map(p => `${p}`).join('\n')}\`\`\`**`}]}], ephemeral: true})
        	}
        	
			if(interaction.commandName === cmd.name){//Condicional para verificar que el nombre de la interacción sea igual que el comando de barra que establecimos dentro de la collection
				await cmd.run(interaction, guild, interaction.options)//Si existe usamos la variable cmd y la functión run, para poder utilizar todas las propiedades de las interacciones dentro del archivo del comando de barra
			}
		}
		if(interaction.isContextMenu()){ //La misma cosa que arriba, solo que con los Context Menu (Apps)
			await this.client.application?.commands.fetch()
			const guild = this.client.guilds.cache.get(interaction.guildId)
			const cmd = this.client.slashCommands.get(interaction.commandName)
			const channel = this.client.channels.cache.get(interaction.channelId)
			const member = this.client.users.cache.get(interaction.user.id)
			const guildMember = await guild.members.fetch(interaction.user.id);
			
			/////////////////

			if(cmd.nsfwOnly){
				if(!channel.nsfw) return interaction.reply({content: 'puerko', ephemeral: true})
			}

			if(cmd.voiceOnly){
				if(!guildMember.voice.channel) return interaction.reply({content: `${this.client.emote.interdasting} **Necesitas estar en un canal de voz para ejecutar \`${command.name}\`.**`, ephemeral: true})
			}

			if(cmd.botPermission){
				const missingPermissions = channel.permissionsFor(interaction.applicationId).missing(cmd.botPermission).map(p => permissions[p]);
          		if (missingPermissions.length !== 0) return interaction.reply({embeds: [{ description: `${this.client.emote.bunnyPoke} Oops! No tengo los permisos necesarios para ejecutar **${command.name}** u.u`, fields: [{name: `Requiero los siguientes permisos:`, value: `**\`\`\`${missingPermissions.map(p => `${p}`).join('\n')}\`\`\`**`}]}], ephemeral: true})
			}

			if (cmd.userPermission) {
          		const missingPermissions = channel.permissionsFor(member).missing(cmd.userPermission).map(p => permissions[p]);
          		if (missingPermissions.length !== 0) return interaction.reply({embeds: [{ description: `${this.client.emote.bunnyPoke} No tienes los permisos para ejecutar **${command.name}** u.u`, fields: [{name: `Requiere los siguientes permisos:`, value: `**\`\`\`${missingPermissions.map(p => `${p}`).join('\n')}\`\`\`**`}]}], ephemeral: true})
        	}
        	
			if(interaction.commandName === cmd.name){
				await cmd.run(interaction, guild, interaction.options)
			}
		}
	}
}