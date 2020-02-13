## nodejs 설치

https://nodejs.org/en/

12버전 다운받아 설치하세요.

앞으로 터미널(or PowerShell) 에서 node, npm 명령어를 사용할 수 있습니다. (재부팅 필요할 수 있음)

## Project 초기화

터미널을 열고, cd 명령어를 적절하게 이용해 프로젝트를 생성할 폴더로 가서 다음을 입력합니다. 

(달러는 입력하지 마세요. 커서를 표현한겁니다.)

```bash
$ npm init
```

나오는 명령어에 적절히 입력하시거나 그냥 엔터를 다 때리면, 프로젝트 루트 경로에 package.json 파일이 생깁니다.

```json
{
  "name": "scrap-clien",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/bongjinpark1/scrap-clien.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/bongjinpark1/scrap-clien/issues"
  },
  "homepage": "https://github.com/bongjinpark1/scrap-clien#readme"
}
```

앞으로 이 파일에서 프로젝트에 사용될 각종 라이브러리들(의존성 이라고 부릅니다.)을 관리합니다.

## hello world

프로젝트 루트 경로에 index.js 파일을 생성하고 다음을 입력합니다.

```javascript
console.log('hello world')
```

저장한 뒤, 터미널에서 다음을 입력합니다.

```bash
$ node index.js
```

아래처럼 나올시 성공입니다.

```bash
$ node index.js
hello world
$
```

앞으로 모든 코드는 index.js에 작성하겠습니다.

## Telegram bot 생성

@BotFather 에게 말을겁니다.

/newbot 명령어로 새로운 봇을 생성합니다.

처음에 봇 이름을 물어보는데요, 사용자들에게 보여질 봇 이름을 입력하세요.

예 : 테트리스봇

다음으로 봇의 유저네임을 물어봅니다. unique 해야하고, bot 으로 끝나야 합니다. 영어로 입력하세요.

예 : Tetris_bot, tetrisbot 등등

봇의 액세스 토큰이 나오는데요, 복사해둡니다.

```
1098599162:AAHaMzqII_d4GGoVsuehqQhgKQbgE8eOe7o
```

언제든지 /mybots 명령어로 다시 확인하실 수 있습니다.

## 코드작성

명령어에 응답하는 봇의 코드를 작성해볼게요.

먼저 nodejs 환경에서 텔레그램 봇을 쉽게 구현할 수 있게 해주는 의존성을 설치해야합니다.

터미널을 켜고, 프로젝트 루트 경로에서 다음을 입력합니다.

```bash
$ npm install telegraf
```

package.json 을 보면 다음과같이 의존성이 추가되었습니다.

```javascript
{
  // 생략...
  "dependencies": {
    "telegraf": "^3.36.0"
  }
}
```

이렇게 추가한 의존성들은 프로젝트 루트 경로의 node_modules 폴더 안에 설치됩니다.

앞으로 이 프로젝트 내의 *.js 파일에서 telegraf 모듈을 추가해서 사용할 수 있습니다.

그럼 간단한 코드를 작성합니다.

index.js
```javascript
const Telegraf = require('telegraf') // telegraf 모듈을 Telegraf 라는 이름에 할당합니다.

const bot = new Telegraf('1098599162:AAHaMzqII_d4GGoVsuehqQhgKQbgE8eOe7o') // 아까 받아둔 봇 토큰으로 봇 객체를 생성합니다.

function onStart (context) { // 봇이 start 명령어에 대응하도록 작성한 onStart 함수입니다. 매개변수로 context 를 받습니다.
  context.reply('봇 스타트') // 매개변수로 들어온 context 에는 reply 라는 함수가 등록되어있는데요, 사용자에게 답장을 보낼 수 있습니다.
}

bot.start(onStart) // bot 객체는 start 라는 함수를 가집니다. context 를 배개변수로 받는 함수를 인자로 넣어주면, 봇이 앞으로 start 명령어를 받을 때마다 해당 함수를 실행합니다.

bot.launch() // bot 을 가동합니다.

console.log('봇 작동중...')
```

이제 봇을 실행해봅니다. 터미널에서 다음을 입력하세요.

```bash
$ node index.js
봇 작동중...
```

이제 봇에게 /start 명령을 날릴 때마다, 저장된 메세지를 답장합니다.

봇이 먼저 사용자에게 메세지를 보낼수도있습니다.

단, 사용자가 봇과 대화를 한 적이 한번이라도 있어야 합니다.

그리고 채팅방 id도 알아야하구요.

그럼 채팅방 아이디를 알아보기위해,

onStart 함수를 아래와 같이 수정합니다.

```javascript
function onStart (context) {
  console.log(context.update)
  context.reply('봇 스타트')
}
```

봇을 재 실행한뒤, /start 명령어를 봇에게 입력하면 터미널에 다음과 같이 찍힙니다.

```bash
$ node index.js
봇 작동중...
{
  update_id: 685677425,
  message: {
    message_id: 11,
    from: {
      id: 868759654,
      is_bot: false,
      first_name: '봉진🦆porybong2',
      username: 'porybong2',
      language_code: 'ko'
    },
    chat: {
      id: 868759654, // 이 부분이 중요
      first_name: '봉진🦆porybong2',
      username: 'porybong2',
      type: 'private'
    },
    date: 1581479728,
    text: '/start',
    entities: [ [Object] ]
  }
}
```

로그를 보니 context.message.chat.id 에 채팅방 id 가 입력되어있네요.

그럼 주기적으로 해당 채팅방에 메세지를 쓰도록 해보겠습니다.

index.js 에 다음을 추가합니다.

```javascript
const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram') // telegram 모듈을 Telegram 이라는 이름에 할당합니다.

const bot = new Telegraf('1098599162:AAHaMzqII_d4GGoVsuehqQhgKQbgE8eOe7o')
const telegram = new Telegram('1098599162:AAHaMzqII_d4GGoVsuehqQhgKQbgE8eOe7o') // 봇 토큰으로 텔레그램 객체를 생성하고

function onStart (context) {
  console.log(context.update)
  context.reply('봇 스타트')
}

bot.start(onStart)

function sendMessage () { // 지정된 채팅방 id 로 메세지를 보내는 함수를 작성합니다.
  telegram.sendMessage(868759654, '안녕')
}

const interval = setInterval(sendMessage, 1000 * 10)
// setInterval 이라는 함수는 2개의 인자를 받습니다. 실행할 함수와, 간격(ms 단위)
// setInterval(sendMessage, 1000 * 10) sendMessage 라는 함수를 10000ms(10s) 마다 실행하겠다는 겁니다.

bot.launch()

console.log('봇 작동중...')
```

봇을 재시작하면 10초마다 저에게 말을 겁니다!

이제 웹 스크래퍼를 만들어볼텐데요, 먼저 클리앙의 html 구조를 파악해야합니다.

```html
<div class="list_content">
  <div class="list_item symph_row" data-role="list-row" data-author-id=dberror data-board-sn=14582434 data-comment-count=6>
    <span class="list_stare" style="display: none;" data-role="observeIcon">
      <i class="fa fa-eye"></i>
    </span>
    <div class="list_symph view_symph" data-role="list-like-count">
      <span>0</span>
    </div>

    <div class="list_title" data-role="list-title" data-toggle-custom="dropdown">
      <a class="list_subject" href="/service/board/cm_app/14582434?od=T31&po=0&category=&groupCd=" data-role="cut-string">
        <span class="category fixed" title="질문">질문</span>
        <span class="subject_fixed" data-role="list-title-text" title="아수스 크롬북 태블릿 CT100 개발용으로 사용해보신 분 계실까요?">아수스 크롬북 태블릿 CT100 개발용으로 사용해보신 분 계실까요?</span>
      </a>
      <a class="list_reply reply_symph"
        href="/service/board/cm_app/14582434?od=T31&po=0&category=&groupCd=#comment-point"
        data-role="ele-after" title="댓글6개">
        <span class="rSymph05">6</span>
        <strong class="color_red" data-role="observeCmCount"></strong>
        <strong class="color_red" data-role="recentCmCount"></strong>
      </a>
    </div>
    <div class="list_author" data-role="list-author">
      <span class="memo none" data-role="list_memo"></span>
      <span class="nickname">
        <span>애꾸눈팬더</span>
      </span>
    </div>

    <div class="list_hit">
      <span class="hit">154</span>
    </div>

    <div class="list_time">
      <span class="time popover">
        02-11
        <span class="timestamp">2020-02-11 22:50:38</span>
      </span>
    </div>
  </div>
  <!-- 생략 -->
</div>
```

개발한당의 html일부인데요, list_content 라는 클래스명의 div 안에 게시글 div 가 여러개 중첩된 형태입니다.

글 제목은 div.list_content > div.list_item > div.list_title > a.list_subject > span.subject_fixed 의 title 속성 값을 보면 되구요,

링크의 경우, div.list_content > div.list_item > div.list_title > a.list_subject 의 href 속성 값에 저장이 되어있습니다.

그리고 글을 구분할 수 있는 유니크한 시리얼 넘버가 div.list_content > div.list_item 의 data-board-sn 에 저장되어있네요.

이제 봇이 주기적으로 개발한당의 글클 스크랩해서, 제목과 링크를 사용자에게 전달하도록 해보겠습니다.

두가지 의존성을 더 설치해야합니다.

```bash
$ npm install cheerio axios
```

axios 를 이용해 클리앙에 접속할것이구요, 그렇게 받아온 데이터를 cheerio 를 이용해 순회하여 목표 달성을 할 것입니다.

index.js 에 sendMessage 를 scrap 이라는 함수로 대체합니다.

```javascript
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
```

이제 1분마다 모공글(개발한당에 글리젠이 적어서 모공으로 급변경)을 스크랩해서 저한테 보내줍니다 ㅎ

루팡하다 시간이 없어서 급마무리..

https://telegraf.js.org/#/ telegraf 모듈 설명서

https://www.npmjs.com/package/cheerio cheerio 모듈 설명서