<?php

namespace gsebdev\sg_blocks\custom_fields;

class SG_Image_Selector extends SG_Field
{

    public function actions_at_init()
    {
        if (is_admin() && !defined('DOING_AJAX')) {
            wp_enqueue_media();
        }
    }

    public function render(int|string $image)
    {
?>
        <div class="sg-custom-field-wrapper">
            <label><?php echo esc_html($this->label) ?></label>
            <div id="<?php echo $this->id; ?>-box" class="sg-img-box loading">
                <div class="sg-img-selector__filled-box">
                    <img class="sg-img-selector__thumbnail" src="" alt="">
                    <div class="sg-img-selector__delete dashicons dashicons-trash"></div>
                    <div class="sg-img-selector__change dashicons dashicons-edit"></div>
                </div>
                <div class="sg-img-selector__empty-box dashicons dashicons-format-image"></div>
                <input class="sg-img-box__input-hidden" hidden type="text" id="<?php echo esc_html($this->id) ?>" name="<?php echo esc_html($this->id) ?>" />
            </div>
            <p id="<?php echo esc_html($this->id) ?>-description"><?php echo esc_html($this->description) ?></p>

            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    new sg.ImageSelectorBox('<?php echo esc_html($this->id) ?>', <?php echo $image ?
                                                                                        '{
                    thumbnail: "' . wp_get_attachment_image_url($image, "medium_medium") . '",
                    filename: "' . (is_array($image) ? wp_get_attachment_metadata($image)['file'] : '') . '",
                    id: "' . esc_html($image) . '"
                }' : 'null' ?>)
                });
            </script>
        </div>

<?php
    }
}
