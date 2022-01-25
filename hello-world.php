<?php

/**
 * Hello World
 *
 * @package           HelloWhirld
 * @author            Micah Wood
 * @copyright         Copyright 2021 by Micah Wood - All rights reserved.
 * @license           GPL2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name:       Hello Whirld
 * Plugin URI:
 * Description:       The world's most amazing and comprehensive WordPress greeting plugin.
 * Version:           1.0
 * Requires PHP:      5.6
 * Requires at least: 5.0
 * Author:            Micah Wood
 * Author URI:        https://wpscholar.com
 * Text Domain:       hello-whirld
 * Domain Path:       /languages
 * License:           GPL V2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */

use WP_Forge\WPUpdateHandler\PluginUpdater;
use WP_Forge\WPUpdateHandler\ThemeUpdater;

require __DIR__ . '/vendor/autoload.php';

$url = 'https://wp-github-release-api.wpscholar.workers.dev/plugins/wpscholar-wp-plugins/stellar-places';

$pluginUpdater = ( new PluginUpdater( __FILE__, $url ) )
	->setDataMap(
		[
			'download_link' => 'download',
			'homepage'      => 'url',
			'last_updated'  => 'updated',
			'requires'      => 'requires.wp',
			'requires_php'  => 'requires.php',
			'tested'        => 'tested.wp',
			'version'       => 'version.latest',
		]
	)
	->setDataOverrides(
		[
			'banners' => [
				'2x' => 'https://ps.w.org/shortcode-scrubber/assets/banner-772x250.png',
				'1x' => 'https://ps.w.org/shortcode-scrubber/assets/banner-772x250.png',
			],
			'icons'   => [
				'2x' => 'https://ps.w.org/shortcode-scrubber/assets/icon-256x256.png',
				'1x' => 'https://ps.w.org/shortcode-scrubber/assets/icon-256x256.png',
			],
			'tested'  => '5.8.1',
		]
	);

$themeUpdater = ( new ThemeUpdater( wp_get_theme(), $url ) )
	->setDataMap(
		[
			'download_link' => 'download',
			'homepage'      => 'url',
			'last_updated'  => 'updated',
			'requires'      => 'requires.wp',
			'requires_php'  => 'requires.php',
			'tested'        => 'tested.wp',
			'version'       => 'version.latest',
		]
	)
	->setDataOverrides(
		[
			'version' => '1.8.1',
		]
	);

//echo '<pre>';
//var_dump( wp_get_theme() );
//echo '</pre>';
