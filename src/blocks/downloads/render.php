<?php
$post_id = get_the_ID();
$custom_classnames = $attributes['className'] ?? '';
$downloads = get_post_meta($post_id, 'downloads', true) ?? [];
?>
<?php if ($downloads && is_array($downloads) && count($downloads) > 0) : ?>
    <div class='sg-downloads<?php echo ' ' . esc_attr($custom_classnames) ?>'>
        <ul>
            <?php foreach ($downloads as $download) :
                if ($download['id'] && is_numeric($download['id'])) : ?>
                    <li class="sg-downloads__item">

                        <a href="<?php echo wp_get_attachment_url((int)$download['id']) ?>" target="_blank" class="sg-icon-file-text color-secondary"><?php echo esc_html($download['title'] ?? '') ?></a>
                    </li>
            <?php endif;
            endforeach; ?>
        </ul>
    </div>
<?php endif; ?>