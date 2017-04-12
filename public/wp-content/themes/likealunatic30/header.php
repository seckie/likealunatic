<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width" />
<title><?php
	/*
	 * Print the <title> tag based on what is being viewed.
	 */
	global $page, $paged;

	wp_title( '|', true, 'right' );

	// Add the blog name.
	bloginfo( 'name' );

	// Add the blog description for the home/front page.
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) )
		echo " | $site_description";

	// Add a page number if necessary:
	if ( $paged >= 2 || $page >= 2 )
		echo ' | ' . sprintf( __( 'Page %s', 'twentyeleven' ), max( $paged, $page ) );

	?></title>
<link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/libs/bootstrap.css" />
<link rel="stylesheet" href="<?php bloginfo( 'stylesheet_url' ); ?>" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="<?php echo get_stylesheet_directory_uri(); ?>/libs/jquery.masonry.min.js"></script>
<script src="<?php echo get_stylesheet_directory_uri(); ?>/libs/bootstrap-modal.js"></script>
<script src="<?php echo get_stylesheet_directory_uri(); ?>/script.js"></script>
<?php
	/* We add some JavaScript to pages with the comment form
	 * to support sites with threaded comments (when in use).
	 */
	if ( is_singular() && get_option( 'thread_comments' ) )
		wp_enqueue_script( 'comment-reply' );

	/* Always have wp_head() just before the closing </head>
	 * tag of your theme, or you will break many plugins, which
	 * generally use this hook to add elements to <head> such
	 * as styles, scripts, and meta tags.
	 */
	wp_head();
?>
</head>
<body <?php body_class(); ?>>
<header class="topbar area_hd"<?php
if (is_user_logged_in()) {
	echo ' style="margin-top:28px;"';
}
?>>
<div class="topbar-inner">
<div class="container">
	<p class="brand"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
	<nav class="global">
	<ul class="nav">
		<li<?php if (is_home()) {
			echo ' class="active"';
		} ?>><a href="<?php bloginfo('url'); ?>/">Home</a></li>
		<li<?php if (is_page('blog') || (!is_home() && !is_page())) {
			echo ' class="active"';
		}?>><a href="<?php bloginfo('url'); ?>/blog/">Blog</a></li>
		<li<?php if (is_page('about')) {
			echo ' class="active"';
		}?>><a href="<?php bloginfo('url'); ?>/about">About</a></li>
	</ul>
	<!--/.global--></nav>

	<?php get_search_form(); ?>
	<aside class="social">
	<ul class="nav secondary-nav">
		<li><a href="https://twitter.com/seckie_"><img src="/libs/social-media-icons/16px/twitter.png" alt="" width="16" height="16" /> Twitter</a></li>
		<li><a href="https://www.facebook.com/profile.php?id=100001227105896"><img src="/libs/social-media-icons/16px/facebook.png" alt="" width="16" height="16" /> Facebook</a></li>
		<li><a href="https://github.com/seckie"><img src="/libs/social-media-icons/16px/github.png" alt="" width="16" height="16" /> GitHub</a></li>
	</ul>
	<!--/.social--></aside>
</div>
<!--/.topbar-inner--></div>
<!--/.area_hd--></header>

<?php
// Function from wordress.org
// http://codex.wordpress.org/Function_Reference/get_the_excerpt
function the_excerpt_max_charlength($charlength) {
	$excerpt = get_the_excerpt();
	$charlength++;

	if ( mb_strlen( $excerpt ) > $charlength ) {
		$subex = mb_substr( $excerpt, 0, $charlength - 5 );
		$exwords = explode( ' ', $subex );
		$excut = - ( mb_strlen( $exwords[ count( $exwords ) - 1 ] ) );
		if ( $excut < 0 ) {
			echo mb_substr( $subex, 0, $excut );
		} else {
			echo $subex;
		}
		echo '[...]';
	} else {
		echo $excerpt;
	}
}
?>