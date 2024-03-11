<?php

namespace gsebdev\CustomFields;

if (!class_exists('SG_Color_Picker')) {
    class SG_Color_Picker extends SG_Field
    {
        public function render($value)
        {
            wp_add_inline_script(SG_BLOCKS_PREFIX . '-scripts-admin', "sg.sgColorPickerInit('#" . $this->id . "');", 'after');
?>
            <div class="sg-custom-field-wrapper">
                <label><?php echo esc_html($this->label) ?></label>
                <div id="<?php echo $this->id; ?>" class="sg-color-picker closed">
                    <input type="text" name="<?php echo $this->id; ?>" value="<?php echo $value ?? '' ?>">
                </div>
                <p id="<?php echo esc_html($this->id) ?>-description"><?php echo esc_html($this->description) ?></p>
            </div>

<?php
        }
    }
}
