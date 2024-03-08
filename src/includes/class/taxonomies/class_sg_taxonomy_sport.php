<?php

namespace gsebdev\sg_blocks\taxonomies;

use gsebdev\sg_blocks\custom_fields\SG_Image_Selector;
use gsebdev\sg_blocks\custom_fields\SG_Number_Input;
use gsebdev\sg_blocks\custom_fields\SG_Switch_Box;
use gsebdev\sg_blocks\custom_fields\SG_Text_Input;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class SG_Sport_Taxonomy extends SG_Taxonomy
{
    public $id = 'sport';

    public $name = 'Sport';
    public $plural_name = 'Sports';

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

    protected $custom_checkbox_display = true;

    public function __construct($post_types)
    {
        $this->custom_fields = array(
            [
                'id' => 'cover',
                'title' => __('Image de couverture', 'sg-theme'),
                'description' => __('Image qui sera affichée pour illustrer le sport', 'sg-theme'),
                'input' => SG_Image_Selector::class
            ],
            [
                'id' => 'featured',
                'title' => __('Mis en avant ?', 'sg-theme'),
                'description' => __('Est ce que ce sport doit être mis en avant sur la page accueil', 'sg-theme'),
                'input' => SG_Switch_Box::class,
            ],
            [
                'id' => 'position',
                'title' => __('Position', 'sg-theme'),
                'description' => __('Quelle est la position de ce sport dans les affichages ?', 'sg-theme'),
                'input' => SG_Number_Input::class,
            ],
            [
                'id' => 'price',
                'title' => __('Prix le plus bas', 'sg-theme'),
                'description' => __('Quel est le prix le plus bas pour ce sport ?', 'sg-theme'),
                'input' => SG_Text_Input::class,
            ],
        );

        $this->config['labels'] = array(
            'name' => __('Sports', 'sg-theme'),
            'singular_name' => __($this->name, 'sg-theme'),
            'menu_name' => __('Sports', 'sg-theme'),
            'all_items' => __('Tous les sports', 'sg-theme'),
            'edit_item' => __('Modifier le sport', 'sg-theme'),
            'view_item' => __('Voir le sport', 'sg-theme'),
            'update_item' => __('Mettre à jour le sport', 'sg-theme'),
            'add_new_item' => __('Ajouter un nouveau sport', 'sg-theme'),
            'new_item_name' => __('Nom du nouveau sport', 'sg-theme'),
            'search_items' => __('Rechercher des sports', 'sg-theme'),
            'popular_items' => __('Sports populaires', 'sg-theme'),
            'separate_items_with_commas' => __('Séparez les sports par des virgules', 'sg-theme'),
            'add_or_remove_items' => __('Ajouter ou supprimer des sports', 'sg-theme'),
            'choose_from_most_used' => __('Choisir parmi les sports les plus utilisés', 'sg-theme'),
            'not_found' => __('Aucun sport trouvé', 'sg-theme'),
            'no_terms' => __('Aucun sport', 'sg-theme'),
            'back_to_items' => __('Retour aux sports', 'sg-theme'),
        );

        parent::__construct($post_types);
    }
}
