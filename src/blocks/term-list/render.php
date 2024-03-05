<?php

if (!function_exists('render_list_of_terms')) {
    /**
     * Render a list of terms with specified attributes
     * 
     * @param array $attributes The attributes of the block
     * @return string The rendered HTML 
     */
    function render_list_of_terms($attributes)
    {

        $taxonomy = $attributes['taxonomy'] ?? 'category';
        $horizontalLayout = $attributes['horizontalLayout'] ?? true;
        $centerItems = $attributes['centerItems'] ?? false;
        $fontSize = $attributes['fontSize'] ?? 'm';
        $separator = $attributes['separator'] ?? false;
        $font_heading = $attributes['fontHeading'] ?? true;
        $custom_classNames = $attributes['className'] ?? '';
        $linked = $attributes['linked'] ?? false;

        // Get the current post ID and its terms
        $postID = get_the_ID();
        $terms = get_the_terms($postID, $taxonomy);

        if (!$terms || !is_array($terms)) {
            return ''; // No terms found
        }

        // Generate gap class names based on provided values
        $gap_classNames = sg_get_spacing_classname($attributes);

        // Generate class names based on attributes
        $className = 'sg-term-list';
        $className .= $horizontalLayout ? ' flx flx-wrap' : '';
        $className .= $fontSize ? ' f-' . esc_attr($fontSize) : '';
        $className .= ' ' . $custom_classNames . ' ' . $gap_classNames;
        $className .= $centerItems ? ' flx-ctr txt-ctr' : '';


        if ($font_heading) {
            $className .= ' f-heading';
        }

        $content = '';
        foreach ($terms as $index => $term) {
            $a_class = 'sg-tags-' . esc_attr($taxonomy);
            $li_class = $index > 0 && $separator ? 'class="separator"' : '';

            $href = $linked ? ' href="' . get_term_link($term->term_id) . '"' : '';
            $text = esc_html($term->name);
            $color = get_term_meta($term->term_id, 'color', true);
            $style = $color ? ' style="color:' . $color . '"' : '';
            $element_tag = $linked ? 'a' : 'span';
            $content .= "<li $li_class><$element_tag class=\"$a_class\"$href$style>$text</$element_tag></li>";
        }

        return "<ul class=\"$className\">$content</ul>";
    }
}

echo render_list_of_terms($attributes);