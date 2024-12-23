#!/bin/bash

# Vérifiez si un message de commit a été fourni
if [ -z "$1" ]; then
  echo "Usage: $0 <commit-message>"
  exit 1
fi

# Ajoutez tous les fichiers
git add .

# Faites un commit avec le message fourni
git commit -m "$1"

# Poussez les changements vers la branche principale
git push origin main