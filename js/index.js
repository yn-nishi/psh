$(function(){

	console.log($('#aja'));
	$('#aja').click(() => {
		const formData = {
			'名前' : $('#clientName').val(),
			'Email' : $('#clientEmail').val(),
			'電話番号' : $('#clientTel').val(),
			'会社名' : $('#clientCompany').val(),
			'メール内容' : $('#clientComment').val(),
		}
		console.log(formData);
		$.ajax({
			type: "POST",
			url: "https://ynyn.mixh.jp/cgi/mail_psh/mail.php",
			data: formData
		})
		.then(
		function (data) {
			// 成功
			console.log('seikou');
			console.log(data);
		},
		function () {
			// 失敗
			console.log('通信エラーにより送信に失敗しました。');
		});
	})

	// 拡大鏡
	// zoomer();
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