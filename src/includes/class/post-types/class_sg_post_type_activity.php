<?php

namespace gsebdev\sg_blocks\post_types;

use gsebdev\CustomFields\SG_Switch_Box;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class SG_Post_Type_Activity extends SG_Post_Type
{
    public $post_type = 'activities';

    public $args = array(
        'public' => true,
        'has_archive' => true,
        'publicly_queryable' => true,
        'query_var' => true,
        'show_in_rest' => true,
        'rewrite' => true,
        'menu_icon' => 'dashicons-media-document',
        'supports' => array('title', 'thumbnail', 'excerpt', 'editor', 'custom-fields')
    );

    public function __construct()
    {
        $labels = array(
            'name' => __('Activités', 'sg-theme'),
            'singular_name' => __('Activité', 'sg-theme'),
            'add_new_item' => __('Ajouter une Activité', 'sg-theme'),
            'edit_item' => __('Modifier l\'activité'),
            'new_item' => __('Nouvelle Activité', 'sg-theme'),
            'view_item' => __('Voir l\'activité'),
            'search_items' => __('Chercher des Activités', 'sg-theme'),
            'not_found' => __('Aucune activité trouvée', 'sg-theme'),
            'not_found_in_trash' => __('Aucune activité trouvée dans la corbeille', 'sg-theme'),
            'parent_item_colon' => __('Activité parente:', 'sg-theme'),
        );

        $this->args['labels'] = $labels;


        parent::__construct();
        add_filter('manage_' . $this->post_type . '_posts_columns', [$this, 'add_custom_columns'], 10, 2);
        add_filter('manage_edit-' . $this->post_type . '_sortable_columns', [$this, 'sortable_columns'], 10, 2);
        add_action('manage_' . $this->post_type . '_posts_custom_column', [$this, 'render_custom_column'], 10, 2);
        add_action('pre_get_posts', [$this, 'column_orderby']);
        add_action('wp_ajax_sg-save-inline-' . $this->post_type, [$this, 'sg_ajax_inline_save']);
        add_action('admin_enqueue_scripts', [$this, 'load_scripts']);
    }

    public function sg_ajax_inline_save()
    {
        check_ajax_referer('sg_post_inline_save', 'nonce');

        if (isset($_POST['post_id'])) {
            $post_id = $_POST['post_id'];
            $value = $_POST['value'] ?? '';
            $field = $_POST['field'] ?? '';

            if ($field === 'featured') {
                $field = 'menu_order';
                $value = $value ? 1 : 0;
            }

            $update_post = array(
                'ID' => $post_id,
                $field => $value,
            );

            $updated_post = wp_update_post($update_post);

            if ($updated_post == $post_id) {
                wp_send_json_success($post_id);
            } else {
                wp_send_json_error($updated_post);
            }
        }
        wp_die();
    }
    public function add_custom_columns($columns)
    {
        $new_columns = array();
        foreach ($columns as $key => $value) {
            $new_columns[$key] = $value;
            if ($key == 'title') {
                $new_columns['featured'] = 'Mis en avant';
            }
        }
        return $new_columns;
    }

    public function sortable_columns($columns)
    {
        $columns['featured'] = 'featured';
        return $columns;
    }
    public function column_orderby($query)
    {
        if (!is_admin() || !$query->is_main_query() || !$query->is_post_type_archive($this->post_type)) {
            return;
        }
        $orderby = $query->get('orderby');

        if ('featured' === $orderby) {
            $query->set('orderby', 'menu_order');
        }
    }

    public function render_custom_column($column, $post_id)
    {
        if ($column === 'featured') {
            $content = '<div class="sg_inline_auto_save" data-postId="' . $post_id . '" data-field="featured">';
            $content .= '<label for="featured-' . $post_id . '"><input type="checkbox" style="display:none" hidden id="featured-' . $post_id . '"';
            if (get_post_field('menu_order', $post_id) >= 1) {
                $content .= ' checked';
            }
            $content .= ' /><span class="dashicons"></span></label></div>';
            echo $content;
        }
    }

    public function load_scripts()
    {
        global $current_screen;

        if ($current_screen && $current_screen->id === 'edit-' . $this->post_type) {
            wp_add_inline_script(SG_BLOCKS_PREFIX . '-scripts-admin', 'new sg.SgSaveInlinePostType("' . $this->post_type . '", "' . wp_create_nonce('sg_post_inline_save') . '");', 'after');
        }
    }
}
