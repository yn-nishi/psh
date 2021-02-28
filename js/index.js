$(function(){

	// 拡大鏡
	// 最初の写真
	$('#zoom1').anythingZoomer();
	// ユーザーによる写真選択
	$('.ex__wrapper__box img').on('click', function(e) {
		const alt = e.target.alt;
		const src = e.target.src;
		const id = src.charAt(src.indexOf('.png') - 1);
			$('[id^="zoom"]').html('').attr('id','zoom' + id).html(`
				<div class="small">
					<img src="${src}">
				</div>
					<p>${alt}</p>
				<div class="large">
						<img src="${src}">
				</div>
			`);
			$('#zoom' + id).anythingZoomer()
		return false;
	})

	// スクロール位置によってバナーの背景色等を変更
	const headerH = $('.header')[0].scrollHeight;
	const kvH = $('#kv')[0].scrollHeight;
	const flowH = $('#flow').position().top;
	$(window).on('scroll', function(e) {
		const currentH = e.currentTarget.scrollY;
		if (currentH >= kvH - headerH && currentH <= flowH - headerH){
			$('.header').addClass('scroll');
		} else {
			$('.header').removeClass('scroll');
		}
		return false;
	});
	
	// アンカーリンク スムーズスクロール
	$('a[href^="#"]').on('click', function(e) {
		e.preventDefault();
    const speed = 600;
    const href= $(this).attr("href");
    const target = $(href == "#" || href == "" ? 'html' : href);
    const position = target.position().top;
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });

	// メールフォーム
	$('#ajax').on('click', function() {
		const formData = {
			'名前' : $('#clientName').text(),
			'Email' : $('#clientEmail').text(),
			'電話番号' : $('#clientTel').text(),
			'会社名' : $('#clientCompany').text(),
			'メール内容' : $('#clientComment').text(),
		}
		// 前回のエラーメッセージ削除
		$('.errMsg').remove();
		$('.sendMsg').html('');
		// バリデーション
		let isComplete = false;
		if(formData['名前'] && formData['Email'] && formData['電話番号'] && formData['メール内容']) isComplete = true;
		if(!formData['名前']) $('#clientName').after('<p class="errMsg">お名前は必須です。</p>');
		if(!formData['Email']) $('#clientEmail').after('<p class="errMsg">メールアドレスは必須です。</p>');
		if(!formData['電話番号']) $('#clientTel').after('<p class="errMsg">電話番号は必須です。</p>');
		if(!formData['メール内容']) $('#clientComment').after('<p class="errMsg">お問い合わせ内容は必須です。</p>');
		// 送信
		if(isComplete) {
			$.ajax({
				type: "POST",
				url: "https://ynyn.mixh.jp/cgi/mail_psh/mail.php",
				data: formData,
				beforeSend: function() {
					$('.sendMsg').html('送信中....')
					$('#ajax').prop('disabled', true);
				}
			})
			.done(function(data) {
				// setTimeoutで送信してるっぽく見せる
				setTimeout(function() {
					if(data.trim() === 'success') {
						$('.sendMsg').html('お問い合わせありがとうございます。後ほど担当者からご連絡いたします。');
					} else {
						// PHPからのエラーメッセージ
						$('.sendMsg').html(`<p class="errMsg">${data}</p>`);
						$('#ajax').prop('disabled', false);
					}
				}, 1500);
			})
			.fail(function() {
				setTimeout(function() {
					$('.sendMsg').html('<p class="errMsg">通信エラーにより送信に失敗しました。</p>');
					$('#ajax').prop('disabled', false);
				}, 1500);
			});
		}
		return false;
	})


});