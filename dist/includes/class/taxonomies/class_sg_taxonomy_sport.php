<?php

namespace gsebdev\sg_blocks\taxonomies;

use gsebdev\CustomFields\SG_Image_Selector;
use gsebdev\CustomFields\SG_Number_Input;
use gsebdev\CustomFields\SG_Switch_Box;
use gsebdev\CustomFields\SG_Text_Input;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class SG_Sport_Taxonomy extends SG_Taxonomy
{
    public $id = 'sport';

    protected $display_description = true;
    protected $auto_save = true;
    protected $menu_icon = 'dashicons-buddicons-activity';

    public $config = array(
        'public' => true,
        'show_in_rest' => true,
        'show_in_nav_menus' => true,
        'show_ui' => true,
        'query_var' => true,
        'show_admin_column' => true,
        'hierarchical' => false,
        'rewrite' => array('slug' => 'sports'),
    );

    protected $custom_columns = array(
        'remove' => array(
            'slug',
            'posts'
        ),
        'add' => array(
            [
                'key' => 'cover',
                'name' => 'Image de couverture',
                'editable' => true,
                'type' => 'image'
            ],
            [
                'key' => 'featured',
                'name' => 'Promu',
                'editable' => true,
                'type' => 'checkbox'
            ],
            [
                'key' => 'position',
                'name' => 'Priorité',
                'editable' => true,
                'type' => 'number',
            ],
            [
                'key' => 'price',
                'name' => 'Prix',
                'editable' => true,
                'type' => 'number'
            ],
            
        ),
    );

    public function set_labels()
    {
        $this->config['labels'] = array(
            'name' => __('Sports', 'sg-blocks'),
            'singular_name' =>__('Sport', 'sg-blocks'),
            'menu_name' => __('Sports', 'sg-blocks'),
            'all_items' => __('All sports', 'sg-blocks'),
            'edit_item' => __('Edit sport', 'sg-blocks'),
            'view_item' => __('View sport', 'sg-blocks'),
            'update_item' => __('Update sport', 'sg-blocks'),
            'add_new_item' => __('Add new sport', 'sg-blocks'),
            'new_item_name' => __('New sport name', 'sg-blocks'),
            'search_items' => __('Search sports', 'sg-blocks'),
            'popular_items' => __('Popular sports', 'sg-blocks'),
            'separate_items_with_commas' => __('Separate sports with commas', 'sg-blocks'),
            'add_or_remove_items' => __('Add or remove sports', 'sg-blocks'),
            'choose_from_most_used' => __('Choose from most used sports', 'sg-blocks'),
            'not_found' => __('No sports found', 'sg-blocks'),
            'no_terms' => __('No sports', 'sg-blocks'),
            'back_to_items' => __('Back to sports', 'sg-blocks'),
        );
    }

    public function set_custom_fields()
    {
        $this->custom_fields = array(
            [
                'id' => 'cover',
                'title' => __('Cover image', 'sg-blocks'),
                'description' => __('Image displayed to illustrate the sport', 'sg-blocks'),
                'input' => SG_Image_Selector::class
            ],
            [
                'id' => 'featured',
                'title' => __('Featured ?', 'sg-blocks'),
                'description' => __('Is this sport to be featured on the homepage', 'sg-blocks'),
                'input' => SG_Switch_Box::class,
            ],
            [
                'id' => 'position',
                'title' => __('Position', 'sg-blocks'),
                'description' => __('What is the position of this sport in the displays ?', 'sg-blocks'),
                'input' => SG_Number_Input::class,
            ],
            [
                'id' => 'price',
                'title' => __('Lowest price', 'sg-blocks'),
                'description' => __('What is the lowest price for this sport ?', 'sg-blocks'),
                'input' => SG_Text_Input::class,
            ],
        );
    }
}
