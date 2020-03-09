var request = require("request");
var JSSoup = require('jssoup').default;


request({
  uri: "http://www.commitstrip.com/fr/",
}, function(error, response, body) {
  //console.log(body);
  var soup = new JSSoup(body);

  var tag = soup.findAll('div','excerpt')
  const url = tag[0].nextElement.nextElement.nextElement.attrs.href
    console.log(url)

  

});
