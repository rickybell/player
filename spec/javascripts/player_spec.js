describe("Player features tests",function(){
	var player = null;
	var videosMock = null;
	var firstVideo = null;

	beforeEach(function(){
		//var videoUrl = "http://dvrcortex.herokuapp.com/cortex/20131111/576M/5647";

		videosMock = new Array('01-20131017094708.mp4','02-20131017094808.mp4','03-20131017094908.mp4');

		loadFixtures('playlist_index.html');

		var ajax_spy = spyOn($,'get').andReturn('');

		var playlist = new Playlist($('.page-data').data('toPlaylist')); 

		var playlist_callback = ajax_spy.mostRecentCall.args[2];
	 	
	 	playlist_callback({ 
	 		url : $('.page-data').data('pathUrl'), 
	 		videos : videosMock,
	 		cameras : ['1','2','3','4']
	 	});

		player = new Player(
			playlist);

		firstVideo = [$('.page-data').data('pathUrl'),'1',videosMock[0]].join('/');

	})

	describe("When a player has been created",function(){
		it("Should inject a playlist",function(){
		 	expect(player.isPlaylistFilled()).toBeTruthy();
		})

		it("Should inject a list of video container objects", function(){
		 	expect(player.isVideoContainerListFilled()).toBeTruthy();
		})

		it("Should set original start time to the first video file name.", function(){
			expect(player.getOriginalStartTime()).toBe('20131017094708');
		})

	})

	describe("After a player has been created",function(){
		
		var isPlaying_spy = null;
		var playerSetInterval = null;
		var update = null;

		beforeEach(function(){
			spyOn(document.getElementById('1'),'play');
			
			
			//startPlayingTimer_spy = spyOn(player,'startPlayingTimer');
			//updateCurrentTimer_spy = spyOn(player,'updateCurrentTimer');
			
			playerSetInterval = spyOn(window,'setInterval');
			player.play();
			update = spyOn(player,'update');
			isPlaying_spy = spyOn(player,'isPlaying');
		})

		describe("When the Play method is called",function(){
			it("Should be able to play video",function(){
				expect(player.getCurrentlyPlayingVideo()[0]).toEqual([$('.page-data').data('pathUrl'),'1',videosMock[0]].join('/'));
			})
			it("Should the src property equal first video",function(){
				expect(document.getElementById('1').src).toEqual(firstVideo);
			})
			it("Should container play method have been called",function(){
				expect(document.getElementById('1').play).toHaveBeenCalled();
			})

			it("Should 'Start time' field update to respective initial time",function(){
				expect(document.getElementById('start-current-time').value).toBe("09:47:08");
			})
			it("Should 'End time' field update to respective initial time",function(){
				expect(document.getElementById('end-current-time').value).toBe("09:47:08");
			})

			it("Should 'isPlaying' be true", function(){
				expect(player.isPlaying).toBeTruthy();
			})
			
			it("Should 'setInterval' has started",function(){
				expect(playerSetInterval).toHaveBeenCalled();
			})
			// it("Should 'update' has called after a cycle.", function(){
			// 	expect(player.update).toHaveBeenCalled();
			// })

		})

		describe("When the 'video' ended",function(){

		})
	})
})