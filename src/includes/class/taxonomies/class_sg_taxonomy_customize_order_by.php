<?php

namespace gsebdev\sg_blocks\taxonomies;

use gsebdev\CustomFields\SG_Color_Picker;
use gsebdev\CustomFields\SG_Image_Selector;
use gsebdev\CustomFields\SG_Number_Input;
use gsebdev\CustomFields\SG_Switch_Box;
use gsebdev\CustomFields\SG_Text_Input;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}
class SG_Taxonomy_Customize_Order_By
{
    private $columns = [];
    private $columns_removed = [];
    private $taxonomy;

    public function __construct($taxonomy, $auto_save = false)
    {
        $this->taxonomy = $taxonomy;

        add_action('manage_' .  $this->taxonomy . '_custom_column', array($this, 'columns_content_feed'), 10, 3);
        add_filter('manage_edit-' .  $this->taxonomy . '_sortable_columns', array($this, 'taxonomy_sortable_columns'));
        add_filter('manage_edit-' .  $this->taxonomy . '_columns', array($this, 'taxonomy_columns'));

        add_filter('get_terms', array($this, 'taxonomy_orderby'));

        if ($auto_save) {
            add_action('admin_enqueue_scripts', [$this, 'load_scripts']);
            add_action('wp_ajax_sg-save-inline-' . $this->taxonomy, [$this, 'sg_ajax_inline_save_tax']);
        }
    }
    public function add_column(array $field)
    {
        $this->columns[] = $field;
    }

    public function remove_column(string $key)
    {
        $this->columns_removed[] = $key;
    }

    public function taxonomy_sortable_columns($columns)
    {
        foreach ($this->columns as $column) {
            $columns[$column['key']] = $column['key'];
        }
        return $columns;
    }

    public function taxonomy_columns($columns)
    {
        //removes the columns
        foreach ($this->columns_removed as $key) {
            unset($columns[$key]);
        }
        //Add the columns
        foreach ($this->columns as $column) {
            $columns[$column['key']] = $column['name'];
        }
        

        return $columns;
    }

    public function columns_content_feed($content, $column_name, $term_id)
    {
        foreach ($this->columns as $column) {
            if ($column_name === $column['key']) {
                $value = get_term_meta($term_id, $column['key'], true);
               
                if (!$column['editable'] && !!preg_match('/^#([A-Fa-f0-9]{6})$/', $value)) {
                    $content = '<div style="background-color: ' . esc_attr($value) . '; height: 30px; width: 30px;"></div>';
                }

                else if ($column['editable']) {
                    $content = '<div class="sg_inline_auto_save" data-tax="' . $this->taxonomy . '" data-term="' . $term_id . '" data-field="' . $column['key'] . '">';
                    $input = null;
                    if (isset($column['type']) && $column['type'] === 'checkbox') {
                        $input = new SG_Switch_Box($this->taxonomy . '-' . $term_id, '', '');

                    } elseif (isset($column['type']) && $column['type'] === 'text') {
                        $input = new SG_Text_Input($this->taxonomy . '-' . $term_id, '', '');

                    } elseif (isset($column['type']) && $column['type'] === 'color') {
                        $input = new SG_Color_Picker($this->taxonomy . '-' . $term_id, '', '');

                    } elseif (isset($column['type']) && $column['type'] === 'number') {
                        $input = new SG_Number_Input($this->taxonomy . '-' . $term_id, '', '');
                    } elseif (isset($column['type']) && $column['type'] === 'image') {
                        $input = new SG_Image_Selector($this->taxonomy . '-' . $term_id, '', '');
                    }

                    $input_html = '<input type="text" value="' . esc_attr($value) . '"/>';
                    if($input) {
                        ob_start();
                        $input->render(esc_attr($value));
                        $input_html = ob_get_clean();
                    }
                    $content .= $input_html . '</div>';
                } else {
                    $content = esc_html($value);
                }
            }
        }
        return $content;
    }

    public function taxonomy_orderby($terms)
    {
        global $pagenow;

        if (is_admin() && $pagenow === 'edit-tags.php' && isset($_GET['orderby']) && $_GET['taxonomy'] === $this->taxonomy) {
            foreach ($this->columns as $column) {
                if ($column['key'] === $_GET['orderby']) {

                    usort($terms, function ($a, $b) {
                        $meta_value_a = get_term_meta($a->term_id, $_GET['orderby'], true) ?? '';
                        $meta_value_b = get_term_meta($b->term_id, $_GET['orderby'], true) ?? '';
                        return strnatcmp($meta_value_a, $meta_value_b);
                    });

                    // You can use 'DESC' for descending order if needed
                    if ($_GET['order'] == 'desc') {
                        $terms = array_reverse($terms);
                    }
                }
            }
        }

        return $terms;
    }

    public function load_scripts()
    {
        $current_screen = get_current_screen();

        if ($current_screen && $current_screen->id === 'edit-' . $this->taxonomy) {
            wp_add_inline_script(SG_BLOCKS_PREFIX . '-scripts-admin', "new sg.SgSaveInlineTerms();", 'after');
        }
    }

    public function sg_ajax_inline_save_tax()
    {
        check_ajax_referer('taxinlineeditnonce', '_inline_edit');

        $id = (int) $_POST['tax_ID'];
        if (!current_user_can('edit_term', $id)) {
            wp_die('You don\'t have permission to edit this item.');
        }

        $taxonomy = sanitize_key($_POST['taxonomy']);
        if ($taxonomy !== $this->taxonomy) {
            wp_die('Invalid taxonomy');
        }
        $taxonomy_object = get_taxonomy($taxonomy);
        $is_meta = isset($_POST['meta']);

        if (!$taxonomy_object) {
            wp_die(0);
        }

        if (!isset($_POST['tax_ID']) || !(int) $_POST['tax_ID']) {
            wp_die("no id");
        }

        if ($is_meta) {
            $meta_key = sanitize_key($_POST['meta']);
            $meta_value = $_POST[$meta_key];
            
            if ($meta_value && $meta_value !== '') {
                $updated = update_term_meta($id, $meta_key, $meta_value);
             
                if ($updated && !is_wp_error($updated)) {
                    $term_meta = get_term_meta($id, $meta_key, true);
                    if (!$term_meta) {
                        wp_send_json_error('Item not updated.');
                        die();
                    }
                } else {
                    if (is_wp_error($updated) && $updated->get_error_message()) {
                        wp_send_json_error($updated->get_error_message());
                        die();
                    }
                    wp_send_json_error('Item not updated.');
                    die();
                }
                wp_send_json([
                    'term_id' => $id,
                    'meta' => $meta_key,
                    'value' => $term_meta
                ]);
            } else {
                $updated = delete_term_meta($id, $meta_key);
                if ($updated) {
                    wp_send_json([
                        'term_id' => $id,
                        'meta' => $meta_key,
                        'value' => ''
                    ]);
                }
            }
        }
        wp_die();
    }
}
