var express = require('express');
var common = require('../node_modules/ricecenter/busi/common');
var user = require('../node_modules/ricecenter/busi/user');
var resUtils = require('../node_modules/ricecenter/core/resUtils');
var router = express.Router();



/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.get('/registerAuthCode', function (req, res, next) {
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    var phoneNumber = req.query.ph;
    var matched = phoneNumber.match('^1[34578]{1}\\d{9}$');
    if (!phoneNumber || !phoneNumber.match('^1[34578]{1}\\d{9}$')) {
        resUtils.endResonse(201, '手机号码错误', res);
        return;
    }
    user.sendRegisterCode(phoneNumber,res);
});


router.get('/register', function (req, res, next) {
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    var phoneNumber = req.query.ph;
    var password = req.query.pwd;
    var ckid = req.query.ckid;
    var vcode = req.query.vcode;
    var appclientid = req.query.appclientid;
    if (!phoneNumber || !password || !vcode) {
        return resUtils.endResonse(211, '注册信息不完整', res);
    }

    var userInfo = {};
    userInfo.phoneNumber = phoneNumber;
    userInfo.password = password;
    userInfo.ckid = ckid;
    userInfo.vcode = vcode;
    userInfo.platform = appclientid;
    user.register(userInfo, res);

});

router.get('/login', function (req, res, next) {
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    var loginInfo = {};
    loginInfo.ph = req.query.ph;
    loginInfo.password = req.query.pwd;
    loginInfo.ckid = req.query.ckid;
    loginInfo.type = req.query.type;
    loginInfo.taskid = req.query.taskid;
    loginInfo.platform = req.query.appclientid;

    if (!loginInfo.ph || !loginInfo.password || !loginInfo.ckid) {

        return resUtils.endResonse(221, '登录失败', res);
    }

    user.login(loginInfo, res);

});


router.get('/sendPasswdVcode', function (req, res, next) {
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    var phoneNumber = req.query.ph;
    var matched = phoneNumber.match('^1[34578]{1}\\d{9}$');
    if (!phoneNumber || !phoneNumber.match('^1[34578]{1}\\d{9}$')) {
        resUtils.endResonse(228, '发送验证码失败', res);
        return;
    }
    if (!req.query.ckid) {
        resUtils.endResonse(228, '发送验证码失败', res);
        return;
    }
    user.sendPasswdVcode(phoneNumber,res);
});

/**
 * 密码修改
 */
router.get('/changePasswd', function (req, res, next) {
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    var userInfo = {};
    userInfo.ph = req.query.ph;
    userInfo.vcode = req.query.vcode;
    userInfo.pwd = req.query.pwd;
    userInfo.ckid = req.query.ckid;
    userInfo.uid = req.query.uid;
    userInfo.sid = req.query.sid;
    userInfo.appclientid = req.query.appclientid;

    if (!userInfo.ph || !userInfo.vcode || !userInfo.pwd || !userInfo.ckid) {
        resUtils.endResonse(225, '修改用户密码失败', res);
        return;
    }

    var phoneNumber = req.query.ph;
    var matched = phoneNumber.match('^1[34578]{1}\\d{9}$');
    if (!phoneNumber || !phoneNumber.match('^1[34578]{1}\\d{9}$')) {
        resUtils.endResonse(228, '修改用户密码失败', res);
        return;
    }
    if (!req.query.ckid) {
        resUtils.endResonse(228, '修改用户密码失败', res);
        return;
    }

    common.getuserinfo(req,res,function(userinfo){
        var context = {};
        context.userinfo = userinfo;
        context.userinfo.vcode =  req.query.vcode;
        context.userinfo.pwd = req.query.pwd;
        context.userinfo.ckid = req.query.ckid;
        user.changePasswd(context, res);
    })
});

router.get('/getintegral', function (req, res, next) {
    res.setHeader('Content-Type', 'text/html;charset=utf-8');

    common.getuserinfo(req,res,function(userinfo){
        var uid = req.query.uid;
        var param = {'uid':uid,'tasktype':req.query.tasktype,'taskid':req.query.taskid};
        if (!uid && typeof(uid)!="undefined" && uid!=0) {
            resUtils.endResonse(201, 'uid不能为空', res);
            return;
        }
        var context = {};
        context.userinfo = userinfo;
        context.param = param;
        user.getintegral(context,res);
    });
});

/**
 * 金米兑换列表
 */
router.get('/exchangeIntegral',function(req,res,next){
    res.setHeader('Content-Type', 'text/html;charset=utf-8');

    common.getuserinfo(req,res,function(userinfo) {
        var tasktype = req.query.tasktype;
        var offset = parseInt(req.query.offset);
        var limit = parseInt(req.query.limit);
        var appclientid = req.query.appclientid;
        var context = {};
        context.userinfo = userinfo;
        context.param = {'type': tasktype, 'offset': offset, 'limit': limit,'platform':appclientid};
        user.exchangeIntegral(context, res);
    });
});

/**
 * 金米记录查询
 */
router.get('/integralrecord',function(req,res,next){
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    common.getuserinfo(req,res,function(userinfo){
        var uid = req.query.uid;
        var type = req.query.type;
        var limit = req.query.limit;
        var offset = req.query.offset;
        var appclientid = req.query.appclientid;
        if (!uid && typeof(uid)!="undefined" && uid!=0) {
            resUtils.endResonse(201, 'uid不能为空', res);
            return;
        }
        var context = {};
        context.userinfo = userinfo;
        context.param = {'uid':uid,'type':parseInt(type),'limit':parseInt(limit),'offset':parseInt(offset),'platform':appclientid};
        user.integralrecord(context,res);
    });
});

/**
 * 金米专区
 */
router.get('/newIntegralArea',function(req,res,next){
    res.setHeader('Content-Type', 'text/html;charset=utf-8');

    common.getuserinfo(req,res,function(userinfo){
        var context = {};
        context.offset = parseInt(req.query.offset);
        context.limit = parseInt(req.query.limit);
        context.userinfo = userinfo;
        user.newIntegralArea(context,res);
    });
});


/**
 * 兑换金米
 */
router.get('doExchangeIntegral',function(req,res,next){
    var uid = req.query.uid;
    var gid = req.query.gid;
    var type = req.query.type;
    var androidid = req.query.androidid;
    var imei = req.query.imei;
    var appver = req.query.appver;
    var param = {};
    param.gid = gid;
    param.type = type;
    param.androidid = androidid;
    param.imei = imei;
    param.appver = appver;
    if (!uid && typeof(uid)!="undefined" && uid!=0) {
        resUtils.endResonse(201, '缺少参数', res);
        return;
    }
    if (!gid && typeof(gid)!="undefined" && gid!=0) {
        resUtils.endResonse(201, '缺少参数', res);
        return;
    }
    if (!type && typeof(type)!="undefined" && type!=0) {
        resUtils.endResonse(201, '缺少参数', res);
        return;
    }

    common.getuserinfo(req,res,function(userinfo){
        if(!userinfo)
        {
            resUtils.endResonse(262, '用户未登录', res);
            return;
        }

        var context = {};
        context.userinfo = userinfo;
        context.param = param;
        user.doExchangeIntegral(context,res);
    });
});


module.exports = router;
