<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

if (!function_exists('get_post_lowest_price')) {
    function get_post_lowest_price(int $post_id): ?int
    {
        /**
         * Retrieve the prices associated with the post from the 'price' custom field
         * 
         * @param int $post_id The ID of the post
         * @return int|null The lowest price or null if no valid prices are found
         */
        $post_prices = get_post_meta($post_id, 'price', true);
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
 * Get the most relevant posts by a specific taxonomy.
 *
 * @param int $post_id The ID of the reference post.
 * @param string|array $post_types The post types to include in the query.
 * @param string $taxonomy The taxonomy to filter by.
 *
 * @return WP_Query The query result containing the most relevant posts.
 */
if (!function_exists('sg_get_most_relevant_posts_by_taxonomy')) {
    function sg_get_most_relevant_posts_by_taxonomy($post_id, $post_types, $taxonomy, $number = null, $excluded_ids = [])
    {
        if (!function_exists('get_term_id')) {
            function get_term_id($term)
            {
                return $term->term_id;
            };
        }
        // Get term IDs associated with the reference post.
        $terms = get_the_terms($post_id, $taxonomy);

        if (is_array($terms)) {
            $post_term_ids = array_map(function ($term) {
                return $term->term_id;
            }, $terms);

            // Query.
            $related_args = array(
                'post_type'      => $post_types,
                'post_status'    => 'publish',
                'tax_query'      => array(
                    array(
                        'taxonomy' => $taxonomy,
                        'field'    => 'id',
                        'terms'    => $post_term_ids,
                    ),
                ),
                'post__not_in'   => array($post_id, ...$excluded_ids),
                'posts_per_page' => -1,
            );

            $related_query = new WP_Query($related_args);

            // Sort the related posts based on the number of match terms.
            if ($related_query->have_posts()) {
                usort($related_query->posts, function ($a, $b) use ($post_term_ids) {
                    $a_terms = get_the_terms($a->ID, 'sport');
                    $b_terms = get_the_terms($b->ID, 'sport');
                    $apos = count(array_intersect(array_map('get_term_id',  is_array($a_terms) ? $a_terms : []), $post_term_ids));
                    $bpos = count(array_intersect(array_map('get_term_id',  is_array($b_terms) ? $b_terms : []), $post_term_ids));

                    return ($apos < $bpos) ? 1 : -1;
                });
            }

            if ($number && $number > 0 && $number < $related_query->post_count) {
                $related_query->posts = array_slice($related_query->posts, 0, $number);
                $related_query->post_count = $number;
            }

            return $related_query;
        }
        return null;
    }
}
