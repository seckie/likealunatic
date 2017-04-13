<?php get_header(); ?>

<div class="container area_bd">
<p class="description"><?php bloginfo( 'description' ); ?></p>

<div class="contents-index">
<div class="articles">

<?php if ( have_posts() ) : ?>
  <?php while ( have_posts() ) : the_post(); ?>
    <?php get_template_part('content', 'home'); ?>
  <?php endwhile; ?>
<?php else : ?>
  <article id="post-0" class="post no-results not-found">
    <header class="entry-header">
      <h1 class="entry-title"><?php _e( 'Nothing Found', 'twentyeleven' ); ?></h1>
    </header><!-- .entry-header -->

    <div class="entry-content">
      <p><?php _e( 'Apologies, but no results were found for the requested archive. Perhaps searching will help find a related post.', 'twentyeleven' ); ?></p>
      <?php get_search_form(); ?>
    </div><!-- .entry-content -->
  </article><!-- #post-0 -->
<?php endif; ?>

<!--/.articles--></div>

<section class="tweets">
<h2>Tweets (@seckie_)</h2>
<div class="tweets-contents">
<!--/.tweets-contents--></div>
<!--/.tweets--></section>

<!--/.contents--></div>
<!--/.container area_bd--></div>
<?php get_footer(); ?>
