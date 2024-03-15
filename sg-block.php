<?php
/*
 * Plugin Name:       SG Blocks
 * Plugin URI:        
 * Description:       
 * Version: 		  0.0.1
 * Author:            gsebdev
 * Author URI:        
 * Text Domain:       
 * Requires at least: 6.1
 * Tested up to: 	  6.4
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

define('SG_BLOCKS_VERSION', '0.0.1');
define('SG_BLOCKS_DIR', plugin_dir_path(__FILE__));
define('SG_BLOCKS_PREFIX', 'sg-blocks');


include_once(SG_BLOCKS_DIR . 'dist/includes/sg_activation.php');
include_once(SG_BLOCKS_DIR . 'dist/includes/sg_register_meta.php');
include_once(SG_BLOCKS_DIR . 'dist/includes/sg_helpers.php');
include_once(SG_BLOCKS_DIR . 'dist/includes/sg_register_rest.php');

/**
 * Include classes
 * 
 */
include_once(SG_BLOCKS_DIR . 'dist/includes/class/class_sg_contact_form_handler.php');
include_once(SG_BLOCKS_DIR . 'dist/includes/class/custom-fields/class_sg_field.php');
include_once(SG_BLOCKS_DIR . 'dist/includes/class/post-types/class_sg_post_type.php');
include_once(SG_BLOCKS_DIR . 'dist/includes/class/taxonomies/class_sg_taxonomy.php');

// activation actions
register_activation_hook(__FILE__, 'sg_blocks_activation');

/**
 * Registers the blocks and enqueues necessary scripts and styles for the plugin.
 */
if (!function_exists('register_sg_blocks')) {
    function register_sg_blocks()
    {
        if (is_admin()) {
            
            $asset_file_editor = include(SG_BLOCKS_DIR . 'dist/assets/js/'. SG_BLOCKS_PREFIX . '-scripts-editor.asset.php');
            wp_enqueue_script(
                SG_BLOCKS_PREFIX . '-scripts-editor',
                plugins_url('dist/assets/js/'.SG_BLOCKS_PREFIX . '-scripts-editor.js', __FILE__),
                $asset_file_editor['dependencies'],
                $asset_file_editor['version'],
                true
            );
            
            $asset_file_admin = include(SG_BLOCKS_DIR . 'dist/assets/js/'.SG_BLOCKS_PREFIX . '-scripts-admin.asset.php');
            wp_enqueue_script(
                SG_BLOCKS_PREFIX . '-scripts-admin',
                plugins_url('dist/assets/js/'.SG_BLOCKS_PREFIX . '-scripts-admin.js', __FILE__),
                $asset_file_admin['dependencies'],
                $asset_file_admin['version'],
                true
            );

            wp_enqueue_style(SG_BLOCKS_PREFIX .'-styles-admin', plugins_url('dist/assets/styles/'.SG_BLOCKS_PREFIX.'-styles-admin.css', __FILE__));

        } else {
            $asset_file_view = include(SG_BLOCKS_DIR . 'dist/assets/js/'.SG_BLOCKS_PREFIX . '-scripts.asset.php');
            wp_enqueue_script(
                SG_BLOCKS_PREFIX . '-scripts',
                plugins_url('dist/assets/js/'.SG_BLOCKS_PREFIX . '-scripts.js', __FILE__),
                $asset_file_view['dependencies'],
                $asset_file_view['version'],
                true
            );
        }

        //enqueue style common styles
        wp_enqueue_style(SG_BLOCKS_PREFIX .'-styles', plugins_url('dist/assets/styles/'.SG_BLOCKS_PREFIX.'-styles.css', __FILE__));

        register_block_type(__DIR__ . '/dist/blocks/term-list');
        register_block_type(__DIR__ . '/dist/blocks/container');
        register_block_type(__DIR__ . '/dist/blocks/reservation');
        register_block_type(__DIR__ . '/dist/blocks/gallery');
        register_block_type(__DIR__ . '/dist/blocks/price');
        register_block_type(__DIR__ . '/dist/blocks/map');
        register_block_type(__DIR__ . '/dist/blocks/info');
        register_block_type(__DIR__ . '/dist/blocks/downloads');
        register_block_type(__DIR__ . '/dist/blocks/query-related', array(
            "skip_inner_blocks" => true
        ));
        register_block_type(__DIR__ . '/dist/blocks/featured-image');
        register_block_type(__DIR__ . '/dist/blocks/image');
        register_block_type(__DIR__ . '/dist/blocks/contact-form');
        register_block_type(__DIR__ . '/dist/blocks/mini-price');
    }
}


/**
 * Register block data with global variables to the frontend.
 */
if (!function_exists('register_sg_meeting_point_meta_to_front')) {
    function register_sg_meeting_point_meta_to_front()
    {
        // map and meeting point for
        if (is_singular(['activities', 'adventures'])) {
            $meeting_data =  get_post_meta(get_the_ID(), 'meeting_point', true);
            if ($meeting_data) {
                wp_add_inline_script(SG_BLOCKS_PREFIX . '-scripts', "window.sgMaps = Object.assign({}, window.sgMaps, {meeting_point:" . json_encode($meeting_data, true) . "});", 'before');
            }
        }
    }
}

// action hooks
add_action('init', 'register_sg_blocks');
add_action('init', 'sg_blocks_register_post_metas');
add_action('wp_enqueue_scripts', 'register_sg_meeting_point_meta_to_front');

// Instanciate classes for plugin features

new \gsebdev\sg_blocks\SG_Contact_Form_Handler();

$activity_post_type = new \gsebdev\sg_blocks\post_types\SG_Post_Type_Activity();
$guide_post_type = new \gsebdev\sg_blocks\post_types\SG_Post_Type_Guide();

//Register custom Taxonomies
new \gsebdev\sg_blocks\taxonomies\SG_Activity_Type_Taxonomy(array(
    $activity_post_type->post_type
));
new \gsebdev\sg_blocks\taxonomies\SG_Sport_Taxonomy(array(
    $activity_post_type->post_type,
    $guide_post_type->post_type
));

new \gsebdev\sg_blocks\taxonomies\SG_Duration_Taxonomy(array(
    $activity_post_type->post_type
));

new \gsebdev\sg_blocks\taxonomies\SG_Difficulty_Taxonomy(array(
    $activity_post_type->post_type
));

//add image sizes
add_image_size('lazy-placeholder', 75);
add_image_size('sg-thumbnail', 150, 150);
add_image_size('medium_medium', 520, 390);

add_filter('image_size_names_choose', function ($sizes) {
    unset($sizes['thumbnail']);

    return array_merge($sizes, [
        'lazy-placeholder' => __('SG Lazy Placeholder', 'sg-blocks'),
        'sg-thumbnail' => __('SG Thumbnail', 'sg-blocks'),
        'medium_medium' => __('SG Medium', 'sg-blocks'),
    ]);
});
