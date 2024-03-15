<?php
$post_id = get_the_ID();
$custom_classnames = $attributes['className'] ?? '';
$prices = get_post_meta($post_id, 'price', true);

if (empty($prices)) {
    return;
}
$text_before = get_post_meta($post_id, 'text_before', true);
$min_price = get_post_lowest_price($prices);

if (!$min_price) {
    return;
}

$currency = $prices[0]['currency'] ?? '€';
?>
<p class='sg-mini-price<?php echo $custom_classnames ? ' ' . esc_attr($custom_classnames) : ''; ?>'>
    <?php if ($text_before) : ?>
        <span><?php echo esc_html($text_before); ?></span>
    <?php endif; ?>
    <span><?php echo esc_html($min_price) . esc_html($currency); ?></span>
</p>