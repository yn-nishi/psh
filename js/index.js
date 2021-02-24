$(function(){
	zoomer();
//	$(window).resize(function() {zoomer()});
	function zoomer() {
		var defer = new $.Deferred().resolve();
		defer.promise()
		.then(function() {
			$("#zoom1").anythingZoomer();
			return;
		}).then(function() {
			$("#zoom2").anythingZoomer();
			return;
		}).then(function() {
			$("#zoom3").anythingZoomer();
			return;
		}).then(function() {
			$("#zoom4").anythingZoomer();
			return;
		}).then(function() {
			$("#zoom5").anythingZoomer();
			return;
		}).then(function() {
			$("#zoom6").anythingZoomer();
			return;
		}).then(function() {
			$("#zoom7").anythingZoomer();
			return;
		}).then((function () {
//			height: auto
			return;
		}))
	}
});