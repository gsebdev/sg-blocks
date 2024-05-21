<?php

namespace gsebdev\sg_blocks\taxonomies;

use gsebdev\CustomFields\SG_Color_Picker;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}
class SG_Difficulty_Taxonomy extends SG_Taxonomy
{
    public $id = 'difficulty';

    public $config = array(
        'public' => true,
        'show_in_rest' => true,
        'show_in_nav_menus' => true,
        'show_ui' => true,
        'query_var' => true,
        'show_admin_column' => true,
        'hierarchical' => false,
        'has_archive' => false,
        'rewrite' => false,
        'show_tagcloud' => false,
    );

    protected $custom_columns = array(
        'remove' => array(
            'slug',
            'description',
            'posts'
        ),
        'add' => array(
            [
                'key' => 'color',
                'name' => 'Couleur',
                'editable' => true,
                'type' => 'color'
            ]
        )
    );

    protected $auto_save = true;

    public function set_labels()
    {
        $this->config['labels'] = array(
            'name' => __('Difficulties', 'sg-blocks'),
            'singular_name' => __('Difficulty', 'sg-blocks'),
            'menu_name' => __('Difficulties', 'sg-blocks'),
            'all_items' => __('All difficulties', 'sg-blocks'),
            'edit_item' => __('Edit difficulty', 'sg-blocks'),
            'view_item' => __('View this difficulty', 'sg-blocks'),
            'update_item' => __('Update difficulty', 'sg-blocks'),
            'add_new_item' => __('Add new difficulty', 'sg-blocks'),
            'new_item_name' => __('Name of the new difficulty', 'sg-blocks'),
            'search_items' => __('Search by difficulties', 'sg-blocks'),
            'popular_items' => __('Popular difficulties', 'sg-blocks'),
            'separate_items_with_commas' => __('Separate difficulties with commas', 'sg-blocks'),
            'add_or_remove_items' => __('Add or remove difficulties', 'sg-blocks'),
            'choose_from_most_used' => __('Choose from the most used difficulties', 'sg-blocks'),
            'not_found' => __('No difficulty found', 'sg-blocks'),
            'no_terms' => __('No difficulty', 'sg-blocks'),
            'back_to_items' => __('Back to difficulties', 'sg-blocks'),
        );
    }

    public function set_custom_fields()
    {
        $this->custom_fields = array(
            [
                'id' => 'color',
                'title' => __('Color Hex Code', 'sg-blocks'),
                'description' => __('color code to display difficulty name (ex: #000000)', 'sg-blocks'),
                'input' => SG_Color_Picker::class
            ],
        );
    }
}
