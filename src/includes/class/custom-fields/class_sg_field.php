<?php

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}
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