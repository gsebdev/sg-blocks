<?php

namespace gsebdev\sg_blocks\custom_fields;

class SG_Number_Input extends SG_Field
{
    public function render(int|string $value)
    {
?>
        <div class="sg-custom-field-wrapper">
            <?php if (!!$this->label) : ?>
                <label><?php echo esc_html($this->label) ?></label>
            <?php endif ?>

            <input type="number" class="sg-input" id="<?php echo $this->id; ?>" name="<?php echo $this->id; ?>" value="<?php echo intval($value) ?? '' ?>">
            
            <?php if (!!$this->description) : ?>
                <p id="<?php echo esc_html($this->id) ?>-description"><?php echo esc_html($this->description) ?></p>
            <?php endif ?>
        </div>
<?php
    }
}
