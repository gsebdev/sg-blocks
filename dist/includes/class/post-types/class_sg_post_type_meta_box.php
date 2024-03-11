<?php

namespace gsebdev\sg_blocks\post_types;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}
class SG_Meta_Box
{
    private $fields = [];
    private $title = '';
    private $id = '';
    private $screens = [];

    public function __construct(string $id, string $title)
    {
        $this->title = $title;
        $this->id = $id;
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
    public function create(array|string $screens)
    {

        if (is_string($screens)) {
            $this->screens[] = [$screens];
        }
        if (is_array($screens)) {
            $this->screens = array_merge($this->screens, $screens);
        }

        add_action('add_meta_boxes', [$this, 'add_sg_meta_box']);
        //add_action('save_post', [$this, 'save_sg_meta_box']);
    }

    /**
     * Render the html
     */
    public function render($post)
    {
        wp_nonce_field($this->id . '_nonce_save', $this->id . '_nonce');

        foreach ($this->fields as $field) {
            $value = get_post_meta($post->ID, $field->id, true);
            $field->render($value);
        }
    }

    public function add_sg_meta_box()
    {
        foreach ($this->screens as $screen) {
            add_meta_box(
                'sg_box_' . $this->title,
                $this->title,
                [$this, 'render'],
                $screen
            );
        }
    }

    public function save_sg_meta_box(int $post_id)
    {
        if (!isset($_POST[$this->id . '_nonce']) || !wp_verify_nonce($_POST[$this->id . '_nonce'], $this->id . '_nonce_save') || !current_user_can('edit_post', $post_id)) {
            return;
        }
        foreach ($this->fields as $field) {

            if (array_key_exists($field->id, $_POST)) {

                $value = $field->is_html ? $_POST[$field->id] : sanitize_text_field($_POST[$field->id]);

                update_post_meta(
                    $post_id,
                    $field->id,
                    $value
                );
            } else {
                delete_post_meta(
                    $post_id,
                    $field->id
                );
            }
        }
    }
}
