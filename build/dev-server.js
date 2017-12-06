require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var cookieParser = require('cookie-parser') // cookie读取

// 数据库操作
// 连接
var mysql = require('mysql')
var connection

function handleError() {
  connection = mysql.createConnection({
    host: 'localhost', // ip，域名
    user: 'root', // 用户名root用户
    password: 'root', // 密码
    database: 'home', // 数据库名
    multipleStatements: true // 多语句查询
  })

  //连接错误，2秒重试
  connection.connect(function (err) {
    if (err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleError, 2000);
    }
  });
  connection.on('error', function (err) {
    console.log('db error', err);
    // 如果是连接断开，自动重新连接
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleError();
    } else {
      throw err;
    }
  });
}
handleError();

var waterfall = require('async/waterfall') // async执行模块，上一函数执行结束后开始下一函数
var bodyParser = require('body-parser');
// 接口
var app = express()
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: false
}))
var apiRoutes = express.Router()
var seconds = 724606010; // 一星期的秒数

function mySqlErr(err, res) {
  if (err) {
    // 数据库错误的回调函数
    console.log('[SELECT ERROR] - ', err.message);
    res.json({
      code: 1,
      message: 'error'
    });
    return;
  }
}
// home  router => /  data => /api/home
var appData_home = require('../home.json')
apiRoutes.get('/home', function (req, res) {
  var addSql_home = 'select * from article order by a_CreatTime desc';
  connection.query(addSql_home, function (err, result) {
    mySqlErr(err, res);
    var data = [];
    for (var i = 0; i < result.length; i++) {
      data[i] = {
        id: result[i].a_ID,
        title: result[i].a_Title,
        content: result[i].a_Content,
        sort: result[i].a_Sort,
        author: result[i].a_AuthorName,
        time: result[i].a_CreatTime,
        byself: result[i].a_BySelf,
        href: result[i].a_Href
      };
    }
    res.json({
      code: 0,
      message: "success",
      data: data
    })
  });
})

// home  router => /  data => /api/plan
apiRoutes.get('/plan', function (req, res) {
  // connection.connect();
  var searchPlan = []; // plan
  var searchSub = []; //subject all
  // 分页查询
  if (req.query.type === 'all') {
    var selectPlan_search = 'select * from project order by p_ID limit ' + req.query.p1 * req.query.p2 + ',' + req.query.p2;
  } else if (req.query.type === 'week') {
    var selectPlan_search = 'select * from project where p_type = "week" order by p_ID limit ' + req.query.p1 * req.query.p2 + ',' + req.query.p2;
  } else if (req.query.type === 'month') {
    var selectPlan_search = 'select * from project where p_type = "month" order by p_ID limit ' + req.query.p1 * req.query.p2 + ',' + req.query.p2;
  }
  waterfall([
    function (callback) {
      connection.query(selectPlan_search, function (err, result) {
        mySqlErr(err, res);
        for (var i = 0; i < result.length; i++) {
          searchPlan[i] = {
            id: result[i].p_ID,
            title: result[i].p_Title,
            startTime: result[i].p_StartTime,
            endTime: result[i].p_EndTime,
            type: result[i].p_type,
            description: result[i].p_Description
          };
        }
        callback(err, result);
      });
    },
    function (result_p, callback) {
      for (var i = 0; i < result_p.length; i++) {
        var searchSql_subject = 'select * from subject where ps_ProjectID = ' + result_p[i].p_ID;
        connection.query(searchSql_subject, function (err, result_s) {
          var searchSubject = []; // subject one
          for (var j = 0; j < result_s.length; j++) {
            searchSubject[j] = {
              content: result_s[j].s_Content,
              difficulty: result_s[j].s_Difficulty,
              status: result_s[j].s_Finish,
              id: result_s[j].s_ID
            };
          }
          searchSub.push(searchSubject);
          // 当数组组合完毕时返回结果给回调函数
          if (result_p.length === searchSub.length) {
            callback(err, searchSub);
          }
        })
      }
    }
  ], function (err, results) {
    for (var i = 0; i < searchPlan.length; i++) {
      searchPlan[i].plan = results[i];
    }
    res.json({
      code: 0,
      message: "success",
      content: {
        num: searchPlan.length,
        content: searchPlan
      }
    })
    // connection.end();
  });
})
// 添加
apiRoutes.post('/plan/add', function (req, res) {
  // connection.connect()
  var addSql_plan = 'INSERT INTO project(p_Description,p_type,p_Title,p_StartTime,p_EndTime) VALUES(?,?,?,?,?)';
  var reqB = req.body;
  var time_1 = new Date(reqB.startTime);
  var time_2 = new Date(reqB.startTime);
  if (reqB.type === 'week') {
    time_2.setDate(time_2.getDate() + 6);
  } else if (reqB.type === 'month') {
    time_2.setMonth(time_2.getMonth() + 1);
    time_2.setDate(time_2.getDate() - 1);
  }

  var addSql_planParams = [reqB.description, reqB.type, reqB.title, time_1, time_2];
  connection.query(addSql_plan, addSql_planParams, function (err, result) {
    mySqlErr(err, res);
    res.json({
      code: 0,
      message: "success"
    })
  });
  // 查询刚刚添加的plan的ID
  connection.query('select * from project order by p_ID desc limit 1', function (err, resu) {
    mySqlErr(err, res);
    var addSql_subject = 'INSERT INTO subject(ps_ProjectID,s_Content,s_EndTime,s_Finish,s_Difficulty) VALUES(?,?,?,?,?)';
    for (var item of JSON.parse(reqB.plan)) {
      var addSql_subjectParams = [resu[0].p_ID, item.content, null, 'false', item.difficulty];
      connection.query(addSql_subject, addSql_subjectParams, function (err, result) {
        // connection.end();
        mySqlErr(err, res);
      });
    }
  });
})

apiRoutes.get('/plan/delete', function (req, res) {
  // connection.connect() 
  console.log(req.query);
  var deleSql_plan = 'delete from project where p_ID =' + req.query.id + '; delete from subject where ps_ProjectID =' + req.query.id;
  connection.query(deleSql_plan, function (err, resu) {
    mySqlErr(err, res);
    res.json({
      code: 0,
      message: "success"
    });
    // connection.end();
  })
});

// 文章

apiRoutes.get('/article/sort', function (req, res) {
  connection.query('select distinct a_Sort from article where a_BySelf = "'+req.query.byself+'"', function (err, result) {
    mySqlErr(err, res);
    var data = [];
    for(var i = 0;i<result.length;i++){
      data[i] = result[i].a_Sort;
    }
    res.json({
      code: 0,
      message: "success",
      data: data
    })
  })
});

apiRoutes.get('/article', function (req, res) {
  var resdata = req.query;
  var str_1 = '';
  var str_2 = '';
  if (resdata.byself) {
    str_2 = ' where a_BySelf = "' + resdata.byself + '"';
    if (resdata.sort) {
      str_1 = ' and a_Sort = "' + resdata.sort + '"';
    }
  } else {
    if (resdata.sort) {
      str_1 = ' where a_Sort = "' + resdata.sort + '"';
    }
  }


  var addSql_art = 'select * from article ' + str_2 + str_1 + ' order by a_CreatTime desc';
  connection.query(addSql_art, function (err, result) {
    mySqlErr(err, res);
    var data = [];
    for (var i = 0; i < result.length; i++) {
      data[i] = {
        id: result[i].a_ID,
        title: result[i].a_Title,
        content: result[i].a_Content,
        sort: result[i].a_Sort,
        author: result[i].a_AuthorName,
        time: result[i].a_CreatTime,
        byself: result[i].a_BySelf,
        href: result[i].a_Href
      };
    }
    res.json({
      code: 0,
      message: "success",
      data: data
    })
  });
})

apiRoutes.post('/article/add', function (req, res) {
  var reqB = req.body;
  console.log(reqB);
  var addSql_art = 'INSERT INTO article(a_Title,a_Content,a_Sort,a_AuthorName,a_CreatTime,a_BySelf,a_Href) VALUES(?,?,?,?,?,?,?)';
  var date = new Date(reqB.date);
  var article = JSON.parse(reqB.article);
  var addSql_artParams = [article.title, reqB.content, article.sort, article.author, date, reqB.byself, article.href];
  connection.query(addSql_art, addSql_artParams, function (err, result) {
    mySqlErr(err, res);
    res.json({
      code: 0,
      message: "success"
    })
  });
})

apiRoutes.get('/article/delete', function (req, res) {
  // connection.connect() 
  console.log(req.query);
  var deleSql_article = 'delete from article where a_ID =' + req.query.id;
  connection.query(deleSql_article, function (err, resu) {
    mySqlErr(err, res);
    res.json({
      code: 0,
      message: "success"
    });
    // connection.end();
  })
});

// 留言
apiRoutes.get('/message', function (req, res) {
  var Sql_mes = 'select * from message';
  connection.query(Sql_mes, function (err, result) {
    mySqlErr(err, res);
    var data = [];
    var j = 0;
    for (var i = result.length - 1; i >= 0; i--) {
      data[j] = {
        id: result[i].m_ID,
        content: result[i].m_Content,
        time: result[i].m_Time
      }
      j++;
    }
    res.json({
      code: 0,
      message: "success",
      data: data
    })
  });
})
apiRoutes.get('/message/add', function (req, res) {
  var reqB = req.query;
  console.log(reqB);
  var addSql_mes = 'INSERT INTO message(m_Content,m_Time) VALUES(?,?)';
  var date = new Date(reqB.date);
  var addSql_mesParams = [reqB.content, date];
  connection.query(addSql_mes, addSql_mesParams, function (err, result) {
    mySqlErr(err, res);
    res.json({
      code: 0,
      message: "success"
    })
  });
})

// 评论
apiRoutes.get('/review', function (req, res) {
  // connection.connect();
  var review_search = 'select * from review where ar_ArticleID = ' + req.query.articleid;
  var article = {};
  var review = [];
  var reReview = [];
  // 分页查询
  waterfall([
    function (callback) {
      connection.query('select * from article where a_ID = ' + req.query.articleid, function (err, result) {
        mySqlErr(err, res);
        article = {
          id: result[0].a_ID,
          title: result[0].a_Title,
          content: result[0].a_Content,
          sort: result[0].a_Sort,
          author: result[0].a_AuthorName,
          time: result[0].a_CreatTime,
          byself: result[0].a_BySelf,
          href: result[0].a_Href
        };
        callback(err);
      });
    },
    function (callback) {
      connection.query(review_search, function (err, result) {
        mySqlErr(err, res);
        if (result[0]) {
          for (var i = 0; i < result.length; i++) {
            review[i] = {
              artId: result[i].ar_ArticleID,
              id: result[i].r_ID,
              content: result[i].r_Content,
              time: result[i].r_Time,
            };
          }
        }
        callback(err, result);
      });
    },
    function (result_p, callback) {
      if (result_p[0]) {
        for (var i = 0; i < result_p.length; i++) {
          var searchSql_rereview = 'select * from rereview where rre_ReviewID = ' + result_p[i].r_ID;
          connection.query(searchSql_rereview, function (err, result_s) {
            var searchReplay = []; // subject one
            for (var j = 0; j < result_s.length; j++) {
              searchReplay[j] = {
                content: result_s[j].re_Content,
                id: result_s[j].re_ID,
                reID: result_s[j].rre_ReviewID,
                time: result_s[j].re_Time
              };
            }
            reReview.push(searchReplay);
            // 当数组组合完毕时返回结果给回调函数
            if (result_p.length === reReview.length) {
              callback(err, reReview);
            }
          })
        }
      } else {
        callback(null, 'no')
      }
    }
  ], function (err, results) {
    if (results !== 'no') {
      for (var i = 0; i < review.length; i++) {
        review[i].replay = results[i];
      }
    }
    res.json({
      code: 0,
      message: "success",
      article: article,
      content: review
    })
  });
})

apiRoutes.get('/review/add', function (req, res) {
  var reqB = req.query;
  console.log(reqB);
  var addSql_rev = 'INSERT INTO review(ar_ArticleID,r_Content,r_Time) VALUES(?,?,?);select * from review order by r_ID desc limit 1';
  var date = new Date(reqB.date);
  var addSql_revParams = [reqB.articleid, reqB.content, date];
  connection.query(addSql_rev, addSql_revParams, function (err, result) {
    mySqlErr(err, res);
    res.json({
      code: 0,
      message: "success",
      id: result[1][0].r_ID
    })
  });
})

apiRoutes.get('/replay/add', function (req, res) {
  var reqB = req.query;
  console.log(reqB);
  var addSql_rev = 'INSERT INTO rereview(rre_ReviewID,re_Content,re_Time) VALUES(?,?,?)';
  var date = new Date(reqB.date);
  var addSql_revParams = [reqB.reviewid, reqB.content, date];
  connection.query(addSql_rev, addSql_revParams, function (err, result) {
    mySqlErr(err, res);
    res.json({
      code: 0,
      message: "success"
    })
  });
})

// 登录
// 是否还在登录期内（7天内不用再次登录）
apiRoutes.post('/login/status', function (req, res) {
  if (req.cookies && req.cookies.passwordSta === 'true') {
    res.json({
      code: 0,
      message: "log in"
    });
  } else {
    res.json({
      code: 1,
      message: "log in is error"
    });
  }
})

// 退出登录
apiRoutes.post('/login/out', function (req, res) {
  res.clearCookie('passwordSta');
  res.json({
    code: 0,
    message: "log out"
  });
})

// 登录验证
apiRoutes.post('/login', function (req, res) {
  // connection.connect() 
  var sql_logo = 'select * from admin';
  connection.query(sql_logo, function (err, result) {
    // 0 成功 101密码错误 1数据库查询错误
    mySqlErr(err, res);
    // 密码验证
    if (result[0].c_Password === req.body.password) {
      var date_cookie = new Date();
      date_cookie = date_cookie.setDate(date_cookie.getDate() + 7);
      res.cookie('passwordSta', 'true', {
        maxAge: seconds
      });
      res.json({
        code: 0,
        message: "log in sucess"
      });
      // connection.end();
    } else {
      res.json({
        code: 101,
        message: "log in error"
      });
    }
  });
})

// connection.end(); // 关闭数据库
// 绑定接口都在 api/下，端口为6666，代理在8888端口
app.use('/api', apiRoutes)
app.listen(6666)

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({
      action: 'reload'
    })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {
      target: options
    }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
