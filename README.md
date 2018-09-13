# AddTitle
Bir objenin altındaki tüm a taglarını içeriğine göre etiketler
<br /><br />
## Örnek
'$("#menu").AddTitle();'



# Size
Objenin width değerine göre height değerinin belirlenmesini sağlar.<br />
Bu özellik farklı ekran boyutlarına göre tanımlanabilir.

##Örnek

<div class="size1">16x9, 100px, 1x1, calc(50VH - 20px)</div>
<div class="size1">16x9, 100px, 1x1, calc(50VH - 20px)</div>
<div class="size2">18x6</div>
<div class="size3">1x1</div>

$(function(){
	$(".size1").Size({
		default : {
			size:"16x9"
		},800:{
			height:"100px"
		},600:{
			size:"1x1"
		},700:{
			height:"calc(50VH - 20px)"
		}
	});
	$(".size2").Size("18x6");
	$(".size3").Size("1x1");
});

# Bağımlılıkları
# jQuery gerektirir