const firebase = require('firebase')
const {
  prefix
} = require(__dirname + "/../config/config.js")
var admin = require("firebase-admin");

module.exports = {
  name: "prefix",
  category: "other",
  description: "Set prefix of current guild!",
  guildOnly: true,
  async run(msg, args) {
    const {
      guild,
      channel
    } = msg
    const addDocumentDataBase = (db, dbName, docID, data) => {
      return db.collection(dbName).doc(docID).set(data)
        .then(() => {
          console.log(`Document: ${docID}\nAdded to ${dbName}\nfields: ${data.toString()}`)
          channel.send(`PREFIX updated to: \`${prefixArg}\``)
        }).catch(error => {
          channel.send("Failed to updating prefix! Try again later!")
          throw new Error(`Failed to updating document: ${guild.id}, ${error.message} `)
        })
    }
    const updateDocFieldPrefix = (db, dbName, docID, fieldValue) => {
      return db.collection(dbName).doc(docID).update({
          prefix: fieldValue
        })
        .then(() => {
          console.log(`Update field: PREFIX\nin document: ${docID}\nin db: ${dbName}\nwith value: "${fieldValue}"`)
          channel.send(`PREFIX updated to: \`${prefixArg}\``)
        }).catch(error => {
          channel.send("Failed to updating prefix! Try again later!")
          throw new Error(`Failed to updating document: ${guild.id}, ${error.message} `)
        })
    }
    let db = admin.firestore()
    const dbName = "guilds"
    if (!args.length) {
      let PREFIX = await db.collection(dbName).doc(guild.id).get()
        .then(doc => {
          if (doc.exists) {
            if (doc.data().prefix) {
              return doc.data().prefix
            } else {
              return prefix
            }
          }
          return prefix
        })
        .catch(() => {
          return channel.send(`My **PREFIX** on this guild:${guild.name}is equal: \`${prefix}\``)
        })
      return channel.send(`My **PREFIX** on this guild: \`${PREFIX}\``)
    }
    if (args[0] === "default") {
      updateDocFieldPrefix(db, dbname, guild.id,"")
    }
    let prefixArg = args[0]
    db.collection(dbName).doc(guild.id).get()
      .then(doc => {
        if (!doc.exists) {
          const data = {
            prefix: prefixArg
          }
          return addDocumentDataBase(db, dbName, guild.id, data)
        }
        return updateDocFieldPrefix(db, dbName, guild.id, prefixArg)
      })
      .catch(error => {
        channel.send("Failed to connecting to db! Try again later!")
        throw new Error(`failed to getting document: ${guild.id}, ${error.message}`)
      })
  }
}