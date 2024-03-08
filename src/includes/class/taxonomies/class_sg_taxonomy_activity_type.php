<?php

namespace gsebdev\sg_blocks\taxonomies;

use gsebdev\sg_blocks\custom_fields\SG_Image_Selector;
use gsebdev\sg_blocks\custom_fields\SG_Number_Input;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class SG_Activity_Type_Taxonomy extends SG_Taxonomy
{
    public $id = 'activity-type';

    public $name = 'Type d\'activité';
    public $plural_name = 'Types d\'activité';

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

    protected $custom_checkbox_display = true;

    public function __construct($post_types)
    {
        $this->custom_fields = array(
            [
                'id' => 'cover',
                'title' => __('Image de couverture', 'sg-blocks'),
                'description' => __('Image qui sera affichée pour illustrer ce type d\'activitié', 'sg-blocks'),
                'input' => SG_Image_Selector::class
            ],
            [
                'id' => 'position',
                'title' => __('Position', 'sg-blocks'),
                'description' => __('Quelle est la position de ce type d\'activité dans les affichages ?', 'sg-blocks'),
                'input' => SG_Number_Input::class,
            ]
        );

        $this->config['labels'] = array(
            'name' => __('Types d\'activité', 'sg-blocks'),
            'singular_name' => __($this->name, 'sg-blocks'),
            'menu_name' => __('Types d\'activité', 'sg-blocks'),
            'all_items' => __('Tous les types d\'activité', 'sg-blocks'),
            'edit_item' => __('Modifier le type d\'activité', 'sg-blocks'),
            'view_item' => __('Voir le type d\'activité', 'sg-blocks'),
            'update_item' => __('Mettre à jour le type d\'activité', 'sg-blocks'),
            'add_new_item' => __('Ajouter un nouveau type d\'activité', 'sg-blocks'),
            'new_item_name' => __('Nom du nouveau type d\'activité', 'sg-blocks'),
            'search_items' => __('Rechercher des types d\'activité', 'sg-blocks'),
            'popular_items' => __('Types d\'activité populaires', 'sg-blocks'),
            'separate_items_with_commas' => __('Séparez les types d\'activité par des virgules', 'sg-blocks'),
            'add_or_remove_items' => __('Ajouter ou supprimer des types d\'activité', 'sg-blocks'),
            'choose_from_most_used' => __('Choisir parmi les types d\'activité les plus utilisés', 'sg-blocks'),
            'not_found' => __('Aucun type d\'activité trouvé', 'sg-blocks'),
            'no_terms' => __('Aucun type d\'activité', 'sg-blocks'),
            'back_to_items' => __('Retour aux types d\'activité', 'sg-blocks'),
        );

        parent::__construct($post_types);
    }
}
