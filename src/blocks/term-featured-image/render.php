<?php
/**
 * 
 * Retrive the block attributes
 * 
 */
$aspect_ratio = array_key_exists('aspectRatio', $attributes) ? $attributes['aspectRatio'] : '';
$sizes = array_key_exists('sizes', $attributes) ? $attributes['sizes'] : null;
$full_width = array_key_exists('fullWidth', $attributes) ? $attributes['fullWidth'] : false;
$image_source = array_key_exists('imageSource', $attributes) ? $attributes['imageSource'] : 'full';
$lightbox = array_key_exists('lightbox', $attributes) ? $attributes['lightbox'] : false;
$linked_to_post = array_key_exists('linkedToPost', $attributes) ? $attributes['linkedToPost'] : false;
$additionnal_classname = array_key_exists('className', $attributes) ? $attributes['className'] : '';
$padding = array_key_exists('padding', $attributes) ? $attributes['padding'] : null;
$margin = array_key_exists('margin', $attributes) ? $attributes['margin'] : null;
$align = array_key_exists('align', $attributes) ? $attributes['align'] : null;

/**
 * 
 * Get additionnal data of the post thumbnail
 * 
 */
$post_id = get_the_ID();
$thumbnail = get_post_thumbnail_id($post_id);
$image_position = get_post_meta($post_id, 'featured_image_position', true);
$src = wp_get_attachment_image_src($thumbnail, $image_source ?? 'full') ?? ['', '', ''];
$srcset = wp_get_attachment_image_srcset($thumbnail, $image_source ?? 'full') ?? '';
$alt = get_post_meta($thumbnail, '_wp_attachment_image_alt', true);

/**
 * 
 * Define the figure attributes
 * 
 */

$figure_style_html = !$aspect_ratio ? '' : 'style="aspect-ratio:' . ($aspect_ratio === 'original' ? $src[1] . '/' . $src[2] : $aspect_ratio) . ';"';
$figure_id = 'id="img-' . substr(md5($thumbnail), 0, 5). '"';

$figure_classname = 'class="sg-image';
$figure_classname .= $full_width ? ' sg-image--full-width' : '';
$figure_classname .= ' sg-featured-image sg-lazy-image';
$figure_classname .= $lightbox && !$linked_to_post ? ' sg-lightbox-image' : '';
$figure_classname .= '"';

$figure_data = 'data-loaded="false"';
$figure_data .= $lightbox && !$linked_to_post ? 'data-transition="' . ($attributes['lightboxTransition'] || 'none') . '"' : '';



/**
 * 
 * Define the image attributes
 * 
 */

$width = isset($src[1]) ? 'width="' . $src[1] . '"' : '';
$height = isset($src[2]) ? 'height="' . $src[2] . '"' : '';
$data_src = isset($src[0]) ? 'data-src="' . esc_attr($src[0]) . '"' : '';
$alt = 'alt="' . esc_attr($alt) . '"';
$sizes = 'sizes="' . esc_attr(sg_generate_image_sizes($sizes)) . '"';
$data_srcset = 'data-srcset="' . esc_attr($srcset ?? '') . '"';
$image_style_html = $image_position ? 'style="object-position:' . $image_position['x'] * 100 . '%' . ' ' . $image_position['y'] * 100 . '%;"' : '';


/**
 * 
 * Get the utility block classNames 
 * 
 */
$classNames = sg_get_spacing_classname(['margin' => $margin, 'padding' => $padding]);
$classNames .= $additionnal_classname;
$classNames .= ($align === 'center' ? ' txt-ctr' : '');

//
// start of the html
//
?>
<div class="sg-image-container<?php echo ($classNames ? ' ' . esc_attr($classNames) . '"' : '') ?>">
    <?php
    /**
     * 
     * If the image is linked to the belonging post, add a `a` tag
     * 
     */
    if ($linked_to_post) : ?>
        <a href="<?php echo get_the_permalink(); ?>" rel="noopener noreferrer" aria-label="<?php echo get_the_title(); ?>">
        <?php endif;
    /**
     * Endif
     */

        ?>
        <figure <?php echo "$figure_style_html $figure_id $figure_classname $figure_data"; ?>>
            <?php
            /**
             * If the featured image has to be opened in a lightbox when clicked, add a `a` tag with `data-pswp-width` and `data-pswp-height`
             * 
             */
            if ($lightbox && !$linked_to_post) : ?>
                <a href="<?php echo esc_attr($src[0]); ?>" data-pswp-width="<?php echo $src[1] ?>" data-pswp-height="<?php echo $src[2] ?>" data-cropped="true" target="_blank">
                <?php endif; ?>

                <?php
                /**
                 * The image
                 * 
                 */
                ?>
                <img <?php echo "$width $height $alt $sizes $data_src $data_srcset $image_style_html"; ?> />


                <?php
                /**
                 * If the featured image has to be opened in a lightbox when clicked
                 * 
                 */
                if ($lightbox && !$linked_to_post) : ?>
                </a>
            <?php endif; ?>
        </figure>
        <?php if ($linked_to_post) : ?>
        </a>
    <?php endif; ?>
</div>