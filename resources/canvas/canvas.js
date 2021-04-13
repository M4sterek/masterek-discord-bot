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
const welcomeCanvas = async (member, channel) => {
    const canvas = createCanvas(1000, 500)
    const ctx = canvas.getContext('2d')
    const avatar = await loadImage(member.user.displayAvatarURL({
        format: 'png',
        size: 256
    }))
    const tag = member.user.tag


    ctx.beginPath()
    ctx.fillStyle = '#212F3D'
    ctx.fillRect(0, 0, 1000, 500)
    ctx.stroke()
    ctx.closePath()
    ctx.save()
    
    ctx.beginPath( )
    ctx.shadowColor = "green"
    ctx.shadowBlur = 30
    ctx.shadowOffsetX = 10
    ctx.shadowOffsetY = 10
    ctx.arc(500, 200, 128, 0, 2 * Math.PI, true)
    ctx.stroke()
    ctx.restore()

    ctx.save()

    ctx.beginPath()
    ctx.arc(500, 200, 128, 0, 2 * Math.PI, true)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(avatar, 500 - (avatar.width / 2), 200 - (avatar.height / 2))


    

    ctx.restore()

    ctx.beginPath()
    const welcome = `Welcome ${tag}`
    const welcomeNumber = `Number #${member.guild.memberCount}`
    
    ctx.fillStyle = 'white'
    let fontSize = 50
    do{
        fontSize -= 10
    }while(ctx.measureText(welcomeNumber).width>=250||ctx.measureText(welcome).width>=250)
    ctx.font = `${fontSize}px Impact`
    ctx.textAlign = 'center'
    ctx.fillText(welcome, 500, 400)
    ctx.fillText(welcomeNumber,500,450)


    const attachment = new MessageAttachment(canvas.toBuffer())
    
    channel.send(attachment)


}
module.exports = {
    covidCanvas,
    welcomeCanvas
}