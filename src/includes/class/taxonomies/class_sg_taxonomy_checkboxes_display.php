<?php

namespace gsebdev\sg_blocks\taxonomies;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}
class SG_Taxonomy_Checkboxes_Display
{
    private $taxonomy_id;
    private $taxonomy_name;
    private $post_types;
	private $unique;

    public function __construct($taxonomy_id, $taxonomy_name, $post_types, $unique = false)
    {
        $this->taxonomy_id = $taxonomy_id;
        $this->taxonomy_name = $taxonomy_name;
        $this->post_types = $post_types;
		$this->unique = $unique;
        $this->init();
    }
    
    public function init() {
        $heading = $this->taxonomy_name;
        foreach($this->post_types as $post_type) {
            remove_meta_box('tagsdiv-'.$this->taxonomy_id, $post_type, 'side');
			remove_meta_box($this->taxonomy_id . 'div', $post_type, 'side');

            $id = 'sg-' . $post_type . '-' . $this->taxonomy_id;
            add_meta_box( $id, $heading, [$this, 'fill_metabox_content'], $post_type, 'side', 'default' );
        }
        
    }

    public function fill_metabox_content($post) {  
 
	// get all blog post tags as an array of objects
	$all_terms = get_terms( array('taxonomy' => $this->taxonomy_id, 'hide_empty' => 0) ); 
 
	// get all tags assigned to the current post
	$all_terms_of_post = get_the_terms( $post->ID, $this->taxonomy_id );  
 
	// create an array of post tags ids
	$ids = array();
	if ( $all_terms_of_post ) {
		foreach ($all_terms_of_post as $term ) {
			$ids[] = $term->term_id;
		}
	}
 
	// HTML
	echo '<div id="sg-' . get_post_type($post) . '-' . $this->taxonomy_id . '" class="categorydiv">';
	echo '<input type="hidden" name="tax_input['. $this->taxonomy_id .'][]" value="0" />';
	echo '<ul>';
	foreach( $all_terms as $term ){
		// unchecked by default
		$checked = '';
		// if an ID of a tag in the loop is in the array of assigned post tags - then check the checkbox
		if ( in_array( $term->term_id, $ids ) ) {
			$checked = " checked='checked'";
		}
		$id = $this->taxonomy_id . '-' . $term->term_id;
		echo "<li id='{$id}'>";
		echo "<label><input type='" . ($this->unique ? 'radio' : 'checkbox') . "' name='tax_input[". $this->taxonomy_id ."][]' id='in-$id'". $checked ." value='$term->slug' /> $term->name</label><br />";
		echo "</li>";
	}
	echo '</ul></div>'; // end HTML
}
}