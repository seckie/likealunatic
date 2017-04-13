<article class="span4" id="post-<?php the_ID(); ?>">
<h3><a href="<?php the_permalink(); ?>" rel="bookmark"><img src="<?php echo get_stylesheet_directory_uri(); ?>/libs/social-media-icons/32px/wordpress.png" alt="From WordPress" width="32" height="32" /> <?php the_title(); ?></a></h3>
<div class="summary">
<?php
// The function is defined in header.php
the_excerpt_max_charlength(140);
?>
<!--/.summary--></div>
<footer class="article_ft">
<p class="categories"><?php the_category(', '); ?></p>
<p class="date">[<?php the_date('Y-m-d H:i:s'); ?>]</p>
<!--/.article_ft--></footer>
<!--/.article1--></article>
