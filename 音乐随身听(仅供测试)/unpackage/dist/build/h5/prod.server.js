var express = require('express')
var compression = require('compression')
var axios = require('axios')
// const bodyParser = require('body-parser')



var app = express()

app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods","POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.sendStatus(200);  //让options尝试请求快速结束
  else
    next();
})

const comm = {
  "g_tk": 5381,
  "format": 'json',
  "platform": 'h5',
  "needNewCode": 1,
  "notice": 0,
  "uin": 0,
  "inCharset": "utf-8",
  "outCharset": "utf-8"
}
const option = {
  g_tk: 5381,
  loginUin: 0,
  hostUin: 0,
  format: 'json',
  inCharset: 'utf8',
  outCharset: 'utf-8',
  notice: 0,
  platform: 'yqq.json',
  needNewCode: 0
}
var apiRoutes = express.Router();

/**
 * 轮播
 * @return [{picUrl: 图片,type: 类型,albummid: 歌曲id}]
 * @getCarouselList
 */
apiRoutes.get('/getCarouselList', function (req, res) {

  var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
  var dataChild =  {
    comm,
    focus: {
      module: "QQMusic.MusichallServer",
      method: "GetFocus",
      param: {}
    }
  }
  dataChild = JSON.stringify(dataChild)
  var data = {
    "-": "recom" + (Math.random() + "").replace("0.", ""),
    data:dataChild
  }
  data = Object.assign({}, option, data);
  axios.get(url, {
    headers: {
      'Referer': 'https://y.qq.com',
      'Origin': 'https://y.qq.com',
    },
    params: data,

  }).then(function(response) {
    res.json(response.data)
  }).catch(function(e){

    console.log(e)
    // console.log(res)
  })
});
/**
 * 推荐歌曲
 * @param {sin:开始位置，end:结束位置}
 * @return [{imgurl: 图片,dissname: 名称,listenNum: 歌曲播放数量，dissid:歌曲id}]
 * @getRecommendList
 */
apiRoutes.get('/getRecommendList', function (req, res) {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  const data = Object.assign({},comm,{
    platform:'yqq',
    picmid:1,
    hostUin:0,
    loginUin:0,
    sin:req.query.sin ? req.query.sin :0 ,//歌曲开始位置
    ein:req.query.end ? req.query.end :60,//歌曲结束位置
    sortId:5,
    needNewCode:0,
    categoryId:10000000,
    rnd:Math.random(),
    format:'json'
  });
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: data
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
});
/**
 * 获取推荐歌曲详细列表
 * @param {dissid:歌曲id}
 * @return songlist:[]
 * @getRecommendDetailList
 */
apiRoutes.get('/getRecommendDetailList', function (req, res) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  var data = {
    "disstid":req.query.dissid,
    "type" : 1,
    "json" : 1,
    "utf8" : 1,
    "onlysong" : 0,
    "platform" : "yqq",
    "g_tk" : 1928093487,
    "format" : "jsonp"
  };
  data = Object.assign({}, option, data);
  axios.get(url, {
    headers: {
      'referer':'https://c.y.qq.com/',
      'host':'c.y.qq.com'
    },
    params: data
  }).then((response) => {
      //处理jsonp格式;
      var data = response.data;
      const reg = /^\w+\(({.+})\)$/;
      const matches = data.match(reg);
      const output = JSON.parse(matches[1]);

      res.json(output.cdlist[0])

  }).catch((e) => {
    console.log(e)
  })
});
apiRoutes.get('/getRankList', function (req, res) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';

  var data = {
    uin: 0,
    needNewCode: 1,
    platform: 'h5',
    g_tk: 1928093487,
  };
  data = Object.assign({}, option, data);
  axios.get(url, {
    headers: {
      'referer':'https://c.y.qq.com/',
      'host':'c.y.qq.com'
    },
    params: data
  }).then((response) => {
      res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
});
//
// app.post('/api/getSongUrl', bodyParser.json(), function (req, res) {
//   const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
//   axios.post(url, req.body, {
//     headers: {
//       referer: 'https://y.qq.com/',
//       origin: 'https://y.qq.com',
//       'Content-type': 'application/x-www-form-urlencoded'
//     }
//   }).then((response) => {
//     res.json(response.data)
//   }).catch((e) => {
//     console.log(e)
//   })
// })
// app.get('/api/getLyric',function (req,res) {
//   var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
//   axios.get(url,{
//     headers:{
//       referer:'https://c.y.qq.com/',
//       host:'c.y.qq.com'
//     },
//     params:req.query
//   }).then((response)=>{
//     var ret = response.data;
//     if(typeof ret === 'string'){
//       var reg = /^\w+\(({.+})\)$/;
//       var mathes = ret.match(reg);
//       if(mathes){
//         ret = JSON.parse(mathes[1])
//       }
//     }
//     res.json(ret)
//   }).catch((err)=>{
//     console.log(err)
//   })
// })

app.use('/api', apiRoutes)

app.use(compression())

app.use(express.static('./music'))

module.exports = app.listen(8080, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('服务器已启动:http://192.168.31.216:8080')
})
