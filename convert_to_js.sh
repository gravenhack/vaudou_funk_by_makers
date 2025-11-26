#!/bin/bash

# Script pour convertir tous les fichiers TypeScript en JavaScript
# Supprime les types TypeScript et renomme les extensions

echo "🔄 Conversion TypeScript → JavaScript..."
echo ""

# Fonction pour nettoyer les imports TypeScript
clean_imports() {
    local file=$1
    # Supprimer les imports de types
    sed -i "s/import.*from '\\.\/types';.*//g" "$file"
    sed -i "s/import.*from '\\.\/types'.*//g" "$file"

    # Supprimer les annotations de type dans les imports
    sed -i 's/import type {[^}]*} from/import {/g' "$file"
    sed -i 's/import type [^ ]* from/import/g' "$file"

    # Supprimer les types dans les imports normaux
    sed -i 's/import { \(.*\): \w\+/import { \1/g' "$file"
}

# Fonction pour supprimer les annotations TypeScript
remove_types() {
    local file=$1

    # Supprimer : Type dans les paramètres de fonction
    sed -i 's/\([a-zA-Z_][a-zA-Z0-9_]*\): [A-Z][a-zA-Z0-9<>[\]|, ]*\([,)]\)/\1\2/g' "$file"

    # Supprimer les types de retour : Type
    sed -i 's/): [A-Z][a-zA-Z0-9<>[\]| ]*\( =>\| {\)/)\1/g' "$file"

    # Supprimer React.FC<Props>
    sed -i 's/: React\.FC<[^>]*>/=/g' "$file"
    sed -i 's/const \([A-Z][a-zA-Z0-9]*\):/const \1 =/g' "$file"

    # Supprimer interface/type definitions
    sed -i '/^interface /d' "$file"
    sed -i '/^export interface /d' "$file"
    sed -i '/^type /d' "$file"
    sed -i '/^export type /d' "$file"
}

# Convertir les fichiers .ts en .js
for file in $(find frontend -name "*.ts" ! -name "*.d.ts" ! -name "vite.config.ts" | grep -v node_modules); do
    newfile="${file%.ts}.js"
    echo "📄 $file → $newfile"

    cp "$file" "$newfile"
    clean_imports "$newfile"
    remove_types "$newfile"
    rm "$file"
done

# Convertir les fichiers .tsx en .jsx
for file in $(find frontend -name "*.tsx" | grep -v node_modules); do
    newfile="${file%.tsx}.jsx"
    echo "📄 $file → $newfile"

    cp "$file" "$newfile"
    clean_imports "$newfile"
    remove_types "$newfile"
    rm "$file"
done

echo ""
echo "✅ Conversion terminée !"
echo ""
echo "⚠️  N'oubliez pas de :"
echo "   1. Vérifier les imports dans les fichiers convertis"
echo "   2. Supprimer tsconfig.json si vous n'en avez plus besoin"
echo "   3. Tester l'application"
