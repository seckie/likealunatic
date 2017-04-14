<?php
/**
 * The Template for displaying all single posts.
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

        <?php while ( have_posts() ) : the_post(); ?>
          <?php get_template_part( 'content', 'single' ); ?>
          <nav class="pagination-wrapper" id="nav-single">
            <ul class="pagination pagination-lg">
              <li class="prev nav-previous"><?php previous_post_link( '%link', '&larr; %title'  ); ?></li>
              <li class="next nav-next"><?php next_post_link( '%link', ' %title &rarr;' ); ?></li>
            </ul>
          <!-- #nav-single --></nav>

          <?php comments_template( '', true ); ?>
        <?php endwhile; // end of the loop. ?>

      <!--/#content--></div>
    <!--/#primary--></div>
<?php get_sidebar(); ?>
  <!--/.row--></div>
<!--/.container area_bd--></div>
<?php get_footer(); ?>
