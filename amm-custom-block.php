<?php
/**
* Plugin Name: AMM custom block
* Description: Кастомные блоки для редактора Gutenberg
* Version: 1.0
* Author: Andrey Kalko
* Text Domain: amm-custom-block
* Domain Path: /languages/
*/

if( ! defined( 'ABSPATH') ) {
    exit;
}

include_once('src/metabox-ldjson/metabox.php');

function amm_custom_block_register_block() {

	// Register JavasScript File build/index.js
	wp_register_script(
		'amm-custom-block',
		plugins_url( 'build/index.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-editor' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )
	);

	// Register editor style src/editor.css
	wp_register_style(
		'amm-custom-block-editor-style',
		plugins_url( 'src/editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'src/editor.css' )
	);

	// Register front end block style src/style.css
	wp_register_style(
		'amm-custom-block-frontend-style',
		plugins_url( 'src/style.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'src/style.css' )
	);

	// Register your block
	register_block_type( 'myguten-block/test-block', array(
		'editor_script' => 'amm-custom-block',
		'editor_style' => 'amm-custom-block-editor-style',
		'style' => 'amm-custom-block-frontend-style',
	) );

}

add_action( 'init', 'amm_custom_block_register_block' );

function add_amm_custom_block_category( $categories, $post ) {
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
add_filter( 'block_categories', 'add_amm_custom_block_category', 10, 2);