var JSSoup = require('jssoup').default;
const SlackBot = require('slackbots');
const axios = require('axios');
const token = require('./token');

var LastStrip = '';

const getHTML =  () => {
  try {
    return  axios.get('http://www.commitstrip.com/fr/')
  } catch (error) {
    console.error(error)
  }
}

const getLastStrip =  () => {
  return  new Promise((resolve, reject) => { 
    getHTML().then( response => {
    var soup = new JSSoup(response.data);
    var tag = soup.findAll('div','excerpt')
    const url = tag[0].nextElement.nextElement.nextElement.attrs.href
    resolve(url);
  });
  });

}

function isNewStrip(){
  console.log('tic')
  getLastStrip().then( value => {
    if (value !== LastStrip) {
      LastStrip = value;
      console.log(LastStrip)
      bot.postMessageToChannel(
        'troll',
        value
      ); 
    }
  })
}
  
const bot = new SlackBot({
  token: token.token,
  name: 'CommitStripBot'
});

// Start
bot.on('start', () => {
  isNewStrip();
  var i = setInterval(function(){
    isNewStrip();
}, 3600000);
});

// Error
bot.on('error', err => console.log(err));

// Help
function runHelp() {
  const params = {
    icon_emoji: ':question:'
  };

  bot.postMessageToChannel(
    'troll',
    params
  );
}
