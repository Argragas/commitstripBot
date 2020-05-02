var JSSoup = require('jssoup').default;

const SlackBot = require('slackbots');
const token = require('./token');

const Discord = require('discord.js')


const axios = require('axios');
const fs = require('fs');

// apps connection

// DISCORD
const botDiscord = new Discord.Client();
botDiscord.login(token.tokenDiscord);

botDiscord.on('ready', function () {
  console.log('discord connection ok ')
});

// SLACK

const botSlack = new SlackBot({
  token: token.tokenSlack,
  name: 'CommitStripBot'
});

botSlack.on('start', () => {
  console.log('slack connection ok ')
});

botSlack.on('error', err => console.log(err));

// SCRAP
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
  readFile()
  getLastStrip().then( value => {
    if (value !== LastStrip) {
      LastStrip = value;
      writeFile(LastStrip);
      console.log(LastStrip)
      // slack msg
      botSlack.postMessageToChannel(
        'troll',
        value
      );
      // discord msg
      msgToDiscord(value);
    }
  })
}
  



// DISCORD

function msgToDiscord(url) {
  const trollChannel = botDiscord.channels.cache.find(channel => channel.name === 'troll');
  trollChannel.send(url);
}

// UTILS

function writeFile(text) {
  fs.writeFile('lastCommit', text, 'utf8',function(err) {
    if (err) throw err;
    console.log('writing new url complete');
    });
}

function readFile() {
  fs.readFile('lastCommit', 'utf8', function readFileCallback(err, data){
      if (err){
          console.log(err);
      } else {
      LastStrip = data;
  }});
}

// main 

isNewStrip();
var i = setInterval(function(){
  isNewStrip();
}, 3600000);
