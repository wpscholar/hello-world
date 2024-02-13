<?php

/**
 * Hello World
 *
 * @package           HelloWorld
 * @author            Micah Wood
 * @copyright         Copyright 2023 by Micah Wood - All rights reserved.
 * @license           GPL2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name:       Hello world
 * Plugin URI:
 * Update URI:        hello-world
 * Description:       The world's most amazing and comprehensive WordPress greeting plugin.
 * Version:           1.3.0
 * Requires PHP:      5.6
 * Requires at least: 5.0
 * Author:            Micah Wood
 * Author URI:        https://wpscholar.com
 * Text Domain:       hello-world
 * Domain Path:       /languages
 * License:           GPL V2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */

if ( defined( 'HELLO_WORLD_PLUGIN_VERSION' ) ) {
	exit;
}

define( 'HELLO_WORLD_PLUGIN_VERSION', '1.3.0' );
