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
