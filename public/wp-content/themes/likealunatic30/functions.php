<?php
add_action('after_setup_theme', 'likealunatic30_setup');
if (! function_exists('likealunatic30_setup')) {
    function likealunatic30_setup ()
    {
    // overwrite "twentyeleven" language file
        load_theme_textdomain('twentyeleven', STYLESHEETPATH . '/languages');
    }
}

if ( ! function_exists( 'likealunatic30_content_nav' ) ) :
/**
 * Display navigation to next/previous pages when applicable
 *
 * Original function is from "twentyeleven" theme
 */
function likealunatic30_content_nav( $nav_id ) {
  global $wp_query;

  if ( $wp_query->max_num_pages > 1 ) : ?>
    <nav class="pagination" id="<?php echo $nav_id; ?>">
      <h3 class="assistive-text"><?php _e( 'Post navigation', 'twentyeleven' ); ?></h3>
      <ul>
      <li class="prev nav-previous"><?php next_posts_link( __( '<span class="meta-nav">&larr;</span> Older posts', 'twentyeleven' ) ); ?></li>
      <li class="next nav-next"><?php previous_posts_link( __( 'Newer posts <span class="meta-nav">&rarr;</span>', 'twentyeleven' ) ); ?></li>
      </ul>
    </nav><!-- #<?php echo $nav_id; ?> -->
  <?php endif;
}
endif; // likealunatic30_content_nav


?>
