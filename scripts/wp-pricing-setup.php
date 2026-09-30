<?php
/**
 * Pricing page — "Plans" CPT + ACF field group (idempotent).
 *
 * Creates:
 *   - ACF Post Type  `plan`   → GraphQL type `Plan`, roots `plan` / `plans`
 *   - ACF Field Group `group_tde_planinfo` (title `planInfo`) → GraphQL `planInfo`
 *     Fields: planPrice, planPeriod, planSummary, planFeatures,
 *             planBadge, planHighlight, planCtaLabel, planCtaUrl
 *   - Nothing else: plan content is entered in WP admin (title = plan name,
 *     ordering via the Order field), so no placeholder plans are seeded.
 *
 * Run (Local socket wrapper — see mds/session-notes-2026-09-26.md):
 *   export SOCK="/Users/abid/Library/Application Support/Local/run/dR0PvBSQS/mysql/mysqld.sock"
 *   export MYSQL_UNIX_PORT="$SOCK"
 *   php -d mysqli.default_socket="$SOCK" /Users/abid/bin/wp \
 *     --path="$HOME/Local Sites/the-digital-echo/app/public" \
 *     eval-file /Users/abid/projects/thedigitalecho/scripts/wp-pricing-setup.php
 *
 * Re-running is safe: existing records are left untouched.
 */

if ( ! function_exists( 'acf_import_post_type' ) || ! function_exists( 'acf_import_field_group' ) ) {
	echo "ERROR: ACF is not loaded.\n";
	return;
}

/* ---------------------------------------------------------------- CPT ---- */
if ( post_type_exists( 'plan' ) ) {
	echo "✓ Post type `plan` already registered.\n";
} else {
	acf_import_post_type(
		array(
			'post_type'              => 'plan',
			'label'                  => 'Pricing Plans',
			'advanced_configuration' => true,
			'import_source'          => '',
			'labels'                 => array(
				'name'                     => 'Pricing Plans',
				'singular_name'            => 'Plan',
				'menu_name'                => 'Pricing Plans',
				'all_items'                => 'Pricing Plans',
				'add_new'                  => 'Add New',
				'add_new_item'             => 'Add New Plan',
				'edit_item'                => 'Edit Plan',
				'view_item'                => 'View Plan',
				'search_items'             => 'Search Plans',
				'not_found'                => 'No plans found',
				'not_found_in_trash'       => 'No plans found in Trash',
				'archives'                 => 'Plan Archives',
				'insert_into_item'         => 'Insert into plan',
				'uploaded_to_this_item'    => 'Uploaded to this plan',
				'filter_items_list'        => 'Filter plans list',
				'items_list_navigation'    => 'Plans list navigation',
				'items_list'               => 'Plans list',
				'item_published'           => 'Plan published.',
				'item_updated'             => 'Plan updated.',
			),
			'description'            => 'Pricing page plans (title = plan name, Order = display order).',
			'public'                 => true,
			'hierarchical'           => false,
			'publicly_queryable'     => true,
			'show_ui'                => true,
			'show_in_menu'           => true,
			'show_in_admin_bar'      => true,
			'show_in_nav_menus'      => true,
			'show_in_rest'           => true,
			'menu_icon'              => 'dashicons-money-alt',
			'menu_position'          => 21,
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
			'enter_title_here'       => 'e.g. Starter',
			// WPGraphQL (wpgraphql-acf) reads these on `acf/post_type/registration_args`.
			'show_in_graphql'        => 1,
			'graphql_single_name'    => 'Plan',
			'graphql_plural_name'    => 'plans',
		)
	);
	echo "✓ Post type `plan` imported (GraphQL: Plan / plan / plans).\n";
}

/* --------------------------------------------------------- field group ---- */
if ( acf_get_field_group( 'group_tde_planinfo' ) ) {
	echo "✓ Field group `planInfo` already exists.\n";
} else {
	acf_import_field_group(
		array(
			'key'                  => 'group_tde_planinfo',
			'title'                => 'planInfo',
			'fields'               => array(
				array(
					'key'           => 'field_tde_plan_price',
					'label'         => 'Price',
					'name'          => 'planPrice',
					'type'          => 'text',
					'default_value' => '',
					'placeholder'   => '₹ 00,000',
					'instructions'  => 'Shown large on the card. Leave empty to show "Custom".',
					'wrapper'       => array( 'width' => '50' ),
				),
				array(
					'key'           => 'field_tde_plan_period',
					'label'         => 'Price Period',
					'name'          => 'planPeriod',
					'type'          => 'text',
					'default_value' => '',
					'placeholder'   => '/ project',
					'instructions'  => 'Small text after the price, e.g. "/ month".',
					'wrapper'       => array( 'width' => '50' ),
				),
				array(
					'key'           => 'field_tde_plan_summary',
					'label'         => 'Plan Summary',
					'name'          => 'planSummary',
					'type'          => 'textarea',
					'rows'          => 2,
					'new_lines'     => '',
					'default_value' => '',
					'placeholder'   => 'One or two lines describing who this plan is for.',
				),
				array(
					'key'           => 'field_tde_plan_features',
					'label'         => 'Features (one per line)',
					'name'          => 'planFeatures',
					'type'          => 'textarea',
					'rows'          => 8,
					'new_lines'     => '',
					'default_value' => '',
					'instructions'  => 'Each line becomes a checklist row on the plan card.',
					'placeholder'   => "First feature\nSecond feature\nThird feature",
				),
				array(
					'key'           => 'field_tde_plan_badge',
					'label'         => 'Badge',
					'name'          => 'planBadge',
					'type'          => 'text',
					'default_value' => '',
					'placeholder'   => 'Most Popular',
					'instructions'  => 'Small pill above the plan name. Leave empty for none.',
					'wrapper'       => array( 'width' => '50' ),
				),
				array(
					'key'           => 'field_tde_plan_highlight',
					'label'         => 'Highlight this plan',
					'name'          => 'planHighlight',
					'type'          => 'true_false',
					'default_value' => 0,
					'ui'            => 1,
					'instructions'  => 'Gold border + accent price for the recommended plan.',
					'wrapper'       => array( 'width' => '50' ),
				),
				array(
					'key'           => 'field_tde_plan_ctalabel',
					'label'         => 'CTA Label',
					'name'          => 'planCtaLabel',
					'type'          => 'text',
					'default_value' => '',
					'placeholder'   => "Let's Talk",
					'wrapper'       => array( 'width' => '50' ),
				),
				array(
					'key'           => 'field_tde_plan_ctaurl',
					'label'         => 'CTA URL',
					'name'          => 'planCtaUrl',
					'type'          => 'text',
					'default_value' => '',
					'placeholder'   => '/contact/',
					'instructions'  => 'Internal path (/contact/) or full URL. Empty = /contact/.',
					'wrapper'       => array( 'width' => '50' ),
				),
			),
			'location'             => array(
				array(
					array(
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'plan',
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
	echo "✓ Field group `planInfo` imported (planPrice, planPeriod, planSummary, planFeatures, planBadge, planHighlight, planCtaLabel, planCtaUrl).\n";
}

/* ------------------------------------------------------------- summary ---- */
$plans = get_posts(
	array(
		'post_type'   => 'plan',
		'post_status' => array( 'publish', 'draft' ),
		'numberposts' => -1,
		'fields'      => 'ids',
	)
);
echo '→ ' . count( $plans ) . " plan(s) in WP — add them under Pricing Plans (title = plan name, Order = display order).\n";
