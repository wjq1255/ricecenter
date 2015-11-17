/**
 * Created by hadoop on 2015/6/18.
 */
var express = require('express');
var common = require('../node_modules/ricecenter/busi/common');
var task = require('../node_modules/ricecenter/busi/task');
var resUtils = require('../node_modules/ricecenter/core/resUtils');

var router = express.Router();
var endResonse = resUtils.endResonse;
var returnjsondata = resUtils.returnjsondata;

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.get('/getTaskList',function(req,res,next){
    res.setHeader('Content-Type', 'text/html;charset=utf-8');

    common.getuserinfo(req,res,function(userinfo){
        var context = {};
        context.userinfo = userinfo;
        context.platform = req.query.appclientid;
        task.getTaskList(context,res);
    });
});


/**
 *
 */
router.post('/sendTaskInfo',function(req,res,next){
    res.setHeader('Content-Type', 'text/html;charset=utf-8');

    req.on('data', function (data) {
        req.body = eval('(' + data.toString() + ')');
        if (req.body.length > 1e6)
            req.connection.destroy();
        var context = {};
        //req.body = eval('(' + req.body + ')');
        context.uid = req.body.taskinfo.uid;
        context.taskid = req.body.taskinfo.taskid;
        context.platform = req.body.taskinfo.appclientid;
        task.sendTaskInfo(context,res);
    });
});


/**
 * 任务完成
 */
router.get('/commitTask',function(req,res,next){
    res.setHeader('Content-Type', 'text/html;charset=utf-8');

    var context = {};
    context.utaskid = req.query.utaskid;
    context.platform = req.query.appclientid;
    task.commitTask(context,res);
});

/**
 * 提交任务
 */
router.get('/completedTask',function(req,res,next){
    var context = {};
    context.uid = req.query.uid;
    context.taskid = req.query.taskid;
    task.completedTask(context,res);
});
module.exports = router;