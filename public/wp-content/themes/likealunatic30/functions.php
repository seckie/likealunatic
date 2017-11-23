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
    <nav class="pagination-wrapper" id="<?php echo $nav_id; ?>">
      <ul class="pagination pagination-lg">
      <li class="prev nav-previous"><?php next_posts_link( __( '<span class="meta-nav">&larr;</span> Older posts', 'twentyeleven' ) ); ?></li>
      <li class="next nav-next"><?php previous_posts_link( __( 'Newer posts <span class="meta-nav">&rarr;</span>', 'twentyeleven' ) ); ?></li>
      </ul>
    <!-- #<?php echo $nav_id; ?> --></nav>
  <?php endif;
}
endif; // likealunatic30_content_nav

// Hide "generator" meta tag
remove_action('wp_head', 'wp_generator');

/**
 * Headers for security
 */
header("Strict-Transport-Security: max-age=31536000");
header("X-Frame-Options: SAMEORIGIN");
header("X-XSS-Protection: 1; mode=block");
header("X-Content-Type-Options: nosniff");
header("Referrer-Policy: no-referrer-when-downgrade");

