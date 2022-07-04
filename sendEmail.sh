#!/bin/bash
echo "$1" | mail -a "Content-Type: text/html; charset=UTF-8" -a "From: $4 <pizarromario@gmail.com>" -a "Cc: RMP $5" -s "$2" "$3"
