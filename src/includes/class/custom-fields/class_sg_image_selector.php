<?php

namespace gsebdev\CustomFields;

if (!class_exists('SG_Image_Selector')) {
    class SG_Image_Selector extends SG_Field
    {

        public function enqueue()
        {
            if (is_admin() && !defined('DOING_AJAX')) {

                add_action('init', function () {
                    if (!wp_script_is('media', 'enqueued') || !wp_script_is('media-editor', 'enqueued') || !wp_script_is('wp-api-request', 'enqueued')) {
                        wp_enqueue_media();
                    }
                });
                if (!did_action('wp_admin_print_footer_scripts') && !did_action('init')) {
                    add_action('admin_print_footer_scripts', function () {
                        wp_add_inline_script(
                            SG_BLOCKS_PREFIX . '-scripts-admin',
                            'window.sg.customFields.imageField("' . $this->id . '-image-field");',
                            'after'
                        );
                    });
                } else {
                    wp_add_inline_script(
                        SG_BLOCKS_PREFIX . '-scripts-admin',
                        'window.sg.customFields.imageField("' . $this->id . '-image-field");',
                        'after'
                    );
                }
            }
        }

        public function render(int|string $image)
        {
?>
            <div id="<?php echo esc_html($this->id) . '-image-field' ?>" class="sg-custom-field-wrapper">
                <div class="sg-image-field">
                    <label for="<?php echo $this->id; ?>"><?php echo esc_html($this->label); ?></label>
                    <div class="sg-image-field__handle"></div>
                    <p class="sg-image-field__description"><?php echo esc_html($this->description); ?></p>
                    <input hidden type="text" name="<?php echo esc_html($this->id) ?>" value="<?php echo esc_attr($image) ?>" />
                </div>
            </div>
<?php
        }
    }
}
