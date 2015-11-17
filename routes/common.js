/**
 * Created by hadoop on 2015/6/12.
 */
var express = require('express');
var common = require('../node_modules/ricecenter/busi/common');
var resUtils = require('../node_modules/ricecenter/core/resUtils');

var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
/**
 * 游戏启动上报
 */
router.post('/reportgame',function(req,res,next){
    res.setHeader('Content-Type', 'text/html;charset=utf-8');

    req.on('data', function (data) {
        req.body = eval('(' + data.toString() + ')');
        if (req.body.length > 1e6)
            req.connection.destroy();
        var context = {};

        if (!req.body.uid && typeof(req.body.uid)!="undefined" && req.body.uid!=0) {
            resUtils.endResonse(201, 'uid不能为空', res);
            return;
        }
        context.uid = req.body.uid;
        context.gamekey = req.body.gamekey;
        context.pkgname = req.body.pkgname;
        context.appclientid = req.body.appclientid;
        context.androidid = req.body.androidid;
        common.reportgame(context,res);
    });
});

router.get('/getshareUrl',function(req,res,next){

    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    var appclientid = req.query.appclientid;
    var context = {};
    context.appclientid = appclientid;
    common.getshareUrl(context,res);
});

router.post('/queryunstartgame',function(req,res,next){
    res.setHeader('Content-Type', 'text/html;charset=utf-8');


    req.on('data', function (data) {
        req.body = eval('(' + data.toString() + ')');
        if (req.body.length > 1e6)
            req.connection.destroy();

        var context = {};
        context.platform = req.body.appclientid;
        context.androidid = req.body.androidid;
        context.applist = req.body.applist;
        if(req.body.applist.length < 1)
        {
            endResonse(1,'applist不能为空',res);
            return;
        }
        common.queryunstartgame(context,res);
    });
});

module.exports = router;