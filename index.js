var request = require("request");
var JSSoup = require('jssoup').default;
const SlackBot = require('slackbots');
const axios = require('axios');


request({
  uri: "http://www.commitstrip.com/fr/",
}, function(error, response, body) {
  //console.log(body);
  var soup = new JSSoup(body);

  var tag = soup.findAll('div','excerpt')
  const url = tag[0].nextElement.nextElement.nextElement.attrs.href
    console.log(url)
});

const bot = new SlackBot({
  token: '',
  name: 'commitStripot'
});

// Start
bot.on('start', () => {
  const params = {
    icon_emoji: ':smiley:'
  };

  bot.postMessageToChannel(
    'general',
    'Last commitStrip : ',
    params
  );
});

// Error
bot.on('error', err => console.log(err));

