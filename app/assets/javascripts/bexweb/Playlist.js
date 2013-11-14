var Playlist = function(url){

	var _list = {};
	var _url = "";
	var _currentVideoIndex = 0;

	var _fill = function(){
		$.get(url,{},function(json){
			if (json.videos){
				_url = json.url;
				_list = json.videos;
				_cameras = json.cameras;
			}
		})
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
			result.push([_url,entry,_list[_currentVideoIndex]].join('/'));
		});
		return result;
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

	_fill();

	
	return{
		fill : _fill,
		totalItens: _totalItens,
		getUrl : _getUrl,
		getCurrentVideoIndex : _getCurrentVideoIndex,
		getTotalCamerasItens : _getTotalCamerasItens,
		getCurrentVideo : _getCurrentVideo,
		getNextVideo : _getNextVideo,
		getPreviousVideo : _getPreviousVideo
	}
}