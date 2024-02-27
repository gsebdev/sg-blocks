<?php
$post_id = get_the_ID();
$relatedPostType = $attributes['relatedPostType'];
$relatedTaxonomy = $attributes['relatedTaxonomy'];
$postNumber = $attributes['postNumber'] ?? -1;
$excluded_ids = $attributes['excludedIds'];
$layout = $attributes['layout'];
$gap = $attributes['gap'];
$margin = $attributes['margin'];
$padding = $attributes['padding'];

$query = sg_get_most_relevant_posts_by_taxonomy($post_id, $relatedPostType, $relatedTaxonomy, $postNumber, $excluded_ids);

while ($query && $query->have_posts()) {
    $query->the_post(); ?>
    <div><?php the_title(); ?></div>
    <?php
}
wp_reset_postdata();
