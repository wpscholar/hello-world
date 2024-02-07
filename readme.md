# Hello World!

A playground repo for testing code, build processes, etc.

```yml
name: Cypress Test Matrix

on:
  workflow_run:
    workflows: [ "Deploy to Bluehost VPS" ]
    types:
      - completed
      
      
      push:
    branches:
      - main
      - feature/*
  release:
    types:
      - published
  pull_request:
    types: [ opened, reopened ]
  repository_dispatch:
    types:
      - my_custom_event
  workflow_dispatch:

jobs:
  test:
    name: Run Cypress Test Matrix
    runs-on: ubuntu-latest

    strategy:
      fail-fast: false
      matrix:
        phpVersion:
          - '7.4'
          - '8.0'
          - '8.1'
          - '8.2'
        wpVersion:
          - '6.0'
          - '6.1'
          - '6.2'

    steps:

      
      - name: Checkout
        uses: actions/checkout@v4

      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'
          tools: composer

      - name: Setup workflow context
        id: workflow
        working-directory: ${{ runner.temp }}
        env:
          REPO: ${{ github.repository }}
        run: |
          mkdir dist
          echo "DIST=${PWD}/dist" >> $GITHUB_OUTPUT
          echo "PACKAGE=${REPO##*/}" >> $GITHUB_OUTPUT

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20.x
          cache: 'npm'

      - name: Get Composer cache directory
        id: composer-cache
        run: echo "dir=$(composer config cache-files-dir)" >> $GITHUB_OUTPUT

      - name: Cache Composer vendor directory
        uses: actions/cache@v3
        with:
          path: ${{ steps.composer-cache.outputs.dir }}
          key: ${{ runner.os }}-composer-${{ hashFiles('**/composer.lock') }}
          restore-keys: |
            ${{ runner.os }}-composer-

      - name: Show versions
        run: |
          php --version
          composer --version
          node --version
          npm --version

      - name: Validate composer.json and composer.lock
        run: composer validate

      - name: Install PHP Dependencies
        run: composer install --no-progress --no-dev

      - name: NPM Install
        run: npm install

      - name: Create Distribution Copy
        run: rsync -r --exclude-from=.distignore . ${{ steps.workflow.outputs.DIST }}/${{ steps.workflow.outputs.PACKAGE }}

      - name: List Distribution Files
        working-directory: ${{ steps.workflow.outputs.DIST }}
        run: find .

      - name: Configure WordPress
        run: |
          echo '{"core": "WordPress/WordPress#tags/${{ matrix.wpVersion }}","phpVersion": "${{ matrix.phpVersion }}","plugins": [ "${{ steps.workflow.outputs.DIST }}/${{ steps.workflow.outputs.PACKAGE }}" ] }' > .wp-env.override.json

      - name: Configure Cypress
        run: |
          echo '{"wpVersion": "${{ matrix.wpVersion }}","phpVersion": "${{ matrix.phpVersion }}"}' > cypress.env.json

      - name: Install WordPress
        run: npx wp-env start --debug

      - name: Run Cypress Tests
        run: npm run test

      - name: Store screenshots of test failures
        if: ${{ failure() }}
        uses: actions/upload-artifact@v3
        with:
          name: screenshots
          path: ./tests/cypress/screenshots

```

```