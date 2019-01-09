<?php

namespace wpscholar\HelloWorld\Composer;

use Composer\Installer\PackageEvent;

require_once __DIR__ . '/vendor/autoload.php';

/**
 * Class EventHandler
 *
 * @package wpscholar\HelloWorld\Composer
 */
class EventHandler {

	const VENDOR = 'wpscholar';

	const REPO = 'hello-world';

	public static function prePackageInstall( PackageEvent $event ) {
		$operation = $event->getOperation();
		$package   = $operation->getPackage();
		if ( $package->getName() !== self::VENDOR . '/' . self::REPO ) {
			return;
		}

		$distUrl = 'https://github.com/%s/%s/releases/download/%s/archive.zip';
		$package->setDistUrl( sprintf( $distUrl, self::VENDOR, self::REPO, 'v' . $package->getFullPrettyVersion() ) );
	}
}
