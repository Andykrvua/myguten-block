<?php
/**
* Plugin Name: custom block for AMM
* Description: Кастомные блоки для редактора Gutenberg
* Version: 1.0
* Author: Andrey Kalko
* Text Domain: myguten-block
* Domain Path: /languages/
*/

function my_custom_block_register_block() {

	// Register JavasScript File build/index.js
	wp_register_script(
		'my-custom-block',
		plugins_url( 'build/index.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-editor' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )
	);

	// Register editor style src/editor.css
	wp_register_style(
		'my-custom-block-editor-style',
		plugins_url( 'src/editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'src/editor.css' )
	);

	// Register front end block style src/style.css
	wp_register_style(
		'my-custom-block-frontend-style',
		plugins_url( 'src/style.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'src/style.css' )
	);

	// Register your block
	register_block_type( 'myguten-block/test-block', array(
		'editor_script' => 'my-custom-block',
		'editor_style' => 'my-custom-block-editor-style',
		'style' => 'my-custom-block-frontend-style',
	) );

}

add_action( 'init', 'my_custom_block_register_block' );

function add_custom_block_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'AMM',
				'title' => __( 'AMM blocks', 'AMM' ),
			),
		)
	);
}
add_filter( 'block_categories', 'add_custom_block_category', 10, 2);