var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();

app.get('/', function (req, res, next) {
  superagent.get('http://m.byr.cn/board/JobInfo')
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      var $ = cheerio.load(sres.text);
      var items = [];
      var wrap = $('#m_main ul li a');
      console.log(wrap[0]);
      for (var i = 0; i < wrap.length; i++) {
        // console.log(wrap[i]);
        items.push({
          
          content:wrap[i].children[0].data,
          href:"http://m.byr.cn/board/JobInfo"+wrap[i].attribs.href
        })
      };
      

      res.send(items);
    });
});


app.listen(3000, function () {
  console.log('app is listening at port 3000');
});
