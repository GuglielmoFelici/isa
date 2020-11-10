#!/bin/bash
home_rsync push -o "www-data:www-data" -d "/var/www/isa/" *html *js *css
