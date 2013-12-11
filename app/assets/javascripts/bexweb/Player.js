var Player = function(playlist){
	
	var _playlist = null;
	var _videosContainerList = [];
	var _currentlyPlayingVideo = null;
	var _currentTime = null;
	var _originalTime = null;
	var _playing = false;

	var _builder = function(){
		_playlist = playlist;
		_buildVideoContainerList();
		_originalTime = playlist.getCurrentVideoName();
		_currentTime = playlist.getCurrentVideoTimestamp();
	}

	var _buildVideoContainerList = function(){
		var _cameras = _playlist.getCameras();
		_cameras.forEach(function(camera){
			_videosContainerList[camera] = document.getElementById(camera);
		})
	}

	var _isPlaying = function(){
		return _playing;
	}

	var _getTotalVideos = function(){
		return _playlist.totalItens();
	}

	var _isPlaylistFilled = function(){
		var returnValue = false;
		if (_playlist.totalItens() > 0){
			returnValue = true;
		}
		return returnValue;
	}

	var _isVideoContainerListFilled = function(){
		var returnValue = false;
		if (_videosContainerList.length > 0){
			returnValue = true;
		}
		return returnValue;
	}

	var _getCurrentlyPlayingVideo = function(){
		return _currentlyPlayingVideo;
	}

	var _getCurrentTime = function(){
		return _currentTime;
	}

	var _getOriginalStartTime = function(){
		return _originalTime;
	}

	var _play = function(){
		if (!_isPlaying() && _isPlaylistFilled() && playlist.isThereNextVideo()){
			_currentlyPlayingVideo = playlist.getCurrentVideo();
			var cameras = playlist.getCameras();
			//console.log(cameras[0]);
			_currentlyPlayingVideo.forEach(function(video,id){
				var camera = cameras[id];
				_videosContainerList[camera].src = video;
				_videosContainerList[camera].play();
			})
			setInterval(
				function(){
					_update();
				}
				,1000);
			_playing = true;
		}
	}

	var _update = function(){
		//if ()
	}

	_builder();

	return {
		getTotalVideos : _getTotalVideos,
		isPlaylistFilled : _isPlaylistFilled,
		isVideoContainerListFilled : _isVideoContainerListFilled,
		getCurrentlyPlayingVideo : _getCurrentlyPlayingVideo,
		getCurrentTime : _getCurrentTime,
		getOriginalStartTime : _getOriginalStartTime,
		isPlaying : _playing,
		play : _play,
		update : _update
	}

	// metodo que dispara o timer
	// metodo que checa se o video acabou e inicia um novo video
	// metodo que atualiza o tempo
	// metodo que atualiza os campos de demonstração de inicio e fim do 
	// 	tempo de analise
}
