taggedVersion="2.11.7"

pluginHeaderVersion=`grep "Version:" hello-world.php | grep -Eo "[0-9\.]*"`
pluginConstantVersion=`grep "_PLUGIN_VERSION" hello-world.php | grep -Eo "[0-9\.]*"`

echo "Tagged version: $taggedVersion"
echo "Plugin header version: $pluginHeaderVersion"
echo "Plugin constant version: $pluginConstantVersion"

[[ "$taggedVersion" == "$pluginHeaderVersion" ]] || echo "Failed"
[[ "$taggedVersion" == "$pluginConstantVersion" ]] || echo "Failed"
