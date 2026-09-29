<?php
/**
 * One-off: drop two fields from Contact Form 7 (form 158) —
 * "Business / Brand Name" (`your-brand`) and "Website / Instagram" (`your-website`).
 * The Astro frontend renders fields from this markup, so no code change is needed.
 * Idempotent: re-running is a no-op once the fields are gone.
 *
 * Run (Local socket wrapper — see mds/session-notes-2026-09-26.md):
 *   export SOCK="/Users/abid/Library/Application Support/Local/run/dR0PvBSQS/mysql/mysqld.sock"
 *   export MYSQL_UNIX_PORT="$SOCK"
 *   php -d mysqli.default_socket="$SOCK" /Users/abid/bin/wp \
 *     --path="$HOME/Local Sites/the-digital-echo/app/public" \
 *     eval-file /Users/abid/projects/thedigitalecho/scripts/wp-cf7-remove-fields.php
 */

if ( ! class_exists( 'WPCF7_ContactForm' ) ) {
	echo "ERROR: Contact Form 7 is not loaded.\n";
	return;
}

$cf = \WPCF7_ContactForm::get_instance( 158 );
if ( ! $cf ) {
	echo "ERROR: CF7 form 158 not found.\n";
	return;
}

$form = (string) $cf->prop( 'form' );
$mail_prop = $cf->prop( 'mail' );
$mail      = is_array( $mail_prop ) ? $mail_prop : null;   // `mail` is an array — never cast it to string.

/* Whole <label>…</label> blocks, whitespace-agnostic. */
$label_patterns = array(
	'/\s*<label[^>]*>\s*Business \/ Brand Name\s*\[[^\]]*your-brand[^\]]*\]\s*<\/label>/',
	'/\s*<label[^>]*>\s*Website \/ Instagram\s*\[[^\]]*your-website[^\]]*\]\s*<\/label>/',
);

/* Mail body lines that reference the removed tags. */
$mail_patterns = array(
	'/\n?Brand: \[your-brand\]/',
	'/\n?Website\/Instagram: \[your-website\]/',
);

$new_form = $form;
foreach ( $label_patterns as $re ) {
	$new_form = preg_replace( $re, '', $new_form );
}

$original_body = is_array( $mail ) && isset( $mail['body'] ) ? $mail['body'] : null;
$new_mail      = $mail;
if ( is_array( $new_mail ) && isset( $new_mail['body'] ) ) {
	foreach ( $mail_patterns as $re ) {
		$new_mail['body'] = preg_replace( $re, '', $new_mail['body'] );
	}
}

$form_changed = ( $new_form !== $form );
$mail_changed = is_array( $new_mail ) && isset( $new_mail['body'] ) && $new_mail['body'] !== $original_body;

if ( ! $form_changed && ! $mail_changed ) {
	echo "Nothing to remove — form unchanged.\n";
	return;
}

$props = array( 'form' => $new_form );
if ( is_array( $new_mail ) ) {
	$props['mail'] = $new_mail;   // only ever pass the real array
}

$cf->set_properties( $props );

if ( ! $cf->save() ) {
	echo "✗ save() failed\n";
	return;
}

preg_match_all( '/\[[a-z]+\*?\s+([a-z0-9_-]+)/i', $new_form, $m );
$leftover = substr_count( $new_form, 'your-brand' ) + substr_count( $new_form, 'your-website' );
if ( is_array( $new_mail ) && isset( $new_mail['body'] ) ) {
	$leftover += substr_count( $new_mail['body'], 'your-brand' ) + substr_count( $new_mail['body'], 'your-website' );
}
echo "✓ Form 158 updated — remaining fields: " . implode( ', ', $m[1] ) . "\n";
echo "  leftover your-brand/your-website refs: {$leftover}\n";
