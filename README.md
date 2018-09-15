# Accord
İşaretlenmiş olan objenin içindeki objelerin ekrana tam sığmasını sağlar.
<br /><br />
## Örnek
### html
```
<div id="spine">
	<img src="img/demiryolu.jpg" />
    <img src="img/gol.jpg" width="533" height="300" />
    <iframe width="500" height="240" src="https://example.com/"></iframe>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/388-ZnlMoO4" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    <video width="800" height="600" controls="controls" src="https://www.w3schools.com/html/mov_bbb.mp4"></video>
</div>
```
### js
```
$(function(){
	$("#spine").Accord();
});
```




# AddHref
İşaretlenmiş olan objenin içinde href etiketi eklenen objeyi a etiketi altına alır.
<br /><br />
## Örnek
### html
```
<h1>TEST 1</h1>
<div id="menu1">
	<div href="/page1">Page 1</div>
    <img src="img/small_demiryolu.jpg" href="/page2" alt="Demiryolu" />
    <div href="/page3">Page 3</div>
</div>

<h1>TEST 2</h1>
<div id="menu2">
	<div href="/page4">Page 4</div>
    <div href="/page5">Page 5</div>
    <img src="img/small_gol.jpg" href="/test6" alt="Göl" />
</div>

<h1>TEST 3</h1>
<div id="menu3">
	<div href="/page7">Page 7</div>
    <div href="/page8">Page 8</div>
    <img src="img/small_gol.jpg" href="/test9" alt="Göl" />
</div>
```
### js
```
$(function(){
	$("#menu1").AddHref();
	$("#menu2").AddHref({
		title:false
	});
	$("#menu3").AddHref({
		title:"String Title"
	});
});
```



# AddTitle
İşaretlenmiş olan objenin altındaki tüm a taglarını içeriğine göre etiketler
<br /><br />
## Örnek
### html
```
<div id="menu">
	<a href="#">Main Page</a>
    <a href="#">Project</a>
    <a href="#">Test Page</a>
    <a href="#">Contact</a>
</div>
```
### js
```
$(function(){
	$("#menu").AddTitle();
});
```

# Size
Objenin width değerine göre height değerinin belirlenmesini sağlar.<br />
Bu özellik farklı ekran boyutlarına göre tanımlanabilir.<br />
Kısa kullanım için etiket olarak tanımlanabilir.
<br /><br />
## Örnek
### html
```
<div class="size1">16x9, 100px, 1x1, calc(50VH - 20px)</div>
<div class="size1">16x9, 100px, 1x1, calc(50VH - 20px)</div>
<div class="size2">18x6</div>
<div class="size3">1x1</div>
<div class="size4" size="10x2">10x2</div>
```
### js
```
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
```