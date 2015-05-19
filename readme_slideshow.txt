


■スライドショーの使い方
=================================================================
※<head>タグ内のスクリプト

<script>
$(function(){
$('#slides').slides({
	preload: true,
	preloadImage: 'index/img/loading.gif',	←ローディング画像
	play: 7000,				←自動送りの時間
	pause: 100,				
	hoverPause: true			←マウスオーバー時のスライドの可否
	});
});
</script>

------------------------
※画像の設定

<div class="slides_container">

	<img src="slide/img01.jpg" width="960" height="381" alt="Slide 1">
                        
	<img src="slide/img02.jpg" width="960" height="381" alt="Slide 2">
                        
	<img src="slide/img03.jpg" width="960" height="381" alt="Slide 3">
                        
	<a href="#">
	<img src="slide/img04.jpg" width="960" height="381" alt="Slide 4"></a>

</div>



<div class="slides_container">タグの中に表示したい数だけ<img>タグを追加し、
alt="Slide *"の「*」を連番で指定すると枚数の分だけボタンも自動で増減します。

スライド画像にリンクを張りたい場合は各<img>タグを<a>タグで囲んで下さい。


=================================================================