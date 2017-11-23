<?php
/**
 * Headers for security
 */
header("Content-Security-Policy: default-src 'self' 'unsafe-inline' *.google-analytics.com *.gravatar.com *.fontawesome.com; font-src 'self' data: *.fontawesome.com");

// Title
  global $page, $paged;

  $title = wp_title( '|', false, 'right' );

  // Add the blog name.
  $title .= get_bloginfo( 'name' );

  // Add the blog description for the home/front page.
  $site_description = get_bloginfo( 'description', 'display' );
  if ( $site_description && ( is_home() || is_front_page() ) )
    $title .= " | $site_description";

  // Add a page number if necessary:
  if ( $paged >= 2 || $page >= 2 )
    $title .= ' | ' . sprintf( __( 'Page %s', 'twentyeleven' ), max( $paged, $page ) );

// Description
  $description = is_singular() ? preg_replace('/(\n|\r|Continue reading &rarr;)/', '', strip_tags( get_the_excerpt() ) ) : get_bloginfo('description');

// Keywords
  $keywords = '';
  if (is_singular()) {
    $tags = wp_get_post_tags($post->ID);
    $tagLabels = array_map(function ($t) {
      return $t->name;
    }, $tags);
    if (count($tagLabels) > 0) {
      $keywords .= implode(',', $tagLabels) . ',';
    }
  }
  $keywords .= get_bloginfo('name');

// og:type
  $ogType = is_singular() ? 'article' : 'website';
// og:url
  $ogUrl = is_singular() ? get_permalink() : get_bloginfo('url');
// og:image
  if ( is_singular() and has_post_thumbnail() ) {
    $thumb_id = get_post_thumbnail_id();
    $ogImage = wp_get_attachment_image_src($thumb_id, 'full')[0];
  } else { 
    $ogImage = get_bloginfo('url') . '/img/og.png';
  }
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width" />
<title><?php echo $title; ?></title>
<meta name="description" content="<?php echo $description; ?>" />
<meta name="keywords" content="<?php echo $keywords; ?>" />
<meta property="og:type" content="<?php echo $ogType; ?>" />
<meta property="og:title" content="<?php echo $title; ?>" />
<meta property="og:description" content="<?php echo $description; ?>" />
<meta property="og:url" content="<?php echo $ogUrl; ?>" />
<meta property="og:image" content="<?php echo $ogImage; ?>" />
<link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/libs/bootstrap.min.css" />
<link rel="stylesheet" href="<?php bloginfo( 'stylesheet_url' ); ?>" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-1534567-1', 'auto');
ga('send', 'pageview');
</script>
<script>window.STYLESHEET_DIRECTORY = '<?php echo get_stylesheet_directory_uri();?>';</script>
<script src="<?php echo get_stylesheet_directory_uri(); ?>/libs/jquery.min.js"></script>
<script src="<?php echo get_stylesheet_directory_uri(); ?>/libs/jquery.masonry.min.js"></script>
<script src="<?php echo get_stylesheet_directory_uri(); ?>/libs/bootstrap.min.js"></script>
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
<nav class="navbar navbar-inverse area_hd">
<div class="container-fluid">
<div class="navbar-header">
  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
    <span class="sr-only">Toggle navigation</span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
  </button>
  <a class="navbar-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
<!--/.navbar-header--></div>
<div class="collapse navbar-collapse" id="navbar-collapse">
  <ul class="nav navbar-nav">
    <li<?php if (is_home()) { ?> class="active"<?php } ?>><a href="<?php bloginfo('url'); ?>/">Home</a></li>
    <li<?php if (is_page('blog') || (!is_home() && !is_page())) { ?> class="active"<?php }?>><a href="<?php bloginfo('url'); ?>/blog/">Blog</a></li>
    <li<?php if (is_page('about')) { ?> class="active"<?php } ?>><a href="<?php bloginfo('url'); ?>/about">About</a></li>
  </ul>
  <?php get_search_form(); ?>
  <ul class="social nav navbar-nav navbar-right">
    <li><a href="https://twitter.com/seckie_"><img src="<?php echo get_stylesheet_directory_uri(); ?>/libs/social-media-icons/16px/twitter.png" alt="" width="16" height="16" /> Twitter</a></li>
    <li><a href="https://www.facebook.com/profile.php?id=100001227105896"><img src="<?php echo get_stylesheet_directory_uri(); ?>/libs/social-media-icons/16px/facebook.png" alt="" width="16" height="16" /> Facebook</a></li>
    <li><a href="https://github.com/seckie"><img src="<?php echo get_stylesheet_directory_uri(); ?>/libs/social-media-icons/16px/github.png" alt="" width="16" height="16" /> GitHub</a></li>
  <!--./social--></ul>
<!--/.navbar-collapse--></div>
<!--/.container-fluid--></div>
<!--/.navbar--></nav>
