<?php

namespace gsebdev\sg_blocks\taxonomies;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class SG_Taxonomy_Fields
{
    private $fields = [];
    private $term;

    public function __construct(string $term)
    {
        $this->term = $term;
    }

    public function add_field(object $field_object)
    {
        if (method_exists($field_object, 'render')) {
            $this->fields[] = $field_object;
        }
    }
    /**
     * create the meta box
     */
    public function create()
    {
        add_action($this->term . '_add_form_fields', [$this, 'render_fields']);
        add_action($this->term . '_edit_form_fields', [$this, 'render_fields']);
        add_action('edited_' . $this->term, [$this, 'save_fields']);
        add_action('create_' . $this->term, [$this, 'save_fields']);
        $this->register();
    }

    public function render_fields($term)
    {
        wp_nonce_field($this->term . '_sg_nonce_save', $this->term . '_sg_nonce');

        foreach ($this->fields as $field) {

            $value = get_term_meta($term->term_id ?? $term, $field->id, true) ?? '';
            echo '<div class="form-field term-' . $field->id . '-wrap">';
            $field->render($value);
            echo '</div>';
        }
    }

    public function save_fields(int $term_id)
    {
        if (!wp_verify_nonce($_POST[$this->term . '_sg_nonce'], $this->term . '_sg_nonce_save') || !current_user_can('manage_options')) {
            return;
        }
        foreach ($this->fields as $field) {
            if (array_key_exists($field->id, $_POST)) {

                update_term_meta(
                    $term_id,
                    $field->id,
                    sanitize_text_field($_POST[$field->id])
                );
            } else {
                delete_term_meta(
                    $term_id,
                    $field->id
                );
            }
        }
    }

    public function register()
    {
        foreach ($this->fields as $field) {
            register_term_meta($this->term, $field->id, array(
                'single' => true,
                'type' => 'string',
                'show_in_rest' => true
            ));
        }
    }
}
