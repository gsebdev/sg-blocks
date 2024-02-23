<?php
$post_id = get_the_ID();
$custom_classnames = $attributes['className'] ?? '';
$prices = get_post_meta($post_id, 'price', true);
?>
<div class='sg-price<?php echo ' ' . esc_attr($custom_classnames) ?>'>
    <table class="sg-price__list color-primary f-s txt-ctr">
        <?php
        if ($prices) :
            foreach ($prices as $price) : ?>
                <tr class="f-s">
                    <td>
                        <?php echo isset($price['name']) && $price['name'] ? $price['name'] : '' ?>
                    </td>
                    <td class="f-sb">
                        <?php echo esc_html($price['amount']) . esc_html($price['currency']) ?>
                    </td>
                    <td class="f-xxs">
                        <?php echo esc_html($price['description']) ?>
                    </td>
                </tr>
                <?php
            endforeach;
        endif; ?>
    </table>
</div>