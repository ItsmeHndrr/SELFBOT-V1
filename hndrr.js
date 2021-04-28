/*
*
*         BASE : MhankBarbar
*         Remodifikasi : X - Hndrmdhn
*         Modifikasi : ItsmeHndrr
*
*/

// MODULE
const
    {
        WAConnection,
        MessageType,
        Presence,
        MessageOptions,
        Mimetype,
        WALocationMessage,
        WA_MESSAGE_STUB_TYPES,
        ReconnectMode,
        ChatModification,
        ProxyAgent,
        GroupSettingChange,
        waChatKey,
        mentionedJid,
        processTime,
    } = require("@adiwajshing/baileys")
const qrcode = require("qrcode-terminal")
const moment = require("moment-timezone")
const fs = require("fs")
const speed = require('performance-now')
const { Utils_1, generateClientID } = require('./node_modules/@adiwajshing/baileys/lib/WAConnection/Utils')
const tiktod = require('tiktok-scraper')
const axios = require("axios")
const ffmpeg = require('fluent-ffmpeg')
const imageToBase64 = require('image-to-base64');
const { removeBackgroundFromImageFile } = require('remove.bg')
const { spawn, exec, execSync } = require("child_process")
const fetchs = require("node-superfetch");
const ms = require('parse-ms')
const toMs = require('ms')
//const cheerio = require('cheerio')
const FormData = require('form-data')

/* CALLBACK */
const { wait, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { color, bgcolor } = require('./lib/color')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const { error } = require("qrcode-terminal")
const { exif } = require('./lib/exif')
const { RSA_PKCS1_OAEP_PADDING } = require("constants")

/* DATABASE */
const publikchat = JSON.parse(fs.readFileSync('./src/publik.json'))
const afkdatabase = JSON.parse(fs.readFileSync('./src/afk-taggc.json'))
let { isAntiCall, afkkontak, afktag, isSelfOnlys } = JSON.parse(fs.readFileSync('./config.json'))
const setiker = JSON.parse(fs.readFileSync('./src/stik.json'))
const menuu = JSON.parse(fs.readFileSync('./src/fitur.json'))
const videonye = JSON.parse(fs.readFileSync('./src/video.json'))
const audionye = JSON.parse(fs.readFileSync('./src/audio.json'))
const imagenye = JSON.parse(fs.readFileSync('./src/image.json'))
const truth = JSON.parse(fs.readFileSync('./src/truth.json'))
const dare = JSON.parse(fs.readFileSync('./src/dare.json'))
const config = JSON.parse(fs.readFileSync('./config.json'))
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")

publik = false
prefix = ''
fake = ' *Hndrr-SELEP* '
numbernye = '0'
targetprivate = '6289652903288'
ghoibsu = 'tes'
myteks = 'okeh nyala'
blocked = []

// FUNCTION
function kyun(seconds) {
    function pad(s) {
        return (s < 10 ? '0' : '') + s;
    }
    var hours = Math.floor(seconds / (60 * 60));
    var minutes = Math.floor(seconds % (60 * 60) / 60);
    var seconds = Math.floor(seconds % 60);
    return `❏ Runtime: ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`
}

function isSelfOnly(sender) {
    if (isSelfOnlys == true) {
        return false
    } else {
        return true
    }
}

function convertBalanceToString(angka) {
    var balancenyeini = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) balancenyeini += angkarev.substr(i, 3) + '.';
    return '' + balancenyeini.split('', balancenyeini.length - 1).reverse().join('');
}

function addMetadata(packname, author) {
    if (!packname) packname = `${config.packname}`; if (!author) author = ` ${config.author}`;
    author = author.replace(/[^a-zA-Z0-9]/g, '');
    //let name = `${author}_${packname}`

    if (fs.existsSync(`./src/sticker/data.exif`)) {
        return `./src/sticker/data.exif`
    }
    const json = {
        "sticker-pack-name": packname,
        "sticker-pack-publisher": author,
    }

    const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])
    const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]

    let len = JSON.stringify(json).length
    let last

    if (len > 256) {
        len = len - 256
        bytes.unshift(0x01)
    } else {
        bytes.unshift(0x00)
    }

    if (len < 16) {
        last = len.toString(16)
        last = "0" + len
    } else {
        last = len.toString(16)
    }

    const buf2 = Buffer.from(last, "hex")
    const buf3 = Buffer.from(bytes)
    const buf4 = Buffer.from(JSON.stringify(json))

    const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])

    fs.writeFile(`./src/sticker/data.exif`, buffer, (err) => {
        return `./src/sticker/data.exif`
    }
    )
}

function serialize(chat) {
    m = JSON.parse(JSON.stringify(chat))
    content = m.message
    //.text = m.message.conversation 
    m.isGroup = m.key.remoteJid.endsWith('@g.us')
    try {
        const berak = Object.keys(content)[0]
        m.type = berak
    } catch {
        m.type = null
    }
    try {
        const context = m.message.extendedTextMessage.contextInfo.quotedMessage
        m.quoted = context
    } catch {
        m.quoted = null
    }

    try {
        const mention = m.message[m.type].contextInfo.mentionedJid
        m.mentionedJid = mention
    } catch {
        m.mentionedJid = null
    }

    if (m.isGroup) {
        m.sender = m.participant
    } else {
        m.sender = m.key.remoteJid
    }
    if (m.key.fromMe) {
        m.sender = client.user.jid
    }
    txt = (m.type === 'conversation' && m.message.conversation) ? m.message.conversation : (m.type == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.type == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.type == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.type == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : ""
    m.text = txt
    return m
}

function encodebinary(char) {
    return char.split("").map(str => {
        const converted = str.charCodeAt(0).toString(2);
        return converted.padStart(8, "0");
    }).join(" ")
};

function decodebinary(char) {
    return char.split(" ").map(str => String.fromCharCode(Number.parseInt(str, 2))).join("");
}

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const client = new WAConnection()

client.on('qr', qr => {
    qrcode.generate(qr, { small: true })
    console.log(`[ ${time} ] QR code is ready`)
})

client.on('credentials-updated', () => {
    const authInfo = client.base64EncodedAuthInfo()
    console.log(`credentials updated!`)

    fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t'))
})

fs.existsSync('./session.json') && client.loadAuthInfo('./session.json')

client.connect();

client.on('CB:Blocklist', json => {
    if (blocked.length > 2) return
    for (let i of json[1].blocklist) {
        blocked.push(i.replace('c.us', 's.whatsapp.net'))
    }
})

// TRIGGER BLOCK TO USER CALL
client.on('CB:action,,call', async json => {
	const callerId = json[2][0][1].from;
    if (isAntiCall === true) {
    client.sendMessage(callerId, "Maaf saya sedang offline, silahkan tunggu beberapa saat lagi\n\n_SELF-BOT_", MessageType.text)
	setTimeout(async () => {
        client.blockUser(callerId, 'add')
	}, 4000);
}});

// TESTER EVENT TYPING
/*client.on('user-presence-update', async json => {
    const hmm = await client.requestPresenceUpdate(composing)
    if (isSelfOnlys == hmm) {
        config.afkkontak = false
        afkkontak = false
        fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
    
    }
});*/

// FUNCTION ANTI DELETE
client.on('message-update', async (hndrr) => {
    try {
        const from = hndrr.key.remoteJid
        const messageStubType = WA_MESSAGE_STUB_TYPES[hndrr.messageStubType] || 'MESSAGE'
        const dataRevoke = JSON.parse(fs.readFileSync('./src/gc-revoked.json'))
        const dataCtRevoke = JSON.parse(fs.readFileSync('./src/ct-revoked.json'))
        const dataBanCtRevoke = JSON.parse(fs.readFileSync('./src/ct-revoked-banlist.json'))
        let sender = hndrr.key.fromMe ? client.user.jid : hndrr.key.remoteJid.endsWith('@g.us') ? hndrr.participant : hndrr.key.remoteJid
        const isRevoke = hndrr.key.remoteJid.endsWith('@s.whatsapp.net') ? true : hndrr.key.remoteJid.endsWith('@g.us') ? dataRevoke.includes(from) : false
        const isCtRevoke = hndrr.key.remoteJid.endsWith('@g.us') ? true : dataCtRevoke.data ? true : false
        const isBanCtRevoke = hndrr.key.remoteJid.endsWith('@g.us') ? true : !dataBanCtRevoke.includes(sender) ? true : false
        if (messageStubType == 'REVOKE') {
            console.log(`Status untuk grup : ${!isRevoke ? 'On' : 'Off'}\nStatus semua kontak : ${!isCtRevoke ? 'On' : 'Off'}\nStatus kontak dikecualikan : ${!isBanCtRevoke ? 'On' : 'Off'}`)
            if (!isRevoke) return
            if (!isCtRevoke) return
            if (!isBanCtRevoke) return
            const from = hndrr.key.remoteJid
            const isGroup = hndrr.key.remoteJid.endsWith('@g.us') ? true : false
            let int
            let infoMSG = JSON.parse(fs.readFileSync('./src/.dat/msg.data.json'))
            const id_deleted = hndrr.key.id
            const conts = hndrr.key.fromMe ? client.user.jid : client.contacts[sender] || { notify: jid.replace(/@.+/, '') }
            const pushname = hndrr.key.fromMe ? client.user.name : conts.notify || conts.vname || conts.name || '-'
            const opt4tag = {
                contextInfo: { mentionedJid: [sender] }
            }
            for (let i = 0; i < infoMSG.length; i++) {
                if (infoMSG[i].key.id == id_deleted) {
                    const dataInfo = infoMSG[i]
                    const type = Object.keys(infoMSG[i].message)[0]
                    const timestamp = infoMSG[i].messageTimestamp
                    int = {
                        no: i,
                        type: type,
                        timestamp: timestamp,
                        data: dataInfo
                    }
                }
            }
            const index = Number(int.no)
            const body = int.type == 'conversation' ? infoMSG[index].message.conversation : int.type == 'extendedTextMessage' ? infoMSG[index].message.extendedTextMessage.text : int.type == 'imageMessage' ? infoMSG[index].message.imageMessage.caption : int.type == 'stickerMessage' ? 'Sticker' : int.type == 'audioMessage' ? 'Audio' : int.type == 'videoMessage' ? infoMSG[index].videoMessage.caption : infoMSG[index]
            const mediaData = int.type === 'extendedTextMessage' ? JSON.parse(JSON.stringify(int.data).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : int.data
            var itsme = `${numbernye}@s.whatsapp.net`
            var split = `${fake}`
            // var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
            var selepbot72 = {
                contextInfo: {
                    participant: itsme,
                    quotedMessage: {
                        extendedTextMessage: {
                            text: split,
                        }
                    }
                }
            }
            if (int.type == 'conversation' || int.type == 'extendedTextMessage') {
                const strConversation = `「 *ANTI-DELETE* 」

• Nama: ${pushname}
• Number: @${sender.replace('@s.whatsapp.net', '')}
• Tipe: Text
• Waktu: ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}
• Pesan: ${body ? body : '-'}
`
                client.sendMessage(from, strConversation, MessageType.text, selepbot72)
            } else if (int.type == 'stickerMessage') {
                var itsme = `${numbernye}@s.whatsapp.net`
                var split = `${fake}`
                const pingbro23 = {
                    contextInfo: {
                        participant: itsme,
                        quotedMessage: {
                            extendedTextMessage: {
                                text: split,
                            }
                        }
                    }
                }
                const filenamesticker = `${sender.replace('@s.whatsapp.net', '')}-${moment().unix()}`
                const savedFilenamesticker = await client.downloadAndSaveMediaMessage(int.data, `./media/sticker/${filenamesticker}`);
                const strConversationsticker = `「 *ANTI-DELETE* 」

• Nama: ${pushname}
• Number: @${sender.replace('@s.whatsapp.net', '')}
• Tipe: Sticker
• Waktu: ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}
`

                const buff = fs.readFileSync(savedFilenamesticker)
                client.sendMessage(from, strConversationsticker, MessageType.text, opt4tag)
                client.sendMessage(from, buff, MessageType.sticker, pingbro23)
                fs.unlinkSync(savedFilenamesticker)

            } else if (int.type == 'imageMessage') {
                var itsme = `${numbernye}@s.whatsapp.net`
                var split = `${fake}`
                const pingbro22 = {
                    contextInfo: {
                        participant: itsme,
                        quotedMessage: {
                            extendedTextMessage: {
                                text: split,
                            }
                        }
                    }
                }
                const filename = `${sender.replace('@s.whatsapp.net', '')}-${moment().unix()}`
                const savedFilename = await client.downloadAndSaveMediaMessage(int.data, `./media/image/${filename}`);
                const buff = fs.readFileSync(savedFilename)
                const strConversation = `「 *ANTI-DELETE* 」

• Nama: ${pushname}
• Number: @${sender.replace('@s.whatsapp.net', '')}
• Tipe: Image
• Waktu: ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}
• Pesan: ${body ? body : '-'}\`\`\`
`
                client.sendMessage(from, buff, MessageType.image, { contextInfo: { mentionedJid: [sender] }, caption: strConversation })
                fs.unlinkSync(savedFilename)
            }
        }
    } catch (e) {
        console.log('Message : %s', color(e, 'green'))
    }
})

client.on('message-new', async (mek) => {
    try {
        if (!mek.message) return
        if (mek.key && mek.key.remoteJid == 'status@broadcast') return
        //if (!mek.key.fromMe) return
        let infoMSG = JSON.parse(fs.readFileSync('./src/.dat/msg.data.json'))
        infoMSG.push(JSON.parse(JSON.stringify(mek)))
        fs.writeFileSync('./src/.dat/msg.data.json', JSON.stringify(infoMSG, null, 2))
        const urutan_pesan = infoMSG.length
        if (urutan_pesan === 5000) {
            infoMSG.splice(0, 4300)
            fs.writeFileSync('./src/.dat/msg.data.json', JSON.stringify(infoMSG, null, 2))
        }

        global.blocked
        const content = JSON.stringify(mek.message)
        const msg = serialize(mek)
        const from = mek.key.remoteJid
        const isPublikChat = mek.key.fromMe == false
        const isSelfChat = mek.key.fromMe == true
        const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
        const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
        const type = Object.keys(mek.message)[0]
        body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
        budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const isCmd = body.startsWith(prefix)
        const q = args.join(' ')

        mess = {
            wait: ' *_Otewe gan..._* ',
            success: 'Berhasil!',
            afkalready: 'AFK sudah diaktifkan sebelumnya...',
            afkgroupalready: 'AFK digroup ini sudah diaktifkan sebelumnya',
            wrongFormat: 'Format salah!',
            afkdisable: 'Afk berhasil di matikan!',
            afkenable: 'AFK berhasil diaktifkan!',
            sedangafk: 'Maaf saya sedang sibuk dikarenakan sedang ada tugas, nanti akan saya balas ketika sudah selesai\n\n_SELF-BOT_',
            error: {
                stick: 'bukan sticker itu:v',
                Iv: 'Linknya mokad:v'
            },
            only: {
                group: 'Khusus grup ngab',
                ownerG: 'Khusus owner grup ngab',
                ownerB: 'Lahh?',
                admin: 'Mimin grup only bruh...',
                Badmin: 'Jadiin gw admin dlu:v'
            }
        }

        const botNumber = client.user.jid
        const botNumberss = client.user.jid + '@c.us'
        const isGroup = from.endsWith('@g.us')
        let sender = isGroup ? mek.participant : mek.key.remoteJid
        const totalchat = await client.chats.all()
        const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
        const groupName = isGroup ? groupMetadata.subject : ''
        const groupId = isGroup ? groupMetadata.jid : ''
        const groupMembers = isGroup ? groupMetadata.participants : ''
        const groupDesc = isGroup ? groupMetadata.desc : ''
        const groupOwner = isGroup ? groupMetadata.owner : ''
        const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
        const isAFKTAG = isGroup ? afkdatabase.includes(from) : false
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const isGroupAdmins = groupAdmins.includes(sender) || false
        const isUrl = (url) => {
            return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
        }

        const reply = (teks) => {
            client.sendMessage(from, teks, text, { quoted: mek })
        }

        const sendMess = (hehe, teks) => {
            client.sendMessage(hehe, teks, text)
        }

        const mentions = (teks, memberr, id) => {
            (id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": memberr } })
        }

        const sendPtt = (audio) => {
            client.sendMessage(from, audio, mp3, { quoted: mek })
        }

        const faketoko = (teks) => {
            client.sendMessage(from, teks, text, {
                quoted: {
                    key: {
                        fromMe: false,
                        participant: `${numbernye}@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
                    },
                    message: {
                        "productMessage": {
                            "product": {
                                "productImage":{
                                    "mimetype": "image/jpeg",
                                    "jpegThumbnail": fs.readFileSync('./src/image/thumbnail.jpeg')
                                },
                                "title": fake,
                                "description": "SELF BOT",
                                "currencyCode": "USD",
                                "priceAmount1000": "50000",
                                "retailerId": "Self Bot",
                                "productImageCount": 1
                            },
                            "businessOwnerJid": `0@s.whatsapp.net`
                    }
                }
            }
        })
    }

        const fakestsatus = (teks) => {
            client.sendMessage(from, teks, text, {
                quoted: {
                    key: {
                        fromMe: false,
                        participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "6285884272735-1489508206@g.us" } : {})
                    },
                    message: {
                        "imageMessage": {
                            "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
                            "mimetype": "image/jpeg",
                            "caption": fake,
                            "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
                            "fileLength": "28777",
                            "height": 1080,
                            "width": 1079,
                            "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
                            "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
                            "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
                            "mediaKeyTimestamp": "1610993486",
                            "jpegThumbnail": fs.readFileSync('./src/image/thumbnail.jpeg'),
                            "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
                        }
                    }
                }
            })
        }

        const fakelocation = (teks) => {
            client.sendMessage(from, teks, text, {
                    quoted: {
                        key: { 
                            fromMe: false,
                            participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
                        },
                        message: { 
                            "liveLocationMessage": { 
                                "degreesLatitude": -6.2097362, 
                                "degreesLongitude": 106.7360528, 
                                "caption": "*_MEMEK-LODON_*", 
                                "sequenceNumber": 
                                "1615220977658001", 
                                "jpegThumbnail": fs.readFileSync('./src/image/thumbnail.jpeg')
                    }
                }
            }
        })
    }
    
        const fakegroup = (teks) => {
            client.sendMessage(from, teks, text, {
                quoted: {
                    key: {
                        fromMe: false,
                        participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "6285884272735-1489508206@g.us" } : {})
                    },
                    message: {
                        conversation: fake
                    }
                }
            })
        }

        const fakeshop = (teks) => { 
        client.sendMessage(from, teks, text, {
            quoted: {
            key: { 
                fromMe: false, 
                participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, 
            },
                message: { "productMessage": { 
                    "product": { 
                        "productImage": { 
                            "url": "https://mmg.whatsapp.net/d/f/AjG51MF6KjRFJY4hSioYzQuKSugb6yhsXscGwXPdQo_0.enc", 
                            "mimetype": "image/jpeg", 
                            "caption": "tes", 
                            "fileSha256": "0fdnVDQPAkpy7cRXfnMQdg0Hjf6N5GuEyPeT4CBvD5I=", 
                            "fileLength": "85956", 
                            "height": 1500, 
                            "width": 1500, 
                            "mediaKey": "BKYefRnzAArW+Qj0qHP8fie9lpOQ+ElvUy3KsFJExJc=", 
                            "fileEncSha256": "myAuJjM+X/hSdW+LGpRpWTfeKkiKC0MuuiklZh8BknE=", 
                            "directPath": "/v/t62.7118-24/11966862_187844506471393_6960168663863414649_n.enc?oh=5e99951bf0e810edb00a219164339090&oe=6066D70A", 
                            "mediaKeyTimestamp": "1614655201", 
                            "jpegThumbnail": fs.readFileSync('./src/image/thumbnail.jpeg') 
                        }, 
                        "productId": "4106563066020680", 
                        "title": "HEART", 
                        "currencyCode": "IDR", 
                        "priceAmount1000": "1", 
                        "productImageCount": 1 }, 
                        "businessOwnerJid": "6289652903288@s.whatsapp.net" 
                    }
                }
            })
        }

        // FUNCTION ANTI SPAM SAAT AFK
        const addChatAFK = (sender, expired) => {
            let obi = { id: sender, expired: Date.now() + toMs(`${expired}s`) }
            publikchat.push(obi)
            fs.writeFileSync('./src/publik.json', JSON.stringify(publikchat))
        }

        const cekWaktuAFKCHAT = (_dir, sender) => {
            setInterval(() => {
                let position = null
                Object.keys(publikchat).forEach((i) => {
                    if (Date.now() >= publikchat[i].expired) {
                        position = i
                    }
                })
                if (position !== null) {
                    publikchat.splice(position, 1)
                    fs.writeFileSync('./src/publik.json', JSON.stringify(publikchat))
                }
            }, 1000)
        }

        const isAntiSpamAFK = (sender) => {
            let status = false
            Object.keys(publikchat).forEach((i) => {
                if (publikchat[i].id === sender) {
                    status = true
                }
            })
            return status
        }

        if (!isGroup && afkkontak == true && isPublikChat) {
            if (isAntiSpamAFK(sender)) { return false; }
            faketoko(mess.sedangafk)
            addChatAFK(sender, 150)
            cekWaktuAFKCHAT(sender)
        } else if (msg.mentionedJid && isAFKTAG && afktag.status == true) {
            if (msg.mentionedJid.includes(botNumber)) {
                faketoko(mess.sedangafk)
            }
        }

        colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
        const isMedia = (type === 'imageMessage' || type === 'videoMessage')
        const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
        const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
        const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
        const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
        if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
        if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
        if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
        if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
        if (isSelfChat) {
            switch (command) {
            	case 'es':
                    const thumb1 = fs.readFileSync(`./src/image/thumb2.jpeg`)
                    const thumb2 = fs.readFileSync(`./src/image/thumb1.jpeg`)
                    const optionthumb = {
                    "thumbnail": thumb2}
                    client.sendMessage(from, thumb1, "imageMessage", optionthumb)
                    break
    case 'tiktag':
                                        if (!isQuotedSticker) return reply('Ini sticker?')
                                        boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                                        delb = await client.downloadMediaMessage(boij)
                                        await fs.writeFileSync(`stctagg.webp`, delb)
                                        var group = await client.groupMetadata(from)
                                        var member = group['participants']
                                        var mem = []
                                        member.map(async adm => {
                                                mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                                        })
					var itsme = `0@s.whatsapp.net`
					var split = `${body.slice(8)}`
					var selepbot = {
						contextInfo: {
						mentionedJid: mem,
                        participant: itsme,                                                                                                                          quotedMessage: {
                        extendedTextMessage: {
                        text: split,
							   }
					      	      }
					       }
					}
					result = fs.readFileSync(`stctagg.webp`)
                                        client.sendMessage(from, result, sticker, selepbot)
					await fs.unlinkSync(`stctagg.webp`)
					break
                    case 'mgtag':
                        if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                            const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : lol
                            filePath = await client.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
                            var value = args.join(" ")
                            var group = await client.groupMetadata(from)
                            var member = group['participants']
                            var mem = []
                            member.map(async adm => {
                                mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                            })
                            var optionsimgtag = {
                                image: value,
                               contextInfo: { mentionedJid: mem },
                                quoted: mek
                            }
                            ini_buffer = fs.readFileSync(filePath)
                            client.sendMessage(from, ini_buffer, image, optionsimgtag)
                            fs.unlinkSync(filePath)
                        } else {
                            reply(`Tag image yang sudah dikirim`)
                        }
                        break
                        case 'edotensei':
                            case 'edotense':
                          if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                          if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di edotense!')
                          mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
                          if (mentioned.length > 1) {
                              teks = 'Perintah di terima, edotense :\n'
                              for (let _ of mentioned) {
                                  teks += `@${_.split('@')[0]}\n`
                              }
                              mentions(teks, mentioned, true)
                              client.groupRemove(from, mentioned)
                          } else {
                              mentions(`Perintah di terima, edotense : @${mentioned[0].split('@')[0]}`, mentioned, true)
                              client.groupRemove(from, mentioned)
                          }
                          break
                          case 'otag':
                            if ((isMedia && !mek.message.videoMessage || isQuotedAudio) && args.length == 0) {
                             encmedia = isQuotedAudio ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                             file = await client.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
                             value = args.join(" ")
                             var group = await client.groupMetadata(from)
                             var member = group['participants']
                             var mem = []
                             member.map(async adm => {
                             mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                             })
                             var optionst = {
                                 mimetype : 'audio/mp4',
                                 ptt : true,
                                 contextInfo: { mentionedJid: mem },
                                 quoted: mek
                             }
                             ini_buffer = fs.readFileSync(file)
                             client.sendMessage(from, ini_buffer, audio, optionst)
                             fs.unlinkSync(file)
                         }  else if ((isMedia && !mek.message.videoMessage || isQuotedVideo) && args.length == 0) {
                             encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                             file = await client.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
                             value = args.join(" ")
                             var group = await client.groupMetadata(from)
                             var member = group['participants']
                             var mem = []
                             member.map(async adm => {
                             mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                             })
                             var optionst = {
                                 mimetype : 'video/mp4',
                                 contextInfo: { mentionedJid: mem },
                                 quoted: mek
                             }
                             ini_buffer = fs.readFileSync(file)
                             client.sendMessage(from, ini_buffer, video, optionst)
                             fs.unlinkSync(file)
                         } else{
                           reply(`reply gambar/sticker/audio/video dengan caption ${prefix}totag`)
                         }
                         break
                       case 'ontag':
                          var bv = body.slice(8)
                          var jl = `${bv}`
                          if (args[0] === '') {
                          var jl = `*CONTACT TAG*`
                          }
                          var group = await client.groupMetadata(from)
                             var member = group['participants']
                             var mem = []
                             member.map(async adm => {
                             mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                             })
                          const vcardtag = 'BEGIN:VCARD\n'
                                      + 'VERSION:3.0\n'
                                      + `FN:${body.slice(8)}\n`
                                      + 'ORG:Creator SELF BOT;\n'
                                      + `TEL;type=CELL;type=VOICE;waid=${client.user.jid.split('@')[0]}:${client.user.jid.split('@')[0]}\n`
                                      + 'END:VCARD'
                                  client.sendMessage(from, {displayname: mem, vcard: vcardtag}, MessageType.contact, { quoted: mek, contextInfo: {mentionedJid: mem}, quoted: {
                          key: {
                              participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
                          },
                          message: {
                              "imageMessage": {
                                  "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
                                  "mimetype": "image/jpeg",
                                  "caption": jl,
                                  "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
                                  "fileLength": "28777",
                                  "height": 1080,
                                  "width": 1079,
                                  "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
                                  "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
                                  "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
                                  "mediaKeyTimestamp": "1610993486",
                                  "jpegThumbnail": fs.readFileSync('./src/image/thumbnail.jpeg'),
                                  "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
                                  }
                                  }
                                  }
                                  })
              break
                case 'idetag':
                    if (!isGroup) return reply(mess.only.group)
                    var value = body.slice(8)
                    var group = await client.groupMetadata(from)
                    var member = group['participants']
                    var mem = []
                    member.map(async adm => {
                        mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                    })
                    var optionshidetag = {
                        text: value,
                        contextInfo: { mentionedJid: mem },
                        quoted: mek
                    }
                    client.sendMessage(from, optionshidetag, text)
                    break
                case 'est':
                    faketoko('Okeh')
                    break
                case 'deface':
                    var nn = body.slice(8)
                    var urlnye = nn.split("|")[0];
                    var titlenye = nn.split("|")[1];
                    var descnye = nn.split("|")[2];
                    imgbbb = require('imgbb-uploader')
                    run = getRandom('.jpeg')
                    encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                    media = await client.downloadAndSaveMediaMessage(encmedia)
                    ddatae = await imageToBase64(JSON.stringify(media).replace(/\"/gi, ''))

                    client.sendMessage(from, {

                        text: `${urlnye}`,

                        matchedText: `${urlnye}`,

                        canonicalUrl: `${urlnye}`,

                        description: `${descnye}`,

                        title: `${titlenye}`,

                        jpegThumbnail: ddatae
                    }, 'extendedTextMessage', { detectLinks: false })
                    break
                case 'lowmo':
                    encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    media = await client.downloadAndSaveMediaMessage(encmedia)
                    ran = getRandom('.mp3')
                    exec(`ffmpeg -i ${media} -filter:a "atempo=0.7,asetrate=44100" ${ran}`, (err, stderr, stdout) => {
                        fs.unlinkSync(media)
                        if (err) return faketoko(`Error: ${err}`)
                        hah = fs.readFileSync(ran)
                        client.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', ptt: true, quoted: mek })
                        fs.unlinkSync(ran)
                    })
                    break
                case 'etname':
                    client.updatePresence(from, Presence.composing)
                    if (!q) return faketoko(wrongFormat)
                    await client.updateProfileName(q)
                    faketoko(`Success ganti nama menjadi ${q}`)
                    break
                case 'etpp':
                    client.updatePresence(from, Presence.composing)
                    if (!isQuotedImage) return faketoko(mess.wrongFormat)
                    enmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    media = await client.downloadAndSaveMediaMessage(enmedia)
                    await client.updateProfilePicture(botNumber, media)
                    faketoko('Success Mengganti Poto Profile')
                    break
                case 'hota':
                    var itsme = `${numbernye}@s.whatsapp.net`
                    var split = `${fake}`
                    var selepbot = {
                        contextInfo: {
                            participant: itsme,
                            quotedMessage: {
                                extendedTextMessage: {
                                    text: split,
                                }
                            }
                        }
                    }
                    {
                        var items = ['shota anime', 'anime shota'];
                        var nime = items[Math.floor(Math.random() * items.length)];
                        var url = "https://api.fdci.se/rep.php?gambar=" + nime;

                        axios.get(url)
                            .then((result) => {
                                var n = JSON.parse(JSON.stringify(result.data));
                                var nimek = n[Math.floor(Math.random() * n.length)];
                                imageToBase64(nimek)
                                    .then(
                                        (response) => {
                                            var buf = Buffer.from(response, 'base64');
                                            client.sendMessage(from, mess.wait, MessageType.text, selepbot)
                                            client.sendMessage(from, buf, MessageType.image, { caption: `SHOTA!`, quoted: mek })

                                        }
                                    )
                                    .catch(
                                        (error) => {
                                            console.log(error);
                                        }
                                    )

                            });
                    }
                    break
                case 'rainly':
                    if (!q) return faketoko(mess.wrongFormat)
                    try {
                        axios.get(`https://api.vhtear.com/branly?query=${q}&apikey=${config.VhtearKey}`).then((res) => {
                            const resultbrainly = `͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏*「 Brainly 」*\n\n• ${res.data.result.data}`;
                            faketoko(resultbrainly)
                        })
                    } catch (err) {
                        faketoko(`Err: ${err}`)
                    }
                    break
                case 'cr':
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        const media = await client.downloadAndSaveMediaMessage(encmedia)
                        reply(mess.wait)
                        await recognize(media, { lang: 'eng+ind', oem: 1, psm: 3 })
                            .then(teks => {
                                reply(teks.trim())
                                fs.unlinkSync(media)
                            })
                            .catch(err => {
                                faketoko(`ERR: ${err.message}`)
                                fs.unlinkSync(media)
                            })
                    } else {
                        faketoko(mess.wrongFormat)
                    }
                    break
                case 'rup':
                    if (!isGroup) return faketoko(mess.only.group)
                    if (!isBotGroupAdmins) return faketoko(mess.only.Badmin)
                    if (args[0] === 'open') {
                        client.groupSettingChange(from, GroupSettingChange.messageSend, false)
                        await sleep(2000)
                        faketoko(`*SUCCES OPEN GRUP*`)
                    } else if (args[0] === 'close') {
                        await client.groupSettingChange(from, GroupSettingChange.messageSend, true)
                        await sleep(2000)
                        faketoko(`*SUCCES CLOSE GRUP*`)
                    }
                    break
                case 'cname':
                    if (!q) return faketoko(mess.wrongFormat)
                    if (!isBotGroupAdmins) return faketoko(`Jadi mimin dlu baru ubah`)
                    await client.groupUpdateSubject(from, `${q}`)
                    await sleep(2000)
                    faketoko(`*Success ganti nama grup ke ${q}*`)
                    break
                case 'cdesk':
                    if (!q) return faketoko(mess.wrongFormat)
                    if (!isBotGroupAdmins) return faketoko(`Jadi mimin dlu baru ubah`)
                    await client.groupUpdateDescription(from, `${q}`)
                    await sleep(2000)
                    faketoko(`*Success ganti deskripsi grup ke ${q}*`)
                    break
                    case '0088800ing':if (!isRegistered) return await hndrr.reply(from, `Kamu belum terdaftar di database!, Silakan register dengan cara ${prefix}verify`, id)
                    const loadedMsg = await hndrr.getAmountOfLoadedMessages()
                    const chatIds = await hndrr.getAllChatIds()
                    const groups = await hndrr.getAllGroups()
                    const groupsIn = groups.filter(x => x.groupMetadata.participants.map(x => [botNumber, '6281281370986@c.us'].includes(x.id._serialized)).includes(true))
                    const me = await hndrr.getMe()
                    const battery = await hndrr.getBatteryLevel()
                    const isCharging = await hndrr.getIsPlugged()
                    const cpus = os.cpus().map(cpu => {
                        cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
                        return cpu
                    })
                    hndrr.reply(from, `「 *𝙎𝙏𝘼𝙏𝙐𝙎 𝘾𝙃𝘼𝙏* 」
            
• Loaded Messages: ${loadedMsg}
• Group Chats: ${groups.length}
• Group Joined: ${groupsIn.length}
• Group Left: ${groups.length - groupsIn.length}
• Personal Chats: ${chatIds.length - groups.length}
• Personal Chats Active: ${chatIds.length - groups.length - groupsIn.length}
• Total Chats: ${chatIds.length}
• Total Chats Active: ${chatIds.length - groupsIn.length}
• Charger: ${isCharging}
• Penggunaan RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
• Cpu: ${cpus.length}
\n「 *𝙎𝙏𝘼𝙏𝙐𝙎 𝙃𝙋 𝘽𝙊𝙏* 」\n${(`
\n• Battery: ${battery}% ${isCharging ? '_Sedang Dicas_' : '_Tidak dicas_'}
${Object.keys(me.phone).map(key => `• ${key}: ${me.phone[key]}`).join('\n')}`.slice(1, -1))}\n\n\n*Speed* > Uwuuu!`, id)
                    break
                case 'untime':
                    runtime = process.uptime()
                    teks = `${kyun(runtime)}`
                    faketoko(teks)
                    break
                case 'lay':
                    if (!q) return faketoko(mess.wrongFormat)
                    data = await fetchJson(`https://api.vhtear.com/ytmp3?query=${q}&apikey=${config.VhtearKey}`, { method: 'get' })
                    teks = '-「 Play Music From Youtubes 」-\n'
                    const play = data.result
                    teks += `\n• Judul : ${play.title}\n• Durasi : ${play.duration}\n• Size : ${play.size}\n\n_SELF-BOT_`
                    thumb = await getBuffer(play.image)
                    faketoko(mess.wait)
                    client.sendMessage(from, thumb, image, { quoted: mek, caption: teks })
                    bufferss = await getBuffer(play.mp3)
                    client.sendMessage(from, bufferss, audio, { mimetype: 'audio/mp4', filename: `${play.title}.mp3`, quoted: mek })
                    break
                case 'ogif':
                    var imgbb = require('imgbb-uploader')
                    if ((isMedia && !mek.message.videoMessage || isQuotedSticker) && args.length == 0) {
                        ger = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        owgi = await client.downloadAndSaveMediaMessage(ger)
                        data = await imgbb("acf1ad5f22ad5822dc163cce74aedfd4", owgi)
                        axios.get(`https://ezgif.com/webp-to-mp4?url=${data.display_url}`)
                            .then(({ data }) => {
                                $ = client.load(data)
                                bodyFormThen = new FormData()
                                file = $('input[name="file"]').attr('value')
                                token = $('input[name="token"]').attr('value')
                                convert = $('input[name="file"]').attr('value')
                                gotdata = {
                                    file: file,
                                    token: token,
                                    convert: convert
                                }
                                bodyFormThen.append('file', gotdata.file)
                                bodyFormThen.append('token', gotdata.token)
                                bodyFormThen.append('convert', gotdata.convert)
                                axios({
                                    method: 'post',
                                    url: 'https://ezgif.com/webp-to-mp4/' + gotdata.file,
                                    data: bodyFormThen,
                                    headers: {
                                        'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
                                    }
                                }).then(({ data }) => {
                                    $ = client.load(data)
                                    result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
                                    getBuffer(result).then(tog => {
                                        client.sendMessage(from, tog, video, { mimetype: 'video/gif', quoted: mek })
                                    })
                                })
                            })
                    } else {
                        reply('Reply StickerGif nya')
                    }
                    break
                case 'omp4':
                    var imgbb = require('imgbb-uploader')
                    if ((isMedia && !mek.message.videoMessage || isQuotedSticker) && args.length == 0) {
                        ger = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        owgi = await client.downloadAndSaveMediaMessage(ger)
                        data = await imgbb("acf1ad5f22ad5822dc163cce74aedfd4", owgi)
                        axios.get(`https://ezgif.com/webp-to-mp4?url=${data.display_url}`)
                            .then(({ data }) => {
                                $ = client.load(data)
                                bodyFormThen = new FormData()
                                file = $('input[name="file"]').attr('value')
                                token = $('input[name="token"]').attr('value')
                                convert = $('input[name="file"]').attr('value')
                                gotdata = {
                                    file: file,
                                    token: token,
                                    convert: convert
                                }
                                bodyFormThen.append('file', gotdata.file)
                                bodyFormThen.append('token', gotdata.token)
                                bodyFormThen.append('convert', gotdata.convert)
                                axios({
                                    method: 'post',
                                    url: 'https://ezgif.com/webp-to-mp4/' + gotdata.file,
                                    data: bodyFormThen,
                                    headers: {
                                        'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
                                    }
                                }).then(({ data }) => {
                                    $ = client.load(data)
                                    result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
                                    getBuffer(result).then(tog => {
                                        client.sendMessage(from, tog, video, { mimetype: 'video/mp4', quoted: mek })
                                    })
                                })
                            })
                    } else {
                        reply('Reply StickerGif nya!')
                    }
                    break
                case 'tmp3':
                    if (!q) return faketoko(mess.wrongFormat)
                    fetchytmp3 = await fetchJson(`https://api.vhtear.com/ytdl?link=${body.slice(7)}&apikey=${config.VhtearKey}`, { method: 'get' })
                    _ytmp3 = fetchytmp3.result
                    resultytmp3 = `*「 Youtube MP3 」*\n\n• Judul: ${_ytmp3.title}\n• Ext: Mp3\n• Size: ${_ytmp3.size}\n\n_SELF-BOT_`
                    thumbytmp3 = await getBuffer(_ytmp3.imgUrl)
                    faketoko(mess.wait)
                    client.sendMessage(from, thumbytmp3, image, { quoted: mek, caption: resultytmp3 })
                    buffytmp3 = await getBuffer(_ytmp3.UrlMp3)
                    client.sendMessage(from, buffytmp3, audio, { mimetype: 'audio/mp4', filename: `${_ytmp3.title}.mp3`, quoted: mek })
                    break
                case 'interest':
                    if (!q) return faketoko(mess.wrongFormat)
                    data = await fetchJson(`https://api.vhtear.com/pinterest?query=${q}&apikey=${config.VhtearKey}`, { method: 'get' })
                    if (data.error) return reply(data.error)
                    for (let xyz of data.result) {
                        const amsulah = data.result
                        const pimterest = amsulah[Math.floor(Math.random() * amsulah.length)]
                        thumb = await getBuffer(pimterest)
                    }
                    faketoko(mess.wait)
                    client.sendMessage(from, thumb, image, { quoted: mek, caption: `- Pinterest : ` + papapale })
                    break
                    case 'etthumbvideo':
                        if (!isQuotedImage) return reply('Reply imagenya blokk!')
                        const mmw = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                        const mmk = await client.downloadMediaMessage(mmw)
                        fs.unlinkSync(`./src/image/thumbb.jpeg`)
                        await sleep(1000)
                        fs.writeFileSync(`./src/image/thumbb.jpeg`, mmk)
                        faketoko('Succes')
                        break
                    case 'akevideo':
                    if (!q) return faketoko(mess.wrongFormat)
					buffer908 = fs.readFileSync(`./src/video/${q}.mp4`)
					reply(mess.wait)
					client.sendMessage(from, buffer908, video, { quoted: mek, caption: `Nih`,thumbnail:fs.readFileSync(`./src/image/thumbb.jpeg`),quoted:mek})
					break
                    case 'etthumbimage':
                            if (!isQuotedImage) return reply('Reply imagenya blokk!')
                            const pf = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                            const pft = await client.downloadMediaMessage(pf)
                            fs.unlinkSync(`./src/image/thumb.jpeg`)
                            await sleep(1000)
                            fs.writeFileSync(`./src/image/thumb.jpeg`, pft)
                            faketoko('Succes')
                            break
                    case 'akeimage':
                    if (!q) return faketoko(mess.wrongFormat)
					buffer99 = fs.readFileSync(`./src/image/${q}.jpeg`)
					reply(mess.wait)
					client.sendMessage(from, buffer99, image, { quoted: mek, caption: `Nih`,thumbnail:fs.readFileSync(`./src/image/thumb.jpeg`),quoted:mek})
					break
                case 'ruth':
                    const randomtruth = truth[Math.floor(Math.random() * truth.length)]
                    truteh = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
                    client.sendMessage(from, truteh, image, { caption: '*Truth*\n\n• ' + randomtruth, quoted: mek })
                    break
                case 'r1':
                    var split = args.join(' ').replace(/@|\d/gi, '').split('|')
                    var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
                    const target = {
                        contextInfo: {
                            participant: taged,
                            quotedMessage: {
                                extendedTextMessage: {
                                    text: split[0]
                                }
                            }
                        }
                    }
                    client.sendMessage(from, `${split[1]}`, MessageType.text, target)
                    break
                case 'ettarget':
                    var itsme = `${numbernye}@s.whatsapp.net`
                    var split = `𝙎𝙮𝙨𝙩𝙚𝙢 𝘾𝙝𝙖𝙣𝙜𝙚 𝙉𝙪𝙢𝙗𝙚𝙧 𝙂𝙝𝙤𝙞𝙗`
                    var selepbot = {
                        contextInfo: {
                            participant: itsme,
                            quotedMessage: {
                                extendedTextMessage: {
                                    text: split,
                                }
                            }
                        }
                    }
                    if (args.length < 1) return
                    targetprivate = args[0]
                    faketoko(`Succes Mengganti target Private Fake Reply : ${targetprivate}`)
                    break
                case 'r2':
                    jids = `${targetprivate}@s.whatsapp.net` // nomer target
                    var split = args.join(' ').replace(/@|\d/gi, '').split('|')
                    var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
                    const options = {
                        contextInfo: {
                            quotedMessage: {
                                extendedTextMessage: {
                                    text: split[0]
                                }
                            }
                        }
                    }
                    const responye = await client.sendMessage(jids, `${split[1]}`, MessageType.text, options)
                    await client.deleteMessage(jids, { id: responye.messageID, remoteJid: jids, fromMe: true })
                    break
                    case 'argetsw':
                        if (!q) return faketoko(mess.wrongFormat)
                        targetprivatee = q
                        faketoko(`Succes Mengganti target ${q}`)
                        break
                case 'wfitnah':
                    const targetsw = `${targetprivatee}@s.whatsapp.net`
                    const teksfitn = `Gua gay suka sama cowo`
                    const tekskyta = `njerrr`
                    const responsif = client.sendMessage(targetsw, `${tekskyta}`, text, {
                        quoted: {
                            key: {
                                fromMe: false,
                                participant: `${targetsw}`, ...(from ? { remoteJid: "status@broadcast" } : {})
                            },
                            message: {
                                "extendedTextMessage": {
                                    "text": `${teksfitn}`,
                                    "textArgb": 4294967295,
                                    "backgroundArgb": 4280563264,
                                    "font": "SANS_SERIF", "previewType": "NONE"
                                }
                            }
                        }
                    })
                    await client.deleteMessage(targetsw, { id: responsif.messageID, remoteJid: targetsw, fromMe: true })
                    break
                case 'ntidelete':
                    const dataRevoke = JSON.parse(fs.readFileSync('./src/gc-revoked.json'))
                    const dataCtRevoke = JSON.parse(fs.readFileSync('./src/ct-revoked.json'))
                    const dataBanCtRevoke = JSON.parse(fs.readFileSync('./src/ct-revoked-banlist.json'))
                    const isRevoke = dataRevoke.includes(from)
                    const isCtRevoke = dataCtRevoke.data
                    const isBanCtRevoke = dataBanCtRevoke.includes(sender) ? true : false
                    const argz = body.split(' ')
                    if (argz.length === 1) return faketoko(`Penggunaan fitur antidelete :\n\n*${prefix}antidelete [aktif/mati]* (Untuk grup)\n*${prefix}antidelete [ctaktif/ctmati]* (untuk semua kontak)\n*${prefix}antidelete banct 628558xxxxxxx* (banlist kontak)`)
                    if (argz[1] == 'aktif') {
                        if (isGroup) {
                            if (isRevoke) return faketoko(`Antidelete telah diaktifkan di grup ini sebelumnya!`)
                            dataRevoke.push(from)
                            fs.writeFileSync('./src/gc-revoked.json', JSON.stringify(dataRevoke, null, 2))
                            faketoko(`Antidelete diaktifkan di grup ini!`)
                        } else if (!isGroup) {
                            faketoko(`Untuk kontak penggunaan *${prefix}antidelete ctaktif*`)
                        }
                    } else if (argz[1] == 'ctaktif') {
                        if (!isGroup) {
                            if (isCtRevoke) return faketoko(`Antidelete telah diaktifkan di semua kontak sebelumnya!`)
                            dataCtRevoke.data = true
                            fs.writeFileSync('./src/ct-revoked.json', JSON.stringify(dataCtRevoke, null, 2))
                            faketoko(`Antidelete diaktifkan disemua kontak!`)
                        } else if (isGroup) {
                            faketoko(`Untuk grup penggunaan *${prefix}antidelete aktif*`)
                        }
                    } else if (argz[1] == 'banct') {
                        if (isBanCtRevoke) return faketoko(`kontak ini telah ada di database banlist!`)
                        if (argz.length === 2 || argz[2].startsWith('0')) return faketoko(`Masukan nomer diawali dengan 62! contoh 62859289xxxxx`)
                        dataBanCtRevoke.push(argz[2] + '@s.whatsapp.net')
                        fs.writeFileSync('./src/ct-revoked-banlist.json', JSON.stringify(dataBanCtRevoke, null, 2))
                        faketoko(`Kontak ${argz[2]} telah dimasukan ke banlist antidelete secara permanen!`)
                    } else if (argz[1] == 'mati') {
                        if (isGroup) {
                            const index = dataRevoke.indexOf(from)
                            dataRevoke.splice(index, 1)
                            fs.writeFileSync('./src/gc-revoked.json', JSON.stringify(dataRevoke, null, 2))
                            faketoko(`Antidelete dimatikan di grup ini!`)
                        } else if (!isGroup) {
                            faketoko(`Untuk kontak penggunaan *${prefix}antidelete ctmati*`)
                        }
                    } else if (argz[1] == 'ctmati') {
                        if (!isGroup) {
                            dataCtRevoke.data = false
                            fs.writeFileSync('./src/ct-revoked.json', JSON.stringify(dataCtRevoke, null, 2))
                            faketoko(`Antidelete dimatikan disemua kontak!`)
                        } else if (isGroup) {
                            faketoko(`Untuk grup penggunaan *${prefix}antidelete mati*`)
                        }
                    }
                    break
                case 'inkgc':
                    if (!isGroup) return faketoko(mess.only.group)
                    if (!isBotGroupAdmins) return faketoko(mess.only.Badmin)
                    const linkgc = await client.groupInviteCode(from)
                    faketoko(`https://chat.whatsapp.com/${linkgc}`)
                    break
                case 'tstalk':
                    if (!q) return faketoko(mess.wrongFormat)
                    try {
                        const channel = await fetchs.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&key=${config.YoutubeKey}&maxResults=1&type=channel`);
                        const resultchannel = await fetchs.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${channel.body.items[0].id.channelId}&key=${config.YoutubeKey}`);
                        const datachannel = `「 *YOUTUBE-STALK* 」

• *CHANNEL* : ${channel.body.items[0].snippet.channelTitle}
• *DESKRIPSI* : ${channel.body.items[0].snippet.description}
• *TOTAL SUBS* : ${convertBalanceToString(resultchannel.body.items[0].statistics.subscriberCount)}
• *TOTAL VIEW* : ${convertBalanceToString(resultchannel.body.items[0].statistics.viewCount)}
• *TOTAL VIDEO* : ${convertBalanceToString(resultchannel.body.items[0].statistics.videoCount)}
• *DATA CREATED* : ${channel.body.items[0].snippet.publishedAt}
• *LINK* : https://www.youtube.com/channel/${channel.body.items[0].id.channelId}
`
                        faketoko(mess.wait)
                        var buffer321 = await getBuffer(`${channel.body.items[0].snippet.thumbnails.high.url}`)
                        client.sendMessage(from, buffer321, MessageType.image, { caption: datachannel, quoted: mek })
                    } catch (err) {
                        faketoko(`Err: ${err}`)
                    }
                    break
                case 'ahta':
                    if (!q) return faketoko(mess.wrongFormat)
                    var buffer213 = await getBuffer(`https://api.vhtear.com/hartatahta?text=${q}&apikey=${config.VhtearKey}`)
                    faketoko(mess.wait)
                    client.sendMessage(from, buffer213, MessageType.image, { quoted: mek, caption: `*HARTA TAHTA ${q}*` })
                    break
                case 'takulast':
                    anu = await fetchJson(`https://api.vhtear.com/otakulatest&apikey=${config.VhtearKey}`, { method: 'get' })
                    if (anu.error) return faketoko(anu.error)
                    teks = '「 *OTAKULAST* 」\n\n'
                    for (let i of anu.result.data) {
                        teks += `${i}\n• Title : ${i.title}\n• Link : ${i.link}\n• Published : ${i.datetime}\n`
                    }
                    faketoko(teks.trim())
                    break
                case 'ork':
                    if (!q) return faketoko(mess.wrongFormat)
                    try {
                        faketoko(mess.wait)
                        anudorkw2 = await fetchJson(`https://api-anoncybfakeplayer.herokuapp.com/dorking?dork=${q}`, { method: 'get' })
                        hasildork = `${anudorkw2.result}`
                        faketoko(hasildork)
                    } catch (err) {
                        faketoko(`Error: ${err}`)
                    }
                    break
                case 'indhost':
                    try {
                        if (!q) return faketoko(mess.wrongFormat)
                        anu = await fetchJson(`https://api.banghasan.com/domain/hostsearch/${q}`, { method: 'get' })
                        faketoko(anu.hasil)
                    } catch (err) {
                        faketoko(`Error: ${err}`)
                    }
                    break
                    case 'enu':
                    case 'elp':
                    runtime = process.uptime()
                    teks = `${kyun(runtime)}`
                        teks = `</ *Hndrr-SELF >*\n\n*INFORMATION:*\n❏ Lib: Baileys\n${kyun(runtime)}\n❏ Total Feature: ${menuu.length}\n❏ Creator: Ramadhan\n\n*</ ALL-MENU* >\n\n`
                        for (let inimenu of menuu) {
                            teks += `• ${inimenu}\n`
                        }
                        teks += `\n</ THANKS TO >
• geps 
                        
*Hndrr-SELF*`
                        faketoko(teks)
                        break
                    case 'ddmenu':
                    if (!q) return faketoko(mess.wrongFormat)
                    const menua = body.slice(8)
                    menuu.push(menua)
                    fs.writeFileSync('./src/fitur.json', JSON.stringify(menuu))
                    faketoko(`Sukses Menambahkan Fitur`)
                    break
                case 'elmenu':
                    if (!q) return faketoko(mess.wrongFormat)
                    try {
                        let delsayso = menuu.indexOf(q)
                        menuu.splice(delsayso, 1)
                        fs.writeFileSync('./src/fitur.json', JSON.stringify(menuu))
                        //fs.unlinkSync(`./src/fitur/${q}`)
                        faketoko(`Succes delete fitur ${q}`)
                    } catch (err) {
                        faketoko(`Gagal delete fitur ${q}.`)
                    }
                    break
                    case 'mgtourl':
                    if (!isQuotedImage) return faketoko(mess.wrongFormat)
                    var imgbb = require('imgbb-uploader')
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                        gerwd22 = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        reply(mess.wait)
                        owgie3d = await client.downloadAndSaveMediaMessage(gerwd22)
                        anuc3cd = await imgbb("08579d070df9a07cb1c2ee565aece767", owgie3d)
                        teksd3j = `${anuc3cd.display_url}`
                        faketoko(teksd3j)
                    }
                    break
                case 'binary':
                    if (!q) return faketoko(mess.wrongFormat)
                    faketoko(`${encodebinary(q)}`)
                    break
                case 'ebinary':
                    if (!q) return faketoko(mess.wrongFormat)
                    faketoko(`${decodebinary(q)}`)
                    break
                case 'upai':
                    encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    media = await client.downloadAndSaveMediaMessage(encmedia)
                    ran = getRandom('.mp3')
                    exec(`ffmpeg -i ${media} -filter:a "atempo=0.5,asetrate=65100" ${ran}`, (err, stderr, stdout) => {
                        fs.unlinkSync(media)
                        if (err) return faketoko(`Error: ${err}`)
                        hah = fs.readFileSync(ran)
                        client.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', ptt: true, quoted: mek })
                        fs.unlinkSync(ran)
                    })
                    break
                case 'optt':
                    encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    media = await client.downloadAndSaveMediaMessage(encmedia)
                    ran = getRandom('.mp3')
                    exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                        fs.unlinkSync(media)
                        if (err) return faketoko(`Error: ${err}`)
                        topt = fs.readFileSync(ran)
                        client.sendMessage(from, topt, audio, { mimetype: 'audio/mp4', quoted: mek, ptt: true })
                    })
                    break
                case 'istonline':
                    let ido = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
                    let online = [...Object.keys(client.chats.get(ido).presences), client.user.jid]
                    client.sendMessage(from, 'List Online:\n' + online.map(v => '• @' + v.replace(/@.+/, '')).join`\n`, text, {
                        quoted: mek,
                        contextInfo: { mentionedJid: online }
                    })
                    break
                case 'vibrato':
                    encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    media = await client.downloadAndSaveMediaMessage(encmedia)
                    ran = getRandom('.mp3')
                    exec(`ffmpeg -i ${media} -filter_complex "vibrato=f=4" ${ran}`, (err) => {
                        fs.unlinkSync(media)
                        if (err) return faketoko(`Error: ${err}`)
                        topt = fs.readFileSync(ran)
                        client.sendMessage(from, topt, audio, { mimetype: 'audio/mp4', quoted: mek, ptt: true })
                    })
                    break
                case 'reverse':
                    encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    media = await client.downloadAndSaveMediaMessage(encmedia)
                    ran = getRandom('.mp3')
                    exec(`ffmpeg -i ${media} -filter_complex "areverse" ${ran}`, (err) => {
                        fs.unlinkSync(media)
                        if (err) return faketoko(`Error: ${err}`)
                        topt = fs.readFileSync(ran)
                        client.sendMessage(from, topt, audio, { mimetype: 'audio/mp4', quoted: mek, ptt: true })
                    })
                    break
                case 'pulsator':
                    encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    media = await client.downloadAndSaveMediaMessage(encmedia)
                    ran = getRandom('.mp3')
                    exec(`ffmpeg -i ${media} -filter_complex "apulsator=mode=sine:hz=3:width=0.1:offset_r=0" ${ran}`, (err) => {
                        fs.unlinkSync(media)
                        if (err) return faketoko(`Error: ${err}`)
                        topt = fs.readFileSync(ran)
                        client.sendMessage(from, topt, audio, { mimetype: 'audio/mp4', quoted: mek, ptt: true })
                    })
                    break
                case 'ass':
                    encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    media = await client.downloadAndSaveMediaMessage(encmedia)
                    ran = getRandom('.mp3')
                    exec(`ffmpeg -i ${media} -af equalizer=f=94:width_type=o:width=2:g=30 ${ran}`, (err, stderr, stdout) => {
                        fs.unlinkSync(media)
                        if (err) return faketoko(`Error: ${err}`)
                        hah = fs.readFileSync(ran)
                        client.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', ptt: true, quoted: mek })
                        fs.unlinkSync(ran)
                    })
                    break
                    case 'rigger':
                        var imgbb = require('imgbb-uploader')
                        if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                            ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                            fakestsatus(mess.wait)
                            owgi = await client.downloadAndSaveMediaMessage(ger)
                            anu = await imgbb("3b8594f4cb11895f4084291bc655e510", owgi)
                            teks = `${anu.display_url}`
                            ranp = getRandom('.gif')
                            rano = getRandom('.webp')
                            anu1 = `https://some-random-api.ml/canvas/triggered?avatar=${teks}`
                            exec(`wget ${anu1} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
                                fs.unlinkSync(ranp)
                                exec(`webpmux -set exif ${addMetadata(`${config.author}`, `${config.packname}`)} ${rano} -o ${rano}`, async (error) => {
                                    if (error) return fakestsatus(`Error: ${error}`)
                                    client.sendMessage(from, fs.readFileSync(rano), sticker, { quoted: mek })
                                    fs.unlinkSync(rano)
                                })
                            })
                        } else {
                            fakestsatus(mess.wrongFormat)
                        }
                        break
                case 'asted':
                    var imgbb = require('imgbb-uploader')
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                        ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        owgi = await client.downloadAndSaveMediaMessage(ger)
                        anu = await imgbb("3b8594f4cb11895f4084291bc655e510", owgi)
                        teks = `${anu.display_url}`
                        rano2 = getRandom('.gif')
                        rano = getRandom('.webp')
                        anu2 = `https://some-random-api.ml/canvas/wasted?avatar=${teks}`
                        exec(`wget ${anu2} -O ${rano2} && ffmpeg -i ${rano2} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
                            fs.unlinkSync(rano2)
                            if (err) return faketoko(`Error: ${err}`)
                            exec(`webpmux -set exif ${addMetadata(`${config.author}`, `${config.packname}`)} ${rano} -o ${rano}`, async (error) => {
                                if (error) return faketoko(`Error: ${error}`)
                                client.sendMessage(from, fs.readFileSync(rano), sticker, { quoted: mek })
                                fs.unlinkSync(rano)
                            })
                        })
                    } else {
                        faketoko('Gunakan foto!')
                    }
                    break
                case 'laystore':
                    if (!q) return faketoko(mess.wrongFormat)
                    try {
                        faketoko(mess.wait)
                        anu = await fetchJson(`https://api.vhtear.com/playstore?query=${q}&apikey=${config.VhtearKey}`, { method: 'get' })
                        for (let ply of anu.result) {
                            store = `*「 PLAYSTORE 」*\n\n• Nama Apk: ${ply.title}\n• ID: ${ply.app_id}\n• Developer: ${ply.developer}\n• Deskripsi: ${ply.description}\n• Link Apk: https://play.google.com/${ply.url}\n\n`
                        }
                        faketoko(store.trim())
                    } catch (err) {
                        faketoko(`Error: ${err}`)
                    }
                    break
                case 'nfoalamat':
                    if (!q) return faketoko(mess.wrongFormat)
                    try {
                        faketoko(mess.wait)
                        anu = await fetchJson(`https://api.vhtear.com/infoalamat?query=${q}&apikey=${config.VhtearKey}`, { method: 'get' })
                        faketoko(`${anu.result.data}`)
                    } catch (err) {
                        faketoko(`Error: ${err}`)
                    }
                    break
                case 'gstalk':
                    if (!q) return faketoko(mess.wrongFormat)
                    try {
                        faketoko(mess.wait)
                        anu = await fetchJson(`https://api.vhtear.com/igprofile?query=${q}&apikey=${config.VhtearKey}`, { method: 'get' })
                        bufferigstalk = await getBuffer(anu.result.picture)
                        hasil = `「 *INSTAGRAM STALKER* 」

• Fullname: ${anu.result.full_name}
• Post: ${anu.result.post_count}
• Followers: ${convertBalanceToString(anu.result.follower)}
• Following: ${convertBalanceToString(anu.result.follow)}
• Jumlah Postingan: ${convertBalanceToString(anu.result.post_count)}
• Bio: ${anu.result.biography}
• Link: https://www.instagram.com/${anu.result.username}`
                        client.sendMessage(from, bufferigstalk, image, { quoted: mek, caption: hasil })
                    } catch (err) {
                        faketoko(`Error: ${err}`)
                    }
                    break
                case 'pswteks':
                    client.updatePresence(from, Presence.composing)
                    client.sendMessage('status@broadcast', `${q}`, extendedText)
                    faketoko(`Sukses Up story wea teks ${q}`)
                    break
                case 'pswimage':
                    client.updatePresence(from, Presence.composing)
                    if (isQuotedImage) {
                        const swsw = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        cihcih = await client.downloadMediaMessage(swsw)
                        client.sendMessage('status@broadcast', cihcih, image, { caption: `${q}` })
                    }
                    bur = `Sukses Upload Story Image dengan Caption: ${q}`
                    client.sendMessage(from, bur, text, { quoted: mek })
                    break
                case 'pswvideo':
                    client.updatePresence(from, Presence.composing)
                    if (isQuotedVideo) {
                        const swsw = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        cihcih = await client.downloadMediaMessage(swsw)
                        client.sendMessage('status@broadcast', cihcih, video, { caption: `${q}` })
                    }
                    bur = `Sukses Upload Story Video dengan Caption: ${q}`
                    client.sendMessage(from, bur, text, { quoted: mek })
                    break
                    case 'iktoknowm':
                        if (!q) return faketoko(mess.wrongFormat)
                        try {
                            faketoko(mess.wait)
                        anuu = await fetchJson(`https://api.vhtear.com/tiktok_no_wm?link=${q}&apikey=${config.VhtearKey}`, {method: 'get'})
                        buffertiknowm = await getBuffer(anuu.result.video)
                        client.sendMessage(from, buffertiknowm, video, { quoted: mek })
                    } catch (err) {
                        faketoko(`Error: ${err}`)
                    }
                        break
                        case 'b':
                            if (args.length < 1) return reply('*Masukan Url nya?*')
                            query = args.join(" ")
                        anu = await fetchJson(`https://videfikri.com/api/fbdl/?urlfb=${query}`, {method: 'get'})
                        wing = ` *F A C E B O O K DOWNLOADER*                  
*Judul :* ${anu.result.judul}`                 
                        client.sendMessage(from, mess.wait, text,{quoted : mek})
                         buffer = await getBuffer(anu.result.url)
                         client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.result.url}.mp4`, quoted: freply, caption: wing})
                        break 
                case 'iktok':
                    if (!q) return faketoko(mess.wrongFormat)
                    try {
                        faketoko(mess.wait)
                        anu = await fetchJson(`https://api.vhtear.com/tiktokdl?link=${q}&apikey=${config.VhtearKey}`, { method: 'get' })
                        buffertiktok = await getBuffer(anu.result.video)
                        client.sendMessage(from, buffertiktok, video, { quoted: mek })
                    } catch (err) {
                        faketoko(`Error: ${err}`)
                    }
                    break
                case 'uisiimg':
                    try {
                        pus = await getBuffer(`https://api.vhtear.com/puisi_image&apikey=${config.VhtearKey}`, { method: 'get' })
                        client.sendMessage(from, pus, image, { quoted: mek })
                    } catch (err) {
                        faketoko(`Error: ${err}`)
                    }
                    break
                case 'sweb':
                    if (!q) return faketoko(mess.wrongFormat)
                    try {
                        faketoko(mess.wait)
                        buffssweb = await getBuffer(`https://api.vhtear.com/ssweb?link=${q}&type=pc&apikey=${config.VhtearKey}`, { method: 'get' })
                        client.sendMessage(from, buffssweb, image, { quoted: mek, caption: `RESULT: ${q}` })
                    } catch (err) {
                        faketoko(`Error: ${err}`)
                    }
                    break
                case 'eturn':
                    return faketoko(JSON.stringify(eval(args.join(''))))
                    break
                case 'omp3':
                    client.updatePresence(from, Presence.composing)
                    if (!isQuotedVideo) return faketoko(mess.wrongFormat)
                    faketoko(mess.wait)
                    encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    media = await client.downloadAndSaveMediaMessage(encmedia)
                    ran = getRandom('.mp4')
                    exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                        fs.unlinkSync(media)
                        if (err) return faketoko(`Err: ${err}`)
                        buffer453 = fs.readFileSync(ran)
                        client.sendMessage(from, buffer453, audio, { mimetype: 'audio/mp4', quoted: mek })
                        fs.unlinkSync(ran)
                    })
                    break
                case 'etsticker':
                case 'ets':
                    var itsme = `${numbernye}@s.whatsapp.net`
                    var split = `_*STICKER-DATABASE*_`
                    var selepbot = {
                        contextInfo: {
                            participant: itsme,
                            quotedMessage: {
                                extendedTextMessage: {
                                    text: split,
                                }
                            }
                        }
                    }
                    namastc = body.slice(12)
                    result = fs.readFileSync(`./src/sticker/${namastc}.webp`)
                    client.sendMessage(from, result, sticker, selepbot)
                    break
                case 'tickerlist':
                case 'iststicker':
                    teks = '*Sticker List*\n\n'
                    for (let awokwkwk of setiker) {
                        teks += `• ${awokwkwk}\n`
                    }
                    teks += `\n*Total : ${setiker.length}*`
                    faketoko(teks)
                    break
                case 'ddsticker':
                    if (!isQuotedSticker) return faketoko(mess.wrongFormat)
                    if (!q) return faketoko(mess.wrongFormat)
                    boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    delb = await client.downloadMediaMessage(boij)
                    setiker.push(`${q}`)
                    fs.writeFileSync(`./src/sticker/${q}.webp`, delb)
                    fs.writeFileSync('./src/stik.json', JSON.stringify(setiker))
                    faketoko(`Sukses Menambahkan Sticker\nCek dengan cara ${prefix}liststicker`)
                    break
                case 'elsticker':
                    if (!q) return faketoko(mess.wrongFormat)
                    try {
                        fs.unlinkSync(`./src/sticker/${q}.webp`)
                        setiker.splice(q, 1)
                        fs.writeFileSync('./src/stik.json', JSON.stringify(setiker))
                        faketoko(`Succes delete sticker ${q}!`)
                    } catch (err) {
                        faketoko(`Gagal delete sticker ${q}!`)
                    }
                    break
                case 'ddvn':
                    if (!isQuotedAudio) return faketoko(mess.wrongFormat)
                    if (!q) return faketoko(mess.wrongFormat)
                    boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    delb = await client.downloadMediaMessage(boij)
                    audionye.push(`${q}`)
                    fs.writeFileSync(`./src/audio/${q}.mp3`, delb)
                    fs.writeFileSync('./src/audio.json', JSON.stringify(audionye))
                    faketoko(`Sukses Menambahkan Audio\nCek dengan cara ${prefix}listvn`)
                    break
                case 'vn':
                    if (!q) return faketoko(mess.wrongFormat)
                    buffer764 = fs.readFileSync(`./src/audio/${q}.mp3`)
                    client.sendMessage(from, buffer764, audio, { mimetype: 'audio/mp4', quoted: mek, ptt: true })
                    break
                case 'elvn':
                    if (!q) return faketoko(mess.wrongFormat)
                    try {
                        fs.unlinkSync(`./src/audio/${q}.mp3`)
                        faketoko(`Succes delete vn ${q}!`)
                    } catch (err) {
                        faketoko(`Gagal delete vn ${q}!`)
                    }
                    break
                case 'istvn':
                case 'nlist':
                    teks = '*List Vn:*\n\n'
                    for (let awokwkwk of audionye) {
                        teks += `- ${awokwkwk}\n`
                    }
                    teks += `\n*Total : ${audionye.length}*`
                    faketoko(teks.trim())
                    break
                case 'etthumb':
                    if (!isQuotedImage) return reply('Reply imagenya blokk!')
                    const messimagethumb = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    const downiamgethumb = await client.downloadMediaMessage(messimagethumb)
                    fs.unlinkSync(`./src/image/thumbnail.jpeg`)
                    await sleep(2000)
                    fs.writeFileSync(`./src/image/thumbnail.jpeg`, downiamgethumb)
                    faketoko('Succes')
                    break
                case 'ddimage':
                    if (!isQuotedImage) return faketoko(mess.wrongFormat)
                    if (!q) return faketoko(mess.wrongFormat)
                    boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    delb = await client.downloadMediaMessage(boij)
                    imagenye.push(`${q}`)
                    fs.writeFileSync(`./src/image/${q}.jpeg`, delb)
                    fs.writeFileSync('./src/image.json', JSON.stringify(imagenye))
                    faketoko(`Sukses Menambahkan image\nCek dengan cara ${prefix}listimage`)
                    break
                case 'etimage':
                    if (!q) return faketoko(mess.wrongFormat)
                    bufferc4 = fs.readFileSync(`./src/image/${q}.jpeg`)
                    client.sendMessage(from, bufferc4, image, { quoted: mek, caption: `Result From Database : ${q}.jpeg` })
                    break
                case 'elimage':
                    if (!q) return faketoko(mess.wrongFormat)
                    try {
                        fs.unlinkSync(`./src/image/${q}.jpeg`)
                        faketoko(`Succes delete image ${q}.jpeg`)
                    } catch (err) {
                        faketoko(`Gagal delete image ${q}.jpeg`)
                    }
                    break
                case 'magelist':
                case 'istimage':
                    teks = '*List Image :*\n\n'
                    for (let awokwkwk of imagenye) {
                        teks += `- ${awokwkwk}\n`
                    }
                    teks += `\n*Total : ${imagenye.length}*`
                    faketoko(teks.trim())
                    break
                case 'ddvideo':
                    if (!isQuotedVideo) return faketoko(mess.wrongFormat)
                    if (!q) return faketoko(mess.wrongFormat)
                    boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    delb = await client.downloadMediaMessage(boij)
                    videonye.push(`${q}`)
                    fs.writeFileSync(`./src/video/${q}.mp4`, delb)
                    fs.writeFileSync('./src/video.json', JSON.stringify(videonye))
                    faketoko(`Sukses Menambahkan Video\nCek dengan cara ${prefix}listvideo`)
                    break
                case 'etvideo':
                    if (!q) return faketoko(mess.wrongFormat)
                    bufferx2w = fs.readFileSync(`./src/video/${q}.mp4`)
                    client.sendMessage(from, bufferx2w, video, { mimetype: 'video/mp4', quoted: mek })
                    break
                case 'elvideo':
                    if (!q) return faketoko(mess.wrongFormat)
                    try {
                        fs.unlinkSync(`./src/video/${q}.mp4`)
                        faketoko(`Succes delete video ${q}.mp4`)
                    } catch (err) {
                        faketoko(`Gagal delete video ${q}.mp4`)
                    }
                    break
                case 'istvideo':
                case 'ideolist':
                    teks = '*List Video :*\n\n'
                    for (let awokwkwk of videonye) {
                        teks += `• ${awokwkwk}\n`
                    }
                    teks += `\n*Total : ${videonye.length}*`
                    faketoko(teks)
                break
                    case 'eave': 
				    if (!isGroup) return reply(mess.only.group)
			    	anu = await client.groupLeave(from, `Bye All Member *${groupMetadata.subject}*`, groupId)
	                break
                case 'hatlist':
                case 'ekchat':
                    client.updatePresence(from, Presence.composing)
                    faketoko(`Total : ${totalchat.length} Chat`)
                    break
                    case 'esticker':
                        if (args.length !== 1) return geps.reply(from, `Format salah pastikan sudah benar`,)
                        const emoji = emojiUnicode(args[0])
                        await client.fakelocation(from, `_Tunggu sebentar lagi diproses kak_`,)
                        //console.log('Creating emoji code for =>', emoji)
                        try {
                            await client.sendStickerfromUrl(from, `https://api.vhtear.com/emojitopng?code=${emoji}&apikey=${config.Vhtearkey}`)
                        } catch (err) {
                            //console.error(err)
                            await clinet.fakelocation(from, 'Cukup satu emoji tidak boleh 2',)
                        }
                        break
                        case 'narsip':
                if (!mek.key.fromMe) return reply('*Kamu Owner?*')
                reply('*succes unarchive all chat*')
                console.log('succes unarchive chat = ' + from)
                anu = await client.chats.all()
                for (let _ of anu) {
                client.modifyChat(_.jid, ChatModification.unarchive)
                }
                break
            case 'rsip':
                if (!mek.key.fromMe) return reply('*Kamu Owner?*')
                reply('*okey wait..*')
                console.log('succes archive chat = ' + from)
                await sleep(1000)
                client.modifyChat(from, ChatModification.archive)
                break
            case 'elthischat':
                if (!mek.key.fromMe) return reply('*Kamu Owner?*')
                reply('*succes delete this chat*')
                console.log('succes delete chat = ' + from)
                await sleep(1000)
                client.modifyChat(from, ChatModification.delete)
                break
                case 'npin':
                    if (!mek.key.fromMe) return reply('*Kamu Owner?*')
                    client.modifyChat(from, ChatModification.unpin)
                    reply('*succes unpin this chat*')
                    console.log('unpin chat = ' + from)
                    break
                case 'in':
                    if (!mek.key.fromMe) return reply('*Kamu Owner?*')
                    client.modifyChat(from, ChatModification.pin)
                    reply('*succes pin this chat*')
                    console.log('pinned chat = ' + from)
                    break
                case 'peed':
                    const timestamp = speed();
                    const latensi = speed() - timestamp
                    exec(`neofetch --stdout`, (error, stdout, stderr) => {
                        const child = stdout.toString('utf-8')
                        const teks = child.replace(/Memory:/, "Ram:")
                        const pingnya = `${teks}\nSpeed: ${latensi.toFixed(4)} Second`
                        faketoko(pingnya)
                    })
                    break
                case 'ing':
				const chatsIds = await client.chats.all()
                const timest = speed(); chatsIds
                const tensi = speed() - timest
                p0 =` Loaded Message
                
- *[ ${totalchat.length} ]*  Total Chat
- *[ Samsung ]* Handphone
- *[ ${client.user.phone.wa_version} ]* WA Version
- *[ Baileys ]* Server
- *[ SELF ]* Mode
- *[ ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / 4095 ]* RAM

_Speed : ${tensi.toFixed(2)} Second_`
                client.sendMessage(from, p0, text, { quoted: mek})
                    break
                case 'erm':
                    if (!q) return faketoko(mess.wrongFormat)
                    exec(q, (err, stdout) => {
                        if (err) return faketoko(`root@Hndrmdhn:~ ${err}`)
                        if (stdout) {
                            faketoko(stdout)
                        }
                    })
                    break
                case 'map':
                    if (!q) return faketoko(mess.wrongFormat)
                    exec(`nmap ${q}`, (err, stdout) => {
                        if (err) return faketoko(`root~# ${err}`)
                        if (stdout) {
                            faketoko(`root~# ${stdout}`)
                        }
                    })
                    break
                case 'ebdav':
                    if (!q) return faketoko(mess.wrongFormat)
                    exec(`curl -T ./DEPES/index.html ${q}`, (err, stdout) => {
                        if (err) return faketoko(`root~# ${err}`)
                        if (stdout) {
                        }
                        faketoko(`root~# Success Uploading to ${q}`)
                    })
                    break
                case 'ayment':
                case 'ayments':
                    fakelocation(`*──「 PAYMENT 」──*\n\n• Gopay: 0896-5290-3288\n• Pulsa: 0896-5290-3288 ( +5K )\n\n`)
                    break
                case 'locklist':
                    teks = 'LIST BLOCK\n'
                    for (let block of blocked) {
                        teks += `• @${block.split('@')[0]}\n`
                    }
                    teks += `Total: ${blocked.length}`
                    faketoko(teks.trim())
                    break
                case 'ake': // TAKE STICKER
                    const namaPackss = q.substring(0, q.indexOf('|') - 1)
                    const authorPackss = q.substring(q.lastIndexOf('|') + 2)
                    stiker_wm = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    dlstiker_wm = await client.downloadAndSaveMediaMessage(stiker_wm)
                    stickerpackid = "com.snowcorp.stickerly.android.stickercontentprovider b5e7275f-f1de-4137-961f-57becfad34f2" //not sure what this does
                    packname = namaPackss;
                    author = authorPackss;
                    exif321 = getRandom('.exif')
                    exifst = getRandom('.webp')
                    googlelink = `https://wa.me/6289652903288?text=${prefix}menu`;
                    applelink = `https://wa.me/6289652903288?text=${prefix}menu`;


                    json = { "sticker-pack-id": stickerpackid, "sticker-pack-name": packname, "sticker-pack-publisher": author, "android-app-store-link": googlelink, "ios-app-store-link": applelink }
                    len = JSON.stringify(json).length

                    f = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])
                    aaa = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]
                    if (len > 256) {
                        len = len - 256
                        aaa.unshift(0x01)
                    } else {
                        aaa.unshift(0x00)
                    }
                    fff = Buffer.from(aaa)
                    ffff = Buffer.from(JSON.stringify(json))

                    if (len < 16) {
                        len = len.toString(16)
                        len = "0" + len
                    } else {
                        len = len.toString(16)
                    }
                    ff = Buffer.from(len, "hex")

                    wm = Buffer.concat([f, ff, fff, ffff])

                    fs.writeFile(exif321, wm, function (err) {
                        if (err) return console.log(err);
                        exec(`webpmux -set exif ${exif321} undefined.webp -o ${exifst}`, (err) => {
                            if (err) return console.log(err);
                            client.sendMessage(from, fs.readFileSync(exifst), sticker, { quoted: mek })
                            fs.unlinkSync(exifst)
                            fs.unlinkSync(exif321)
                            fs.unlinkSync('undefined.webp')
                        })
                    });
                    break
                case 'etexif':
                    const namaPack = q.substring(0, q.indexOf('|') - 1)
                    const authorPack = q.substring(q.lastIndexOf('|') + 2)
                    fs.unlinkSync('./src/sticker/data.exif')
                    sleep(2000)
                    addMetadata(namaPack, authorPack)
                    faketoko(`Success ubah wm sticker`)
                    break
                case 'wm':
                    const namaPacks = q.substring(0, q.indexOf('|') - 1)
                    const authorPacks = q.substring(q.lastIndexOf('|') + 2)
                    stiker_wm = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    dlstiker_wm = await client.downloadAndSaveMediaMessage(stiker_wm)
                    stickerpackid = "com.snowcorp.stickerly.android.stickercontentprovider b5e7275f-f1de-4137-961f-57becfad34f2" //not sure what this does
                    packname = namaPacks;
                    author = authorPacks;
                    ran = getRandom('.webp')
                    exifnya = getRandom('.exif')
                    googlelink = `https://wa.me/6289523258649?text=TES`;
                    applelink = `https://wa.me/6289523258649?text=TES`;


                    json = { "sticker-pack-id": stickerpackid, "sticker-pack-name": packname, "sticker-pack-publisher": author, "android-app-store-link": googlelink, "ios-app-store-link": applelink }
                    len = JSON.stringify(json).length

                    f = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])
                    aaa = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]
                    if (len > 256) {
                        len = len - 256
                        aaa.unshift(0x01)
                    } else {
                        aaa.unshift(0x00)
                    }
                    fff = Buffer.from(aaa)
                    ffff = Buffer.from(JSON.stringify(json))

                    if (len < 16) {
                        len = len.toString(16)
                        len = "0" + len
                    } else {
                        len = len.toString(16)
                    }
                    ff = Buffer.from(len, "hex")

                    wm = Buffer.concat([f, ff, fff, ffff])

                    fs.writeFile(exifnya, wm, function (err) {
                        ffmpeg(`./${dlstiker_wm}`)
                            .input(dlstiker_wm)
                            .on('start', function (cmd) {
                                console.log(`Started : ${cmd}`)
                            })
                            .on('error', function (err) {
                                console.log(`Error : ${err}`)
                                fs.unlinkSync(dlstiker_wm)
                                reply(mess.error.stick)
                            })
                            .on('end', function () {
                                console.log('Finish')
                                exec(`webpmux -set exif ${exifnya} ${ran} -o ${ran}`, async (error) => {
                                    if (error) return reply(mess.error.stick)
                                    await client.sendMessage(from, fs.readFileSync(ran), sticker, { quoted: mek })
                                    fs.unlinkSync(dlstiker_wm)
                                    fs.unlinkSync(ran)
                                })
                            })
                            .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                            .toFormat('webp')
                            .save(ran)
                    });
                    break
                case 'tiker':
                case 'ticker':
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        const media = await client.downloadAndSaveMediaMessage(encmedia)
                        ran = getRandom('.webp')
                        await ffmpeg(`./${media}`)
                            .input(media)
                            .on('start', function (cmd) {
                                console.log(`Started : ${cmd}`)
                            })
                            .on('error', function (err) {
                                console.log(`Error : ${err}`)
                                fs.unlinkSync(media)
                                reply(mess.error.stick)
                            })
                            .on('end', function () {
                                console.log('Finish')
                                exec(`webpmux -set exif ./src/sticker/data.exif ${ran} -o ${ran}`, async (error) => {
                                    if (error) return reply(mess.error.stick)
                                    await client.sendMessage(from, fs.readFileSync(ran), sticker, { quoted: mek })
                                    fs.unlinkSync(media)
                                    fs.unlinkSync(ran)
                                })
                            })
                            .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                            .toFormat('webp')
                            .save(ran)
                    } else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
                        const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        const media = await client.downloadAndSaveMediaMessage(encmedia)
                        ran = getRandom('.webp')
                        reply(mess.wait)
                        await ffmpeg(`./${media}`)
                            .inputFormat(media.split('.')[1])
                            .on('start', function (cmd) {
                                console.log(`Started : ${cmd}`)
                            })
                            .on('error', function (err) {
                                console.log(`Error : ${err}`)
                                fs.unlinkSync(media)
                                tipe = media.endsWith('.mp4') ? 'video' : 'gif'
                                reply(`❌ Gagal, pada saat mengkonversi ${tipe} ke stiker`)
                            })
                            .on('end', function () {
                                console.log('Finish')
                                exec(`webpmux -set exif ${addMetadata(`${config.author}`, `${config.packname}`)} ${ran} -o ${ran}`, async (error) => {
                                    if (error) return reply(mess.error.stick)
                                    await client.sendMessage(from, fs.readFileSync(ran), sticker, { quoted: mek })
                                    fs.unlinkSync(media)
                                    fs.unlinkSync(ran)
                                })
                            })
                            .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                            .toFormat('webp')
                            .save(ran)
                    } else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        const media = await client.downloadAndSaveMediaMessage(encmedia)
                        ranw = getRandom('.webp')
                        rano2 = getRandom('.png')
                        reply(mess.wait)
                        keyrmbg = 'Your-ApiKey'
                        await removeBackgroundFromImageFile({ path: media, apiKey: keyrmbg, size: 'auto', type: 'auto', rano2 }).then(res => {
                            fs.unlinkSync(media)
                            let bufferir9vn5 = Buffer.from(res.base64img, 'base64')
                            fs.writeFileSync(rano2, bufferir9vn5, (err) => {
                                if (err) return reply('Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi.')
                            })
                            exec(`ffmpeg -i ${rano2} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
                                fs.unlinkSync(rano2)
                                if (err) return reply(mess.error.stick)
                                exec(`webpmux -set exif ${addMetadata(`${config.author}`, authorname)} ${ranw} -o ${ranw}`, async (error) => {
                                    if (error) return reply(mess.error.stick)
                                    client.sendMessage(from, fs.readFileSync(ranw), sticker, { quoted: mek })
                                    fs.unlinkSync(ranw)
                                })
                            })
                        })
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
                    }
                    break
                    
                    case 'nobg': // PR BUAT NANTI
                faketoko(`_Tunggu sebentar lagi diproses kak_`)
                if (isMedia && isQuotedImage.type === 'image') {
                    const mediaData = await decryptMedia(isQuotedImage, uaOverride)
                    const getUrlno = await uploadImages(mediaData, false)
                    const nobgf = await axios.get(`https://api.vhtear.com/removebgwithurl?link=${getUrlno}&apikey=${config.Vhtearkey}`)
                    const nobgff = nobgf.data.result.image
                    await sleeps(1000)
                    hndrr.sendMessage(from, nobgff)
                } else {
                    await fakelocation('Wrong Format!')
                }
                break
                case 'etprefix':
                    if (!q) return faketoko(mess.wrongFormat)
                    prefix = q
                    faketoko(`Succes Mengganti Prefix : ${q}`)
                    break
                case 'etreply':
                case 'etfake':
                    if (!q) return faketoko(mess.wrongFormat)
                    fake = q
                    faketoko(`Succes Mengganti Conversation Fake : ${q}`)
                    break
                case 'etnumber':
                    if (!q) return faketoko(mess.wrongFormat)
                    numbernye = q
                    faketoko(`Succes Mengganti Number Conversation : ${q}`)
                    break
                case 'ettarget':
                    if (!q) return faketoko(mess.wrongFormat)
                    targetprivate = q
                    faketoko(`Succes Mengganti target Private Fake Reply ${q}`)
                    break
                case 'are':
                    const mathdare = dare[Math.floor(Math.random() * (dare.length))]
                    faketoko(mathdare)
                    break
                case 'eadallchat':
                    const readallid = await client.chats.all()
                    client.setMaxListeners(25)
                    for (let xyz of readallid) {
                        await client.chatRead(xyz.jid)
                    }
                    faketoko('Success read all chat')
                    break
                case 'learall':
                    anu = await client.chats.all()
                    client.setMaxListeners(25)
                    for (let _ of anu) {
                        client.deleteChat(_.jid)
                    }
                    faketoko('Success delete all chat')
                    break
                case 'dd':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    if (args.length < 1) return reply('Yang mau di add jin ya?')
                    if (args[0].startsWith('08')) return reply('Gunakan kode negara mas')
                    try {
                        num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
                        client.groupAdd(from, [num])
                    } catch (e) {
                        return faketoko(`Diprivate asw ama ${num}`)
                    }
                    break
                case 'romote':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
                    mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
                    if (mentioned.length > 1) {
                        teks = 'Perintah di terima, Promote :\n'
                        for (let _ of mentioned) {
                            teks += `@${_.split('@')[0]}\n`
                        }
                        mentions(teks, mentioned, true)
                        client.groupMakeAdmin(from, mentioned)
                    } else {
                        mentions(`Perintah di terima, Promote : @${mentioned[0].split('@')[0]}`, mentioned, true)
                        client.groupMakeAdmin(from, mentioned)
                    }
                    break
                case 'emote':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
                    mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
                    if (mentioned.length > 1) {
                        teks = 'Perintah di terima, Demote :\n'
                        for (let _ of mentioned) {
                            teks += `@${_.split('@')[0]}\n`
                        }
                        mentions(teks, mentioned, true)
                        client.groupDemoteAdmin(from, mentioned)
                    } else {
                        mentions(`Perintah di terima, Demote : @${mentioned[0].split('@')[0]}`, mentioned, true)
                        client.groupDemoteAdmin(from, mentioned)
                    }
                    break
                case 'istadmin':
                    if (!isGroup) return reply(mess.only.group)
                    teks = `List mimin ${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
                    no = 0
                    for (let admon of groupAdmins) {
                        no += 1
                        teks += `${no.toString()} @${admon.split('@')[0]}\n`
                    }
                    mentions(teks, groupAdmins, true)
                    break
                case 'oimg':
                    {
                        if (!isQuotedSticker) return faketoko(`Reply stickernya kaka`)
                        faketoko(mess.wait)
                        encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                        media = await client.downloadAndSaveMediaMessage(encmedia)
                        ran = getRandom('.png')
                        exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                            fs.unlinkSync(media)
                            if (err) return faketoko(`Err: ${err}`)
                            bufferi9nn = fs.readFileSync(ran)
                            client.sendMessage(from, bufferi9nn, image, { caption: 'Done bruhh' })
                            fs.unlinkSync(ran)
                        });
                    }
                    break
                case 'lone':
                    if (!isGroup) return reply(mess.only.group)
                    if (args.length < 1) return faketoko(`Tag target yang mau diclone ppnya`)
                    if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag cvk')
                    mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
                    let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
                    try {
                        pp = await client.getProfilePicture(id)
                        buffer0omm = await getBuffer(pp)
                        client.updateProfilePicture(botNumber, buffer0omm)
                        mentions(`Foto profile Berhasil di perbarui menggunakan foto profile @${id.split('@')[0]}`, [jid], true)
                    } catch (e) {
                        faketoko(`Err: ${e}`)
                    }
                    break
                    case 'ayoloh':
                    case 'uggc':
                        if (!isGroup) return faketoko(mess.only.group)
                        client.toggleDisappearingMessages(from)
                        break
                        case 'ugtroli':
                            if (!mek.key.fromMe) return reply('hayoloh')
                    teks = args.join(' ')
                    client.sendMessage(mek.key.remoteJid, `${teks}`,MessageType.extendedText,{
                      quoted: {
                        key : {
                          participant : '0@s.whatsapp.net'
                        },
                        message: {
                          orderMessage: {
                            itemCount : 1,
                            status: 1,
                            surface : 1,
                            message: ' *Hmm* ',
                            orderTitle: 'Ramadhan',
                            sellerJid: '0@s.whatsapp.net'
          
                          }
                        }
                      }
                    })
          
                    break
                case 'val':
                    if (!q) return faketoko(mess.wrongFormat)
                    try {
                        let evaled = await eval(q)
                        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                        return faketoko(evaled)
                    } catch (err) {
                        faketoko(`[ *ERROR* ] ${err}`)
                    }
                    break
                case 'fk':
                    if (args[0] === 'on') {
                        if (config.afkkontak === true) return faketoko(`AFK khusus kontak sudah diaktifkan sebelumnya`)
                        config.afkkontak = true
                        afkkontak = true
                        fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
                        await faketoko(mess.afkenable)
                    } else if (args[0] === 'off') {
                        if (config.afkkontak === false) return faketoko(`AFK khusus kontak sudah dimatikan sebelumnya`)
                        config.afkkontak = false
                        afkkontak = false
                        fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
                        await faketoko(mess.afkdisable)
                    } else {
                        await faketoko(mess.wrongFormat)
                    }
                    break
                case 'ode':
                    if (args[0] === 'self') {
                        if (config.afkkontak === isSelfOnlys) return
                        config.afkkontak = isSelfOnlys
                        afkkontak = isSelfOnlys
                        fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
                        await faketoko(`Beralih ke mode *SELF*`)
                    } else if (args[0] === 'public') {
                        if (config.isSelfOnlys === false) return
                        config.isSelfOnlys = false
                        isSelfOnlys = false
                        fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
                        await faketoko(`Beralih ke mode *PUBLIC*`)
                    } else {
                        await faketoko(mess.wrongFormat)
                    }
                    break
                case 'nticall':
                    if (args[0] === 'on') {
                        if (config.isAntiCall === true) return faketoko(`AFK khusus kontak sudah diaktifkan sebelumnya`)
                        config.isAntiCall = true
                        isAntiCall = true
                        fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
                        await faketoko(`Anti Call berhasil diaktifkan!`)
                    } else if (args[0] === 'off') {
                        if (config.isAntiCall === false) return faketoko(`AFK khusus kontak sudah dimatikan sebelumnya`)
                        config.isAntiCall = false
                        isAntiCall = false
                        fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
                        await faketoko(`Anti Call berhasil dimatikan!`)
                    } else {
                        await faketoko(mess.wrongFormat)
                    }
                    break
                case 'fktag':
                    if (isAFKTAG) return faketoko(mess.afkgroupalready)
                    if (args[0] === 'on') {
                        config.afktag.status = true
                        afktag.status = true
                        afkdatabase.push(from)
                        fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
                        fs.writeFileSync('./src/afk-taggc.json', JSON.stringify(afkdatabase, null, 2))
                        await faketoko(mess.afkenable)
                    } else if (args[0] === 'off') {
                        config.afktag.status = false
                        afktag.status = false
                        afkdatabase.splice(from, 1)
                        fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
                        fs.writeFileSync('./src/afk-taggc.json', JSON.stringify(afkdatabase, null, 2))
                        await faketoko(mess.afkdisable)
                    } else {
                        await faketoko(mess.wrongFormat)
                    }
                    break
                case 'ait':
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                        reply(mess.wait)
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        media = await client.downloadMediaMessage(encmedia)
                        await wait(media).then(res => {
                            client.sendMessage(from, res.video, video, { quoted: mek, caption: res.teks.trim() })
                        }).catch(err => {
                            reply(err)
                        })
                    } else {
                        faketoko(`Reply image/kirim foto dengan caption ${prefix}wait`)
                    }
                    break
                default:
            }
            if (isGroup && budy != undefined) {
            } else {
                console.log(color('[SELF-BOT]', 'green'), 'Any Message ? ', color(sender.split('@')[0]))
            }
        }
    } catch (e) {
        console.log('Message : %s', color(e, 'green'))
        // console.log(e)
    }
})