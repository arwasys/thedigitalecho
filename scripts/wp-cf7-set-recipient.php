<?php
/**
 * One-off: point the Contact Form 7 (form 158) notification mail at
 * hey@thedigitalecho.in. Idempotent: re-running is a no-op once set.
 *
 * Run (Local socket wrapper — see mds/session-notes-2026-09-26.md):
 *   export SOCK="/Users/abid/Library/Application Support/Local/run/dR0PvBSQS/mysql/mysqld.sock"
 *   export MYSQL_UNIX_PORT="$SOCK"
 *   php -d mysqli.default_socket="$SOCK" /Users/abid/bin/wp \
 *     --path="$HOME/Local Sites/the-digital-echo/app/public" \
 *     eval-file /Users/abid/projects/thedigitalecho/scripts/wp-cf7-set-recipient.php
 */

$recipient = 'hey@thedigitalecho.in';

if ( ! class_exists( 'WPCF7_ContactForm' ) ) {
	echo "ERROR: Contact Form 7 is not loaded.\n";
	return;
}

$cf = \WPCF7_ContactForm::get_instance( 158 );
if ( ! $cf ) {
	echo "ERROR: CF7 form 158 not found.\n";
	return;
}

$mail_prop = $cf->prop( 'mail' );
$mail      = is_array( $mail_prop ) ? $mail_prop : null;   // `mail` is an array — never cast it to string.

if ( ! is_array( $mail ) ) {
	echo "ERROR: unexpected `mail` property — aborting.\n";
	return;
}

if ( ( $mail['recipient'] ?? '' ) === $recipient ) {
	echo "Recipient already set to {$recipient}.\n";
	return;
}

$mail['recipient'] = $recipient;
$cf->set_properties( array( 'mail' => $mail ) );   // only ever pass the real array

if ( ! $cf->save() ) {
	echo "✗ save() failed\n";
	return;
}

echo "✓ Form 158 notification recipient: {$recipient}\n";
echo "  subject: {$mail['subject']}\n";
