<?php
/**
 * Contact page — "Offices" CPT + ACF field group (idempotent).
 *
 * Creates:
 *   - ACF Post Type  `office`   → GraphQL type `Office`, roots `office` / `offices`
 *   - ACF Field Group `group_tde_officeinfo` (title `officeInfo`) → GraphQL `officeInfo`
 *     Fields: companyType, companyName, address, phone1, phone2, email, mapEmbedUrl
 *   - One starter "Head Office" entry (only when no offices exist yet)
 *
 * Run (Local socket wrapper — see mds/session-notes-2026-09-26.md):
 *   export SOCK="/Users/abid/Library/Application Support/Local/run/dR0PvBSQS/mysql/mysqld.sock"
 *   export MYSQL_UNIX_PORT="$SOCK"
 *   php -d mysqli.default_socket="$SOCK" /Users/abid/bin/wp \
 *     --path="$HOME/Local Sites/the-digital-echo/app/public" \
 *     eval-file /Users/abid/projects/thedigitalecho/scripts/wp-offices-setup.php
 *
 * Re-running is safe: existing records are left untouched.
 */

if ( ! function_exists( 'acf_import_post_type' ) || ! function_exists( 'acf_import_field_group' ) ) {
	echo "ERROR: ACF is not loaded.\n";
	return;
}

/* ---------------------------------------------------------------- CPT ---- */
if ( post_type_exists( 'office' ) ) {
	echo "✓ Post type `office` already registered.\n";
} else {
	acf_import_post_type(
		array(
			'post_type'              => 'office',
			'label'                  => 'Offices',
			'advanced_configuration' => true,
			'import_source'          => '',
			'labels'                 => array(
				'name'                     => 'Offices',
				'singular_name'            => 'Office',
				'menu_name'                => 'Offices',
				'all_items'                => 'Offices',
				'add_new'                  => 'Add New',
				'add_new_item'             => 'Add New Office',
				'edit_item'                => 'Edit Office',
				'view_item'                => 'View Office',
				'search_items'             => 'Search Offices',
				'not_found'                => 'No offices found',
				'not_found_in_trash'       => 'No offices found in Trash',
				'archives'                 => 'Office Archives',
				'insert_into_item'         => 'Insert into office',
				'uploaded_to_this_item'    => 'Uploaded to this office',
				'filter_items_list'        => 'Filter offices list',
				'items_list_navigation'    => 'Offices list navigation',
				'items_list'               => 'Offices list',
				'item_published'           => 'Office published.',
				'item_updated'             => 'Office updated.',
			),
			'description'            => 'Contact page offices (Head Office / Branch Office / Franchise).',
			'public'                 => true,
			'hierarchical'           => false,
			'publicly_queryable'     => true,
			'show_ui'                => true,
			'show_in_menu'           => true,
			'show_in_admin_bar'      => true,
			'show_in_nav_menus'      => true,
			'show_in_rest'           => true,
			'menu_icon'              => 'dashicons-location',
			'menu_position'          => 20,
			'supports'               => array( 'title', 'page-attributes', 'custom-fields' ),
			'has_archive'            => false,
			'rewrite'                => array(
				'permalink_rewrite' => 'post_type_key',
				'with_front'        => 1,
				'feeds'             => 0,
				'pages'             => 1,
			),
			'query_var'              => 'post_type_key',
			'can_export'             => true,
			'enter_title_here'       => 'e.g. Head Office',
			// WPGraphQL (wpgraphql-acf) reads these on `acf/post_type/registration_args`.
			'show_in_graphql'        => 1,
			'graphql_single_name'    => 'Office',
			'graphql_plural_name'    => 'offices',
		)
	);
	echo "✓ Post type `office` imported (GraphQL: Office / office / offices).\n";
}

/* --------------------------------------------------------- field group ---- */
if ( acf_get_field_group( 'group_tde_officeinfo' ) ) {
	echo "✓ Field group `officeInfo` already exists.\n";
} else {
	acf_import_field_group(
		array(
			'key'                  => 'group_tde_officeinfo',
			'title'                => 'officeInfo',
			'fields'               => array(
				array(
					'key'           => 'field_tde_office_companytype',
					'label'         => 'Company Type',
					'name'          => 'companyType',
					'type'          => 'select',
					'choices'       => array(
						'Head Office'   => 'Head Office',
						'Branch Office' => 'Branch Office',
						'Franchise'     => 'Franchise',
					),
					'default_value' => array( 0 => 'Head Office' ),
					'allow_null'    => 0,
					'multiple'      => 0,
					'ui'            => 1,
					'return_format' => 'value',
					'wrapper'       => array( 'width' => '50' ),
				),
				array(
					'key'           => 'field_tde_office_companyname',
					'label'         => 'Company Name',
					'name'          => 'companyName',
					'type'          => 'text',
					'default_value' => '',
					'placeholder'   => 'The Digital Echo',
					'wrapper'       => array( 'width' => '50' ),
				),
				array(
					'key'           => 'field_tde_office_address',
					'label'         => 'Address',
					'name'          => 'address',
					'type'          => 'textarea',
					'rows'          => 4,
					'new_lines'     => 'br',
					'default_value' => '',
					'placeholder'   => 'Building, street, city, state, PIN',
				),
				array(
					'key'           => 'field_tde_office_phone1',
					'label'         => 'Phone 1',
					'name'          => 'phone1',
					'type'          => 'text',
					'default_value' => '',
					'placeholder'   => '+91 XXXXX XXXXX',
					'wrapper'       => array( 'width' => '50' ),
				),
				array(
					'key'           => 'field_tde_office_phone2',
					'label'         => 'Phone 2',
					'name'          => 'phone2',
					'type'          => 'text',
					'default_value' => '',
					'placeholder'   => '+91 XXXXX XXXXX',
					'wrapper'       => array( 'width' => '50' ),
				),
				array(
					'key'           => 'field_tde_office_email',
					'label'         => 'Email',
					'name'          => 'email',
					'type'          => 'email',
					'default_value' => '',
					'placeholder'   => 'hello@example.com',
					'wrapper'       => array( 'width' => '50' ),
				),
				array(
					'key'           => 'field_tde_office_mapembedurl',
					'label'         => 'Google Map (Embed URL)',
					'name'          => 'mapEmbedUrl',
					'type'          => 'url',
					'default_value' => '',
					'placeholder'   => 'https://www.google.com/maps/embed?pb=...',
					'instructions'  => 'Google Maps → Share → Embed a map → copy the src URL of the <iframe>.',
					'wrapper'       => array( 'width' => '50' ),
				),
			),
			'location'             => array(
				array(
					array(
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'office',
					),
				),
			),
			'menu_order'           => 0,
			'position'             => 'normal',
			'style'                => 'default',
			'label_placement'      => 'top',
			'instruction_placement'=> 'label',
			'active'               => true,
		)
	);
	echo "✓ Field group `officeInfo` imported (companyType, companyName, address, phone1, phone2, email, mapEmbedUrl).\n";
}

/* ------------------------------------------------------------ seed one ---- */
$existing = get_posts(
	array(
		'post_type'   => 'office',
		'post_status' => array( 'publish', 'draft', 'pending', 'private' ),
		'numberposts' => -1,
		'fields'      => 'ids',
	)
);

if ( empty( $existing ) ) {
	$office_id = wp_insert_post(
		array(
			'post_type'   => 'office',
			'post_status' => 'publish',
			'post_title'  => 'Head Office',
			'post_author' => 1,
			'menu_order'  => 0,
		)
	);
	if ( $office_id && ! is_wp_error( $office_id ) ) {
		update_field( 'field_tde_office_companytype', 'Head Office', $office_id );
		update_field( 'field_tde_office_companyname', 'The Digital Echo', $office_id );
		echo "✓ Starter office created (ID {$office_id}) — fill Address / Phone / Email / Map in WP admin.\n";
	} else {
		echo "✗ Could not create starter office.\n";
	}
} else {
	echo '✓ ' . count( $existing ) . " office(s) already exist — nothing seeded.\n";
}
