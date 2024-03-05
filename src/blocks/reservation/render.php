<?php
$post_id = get_the_ID();
$custom_classnames = $attributes['className'] ?? '';
$phone = array_key_exists('phone', $attributes) && strlen($attributes['phone']) > 0 ? $attributes['phone'] : get_option('phone_number');
$price = array_key_exists('customPrice', $attributes) && $attributes['customPrice'] ? $attributes['customPrice'] : get_post_lowest_price($post_id);
$src = get_post_meta($post_id, 'booking', true);
?>
<div class='sg-reservation p-3 my-2 txt-ctr<?php echo ' ' . esc_attr($custom_classnames) ?>'>
    <p class='f-s f-sb'><?php echo !$src ? __('Envie de réserver ?') : __('Réservez directement en ligne !') ?></p>
    <div class='py-2 f-xs color-secondary f-up'><?php echo __('à partir de') ?> <span class='f-sm f-sb'><?php echo esc_html($price) ?>€</span></div>
    <?php

    if (!$src) :
        $button_text = array_key_exists('buttonText', $attributes) && strlen($attributes['buttonText']) > 0 ? $attributes['buttonText'] : $phone;
    ?>
        <a class="sg-reservation-link cta" href="tel:<?php echo esc_attr(str_replace([' ', '(0)'], '', $phone)) ?>">
            <?php echo esc_html($button_text) ?>
        </a>
    <?php else : 
        $button_text = array_key_exists('buttonText', $attributes) && strlen($attributes['buttonText']) > 0 ? $attributes['buttonText'] : 'Réservez';
        ?>
        <button data-src="<?php echo esc_attr($src) ?>" class="sg-reservation-link cta">
            <?php echo __(esc_html($button_text)) ?>
        </button>
        <div class='separator py-3 txt-ctr f-up f-xs color-grey-1'><span class='bg-color-bg px-2'>Ou</span></div>
        <p class='f-s'><?php echo __('Appelez-nous') ?></p>
        <p class='py-2 f-s f-sb'><span class='icon-phone no-deco color-secondary'><?php echo esc_html($phone) ?></span></p>
    <?php endif;
    ?>
</div>