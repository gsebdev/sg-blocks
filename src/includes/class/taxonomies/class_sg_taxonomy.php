<?php

namespace gsebdev\sg_blocks\taxonomies;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

include_once(SG_BLOCKS_DIR . 'dist/includes/class/taxonomies/class_sg_taxonomy_fields.php');
include_once(SG_BLOCKS_DIR . 'dist/includes/class/taxonomies/class_sg_taxonomy_checkboxes_display.php');
include_once(SG_BLOCKS_DIR . 'dist/includes/class/taxonomies/class_sg_taxonomy_customize_order_by.php');

include_once(SG_BLOCKS_DIR . 'dist/includes/class/taxonomies/class_sg_taxonomy_sport.php');
include_once(SG_BLOCKS_DIR . 'dist/includes/class/taxonomies/class_sg_taxonomy_activity_type.php');
include_once(SG_BLOCKS_DIR . 'dist/includes/class/taxonomies/class_sg_taxonomy_difficulty.php');
include_once(SG_BLOCKS_DIR . 'dist/includes/class/taxonomies/class_sg_taxonomy_duration.php');

class SG_Taxonomy
{
    public $id;
    public $post_types = [];
    public $config = [];
    protected $custom_columns;
    protected $custom_fields;
    protected $custom_checkbox_display = false;
    protected $display_description = false;
    protected $display_slug = false;
    protected $auto_save = false;
    protected $menu_icon = 'dashicons-tag';

    public function __construct($post_types = [])
    {
        $this->post_types = $post_types;
        $this->set_custom_columns();

        add_action('init', [$this, 'register_taxonomy']);
        if(!$this->display_description) {
            add_action($this->id . '_pre_edit_form', [$this, 'remove_description']);
            add_action($this->id . '_pre_add_form', [$this, 'remove_description']);
        }
        if(!$this->display_slug) {
            add_action($this->id . '_pre_edit_form', [$this, 'remove_slug']);
            add_action($this->id . '_pre_add_form', [$this, 'remove_slug']);
        }
        add_action('admin_menu', [$this, 'add_taxonomy_submenu_page']);
        if ($this->custom_checkbox_display) {
            add_action('admin_menu', [$this, 'display_as_checkboxes']);
        }
    }

    private function set_custom_columns()
    {
        $columns_class = new SG_Taxonomy_Customize_Order_By($this->id, $this->auto_save);
        if (isset($this->custom_columns['add'])) {
            foreach ($this->custom_columns['add'] as $column) {
                $columns_class->add_column($column);
            }
        }
        if (isset($this->custom_columns['remove'])) {
            foreach ($this->custom_columns['remove'] as $column) {
                $columns_class->remove_column($column);
            }
        }
    }
    public function set_labels() {
        return false;
    }
    public function display_as_checkboxes()
    {
        new SG_Taxonomy_Checkboxes_Display($this->id, $this->config['labels']['name'] ?? $this->id, $this->post_types);
    }
    public function set_custom_fields()
    {
        return false;
    }

    public function remove_description()
    {
        echo '<style>.form-field.term-description-wrap { display: none; }</style>';
    }

    public function remove_slug()
    {
        echo '<style>.form-field.term-slug-wrap { display: none; }</style>';
    }

    public function register_taxonomy()
    {
        $this->set_labels();
        $this->set_custom_fields();
        if ($this->custom_fields) {
            $fields_class = new SG_Taxonomy_Fields($this->id);
            foreach ($this->custom_fields as $field) {
                $fields_class->add_field(new $field['input']($field['id'], $field['title'], $field['description']));
            }
            $fields_class->create();
        }
        register_taxonomy($this->id, $this->post_types, $this->config);
    }

    public function add_taxonomy_submenu_page() {
        $slug = 'edit-tags.php?taxonomy=' . $this->id;
        add_menu_page($this->config['labels']['name'] ?? $this->id, $this->config['labels']['name'] ?? $this->id, 'manage_options', $slug, '', $this->menu_icon);
    }
}
