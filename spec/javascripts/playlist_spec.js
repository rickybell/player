describe("Playlist features tests",function(){

	var ajaxUrlGetVideos = null;
	var videoUrl = null;
	var ajax_spy = null;
	var playlist = null;
	var callback = null;
	var videosMock = null;
	var firstVideo = null;
	var secondVideo = null;

	describe("When the Playlist has been created", function(){

		beforeEach(function(){

			videoUrl = "http://dvrcortex.herokuapp.com/cortex/20131111/576M/5647";

			videosMock = new Array('01-20131017094708.mp4','02-20131017094808.mp4','03-20131017094908.mp4');

			loadFixtures('playlist_index.html');

			ajax_spy = spyOn($,'get').andReturn('');

			playlist = new Playlist($('.page-data').data('videos-url'));

			// Vai ficar aki como exemplo
			// expect(ajax_spy.mostRecentCall.args[0]).toBe(ajaxUrlGetVideos);
		 	// expect($.param(ajax_spy.mostRecentCall.args[1])).toBe($.param({}));

		 	callback = ajax_spy.mostRecentCall.args[2];
		 	callback({ 
		 		url : videoUrl, 
		 		videos : videosMock,
		 		cameras : ['1','2','3','4']
		 	});

		 	firstVideo = [videoUrl,'1',videosMock[0]].join('/');

		 	secondVideo = [videoUrl,'1',videosMock[1]].join('/'); 

		 	
		})

	

		it("should the fixtures has been loaded",function(){
			var titulo_da_pagina = $('h1').html();
			expect(titulo_da_pagina).toBe('playlist test');
		})

		it("should have the page properties data defined", function(){
			expect($('.page-data')).toBeDefined();
		})

		it("should have page data properties for store open iteractions",function(){
			expect($('.page-data').data('videos-url')).not.toBeNull();
		})

		it("should the ajax url been the same with constructor parameter",function(){
			expect(ajax_spy.mostRecentCall.args[0]).toBe($('.page-data').data('videos-url'));
		})

		it("should the total video list itens be 3", function(){
		 	expect(playlist.totalItens()).toBe(3);
		})

		it("should not the url be null",function(){ 
		 	expect(playlist.getUrl()).toBe(videoUrl);
		})

		it("should the video index be 0",function(){
			expect(playlist.getCurrentVideoIndex()).toEqual(0);
		})

		it("should the total cameras list be 4",function(){
			expect(playlist.getTotalCamerasItens()).toEqual(4);
		})
	
		it("should the current video be first from list",function(){
			var currentVideo = playlist.getCurrentVideo();
			expect(currentVideo[0]).toEqual(firstVideo);
		});

		it("the total lines of urls videos received when requested video current must equal the total number of cameras",function(){
			var currentVideo = playlist.getCurrentVideo();
			expect(playlist.getTotalCamerasItens()).toEqual(currentVideo.length);
		});
	})

	describe("Iterating through the playlist",function(){

		beforeEach(function(){

			videoUrl = "http://dvrcortex.herokuapp.com/cortex/20131111/576M/5647";

			videosMock = new Array('01-20131017094708.mp4','02-20131017094808.mp4','03-20131017094908.mp4');

			loadFixtures('playlist_index.html');

			ajax_spy = spyOn($,'get').andReturn('');

			playlist = new Playlist($('.page-data').data('videos-url'));

			// Vai ficar aki como exemplo
			// expect(ajax_spy.mostRecentCall.args[0]).toBe(ajaxUrlGetVideos);
		 	// expect($.param(ajax_spy.mostRecentCall.args[1])).toBe($.param({}));


		 	callback = ajax_spy.mostRecentCall.args[2];
		 	callback({ 
		 		url : videoUrl, 
		 		videos : videosMock,
		 		cameras : ['1','2','3','4']
		 	});

		 	firstVideo = [videoUrl,'1',videosMock[0]].join('/');

		 	secondVideo = [videoUrl,'1',videosMock[1]].join('/'); 

		 	
		})



		var nextVideos = null;
		var previousVideos = null;

		beforeEach(function(){
			nextVideos = playlist.getNextVideo();
		});


		describe("Asking for the next video",function(){

			it("Should be the next video list",function(){
				expect(nextVideos[0]).toBe(secondVideo);
			});

			it("Should the current video index be 1",function(){
				expect(playlist.getCurrentVideoIndex()).toEqual(1);
			});
		})

		describe("Asking for the previous video", function(){

			beforeEach(function(){
				previousVideos = playlist.getPreviousVideo();
			});

			it('Should be the first video from the list',function(){
				expect(previousVideos[0]).toBe(firstVideo);
			});

			it("Should the index of videos to be first on the list",function(){
				expect(playlist.getCurrentVideoIndex()).toEqual(0);
			});
		});
	});
});