<?php

namespace gsebdev\CustomFields;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

if (!class_exists('SG_Switch_Box')) {
    class SG_Switch_Box extends SG_Field
    {
        public function render(int|string $value)
        {
?> <div class="sg-custom-field-wrapper">
            <?php if ($this->label) : ?><label><?php echo esc_html($this->label) ?></label><?php endif; ?>
            <label class="sg-switch">
                <input type="checkbox" class="sg-switch__input" id="<?php echo $this->id; ?>" name="<?php echo $this->id; ?>" <?php echo $value === 'on' ? 'checked' : '' ?>>
                <span class="sg-switch__slider sg-switch__slider--round"></span>
            </label>
            <?php if ($this->description) : ?><p id="<?php echo esc_html($this->id) ?>-description"><?php echo esc_html($this->description) ?></p><?php endif; ?>
        </div>
<?php
        }
    }
}

