var FB = require('fb');
var async = require('async')
var fs = require('fs')
var accessToken = ``;
FB.setAccessToken(accessToken);

// object xxxxxxxxx/comments
FB.api('00000000000/comments', 'GET', {
  "limit": 500
}, function(res) {
  if (!res || res.error) {
    console.log(!res ? 'error occurred' : res.error);
    return;
  }
  res = JSON.stringify(res);
  let json = JSON.parse(res)
  let data = "";
  let p1 = new Promise((resolve, reject) => {
    async.eachSeries(json.data, (row, callback) => {
      console.log(row.message);
      data = data + row.message + "\r\n"
      setTimeout(function() {
        callback()
      }, 100);

    }, function() {
      resolve(data)
    });
  });
  p1.then((data) => {
    fs.writeFile("data.txt", '\ufeff' + data, {
      encoding: 'utf8'
    }, function(err) {
      if (err) throw err;
      console.log("SAVE!!");
    });
  })
});
