function Video(video_name){
	_originalName = video_name;
	var pos = video_name.indexOf(".");
	var cleanName = video_name; 
	if (pos >= 0){
		var arrVideoName = video_name.split(".");
		cleanName = arrVideoName[0].substring(0,pos);
	}
	_name = cleanName.substring(cleanName.length,cleanName.length-6); 
}

Video.prototype.getOriginalName = function(value) {
  // something complicated
  return _originalName;
};

Video.prototype.toString = function(){
	return _name;
}

Video.prototype.isValidTime = function(){
	if (!Util.timeValidator(_name)){
		throw "Invalid name";
	}
	return true;
}

// var Video = function(video_name){

// 	var _originaName = null;
// 	var _name = null;

// 	var _builder  = function(){
// 		_originalName = video_name;
// 		//console.log("Original Name like  " + video_name);
// 		var pos = video_name.indexOf(".");
// 		var cleanName = video_name; 
// 		if (pos >= 0){
// 			var arrVideoName = video_name.split(".");
// 			cleanName = arrVideoName[0].substring(0,pos);
// 		}
// 		_name = cleanName.substring(cleanName.length,cleanName.length-6); 
// 		return this;
// 	}

// 	var _isValidTime = function(){
// 		if (!Util.timeValidator(_name)){
// 			throw "Invalid name";
// 		}
// 		return this;
// 	}

// 	var _getOriginalName = function(){
// 		return _originalName;
// 	}

// 	var _toString = function(){
// 		return _name;
// 	}

// 	_builder();

// 	return{
// 		isValidTime : _isValidTime,
// 		toString : _toString,
// 		getOriginalName : _getOriginalName
// 	}
// }
