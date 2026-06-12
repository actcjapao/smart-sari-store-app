# Hostinger: Global Composer, Multiple PHP Versions, and Laravel Deployment Notes

> **Reference File**
>
> `step_file`: `Steps in setting up your Laravel project on another computer (Latest).txt`
>
> This file contains the primary setup workflow. The notes below are supplementary knowledge gathered while deploying Laravel projects on Hostinger.

---

## Background

A single Hostinger account may host multiple domains, each configured with a different PHP version.

Example:

```text
Domain A -> PHP 8.1
Domain B -> PHP 8.3
Domain C -> PHP 8.4
```

At the same time, Composer may be installed globally and may use a different PHP version from the websites themselves.

Because of this, always verify:

1. Composer version
2. Composer installation scope
3. Available PHP binaries
4. PHP version required by the project

before running Composer commands.

---

## Step 1: Verify Composer Version

Check the installed Composer version:

```bash
composer --version
```

Example output:

```text
Composer version 2.9.8
PHP version 8.1.34
```

### Notes

- Laravel 12 requires Composer v2.
- If Composer is already v2, there is no need to install `composer.phar`.
- The PHP version shown in this command is the PHP version currently used by Composer in the CLI environment.
- This does **not** necessarily mean the website itself is running on that same PHP version.

---

## Step 2: Determine Whether Composer Is Global or Project-Specific

Check Composer's location:

```bash
which composer
```

Example output:

```text
/usr/bin/composer
```

or

```text
/opt/alt/composer/bin/composer
```

### Interpretation

If `which composer` returns a valid executable path:

```bash
composer install
composer update
```

can be executed from any project directory.

This usually means Composer is installed globally on the hosting account/server.

---

### Alternative: Local Composer (`composer.phar`)

Some projects may keep Composer inside the project directory:

```text
project-root/
├── composer.phar
├── composer.json
└── ...
```

Commands are then executed as:

```bash
php composer.phar install
php composer.phar update
```

This setup isolates Composer to a specific project.

---

## Step 3: Verify Available PHP Versions

On Hostinger, list available PHP binaries:

```bash
ls /opt/alt/
```

Example output:

```text
php80
php81
php82
php83
php84
php85
```

This indicates that multiple PHP versions are installed and available for use.

---

## Step 4: Understand the Important Distinction

Composer itself is largely independent of the PHP version used by the website.

However, Composer resolves dependencies using the PHP executable that launches it.

Example:

```bash
composer --version
```

may show:

```text
PHP version 8.1
```

while the website itself is configured to run:

```text
PHP 8.3
```

This situation is common on shared hosting environments.

---

## Step 5: Match Composer With the Project's PHP Requirement

Example Laravel project:

```json
{
   "require": {
      "php": "^8.2",
      "laravel/framework": "^12.0"
   }
}
```

The constraint:

```text
^8.2
```

means:

```text
8.2.x  ✔
8.3.x  ✔
8.4.x  ✔
9.0.x  ✘
```

Before running Composer commands, ensure Composer is executed with a compatible PHP binary.

Example using PHP 8.3:

```bash
/opt/alt/php83/usr/bin/php $(which composer) install
```

Example update:

```bash
/opt/alt/php83/usr/bin/php $(which composer) update --no-scripts
```

### Command Breakdown

```bash
/opt/alt/php83/usr/bin/php
```

The PHP executable that will run Composer.

```bash
$(which composer)
```

Resolves the location of the global Composer executable.

```bash
install
```

The Composer command being executed.

Examples:

```bash
install
install --no-dev
update
update --no-scripts
```

Refer to `step_file` for the exact command sequence used by the project.

---

## Why This Matters

Suppose:

```text
Domain A -> Legacy project -> PHP 8.1
Domain B -> Laravel 12 -> PHP 8.3
```

Changing global PHP settings may impact older projects.

Instead of modifying global configuration, simply invoke Composer using the correct PHP binary for the target project.

Example:

```bash
/opt/alt/php83/usr/bin/php $(which composer) install --no-dev
```

This keeps older domains untouched while allowing newer Laravel applications to use supported PHP versions.

---

## Practical Rule

Before running any Composer command on Hostinger:

1. Check Composer version.

```bash
composer --version
```

2. Check Composer location.

```bash
which composer
```

3. Check available PHP binaries.

```bash
ls /opt/alt/
```

4. Check the project's required PHP version.

```json
"php": "^8.2"
```

5. Execute Composer using a compatible PHP binary.

```bash
/opt/alt/php83/usr/bin/php $(which composer) install --no-dev
```

Note:

- `--no-dev` will install dependencies not only "require" from `composer.json` but also "require-dev"
- Other php commands also needs explicit php binaries: `/opt/alt/php83/usr/bin/php artisan key:generate --ansi` instead of plain `php artisan key:generate --ansi` command.

6. Continue with the remaining deployment steps from:

```text
Steps in setting up your Laravel project on another computer (Latest).txt
```

---

## Key Takeaway

Do not assume that:

```bash
composer --version
```

and

```bash
php -v
```

represent the PHP version used by all hosted websites.

On Hostinger:

- Websites may use different PHP versions per domain.
- Composer may be globally installed.
- The CLI environment may default to a different PHP version.
- The safest approach is to explicitly run Composer using the PHP binary required by the project.
