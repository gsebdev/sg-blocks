<?php
$aspect_ratio = $attributes['aspectRatio'];
$sizes = $attributes['sizes'];
$image_source = $attributes['imageSource'];
$lightbox = $attributes['lightbox'];
$additionnal_classname = $attributes['className'];
$padding = $attributes['padding'];
$margin = $attributes['margin'];
$align = $attributes['align'];

$post_id = get_the_ID();
$thumbnail = get_post_thumbnail_id($post_id);
$image_position = get_post_meta($post_id, 'featured_image_position', true);

$src = wp_get_attachment_image_src($thumbnail, $image_source ?? 'full');
$srcset = wp_get_attachment_image_srcset($thumbnail, $image_source ?? 'full');
$srcset = $srcset ? $srcset : '';

$sizes_string = sg_generate_image_sizes($sizes);
$alt = get_post_meta($thumbnail, '_wp_attachment_image_alt', true);

$style_html = '';

if ($aspect_ratio) {
    $style_html .= 'aspect-ratio:' . $aspect_ratio . ';';
}
if ($image_position) {
    $style_html .= 'object-position:' . $image_position['x'] * 100 . '%' . ' ' . $image_position['y'] * 100 . '%;';
}

$width = 'width="' . $src[1] . '"';
$height = 'height="' . $src[2] . '"';
$data_src = 'data-src="' . esc_attr($src[0]) . '"';
$alt = 'alt="' . esc_attr($alt) . '"';
$sizes = 'sizes="' . esc_attr($sizes_string) . '"';
$data_srcset = 'data-srcset="' . esc_attr($srcset) . '"';
$random_id = substr(md5($thumbnail), 0, 8);
$classNames = sg_get_spacing_classname(['margin' => $margin, 'padding' => $padding]) . $additionnal_classname . ($align === 'center' ? ' txt-ctr' : '');
?>
<div <?php echo ($classNames ? 'class="' . esc_attr($classNames) . '"' : '') ?>>
    <figure id="<?php echo $random_id; ?>" class="sg-image sg-featured-image sg-lazy-image sg-lightbox-image" data-loaded="false" data-transition="<?php echo $attributes['lightboxTransition'] ?? 'none'; ?>">
        <?php if ($lightbox) : ?>
            <a href="<?php echo esc_attr($src[0]); ?>" data-pswp-width="<?php echo $src[1] ?>" data-pswp-height="<?php echo $src[2] ?>" data-cropped="true" target="_blank">
            <?php endif; ?>
            <img <?php echo $width . ' ' . $height . ' ' . $alt . ' ' . $sizes . ' ' . $data_src . ' ' . $data_srcset; ?> <?php echo $style_html ? 'style="' . esc_attr($style_html) . '"' : '' ?> />
            <?php if ($lightbox) : ?>
            </a>
        <?php endif; ?>
    </figure>
</div>