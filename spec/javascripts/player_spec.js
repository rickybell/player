describe("Player features tests",function(){
	
	describe("When a player has been created",function(){

		it("Should inject a playlist",function(){
			var videoUrl = "http://dvrcortex.herokuapp.com/cortex/20131111/576M/5647";

			var videosMock = new Array('01-20131017094708.mp4','02-20131017094808.mp4','03-20131017094908.mp4');

			loadFixtures('playlist_index.html');

			var ajax_spy = spyOn($,'get').andReturn('');

			var mockPlaylist = new Playlist($('.page-data').data('videos-url'));
			var player = new Player(new Playlist($('.page-data').data('videos-url')));

			var playlist_callback = ajax_spy.mostRecentCall.args[2];
		 	playlist_callback({ 
		 		url : videoUrl, 
		 		videos : videosMock,
		 		cameras : ['1','2','3','4']
		 	});

		 	expect(player.getTotalItens()).toEqual(3);
		})
	})
})