<?php
$postId = get_the_ID();
$classNames = $attributes['className'] ?? '';
$textBefore = $attributes['text_before'] ?? '';

$minPrice = get_post_lowest_price($postId);

if (!$minPrice) {
    printf(
        '<p class="sg-mini-price%s">Tarifs sur demande</p>',
        $classNames ? " $classNames" : ''
    );
    return;
}

$currency = $minPrice['currency'] ?? '€';
printf(
    '<p class="sg-mini-price%s">%s%s%s</p>',
    $classNames ? " $classNames" : '',
    $textBefore ? "{$textBefore} " : '',
    "<span>" . esc_html($minPrice) . "</span>",
    esc_html($currency)
);
