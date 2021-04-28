const { Collection } = require("discord.js")

require("dotenv").config()

module.exports = {
    token: process.env.TOKEN,
    prefix: "ed.",
    waitingTime: 1000,
    queue: new Collection(),
    serviceAccount: {
        type: "service_account",
        project_id: "masterek-discord-bot",
        private_key_id: process.env.FIREBASE_KEY_ID,
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDDxoYrWbvR1f80\ncf3SSVdVCNmlU05PYsSS9ldN8+EZSnsvRJL7DbUgo8fDypHqd07NsuoP24n0KtUq\nLP41Ys69tZX+R04pU/RMgZqwjpAiKyWu8jjkLTK2p8ZOHiRuP1fwbt/ck7vVhLg0\nDbS3B5Q1PR6A2R2begmwgo1Qh5UCSsjZZAmjff93fc5fEPyQ8w0ZWlh/HuydKJJ2\nHMDkL6hqTNxIq8S3hOL3PzJpmeKEI++PPwfp/I4ZbcFnXY8MgTMjScBJQadC4ytE\n8yNMrXc9a+zNj8YzjB6jy2GDa2/Z0C1CUP2EUCpKz9STWRwXyHxtAmNe2az8UHc8\nB4xZ1cnLAgMBAAECggEAGDSojB2ZKlWiKzLY5jIpORtSBa3qJciZc24/1ySLNVxP\nJMX+wkmslm+JmHyoU+wScz5m0DUdtnHBT2imuaUQ2MXl2L2qPVPjBb6UiLXnvkHF\nc/8A571q4siVrTzu1i7Aybp7tUMS21CAkfcL3AF04qw+5EFz9rA9GHTb0hQhaVns\nYjajgjuS+e8JBYfEGuBoTXbTiSk6S4xRREzfc2VHdauo6/uFIbc7VQIH18HlGVKI\nA0dbURfXkSMNfxVG+JxVTkv/HBaDC0RRl/efxcrzoaC73AX+sZCVHAkeNG/sdC4c\nYGx20/cRLHQRfs6G2HcUR/ZzcnwLmMRSv8qNe7YJGQKBgQDkl2knqjqVhscluAv3\nrhilO7cB2hbOdlVtLpWodm2STgTHmD+ngyj6CmPmU65AXbA/yKNLhQh5GP9QnvOG\nhhEioNyTwA1WhwEKrzC3p+mhOIM5FRst2da/ejvAG9yVCdmy7r1iyhwHlIYyRzAx\nEKjJ4s1MAj5g+5Z3dEehh8f8RwKBgQDbP9S6E1M8RaLBqAmMZpzC/BcAVROiiM7C\nkAef5F4hQ7TGQSMRIOLX02GKpZ1hqVq3pgYnm4qicf1RFy7rrx7HGTYgLiojX35D\n9dv0vr5LNjbpV4gxHh1rJfPGAOhUia59qJFCMIYNbvFE8YSk7DVxC7dul7vNwx9N\nZrehlD28XQKBgGXGkBgL77eBYYuGrTViezCeLLYTXtIf15scAaAW0mQwfmpLfBPe\nDtF87Muw+EVKMV3EvAe0vHgGTC6eBrkfWeO8EVlrScT7qNgT9jHe/eM9IRe6MPay\nJa3tA0teXFCzKQ1ExGeGqwIo+7LJBUjjLPNuGo+79AAEJBMdX4MozD6jAoGBAIMe\nDEDvd7KuzmPT80nkv9EX40WOm3xzJntSmUy0zNpF3GFH6QnASgjaYBYDbzhNiHQV\ntM6RBXqaguyw2Z2XD+fvmt/p28dlv2QzL0SRocnm9TXc5BTDtsIyYzPBrS+JWzHI\n0n3r+O8lruIVMcdTf65IXH2l/mlSTHEEgcL+nWD9AoGAUOsJyt2tC/cC+B06Szep\ndR0Td1CQwM9PW2eHZLyeeB/jwYD02qq8TcAx2bsM+KyVXj41XDlF+T7lQ0L/VGRJ\nX5fnKUhcOFezFoFEm1DQrqklNhp9HlUzjXsaGJ/Xbjm3FiDoX3yWTYVkjaofrAbl\nyQDLp8dMsE4+1M0MssI4V7k=\n-----END PRIVATE KEY-----\n",
        client_email: "firebase-adminsdk-eorhd@masterek-discord-bot.iam.gserviceaccount.com",
        client_id: "107492425903916203744",
        auth_uri: process.env.FIREBASE_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH,
        client_x509_cert_url: process.env.FIREBASE_CLIENT
    }
    
}