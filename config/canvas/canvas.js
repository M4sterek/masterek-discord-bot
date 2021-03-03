const {
    createCanvas,
    loadImage
} = require('canvas')
const {
    MessageAttachment
} = require('discord.js')
////////////////////////////////////////////
//                                        // 
//                                        // 
//                                        // 
//            covidCanvas                 // 
//                                        // 
//                                        // 
//                                        // 
//                                        // 
////////////////////////////////////////////
const covidCanvas = async (msg) => {
    const canvas = createCanvas(800, 600)
    const ctx = canvas.getContext('2d')

    let countryCode = 'pl'


    const flag = await loadImage(`https://flagcdn.com/w320/mc.png`)
    console.log(flag.width)
    console.log(flag.height)

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#117A65'
    ctx.fillRect(0, 0, canvas.width, (0.60 * canvas.height))

    ctx.fillStyle = '#0E6655'
    ctx.fillRect(0, 0, canvas.width, (0.50 * canvas.height))

    ctx.drawImage(flag, (canvas.width / 4) - (flag.width / 2), (canvas.height / 4) - (flag.height / 2))

    let txt = `POLAND`
    const txtt = ctx.measureText(txt)

    ctx.font = "100% Impact"
    ctx.fillStyle = "white"
    ctx.fillText(txt, 400 - txtt.width, (canvas.height / 4))







    const attachment = new MessageAttachment(canvas.toBuffer(), `${countryCode}.covid.cases.png`)
    msg.channel.send('', attachment)
}

////////////////////////////////////////////
//                                        // 
//                                        // 
//                                        // 
//            welcomeCanvas               // 
//                                        // 
//                                        // 
//                                        // 
//                                        // 
////////////////////////////////////////////
const welcomeCanvas = async (msg) => {
    const canvas = createCanvas(1000, 500)
    const ctx = canvas.getContext('2d')
    const avatar = await loadImage(msg.author.displayAvatarURL({
        format: 'png',
        size: 256
    }))
    const tag = msg.author.tag
    const tagMeas = ctx.measureText(tag)

    ctx.beginPath()
    ctx.fillStyle = '#148F77'
    ctx.fillRect(0, 0, 1000, 500)
    ctx.stroke()
    ctx.closePath()
    ctx.save()



    ctx.beginPath()
    ctx.arc(500, 200, 128, 0, 2 * Math.PI, true)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(avatar, 500 - (avatar.width / 2), 200 - (avatar.height / 2))
    
    ctx.restore()

    ctx.beginPath()
    const welcome = `Welcome ${tag} \n Number #${msg.guild.memberCount}`
    ctx.fillStyle = 'white'
    ctx.font = "48px Cloister Black"
    ctx.textAlign='center'
    ctx.fillText(welcome,500,400,1000)


    const attachment = new MessageAttachment(canvas.toBuffer())
    msg.channel.send(attachment)

}
module.exports = {
    covidCanvas,
    welcomeCanvas
}