#!/bin/bash
VENDOR=$1
PACKAGE=$2
composer config scripts.i18n "vendor/bin/wp i18n make-pot . ./languages/$PACKAGE.pot --headers='{\"Report-Msgid-Bugs-To\":\"https://github.com/$VENDOR/$PACKAGE/issues\",\"POT-Creation-Date\":null}' --exclude=assets,storybook,tests"
