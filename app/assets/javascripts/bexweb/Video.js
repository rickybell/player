var Video = function(video_name){

	var _originaName = null;
	var _name = null;

	var _builder  = function(){
		_originalName = video_name;
		_name = video_name.substring(video_name.length,video_name.length-6); 
		return this;
	}

	var _isValidTime = function(){
		if (!Util.timeValidator(_name)){
			throw "Invalid name";
		}
		return this;
	}

	var _toString = function(){
		return _name;
	}

	_builder();

	return{
		isValidTime : _isValidTime,
		toString : _toString
	}
}
