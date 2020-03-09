var request = require("request");
var JSSoup = require('jssoup').default;


request({
  uri: "http://www.commitstrip.com/fr/",
}, function(error, response, body) {
  //console.log(body);
  var soup = new JSSoup(body);

  var tagg = soup.findAll('div','excerpt')
console.log(tagg[0].nextElement.nextElement._text)
/* for (const elt in tagg) {
    if (elt.name === 'section') {
        console.log(elt);
   }
} */
  

});
