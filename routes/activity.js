/**
 * Created by hadoop on 2015/6/17.
 */
var express = require('express');
var common = require('../node_modules/ricecenter/busi/common');
var activity = require('../node_modules/ricecenter/busi/activity');
var resUtils = require('../node_modules/ricecenter/core/resUtils');

var router = express.Router();
var endResonse = resUtils.endResonse;
var returnjsondata = resUtils.returnjsondata;

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


/**
 * 转盘抽奖
 */
router.get('/lottery',function(req,res,next){
    res.setHeader('Content-Type', 'text/html;charset=utf-8');

    var uid = req.query.uid;
    var appclientid = req.query.appclientid;

    if (!uid || typeof(uid)=="undefined" || uid==0) {
        uid = '';
    }

    common.getuserinfo(req,res,function(userinfo){
        //转盘必须要登录，如果userinfo为空返回
        if(!userinfo)
        {
            endResonse('1','用户需登录',res);
        }
        var context = {};
        context.userinfo = userinfo;
        context.platform = appclientid;
        activity.lottery(context,res);
    });
});

router.get('/getLotteryNum',function(req,res,next){
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    common.getuserinfobyph(req,res,function(userinfo){
        var context = {};
        context.userinfo = userinfo;
        context.platform = req.query.appclientid;
        activity.getLotteryNum(context,res);
    })
});

router.get('/getAwardRecord',function(req,res,next){
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    var context = {};
    context.platform = req.query.appclientid;
    activity.getAwardRecord(context,res);
});

router.get('/queryLotteryRecord',function(req,res,next){
    var ph = req.query.phone;
    if(!ph && typeof(ph)!="undefined" && ph!=0)
    {
        returnjsondata(res,{code:1,msg:'手机号码不正确'});
        return;
    }

    var currentpage = req.query.currentPage;
    if(!currentpage || currentpage == 0)
    {
        currentpage = 1;
    }
    else
    {
        currentpage = parseInt(currentpage);
    }
    var context = {};
    context.ph = ph;
    context.currentpage = currentpage;
    context.platform = req.query.appclientid;
    activity.queryLotteryRecord(context,res);
});

module.exports = router;




