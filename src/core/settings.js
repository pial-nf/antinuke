const prefix = process.env.prefix || '?'
const status = `${prefix}help`;


module.exports = {
  bot: {
    info: {
      prefix: process.env.prefix || '?',
      token: process.env.token "MTMzNDg1Nzc1OTYxNDU3MDUxOA.GwSDYi.3_uAtodI6vbNJgnu4Cp7okKU0xd9vyYs2Ncsmw", 
      invLink: 'https://discord.gg/YAqrQKS5qu',
    },
    options: {
      founders: ['713758139425751150'],
      privateMode: false,
    },
    presence: {
      name: process.env.statusText || status,
      type: 'STREAMING',
      url: 'https://twitch.tv/pewdiepie'
    },
    credits: {
      developerId: '891214041391988757',
      developer: 'pialmallik263',
      sourceCode: 'https://github.com/sxlitude/antinuke',
      supportServer: 'https://discord.gg/YAqrQKS5qu'
    }
  }
}
