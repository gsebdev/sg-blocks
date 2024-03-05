<?php

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}
include_once SG_BLOCKS_DIR . 'dist/includes/class/custom-fields/class_sg_field.php';

class SG_Switch_Box extends SG_Field
{
    public function render(int|string $value)
    {
?> <div class="sg-custom-field-wrapper">
            <label><?php echo esc_html($this->label) ?></label>
            <label class="sg-switch">
                <input type="checkbox" class="sg-switch__input" id="<?php echo $this->id; ?>" name="<?php echo $this->id; ?>" <?php echo $value === 'on' ? 'checked' : '' ?>>
                <span class="sg-switch__slider sg-switch__slider--round"></span>
            </label>
            <p id="<?php echo esc_html($this->id) ?>-description"><?php echo esc_html($this->description) ?></p>
        </div>
<?php
    }
}
