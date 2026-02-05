require('dotenv').config();
const Telegrambot = require('node-telegram-bot-api')
const token = process.env.TOKEN


const bot = new Telegrambot(token, { polling: true })

// inline_keyboard - bu tugmalarni habarlar pastida xhiqadigan tugmalar 

bot.onText(/\/start/, msg => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, `Assalomu alaykum ${msg.chat.first_name} botga xush kelibsiz!`,
        {
            reply_markup: { //shu joyda tugmalarni beramiz
                inline_keyboard: [ //tugmalar massivini beramiz va har bir tugma yangi qatorga tushadi
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
                        }, // bitta qatorga ikkita tugma
                        {
                            text: "O'zim haqimda",
                            callback_data: "bio"
                        }
                    ],
                    [
                        {
                            text:"Test",
                            callback_data:"test"
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
    }else if (query.data=="error"){  // xatolik yuz beradigan tugma
        bot.answerCallbackQuery(query.id, {
            text:"Xatolik yuz berdi!",
            show_alert:true,  // show_alert true bo'lsa alert ko'rinadi, false bo'lsa pastda kichik habar ko'rinadi
        })
    }
    else{
        bot.answerCallbackQuery(query.id, {
            text:"Bu tugma hali ishlamayapti!",
            show_alert:false,  // show_alert true bo'lsa alert ko'rinadi, false bo'lsa pastda kichik habar ko'rinadi
        })  // agar xabar yuborilmasa quyidagi usul bilan ham yuborish mumkin yoki boshqa xatoliglar chiqsa 
        .then(()=>{
            bot.sendMessage(chatId, "Bu tugma hali ishlamayapti!")
        })  
        .catch((err)=>{
            console.log(err);
        })
    }
})

