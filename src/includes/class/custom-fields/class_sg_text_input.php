<?php

namespace gsebdev\sg_blocks\custom_fields;

class SG_Text_Input extends SG_Field
{
    /**
     * Render the text input field.
     *
     * @param int|string|null $value The current value of the field.
     */
    public function render($value)
    {
?>
        <div class="sg-custom-field-wrapper">
            <?php if (!!$this->label) : ?>
                <!-- Label -->
                <label for="<?php echo esc_attr($this->id); ?>">
                    <?php echo esc_html($this->label); ?>
                </label>
            <?php endif; ?>
            <!-- Text Input -->
            <input type="text" class="sg-input" id="<?php echo esc_attr($this->id); ?>" name="<?php echo esc_attr($this->id); ?>" value="<?php echo esc_attr($value ?? ''); ?>">
            <?php if (!!$this->description) : ?>
                <!-- Description -->
                <p id="<?php echo esc_attr($this->id) ?>-description">
                    <?php echo esc_html($this->description); ?>
                </p>
            <?php endif; ?>
        </div>
<?php
    }
}
