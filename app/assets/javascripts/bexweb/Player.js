var Player = function(playlist){
	var _playlist = null;
	var _builder = function(){
		_playlist = playlist;
		
	}

	var _getTotalItens = function(){
		return _playlist.totalItens();
	}

	_builder();
	return {
		getTotalItens : _getTotalItens
	}
}
