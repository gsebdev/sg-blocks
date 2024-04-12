<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

if (!function_exists('get_post_lowest_price')) {
    function get_post_lowest_price($post_id): ?int
    {
        /**
         * Retrieve the prices associated with the post from the 'price' custom field
         * 
         * @param int|string $post_id The ID of the post
         * @return int|null The lowest price or null if no valid prices are found
         */
        if (!is_numeric($post_id)) {
            return null;
        }

        $post_prices = get_post_meta((int) $post_id, 'price', true);
        $post_prices = gettype($post_prices) === 'string' ? json_decode($post_prices) : $post_prices;

        if (is_array($post_prices) && !empty($post_prices)) {

            $prices = [];

            foreach ($post_prices as $price) {
                $prices[] = isset($price['amount']) && $price['amount'] ? $price['amount'] : (isset($price[1]) && $price[1] ? $price[1] : 0);
            }

            $lowest_price = min($prices);

            return $lowest_price > 0 ? $lowest_price : null;
        }
        return null;
    }
}


/**
 * Generate reservation source based on the input value.
 *
 * @param mixed $value The input value to generate reservation source from.
 * @return mixed The generated reservation source.
 */
if (!function_exists('generate_reservation_src')) {
    function generate_reservation_src($value)
    {
        $value = html_entity_decode($value);
        if (preg_match('/<iframe.*?src="(.*?)".*?>/i', $value, $matches)) {
            return $matches[1];
        } else if (filter_var($value, FILTER_VALIDATE_URL) !== false) {
            return $value;
        } else if (preg_match('/^[\p{L}\s@!\']+$/u', $value)) {
            $value = urlencode($value);
            return 'https://activiteez.com/u/23394979244009?&minisitePref=list&search=keyword&noTarget=false&limit=&start=&end=&embedded=true&summary=' . $value;
        } else {
            return false;
        }
    }
}


/**
 * Generate image sizes based on breakpoints and viewport width.
 *
 * @param array $sizes An array of sizes for different breakpoints.
 * @return string|null The string representation of the generated image sizes or null if $sizes is not an array.
 */
if (!function_exists('sg_generate_image_sizes')) {
    function sg_generate_image_sizes($sizes)
    {
        if ($sizes && is_array($sizes)) {
            $sizesString = "";
            $defaultSize = array_key_exists("default", $sizes) ? $sizes["default"] : null;

            foreach ($sizes as $breakpoint => $vw) {
                if ($breakpoint === "default") {
                    continue;
                } else {
                    if ((!is_numeric($breakpoint) || ($defaultSize && $defaultSize < ((int) $breakpoint * $vw) / 100)) || !$vw) {
                        continue;
                    } else {
                        $sizesString .= "(max-width:" . $breakpoint . "px) " . $vw . "vw,";
                    }
                }
            }

            if ($defaultSize) {
                $sizesString .= "(max-width:" . $defaultSize . "px) 100vw," . $defaultSize . "px";
            } else {
                $sizesString .= "100vw";
            }

            return $sizesString;
        } else {
            return null;
        }
    }
}

if (!function_exists('sg_get_spacing_classname')) {
    function sg_get_spacing_classname($attributes)
    {
        $properties = ["gap", "padding", "margin"];
        $classNames = "";

        foreach ($properties as $property) {
            if (!isset($attributes[$property])) continue;

            $shortHand = substr($property, 0, 1);

            foreach ($attributes[$property] as $key => $val) {
                if (isset($val) && $val !== null) {
                    if (is_numeric($val)) {
                        $classNames .= $shortHand . "-" . ($key !== "default" ? $key . "-" : "") . $val . " ";
                    } elseif (is_array($val) && (isset($val["x"]) || isset($val["y"]))) {
                        $x = isset($val["x"]) ? $shortHand . "x-" . ($key !== "default" ? $key . "-" : "") . $val["x"] . " " : "";
                        $y = isset($val["y"]) ? $shortHand . "y-" . ($key !== "default" ? $key . "-" : "") . $val["y"] . " " : "";
                        $classNames .= $x . $y;
                    }
                }
            }
        }

        return $classNames;
    }
}

/**
 * Generates a classname based on the provided columns object.
 * @param $columns - The columns object to generate the classname from.
 * @return string - The generated classname.
 */
if (!function_exists('sg_get_columns_classname')) {
    function sg_get_columns_classname($columns): string
    {
        if ($columns) {
            return implode(' ', array_map(function ($key, $val) {
                return (isset($val) && $val) ? "columns-" . ($key !== "default" ? $key . "-" : "") . $val . " " : "";
            }, array_keys($columns), $columns));
        } else {
            return "";
        }
    }
}



/**
 * Get the most relevant posts by a specific taxonomy.
 *
 * @param int $post_id The ID of the reference post.
 * @param string|array $post_types The post types to include in the query.
 * @param string $taxonomy The taxonomy to filter by.
 *
 * @return WP_Query The query result containing the most relevant posts.
 */
if (!function_exists('sg_get_posts')) {
    function sg_get_posts($post_type, array $args = array())
    {

        $post_id = $args['related_post_id'] ?? null;
        $taxonomy = $args['query_taxonomy'] ?? null;
        $excluded_ids = $args['excluded_ids'] ?? [];
        $taxonomy_term = $args['query_taxonomy_terms'] ?? null;
        $number_of_posts = $args['number_of_posts'] ?? -1;
        $orderby = $args['order_by'] ?? 'date';
        $order = $args['order'] ?? 'desc';

        $is_related_query = !!$post_id && $args['related_query'];
        
        // Can't get any post if no post type provided
        if (!$post_type || ($is_related_query && !$taxonomy)) return null;

        if (!is_array($excluded_ids)) {
            $excluded_ids = [];
        }

        // Get term IDs associated with the reference post.
        $terms = $is_related_query && $taxonomy ? get_the_terms($post_id, $taxonomy) : null;

        $post_term_slugs = [];

        if (is_array($terms)) {
            $post_term_slugs = array_map(function ($term) {
                return $term->slug;
            }, $terms);
        }

        // Query.
        $query_args = array(
            'post_type'      => $post_type,
            'post_status'    => 'publish',
            'post__not_in'   => array_merge($excluded_ids, $is_related_query ? [$post_id] : []),
            'posts_per_page' => !$is_related_query ? $number_of_posts : -1,
            'page'           => 1,
        )

            + ($order && $orderby ? array(
                'orderby' => $orderby === 'featured' ? array('menu_order' => $order, 'modified' => $order) : $orderby,
                'order' => $order
            ) : [])
            + ($taxonomy && ($post_term_slugs || $taxonomy_term) ? array(
                'tax_query' => array(
                    array(
                        'taxonomy' => $taxonomy,
                        'field'    => 'slug',
                        'terms'    => $is_related_query ? $post_term_slugs : $taxonomy_term,
                    )
                )
            ) : []);

        $query = new WP_Query($query_args);

        if (!$query->have_posts()) {
            return null;
        }

        if (!$is_related_query) {
            return $query;
        }

        //Define a mapping function to get the term ID.
        if (!function_exists('get_term_slug')) {
            function get_term_slug($term)
            {
                return $term->slug;
            };
        }

        // Sort the related posts based on the number of match terms.
        usort(
            $query->posts,
            function ($a, $b) use ($post_term_slugs, $taxonomy) {
                $a_terms = get_the_terms($a->ID, $taxonomy);
                $b_terms = get_the_terms($b->ID, $taxonomy);
                $apos = count(array_intersect(array_map('get_term_slug',  is_array($a_terms) ? $a_terms : []), $post_term_slugs));
                $bpos = count(array_intersect(array_map('get_term_slug',  is_array($b_terms) ? $b_terms : []), $post_term_slugs));

                return ($apos < $bpos) ? 1 : -1;
            }
        );

        if (is_numeric($number_of_posts) && $number_of_posts > 0 && $number_of_posts < $query->post_count) {
            $query->posts = array_slice($query->posts, 0, $number_of_posts);
            $query->post_count = $number_of_posts;
        }

        return $query;
    }
    return null;
}
