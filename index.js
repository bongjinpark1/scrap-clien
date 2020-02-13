const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')
const axios = require('axios') // axios 의존성 추가
const cheerio = require('cheerio') // cheerio 의존성 추가

const bot = new Telegraf('1098599162:AAHaMzqII_d4GGoVsuehqQhgKQbgE8eOe7o')
const telegram = new Telegram('1098599162:AAHaMzqII_d4GGoVsuehqQhgKQbgE8eOe7o')

function onStart (context) {
  console.log(context.update)
  context.reply('봇 스타트')
}

bot.start(onStart)

let lastSn = null // 마지막으로 보낸 시리얼을 저장하기 위한 변수

async function scrap () { // 비동기 함수 (async function)
  const response = await axios.get('https://www.clien.net/service/board/park') // 모공 페이지를 다운로드 받을때까지 기다립니다 (await)
  const $ = cheerio.load(response.data) // 다운로드 받은 데이터로 html 구조 모델링

  const contents = [] // html을 파싱해서 저장할 배열을 하나 초기화 하구요

  $('div.list_content')
    .find('div.list_item') // div.list_content > div.list_itme 을
    .each(function (index, element) { // 순회하면서
      const key = $(element)
        .data('board-sn') // key(serialNo)

      const href = $(element)
        .find('div.list_title')
        .find('a.list_subject')
        .attr('href') // 링크

      const content = {
        key: key,
        href: href
      }

      contents.push(content) // key 와 href 를 배열에 담습니다

      /*
        contents = [
          {
            key: 30,
            href: '/service/park/...'
          },
          {
            key: 29,
            href: '/service/park/...'
          },
          ...
        ]
      */
    })

  contents
    .reverse() // 배열을 뒤집어 주는 이유는, 맨 앞에 높은 숫자의 시리얼이 오기때문입니다.
    .forEach(function (content) { // 순회하면서
      if (lastSn === null || lastSn < content.key) { // 가장 마지막으로 보낸 게시글의 시리얼이, 현재 게시글의 시리얼 보다 작다면
        lastSn = content.key // 가장 마지막으로 보낸 게시글의 시리얼을 현재 시리얼로 대체하고

        const message = 'https://www.clien.net' + content.href // 주소를

        telegram.sendMessage(868759654, message) // 푸시합니다.
      }
    })
}

const interval = setInterval(scrap, 1000 * 60) // 1분마다 반복

bot.launch()

console.log('봇 작동중...')