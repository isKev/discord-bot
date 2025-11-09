import { Client, GatewayIntentBits } from "discord.js";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Crear cliente de Discord
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// Cuando el bot se conecta
client.once("ready", () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
});

// Endpoint para recibir mensajes desde Minecraft
app.post("/minecraft-chat", async (req, res) => {
  const { username, message } = req.body;

  // Canal donde se mandarán los mensajes (pon tu canal aquí 👇)
  const channelId = "1436931159354376232";

  try {
    const channel = await client.channels.fetch(channelId);
    await channel.send(`💬 **${username}**: ${message}`);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error enviando mensaje:", error);
    res.sendStatus(500);
  }
});

// Render usa el puerto asignado automáticamente
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌐 API escuchando en puerto ${PORT}`));

// Iniciar el bot
client.login(process.env.DISCORD_TOKEN);
