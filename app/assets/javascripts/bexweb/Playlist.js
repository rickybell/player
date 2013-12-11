var Playlist = function(url){

	var _list = new Array();
	var _url = "";
	var _currentVideoIndex = 0;
	var _cameras = null;

	var _fill = function(){
		$.get(url,{},function(json){
			if (json.videos){
				_url = json.url;
				json.videos.forEach(function(name){
					_list.push(_newVideo(name));
				});
				_cameras = json.cameras;
			}
		})
	}

	var _newVideo = function(video_name){
		return {
			_originalName: video_name,
			getOriginalName : function(){
				return video_name;
			},
			toString: function(){
				var pos = video_name.indexOf(".");
				var cleanName = video_name; 
				if (pos >= 0){
					var arrVideoName = video_name.split(".");
					cleanName = arrVideoName[0].substring(0,pos);
				}
				return cleanName.substring(cleanName.length,cleanName.length-14); 
			},
			isValidTime: function(){
				if (!Util.timeValidator(_name)){
					throw "Invalid name";
				}
				return true;
			},
			toTimestamp: function(){
				var name = this.toString();
				return new Date(
						name.substr(0,4),
						name.substr(4,2),
						name.substr(6,2),
						name.substr(8,2),
						name.substr(10,2),
						name.substr(12,2)
					).getTime();
			},
			toFormat: function(format){
				var name = this.toString();
				var mydate = new Date(
						name.substr(0,4),
						name.substr(4,2),
						name.substr(6,2),
						name.substr(8,2),
						name.substr(10,2),
						name.substr(12,2)
					);
				return [
						Util.addZero(
							mydate.getHours()),
						Util.addZero(
							mydate.getMinutes()),
						Util.addZero(
							mydate.getSeconds())
					].join(":");
			}
		}
	}

	var _totalItens = function(){
		return _list.length;
	}

	var _getUrl = function(){
		return _url;
	}

	var _getCurrentVideoIndex = function(){
		return _currentVideoIndex;
	}

	var _getTotalCamerasItens = function(){
		return _cameras.length;
	}

	var _getCurrentVideo = function(){
		var result = [];
		_cameras.forEach(function(entry){
			result.push([_url,entry,_list[_currentVideoIndex].getOriginalName()].join('/'));
		});
		return result;
	}

	var _getCurrentVideoName = function(){
		return _list[_currentVideoIndex].toString();
	}

	var _getNextVideo = function(){
		if (_currentVideoIndex < _list.length){
			_currentVideoIndex++;
		}
		return _getCurrentVideo();
	}

	var _getPreviousVideo = function(){
		
		if ( _currentVideoIndex > 0 ) {
			_currentVideoIndex--;
		}
		return _getCurrentVideo();
	}

	var _getCameras = function(){
		return _cameras;
	}

	var _isThereNextVideo = function(){
		var returnValue = false
		if (_currentVideoIndex < _list.length){
			returnValue = true;
		}
		return returnValue;
	}

	var _getCurrentVideoTimestamp = function(){
		return _list[_currentVideoIndex].toTimestamp();
	}

	var _getCurrentVideoFormat = function(format){
		return _list[_currentVideoIndex].toFormat(format);
	}

	_fill();

	
	return{
		fill : _fill,
		totalItens: _totalItens,
		getUrl : _getUrl,
		getCurrentVideoIndex : _getCurrentVideoIndex,
		getTotalCamerasItens : _getTotalCamerasItens,
		getCurrentVideo : _getCurrentVideo,
		getNextVideo : _getNextVideo,
		getPreviousVideo : _getPreviousVideo,
		getCameras : _getCameras,
		getCurrentVideoName : _getCurrentVideoName,
		isThereNextVideo : _isThereNextVideo,
		getCurrentVideoTimestamp : _getCurrentVideoTimestamp,
		getCurrentVideoFormat : _getCurrentVideoFormat
	}
}