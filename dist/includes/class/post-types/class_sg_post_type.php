<?php

namespace gsebdev\sg_blocks\post_types;


if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}
include_once(SG_BLOCKS_DIR . 'dist/includes/class/post-types/class_sg_post_type_meta_box.php');
include_once(SG_BLOCKS_DIR . 'dist/includes/class/post-types/class_sg_post_type_activity.php');
include_once(SG_BLOCKS_DIR . 'dist/includes/class/post-types/class_sg_post_type_guide.php');

class SG_Post_Type
{
    public $post_type;
    public $args;
    protected $metaboxes;
    protected $no_single = false;

    public function __construct()
    {
        add_action('init', array($this, 'register_post_type'));
        $this->set_meta_boxes();
        if($this->no_single) {
            add_action('template_redirect', [$this, 'redirect_on_archive_page']);
        }
    }

    public function set_labels()
    {
        $this->args['labels'] = [];
    }

    public function register_post_type()
    {
        $this->set_labels();
        register_post_type($this->post_type, $this->args);
    }

    private function set_meta_boxes()
    {
        if ($this->metaboxes) {
            foreach ($this->metaboxes as $metabox) {
                $metabox_object = new SG_Meta_Box($metabox['id'], $metabox['title'], $metabox['panel'] ?? 'advanced', $metabox['priority'] ?? 'default');
                foreach ($metabox['fields'] as $field) {
                    $metabox_object->add_field($field);
                }
                $metabox_object->create($this->post_type);
            }
        }
    }

    public function redirect_on_archive_page()
    {
        if (is_single()) {

            if (get_post_type() === $this->post_type) {

                $archive_url = get_post_type_archive_link($this->post_type);
                
                // Redirect to the post type archive
                if ($archive_url) {
                    wp_safe_redirect($archive_url);
                    exit;
                } else {
                    global $wp_query;
                    $wp_query->set_404();
                    status_header(404);
                }
            }
        }
    }
}
