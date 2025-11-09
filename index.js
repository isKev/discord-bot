import express from "express";
import { Client, GatewayIntentBits } from "discord.js";

const app = express();
const PORT = process.env.PORT || 10000;

// Render necesita que haya un servidor web activo
app.get("/", (req, res) => res.send("Bot funcionando correctamente 🚀"));
app.listen(PORT, () => console.log(`Servidor web escuchando en ${PORT}`));

// Configura el bot de Discord
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once("ready", () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
});

client.on("messageCreate", (msg) => {
  if (msg.content === "!ping") msg.reply("🏓 Pong!");
});

// Inicia sesión con el token del bot (se pone como variable de entorno en Render)
client.login(process.env.DISCORD_TOKEN);
