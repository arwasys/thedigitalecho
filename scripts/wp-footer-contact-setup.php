<?php
/**
 * Extends the existing `siteContact` ACF group (site-settings page) with the
 * footer Contact extras: WhatsApp number + social profile URLs.
 *
 * Run: wp eval-file scripts/wp-footer-contact-setup.php   (idempotent)
 */

$group = acf_get_field_group( 'group_tde_sitecontact' );
if ( ! $group ) {
	echo "ERROR: group_tde_sitecontact not found — run scripts/wp-offices-setup.php style group creation first.\n";
	return;
}

$parent = (int) $group['ID']; // ACF field groups expose the post ID as `ID`

$fields = array(
	array(
		'key'   => 'field_tde_contact_wanumber',
		'name'  => 'contactWhatsappNumber',
		'label' => 'WhatsApp Number',
		'type'  => 'text',
		'instructions' => 'Shown in the footer Contact column. Leave empty to show the word "WhatsApp" instead.',
		'placeholder'  => '+91 98765 43210',
	),
	array(
		'key'   => 'field_tde_contact_social_instagram',
		'name'  => 'contactSocialInstagram',
		'label' => 'Instagram URL',
		'type'  => 'url',
		'instructions' => 'Footer Contact column — leave empty to hide the link.',
		'placeholder'  => 'https://instagram.com/…',
	),
	array(
		'key'   => 'field_tde_contact_social_facebook',
		'name'  => 'contactSocialFacebook',
		'label' => 'Facebook URL',
		'type'  => 'url',
		'instructions' => 'Footer Contact column — leave empty to hide the link.',
		'placeholder'  => 'https://facebook.com/…',
	),
	array(
		'key'   => 'field_tde_contact_social_linkedin',
		'name'  => 'contactSocialLinkedin',
		'label' => 'LinkedIn URL',
		'type'  => 'url',
		'instructions' => 'Footer Contact column — leave empty to hide the link.',
		'placeholder'  => 'https://linkedin.com/company/…',
	),
	array(
		'key'   => 'field_tde_contact_social_youtube',
		'name'  => 'contactSocialYoutube',
		'label' => 'YouTube URL',
		'type'  => 'url',
		'instructions' => 'Footer Contact column — leave empty to hide the link.',
		'placeholder'  => 'https://youtube.com/@…',
	),
);

$order = 100;
foreach ( $fields as $field ) {
	$existing = acf_get_field( $field['key'] );
	$created  = ! $existing || (int) ( $existing['parent'] ?? 0 ) !== $parent;
	$updated  = acf_update_field(
		array(
			'key'          => $field['key'],
			'label'        => $field['label'],
			'name'         => $field['name'],
			'type'         => $field['type'],
			'parent'       => $parent,
			'instructions' => $field['instructions'],
			'required'     => 0,
			'default_value' => '',
			'placeholder'  => $field['placeholder'],
			'prepend'      => '',
			'append'       => '',
			'menu_order'   => $order,
			'conditional_logic' => 0,
			'wrapper'      => array( 'width' => '' ),
		)
	);
	echo ( $updated ? ( $existing ? 'RE-PARENTED ' : 'CREATED ' ) : 'FAILED ' ) . "{$field['name']}\n";
	$order += 10;
}

echo "--- siteContact fields now ---\n";
foreach ( acf_get_fields( 'group_tde_sitecontact' ) as $f ) {
	echo "  {$f['key']}  {$f['name']}  ({$f['type']})\n";
}
