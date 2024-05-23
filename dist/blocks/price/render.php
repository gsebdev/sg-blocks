<?php
$post_id = get_the_ID();
$custom_classnames = $attributes['className'] ?? '';
$prices = get_post_meta($post_id, 'price', true);
?>
<div class='sg-price<?php echo ' ' . esc_attr($custom_classnames) ?>'>
    <table class="sg-price__list">
        <?php
        if ($prices) :
            foreach ($prices as $price) :
                $description = isset($price['description']) && !empty($price['description']) && trim($price['description']) !== ' ' ? esc_html(function_exists('pll__') ? pll__($price['description']) : $price['description']) : '';
                $name = isset($price['name']) && !empty($price['name']) && trim($price['name']) !== ' ' ? esc_html(function_exists('pll__') ? pll__($price['name']) : $price['name']) : '';
                $amount = isset($price['amount']) && $price['amount'] ? esc_html($price['amount']) . esc_html(isset($price['currency']) ? $price['currency'] : '') : '';
        ?>
                <tr>
                    <td class="title p-2"><?php echo $name ?></td>
                    <td class="price p-2"><?php echo $amount ?></td>
                    <td class="description p-2"><?php echo $description ?></td>
                </tr>
        <?php
            endforeach;
        endif; ?>
    </table>
</div>