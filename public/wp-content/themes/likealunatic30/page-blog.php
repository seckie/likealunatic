<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package WordPress
 * @subpackage Twenty_Eleven
 * @since Twenty Eleven 1.0
 */

get_header(); ?>

<div class="container area_bd">
  <div class="row">
    <div class="col-md-8 col-xs-12" id="primary">
      <div id="content" role="main">
      <?php
        $temp_query = clone $wp_query;
        query_posts('posts_per_page=5');
      ?>
      <?php if ( have_posts() ) : ?>
        <?php while ( have_posts() ) : the_post(); ?>
          <?php get_template_part( 'content', 'blog' ); ?>
        <?php endwhile; ?>
      <?php endif; ?>
      <?php $wp_query = clone $temp_query; ?>

      <!--/#content--></div>
    <!--/#primary--></div>

<?php get_sidebar(); ?>

  <!--/.row--></div>
<!--/.container area_bd--></div>
<?php get_footer(); ?>
