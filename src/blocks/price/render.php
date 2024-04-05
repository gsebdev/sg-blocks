<?php
$post_id = get_the_ID();
$custom_classnames = $attributes['className'] ?? '';
$prices = get_post_meta($post_id, 'price', true);
?>
<div class='sg-price<?php echo ' ' . esc_attr($custom_classnames) ?>'>
    <table class="sg-price__list">
        <?php
        if ($prices) :
            foreach ($prices as $price) : ?>
                <tr >
                    <td class="title p-2">
                        <?php echo isset($price['name']) && $price['name'] ? esc_html($price['name']) : '' ?>
                    </td>
                    <td class="price p-2">
                        <?php echo isset($price['amount']) && $price['amount'] ? esc_html($price['amount']) . esc_html($price['currency']) : '' ?>
                    </td>
                    <td class="description p-2">
                        <?php echo isset($price['description']) && $price['description'] ? esc_html($price['description']) : '' ?>
                    </td>
                </tr>
                <?php
            endforeach;
        endif; ?>
    </table>
</div>