/**
 * Created by hadoop on 2015/6/9.
 */
var express = require('express');
var rice = require('../node_modules/ricecenter/busi/rice');
var resUtils = require('../node_modules/ricecenter/core/resUtils');

var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.get('/getintegral', function (req, res, next) {
    var uid = req.query.uid;
    var context = {'uid':uid,'tasktype':req.query.tasktype,'taskid':req.query.taskid,'appclientid':req.query.appclientid};
    if (!uid && typeof(uid)!="undefined" && uid!=0) {
        resUtils.endResonse(201, 'uid 不能为空', res);
        return;
    }

    rice.getintegral(context,res);
});

/**
 * 兑换列表
 */
router.get('/exchangeIntegral',function(req,res,next){
    var tasktype = req.query.tasktype;
    var offset = parseInt(req.query.offset);
    var limit = parseInt(req.query.limit);
    var param = {'type':tasktype,'offset':offset,'limit':limit};
    rice.exchangeIntegral(param,res);
});


router.get('/integralrecord',function(req,res,next){
    res.setHeader('content-type', 'text/html;charset=utf-8');
    var uid = req.query.uid;
    var type = req.query.type;
    var limit = req.query.limit;
    var offset = req.query.offset;
    if (!uid && typeof(uid)!="undefined" && uid!=0) {
        resUtils.endResonse(201, 'uid不能为空', res);
        return;
    }
    var param = {'uid':uid,'type':type,'offset':offset,'limit':limit};
    rice.integralrecord(param,res);
});

module.exports = router;