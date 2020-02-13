const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')
const axios = require('axios')
const cheerio = require('cheerio')

const bot = new Telegraf('1098599162:AAHaMzqII_d4GGoVsuehqQhgKQbgE8eOe7o')
const telegram = new Telegram('1098599162:AAHaMzqII_d4GGoVsuehqQhgKQbgE8eOe7o')

function onStart (context) {
  console.log(context.update)
  context.reply('봇 스타트')
}

bot.start(onStart)

let lastSn = null

async function scrap () {
  const response = await axios.get('https://www.clien.net/service/board/park')
  const $ = cheerio.load(response.data)

  const contents = []

  $('div.list_content')
    .find('div.list_item')
    .each(function (index, element) {
      const key = $(element)
        .data('board-sn')

      const href = $(element)
        .find('div.list_title')
        .find('a.list_subject')
        .attr('href')

      const content = {
        key: key,
        href: href
      }

      contents.push(content)
    })

  contents
    .reverse()
    .forEach(function (content) {
      if (lastSn === null || lastSn < content.key) {
        lastSn = content.key

        const message = 'https://www.clien.net' + content.href

        telegram.sendMessage(868759654, message)
      }
    })
}

const interval = setInterval(scrap, 1000 * 60)

bot.launch()

console.log('봇 작동중...')