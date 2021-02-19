const { MessageEmbed } = require('discord.js');
const JikanNode = require('jikan-node');
const Jikan = require('jikan-node');
const mal = new Jikan();

module.exports = {
    name: "mal",
    description: "anime",
    args: true,
    usage: "<osu.nick>",
    example: "GrabcioPL",
    async run(msg,args){
        mal.findAnime('Nisemonogatari', 'episodes', 1)
        .then(info => console.log(info))
        .catch(err => console.log(err));
    }

}
