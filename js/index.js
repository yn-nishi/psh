// Copyright 2021 yn-nishi All Rights Reserved.
$(function(){

	// headerがposition:fixedなのでその分bodyを下げる。
	const headerH = $("#header").height();
	$("#kv").css("padding-top", headerH);

	// キャッチコピーをゆるやかに表示
	// 1文字ずつspanで囲む
	let newText = '';
	for (const t of $('.kv__copy').text()) {
		// 「も」で改行
		if(t === 'も') {
			newText += '<span>' + t + '</span><br>';
		} else {
			newText += '<span>' + t + '</span>';
		}
	}
	$('.kv__copy').html(newText);
	// spanを左右からfadeIn
	const spans = $('.kv__copy span').hide();
	let fadeInTime = 5000;
	spans.each(function(i) {
		spans.eq(i).fadeIn(fadeInTime);
		fadeInTime = 5000 + (2000 * i);
		if(fadeInTime >= 15000) {
			fadeInTime = 15000 + (100 * i);
		}
	});

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
	$(window).on('scroll', function(e) {
		// window幅変更に対応するため要素の高さは都度取得
		const headerH = $('.header')[0].scrollHeight;
		const kvH = $('#kv')[0].scrollHeight;
		const flowH = $('#flow').position().top;
		const currentH = e.currentTarget.scrollY;
		if (currentH >= kvH - headerH && currentH <= flowH - headerH){
			$('.header').addClass('scroll');
		} else {
			$('.header').removeClass('scroll');
		}
		return false;
	});
	
	// アンカーリンクをスムーズにスクロール
	$('a[href^="#"]').on('click', function(e) {
		e.preventDefault();
    const speed = 800;
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
				// setTimeoutで「送信中...」表示を少し維持
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