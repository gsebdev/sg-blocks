<?php

/**
 * Get the post ID
 */
$post_id = get_the_ID();

/**
 * 
 * Get all the block attributes
 * 
 */
$custom_classnames = $attributes['className'] ?? '';
$phone = array_key_exists('phone', $attributes) && strlen($attributes['phone']) > 0 ? $attributes['phone'] : get_option('phone_number');
$price = array_key_exists('customPrice', $attributes) && $attributes['customPrice'] ? $attributes['customPrice'] : get_post_lowest_price($post_id);
$src = get_post_meta($post_id, 'booking', true);

?>
<div class='sg-reservation p-3 txt-ctr<?php echo ' ' . esc_attr($custom_classnames) ?>'>
    <p class='title'><?php echo !$src ? __('Want to book?', 'sg-blocks') : __('Book online directly!', 'sg-blocks') ?></p>
    <div class='price py-2'><?php echo __('Starting from', 'sg-blocks') ?> <span><?php echo esc_html($price) ?>€</span></div>
    <?php
    /**
     * Check if the booking link is not available (then use the phone number to link)
     */
    if (!$src) :
        /**
         * The button text depends if a custom text has been provided otherwise display phone number 
         */
        $button_text = array_key_exists('buttonText', $attributes) && strlen($attributes['buttonText']) > 0 ? $attributes['buttonText'] : $phone;
    ?>
        <a class="sg-reservation-link cta" href="tel:<?php echo esc_attr(str_replace([' ', '(0)'], '', $phone)) ?>">
            <span class="icon-phone"></span>
            <?php echo esc_html($button_text) ?>
        </a>
    <?php else :
        /**
         * Set the button text based on the 'buttonText' attribute or a default value
         */
        $button_text = array_key_exists('buttonText', $attributes) && strlen($attributes['buttonText']) > 0 ? $attributes['buttonText'] : 'Réservez';
    ?>
        <button data-src="<?php echo esc_attr($src) ?>" class="sg-reservation-link cta online">
            <?php echo __(esc_html($button_text)) ?>
        </button>
        <div class='separator py-3 txt-ctr f-up'><span class='bg-color-bg px-2'>Ou</span></div>
        <p class='title-2'><?php _e('Call us', 'sg-blocks') ?></p>
        <p class='py-2 phone-2'><span class='icon-phone no-deco'><?php echo esc_html($phone) ?></span></p>
    <?php endif;
    ?>
</div>