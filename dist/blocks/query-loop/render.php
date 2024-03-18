<?php

/**
 * Determines whether a block list contains a block that uses the featured image.
 *
 * @param WP_Block_List $inner_blocks Inner block instance.
 *
 * @return bool Whether the block list contains a block that uses the featured image.
 */
if (!function_exists('block_sg_query_related_uses_featured_image')) {
    function block_sg_query_related_uses_featured_image($inner_blocks)
    {
        foreach ($inner_blocks as $block) {
            if ('core/post-featured-image' === $block->name || 'sg/featured-image' === $block->name) {
                return true;
            }
            if (
                'core/cover' === $block->name &&
                !empty($block->attributes['useFeaturedImage'])
            ) {
                return true;
            }
            if ($block->inner_blocks && block_sg_query_related_uses_featured_image($block->inner_blocks)) {
                return true;
            }
        }

        return false;
    }
}


/**
 * Renders the `sg/query-related` block on the server.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 *
 * @return string Returns the output of the query, structured using the layout defined by the block's inner blocks.
 */
if (!function_exists('render_block_sg_query_related')) {
    function render_block_sg_query_related($attributes, $content, $block)
    {
        $post_id = get_the_ID();
        $queryPostType = $attributes['queryPostType'] ?? null;
        $queryTaxonomy = $attributes['queryTaxonomy'] ?? null;
        $queryTaxonomyTerms = $attributes['queryTaxonomyTerms'] ?? null;
        $postNumber = $attributes['postNumber'];
        $excluded_ids = $attributes['excludedIds'] ?? [];
        $order_by = $attributes['orderBy'] ?? 'date';
        $order = $attributes['order'] ?? 'desc';
        $related_query = $attributes['relatedQuery'];

        $columns = $attributes['columns'] ?? null;
        $gap = $attributes['gap'] ?? null;
        $margin = $attributes['margin'] ?? null;
        $padding = $attributes['padding'] ?? null;
        $additionnal_classname = $attributes['className'] ?? '';

        $slider = $attributes['slider'] ?? null;
        $sliderBreakpoint = $attributes['sliderBreakpoint'] ?? null;
        $slider_autoplay = $attributes['sliderAutoplay'] ?? null;
        $slider_display_nav = $attributes['sliderDisplayNavElements'] ?? null;


        $query = sg_get_posts($queryPostType, array(
            'number_of_posts' => $postNumber ? $postNumber : -1,
            'order_by' => $order_by,
            'order' => $order,
            'excluded_ids' => $excluded_ids,
            'query_taxonomy' => $queryTaxonomy,
            'query_taxonomy_terms' => $queryTaxonomyTerms,
            'related_post_id' => $post_id,
            'related_query' => $related_query
        ));


        if (!$query || !$query->have_posts()) {
            return '';
        }

        if (block_sg_query_related_uses_featured_image($block->inner_blocks)) {
            update_post_thumbnail_cache($query);
        }

        $list_classNames = sg_get_spacing_classname(['margin' => $margin, 'padding' => $padding, 'gap' => $gap]) . sg_get_columns_classname($columns) . $additionnal_classname . ($slider ? ' sg-swiper__wrapper' : '');
        $container_classNames = 'sg-query-related' . ($slider ? ' sg-swiper' : '');
        $container_attr = $slider && !!$sliderBreakpoint ? 'data-breakpoint="' . $sliderBreakpoint . '"' : '';
        $container_attr .= $slider && !!$slider_autoplay ? ' data-autoplay="' . $slider_autoplay . '"' : '';
        $item_classNames = $slider ? 'sg-swiper__slide' : '';

        $content = '';
        while ($query && $query->have_posts()) {
            $query->the_post();

            // Get an instance of the current Post Template block.
            $block_instance = $block->parsed_block;

            // Set the block name to one that does not correspond to an existing registered block.
            // This ensures that for the inner instances of the Post Template block, we do not render any block supports.
            $block_instance['blockName'] = 'sg/null';

            $post_id              = get_the_ID();
            $post_type            = get_post_type();
            $filter_block_context = static function ($context) use ($post_id, $post_type) {
                $context['postType'] = $post_type;
                $context['postId']   = $post_id;
                return $context;
            };

            // Use an early priority to so that other 'render_block_context' filters have access to the values.
            add_filter('render_block_context', $filter_block_context, 1);
            // Render the inner blocks of the Post Template block with `dynamic` set to `false` to prevent calling
            // `render_callback` and ensure that no wrapper markup is included.
            $block_content = (new WP_Block($block_instance))->render(array('dynamic' => false));
            remove_filter('render_block_context', $filter_block_context, 1);
            $class = $item_classNames ? " class=\"{$item_classNames}\"" : '';
            $content .= "<li{$class}>"
                . "<a href=\"" . esc_url(get_the_permalink()) . "\" "
                . "aria-label=\"" . esc_attr(get_the_title()) . "\" "
                . "rel=\"noopener noreferrer\"></a>"
                . $block_content
                . '</li>';
        }
        $nav_elements = '';
        if ($slider && $slider_display_nav) {
            $nav_elements = '<button class="sg-swiper__nav sg-icon-cheveron-left" data-direction="prev"></button><button class="sg-swiper__nav sg-icon-cheveron-right" data-direction="next"></button>';
        }

        wp_reset_postdata();

        return sprintf(
            '<div class="%1$s" %2$s><ul class="sg-query-related__list %3$s">%4$s</ul>%5$s</div>',
            $container_classNames,
            $container_attr,
            $list_classNames,
            $content,
            $nav_elements
        );
    }
}

echo render_block_sg_query_related($attributes, $content, $block);
