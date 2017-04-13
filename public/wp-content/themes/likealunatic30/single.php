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
    <div class="span12" id="primary">
      <div id="content" role="main">

        <?php while ( have_posts() ) : the_post(); ?>

          <?php get_template_part( 'content', 'single' ); ?>

          <nav class="pagination" id="nav-single">
            <ul>
            <li class="prev nav-previous"><?php previous_post_link( '%link', '&larr; %title'  ); ?></li>
            <li class="next nav-next"><?php next_post_link( '%link', ' %title &rarr;' ); ?></li>
            </ul>
          </nav><!-- #nav-single -->

          <?php comments_template( '', true ); ?>

        <?php endwhile; // end of the loop. ?>

      </div><!-- #content -->
    </div><!-- #primary -->

<?php get_sidebar(); ?>

<!--/.row--></div>
<!--/.container area_bd--></div>
<?php get_footer(); ?>
