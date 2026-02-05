require('dotenv').config();
const Telegrambot = require('node-telegram-bot-api')
const token = process.env.TOKEN


const bot = new Telegrambot(token, { polling: true })

// inline_keyboard - bu tugmalarni habarlar pastida xhiqadigan tugmalar 

bot.onText(/\/start/, msg => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, `Assalomu alaykum ${msg.chat.first_name} botga xush kelibsiz!`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "DolimovS",
                            url: "https://www.github.com/DolimovS"
                        }
                    ],
                    [
                        {
                            text: "Admin bilan bog'lanish",
                            url: "https://t.me/Dolimov_9"
                        },
                        {
                            text: "O'zim haqimda",
                            callback_data: "bio"
                        }
                    ]
                ]
            }
        }
    )
})

// callback_query - bu inline keyboard tugmalari bosilganda ishlaydi
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id
    if (query.data == "bio") {
        bot.sendMessage(chatId, `Men Dolimov Samandar, 2005-yil 9-avgustda tug'ilganman. Hozirda 2026-yilda 21 yoshdaman. Dasturlashga qiziqaman va turli loyihalar ustida ishlayman. Mening maqsadim dasturlash sohasida o'z bilimlarimni oshirish va yangi texnologiyalarni o'rganishdir.`)
    }
})

