var path = require('path');
var express = require('express');
var app = express();
var models = require('./tasks/models');

app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').__express);
app.get('/', function (req, res) {
    models.Category.find({},function(err,categories){
        //先读取查询字符串参数中的cid
        var cid = req.query.cid;
        //如果 没有传入cid 那么取默认的第一个分类的cid
        if(!cid){
            var category = categories[0];
            cid = category._id;
        }
        if(cid){
            models.Tv.find({cid:cid},function(err,tvs){
                res.render('index', {categories:categories,tvs:tvs,cid:cid});
            });
        }
        else
            res.render('index', {categories:categories,tvs:[],cid:cid});
    });

});

app.listen(8080, function() {
	console.log('server is start, listen in prot 8080...');
});

//启动一个计划任务，每天抓取一次最新的数据
var path = require('path');
var CronJob = require('cron').CronJob;
var spawn = require('child_process').spawn;
var job = new CronJob('1 1 23 * * *',function(){
    // process.execPath = node的可执行文件路径
    spawn(process.execPath,[path.join(__dirname,'tasks/main.js')]);
});
job.start();

