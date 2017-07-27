var async = require('async'),
	keystone = require('keystone');

var PaintbotItem = keystone.list('PaintbotItem');



exports.queued = function(req, res) {
	PaintbotItem.model.findOneAndUpdate(req.params.output, {$set: {'renderStatus': 'queued'}}, {new: true}, function(err, item){
    if(err){
        console.log("Something wrong when updating data!");
    }
		res.json('success');
});
}

exports.processing = function(req, res) {
	PaintbotItem.model.findOneAndUpdate(req.params.output, {$set: {'renderStatus': 'processing'}}, {new: true}, function(err, item){
    if(err){
        console.log("Something wrong when updating data!");
    }
		res.json('success');
});
}


exports.done = function(req, res) {
	PaintbotItem.model.findOneAndUpdate(req.params.output, {$set: {'renderStatus': 'done'}}, {new: true}, function(err, item){
    if(err){
        console.log("Something wrong when updating data!");
    }
		res.json('success');
});
}
