<?php
header('Content-Type:text/html;charset=utf-8');
?>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>Like@Lunatic</title>
<link rel="stylesheet" href="/libs/bootstrap/bootstrap.css" />
<link rel="stylesheet" href="css/style.css" />
<!--[if lte IE 8]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
<!--<script src="/js/modenizr.js"></script>-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="/libs/jquery-masonry/jquery.masonry.min.js"></script>
<script src="js/script.js"></script>

</head>
<body>

<header class="topbar area_hd">
<div class="topbar-inner">
<div class="container">
	<p class="brand"><a href="index.html">Like@Lunatic</a></p>
	<nav class="global">
	<ul class="nav">
		<li class="active"><a href="index.html">Home</a></li>
		<li><a href="/blog/">Blog</a></li>
		<li><a href="/about">About</a></li>
	</ul>
	<!--/.global--></nav>
	<form class="pull-left" action="">
		<input type="text" placeholder="Blog Search" />
	</form>
	<aside class=" social">
	<ul class="nav secondary-nav">
		<li><a href="https://twitter.com/seckie_"><img src="/libs/social-media-icons/16px/twitter.png" alt="" width="16" height="16" /> Twitter</a></li>
		<li><a href="https://www.facebook.com/"><img src="/libs/social-media-icons/16px/facebook.png" alt="" width="16" height="16" /> Facebook</a></li>
	</ul>
	<!--/.social--></aside>
</div>
<!--/.topbar-inner--></div>
<!--/.area_hd--></header>

<div class="container area_bd">
<p class="description">Naoki Sekiguchi's personal Web site.</p>

<div class="contents">
	
<div class="articles">

	<article class="article1 span4">
	<h2><img src="/libs/social-media-icons/32px/wordpress.png" alt="From WordPress" width="32" height="32" /> Entry Title</h2>
	<div class="summary">
		Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text 
	<!--/.summary--></div>
	<footer class="article_ft">
		<p class="categories">Misc</p>
		<p class="date">[2011-11-23 00:00:00]</p>
	<!--/.article_ft--></footer>
	<!--/.article1--></article>

	<article class="article2 span4"><!--{{{-->
	<h2><img src="/libs/social-media-icons/32px/wordpress.png" alt="From WordPress" width="32" height="32" /> Entry Title</h2>
	<div class="summary">
		Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text 
	<!--/.summary--></div>
	<footer class="article_ft">
		<p class="categories">Misc</p>
		<p class="date">[2011-11-22 00:00:00]</p>
	<!--/.article_ft--></footer>
	<!--/.article2--></article><!--}}}-->

	<article class="article3 span4"><!--{{{-->
	<h2><img src="/libs/social-media-icons/32px/wordpress.png" alt="From WordPress" width="32" height="32" /> Entry Title</h2>
	<div class="summary">
		Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text 
	<!--/.summary--></div>
	<footer class="article_ft">
		<p class="categories">Misc</p>
		<p class="date">[2011-12-28 00:00:00]</p>
	<!--/.article_ft--></footer>
	<!--/.article3--></article><!--}}}-->

	<article class="article4 span4"><!--{{{-->
	<h2><img src="/libs/social-media-icons/32px/wordpress.png" alt="From WordPress" width="32" height="32" /> Entry Title</h2>
	<div class="summary">
		Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text 
	<!--/.summary--></div>
	<footer class="article_ft">
		<p class="categories">Misc</p>
		<p class="date">[2011-12-29 00:00:00]</p>
	<!--/.article_ft--></footer>
	<!--/.article4--></article><!--}}}-->

	<article class="article5 span4"><!--{{{-->
	<h2><img src="/libs/social-media-icons/32px/wordpress.png" alt="From WordPress" width="32" height="32" /> Entry Title</h2>
	<div class="summary">
		Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text Summary Text 
	<!--/.summary--></div>
	<footer class="article_ft">
		<p class="categories">Misc</p>
		<p class="date">[2011-12-30 00:00:00]</p>
	<!--/.article_ft--></footer>
	<!--/.article5--></article><!--}}}-->

<!--/.articles--></div>

<section class="tweets">
<h2>Tweets (@seckie_)</h2>
<?php
include_once('./api/get_user_tl.php');
?>
<!--/.tweets--></section>

<!--/.row--></div>

<!--/.container area_bd--></div>

<footer class="area_ft">
<div class="container">
<p class="copyright"><small>&copy; All writing by <a href="/about">Naoki Sekiguchi</a>.</small>
<small>Design framework by <a href="http://twitter.github.com/bootstrap/">Bootstrap</a>.</small>
<small>Social icons by <a href="http://icondock.com/free/vector-social-media-icons">IconDock.com</a>.</small></p>
<!--/.container--></div>
<!--/.area_ft--></footer>

</body>
</html>
