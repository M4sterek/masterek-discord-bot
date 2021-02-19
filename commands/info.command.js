
module.exports = {
    name: "info",
    description: "Info!",
    run(msg){
    const {channel} = msg
    const embed = {
      "title": "Ryuzaki",
      "description": "First bot created by m!",
      "url": "https://discordapp.com",
      "color": 3447003,
      "timestamp": "2021-02-11T11:47:47.937Z",
      "footer": {
        "icon_url": "https://imgur.com/lBJjI5L.png",
        "text": "ver. 1.0.0"
      },
      "thumbnail": {
        "url": "https://imgur.com/lBJjI5L.png"
      },
      "image": {
        "url": "https://imgur.com/lBJjI5L.png"
      },
      "author": {
        "name": "Masterek",
        "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
      },
      "fields": [
        {
          "name": "🤔",
          "value": "to use this bot try `!help`"
        }
      ]
   };
    channel.send({ embed });
          
        }
        
      }
      
    
    
        

