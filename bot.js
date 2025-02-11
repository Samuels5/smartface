const {Telegraf} = require('telegraf')
const TOKEN = "7616097209:AAGa77ggCXmKZvbSEtu7U8Repzp2J1b6ezM";
const bot = new Telegraf(TOKEN);
const web_link = "https://smartface.vercel.app/"
bot.start((ctx)=>ctx.reply('welcome',{reply_markup:{keyboard:[[{text:"webapp",web_app: {url:web_link}}]]}}))
bot.launch()