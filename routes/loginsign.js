/**
 * Created by hadoop on 2015/6/10.
 */
var express = require('express');
var common = require('../node_modules/ricecenter/busi/common');
var loginsign = require('../node_modules/ricecenter/busi/loginsign');
var resUtils = require('../node_modules/ricecenter/core/resUtils');

var router = express.Router();

var endResonse = resUtils.endResonse;
var returnjsondata = resUtils.returnjsondata;


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/**
 * ǩ����ѯ
 */
router.get('/signPage',function(req,res,next){
    res.setHeader('Content-Type', 'text/html;charset=utf-8');

    var uid = req.query.uid;
    if (!uid && typeof(uid) != "undefined" && uid != 0) {
        resUtils.endResonse(201, 'uid����Ϊ��', res);
        return;
    }

    common.getuserinfo(req,res,function(userinfo) {
        var context = {};
        context.userinfo = userinfo;
        context.platform = req.query.appclientid;
        loginsign.signPage(context, res);
    });
});

/**
 * ǩ��
 */
router.get('/signup',function(req,res,next){
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    var uid = req.query.uid;
    if (!uid && typeof(uid)!="undefined" && uid!=0) {
        resUtils.endResonse(201, 'uid����Ϊ��', res);
        return;
    }
    common.getuserinfo(req,res,function(userinfo){
        var context = {};
        context.userinfo = userinfo;
        context.platform = req.query.appclientid;

        //�ж��Ƿ�����ǩ������
        loginsign.signup(context,res);
    });
});

module.exports = router;
