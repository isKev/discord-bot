import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

// Cargar variables del entorno desde Render (.env)
dotenv.config();

// Crear el cliente de Discord con los Intents básicos
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Necesario para slash commands
    GatewayIntentBits.GuildMessages, // Leer mensajes
    GatewayIntentBits.MessageContent // Leer el contenido de los mensajes
  ]
});

// Cuando el bot se conecta correctamente
client.once("ready", () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
});

// Evento: cuando alguien manda un mensaje
client.on("messageCreate", (message) => {
  // Ignorar mensajes del propio bot
  if (message.author.bot) return;

  // Ejemplo simple de comando
  if (message.content === "!ping") {
    message.reply("🏓 Pong!");
  }
});

// Iniciar sesión con el token desde las variables de entorno
client.login(process.env.DISCORD_TOKEN);
