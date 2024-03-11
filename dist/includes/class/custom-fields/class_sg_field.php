<?php

namespace gsebdev\CustomFields;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

if (!class_exists('SG_Field')) {
    class SG_Field {

        public $id; 
        public $label; 
        public $description;
        public $is_html = false;

        public function __construct($id, $label, $description) {
            $this->id = $id;  
            $this->label = $label;
            $this->description = $description;

            $this->enqueue();
        }

        public function enqueue() {
        }

    }
}

include_once(SG_BLOCKS_DIR . 'dist/includes/class/custom-fields/class_sg_switch_box.php');
include_once(SG_BLOCKS_DIR . 'dist/includes/class/custom-fields/class_sg_color_picker.php');
include_once(SG_BLOCKS_DIR . 'dist/includes/class/custom-fields/class_sg_image_selector.php');
include_once(SG_BLOCKS_DIR . 'dist/includes/class/custom-fields/class_sg_number_input.php');
include_once(SG_BLOCKS_DIR . 'dist/includes/class/custom-fields/class_sg_text_input.php');

