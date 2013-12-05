describe("Video",function(){
	var video;

	describe("when a video has been created",function(){

		beforeEach(function(){
		 	video = new Video("01-20131017094708.mp4");
		});

		it("should not raise an exception",function(){
			expect(video.isValidTime).not.toThrow();
		});

		it("should the name has 6 characters length",function(){
			expect(video.toString().length).toEqual(6);
		});
	
	});
});