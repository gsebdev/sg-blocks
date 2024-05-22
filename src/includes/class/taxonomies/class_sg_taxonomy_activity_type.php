<?php

namespace gsebdev\sg_blocks\taxonomies;

use gsebdev\CustomFields\SG_Image_Selector;
use gsebdev\CustomFields\SG_Number_Input;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class SG_Activity_Type_Taxonomy extends SG_Taxonomy
{
    public $id = 'activity-type';
    protected $auto_save = true;
    protected $display_description = true;
    protected $menu_icon = 'dashicons-tag';

    public $config = array(
        'public' => true,
        'show_in_rest' => true,
        'show_in_nav_menus' => true,
        'show_ui' => true,
        'query_var' => true,
        'show_admin_column' => true,
        'hierarchical' => false,
        'rewrite' => array('slug' => 'activity'),
        'publicly_queryable'=> false,
        'has_archive'       => false
    );

    protected $custom_columns = array(
        'remove' => array(
            'slug',
            'count',
        ),
        'add' => array(
            [
                'key' => 'cover',
                'name' => 'Image de couverture',
                'editable' => true,
                'type' => 'image'
            ],
            [
                'key' => 'position',
                'name' => 'Priorité',
                'editable' => true
            ]
        ),
    );

    public function set_custom_fields() {
        $this->custom_fields = array(
            [
                'id' => 'cover',
                'title' => __('Cover image', 'sg-blocks'),
                'description' => __('Image to be displayed representing this activity type', 'sg-blocks'),
                'input' => SG_Image_Selector::class
            ],
            [
                'id' => 'position',
                'title' => __('Priority', 'sg-blocks'),
                'description' => __('What is the position of this activity type in the displays?', 'sg-blocks'),
                'input' => SG_Number_Input::class,
            ]
        );
    }

    public function set_labels() {
        $this->config['labels'] = array(
            'name' => __('Activity Types', 'sg-blocks'),
            'singular_name' => __('Activity Type', 'sg-blocks'),
            'menu_name' => __('Activity Types', 'sg-blocks'),
            'all_items' => __('All Activity Types', 'sg-blocks'),
            'edit_item' => __('Edit Activity Type', 'sg-blocks'),
            'view_item' => __('View Activity Type', 'sg-blocks'),
            'update_item' => __('Update Activity Type', 'sg-blocks'),
            'add_new_item' => __('Add New Activity Type', 'sg-blocks'),
            'new_item_name' => __('New Activity Type Name', 'sg-blocks'),
            'search_items' => __('Search Activity Types', 'sg-blocks'),
            'popular_items' => __('Popular Activity Types', 'sg-blocks'),
            'separate_items_with_commas' => __('Separate Activity Types with commas', 'sg-blocks'),
            'add_or_remove_items' => __('Add or remove Activity Types', 'sg-blocks'),
            'choose_from_most_used' => __('Choose from the most used Activity Types', 'sg-blocks'),
            'not_found' => __('No Activity Type found', 'sg-blocks'),
            'no_terms' => __('No Activity Type', 'sg-blocks'),
            'back_to_items' => __('Back to Activity Types', 'sg-blocks'),
        );
    }
}
