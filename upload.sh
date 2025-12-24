#!/bin/bash

echo "🎨 GitHub Stats - Configuración Automática"
echo "=========================================="
echo ""

# Verificar si estamos en un repositorio git
if [ ! -d .git ]; then
    echo "⚠️  No estás en un repositorio git. Inicializando..."
    git init
    git remote add origin https://github.com/VaninaLopetegui/Presentation-of-my-profile.git
fi

echo "📦 Agregando archivos al staging..."
git add .gitignore
git add package.json
git add generate-screenshot.js
git add github-stats.html
git add styles.css
git add github-stats.js
git add GITHUB-STATS-README.md
git add README.md
git add .github/workflows/generate-stats.yml

echo ""
echo "📝 Creando commit..."
git commit -m "✨ Add automated GitHub stats with GitHub Actions

- Custom stats design with modern UI
- Automated screenshot generation via GitHub Actions
- Daily updates at midnight
- Manual trigger available via workflow_dispatch"

echo ""
echo "🔍 Estado del repositorio:"
git status

echo ""
echo "🚀 ¿Deseas subir los cambios a GitHub? (s/n)"
read -r response

if [[ "$response" =~ ^[Ss]$ ]]; then
    echo ""
    echo "📤 Subiendo cambios a GitHub..."
    
    # Verificar la rama actual
    current_branch=$(git branch --show-current)
    
    if [ -z "$current_branch" ]; then
        echo "📌 Creando rama main..."
        git branch -M main
        current_branch="main"
    fi
    
    echo "🌿 Rama actual: $current_branch"
    git push -u origin "$current_branch"
    
    echo ""
    echo "✅ ¡Cambios subidos exitosamente!"
    echo ""
    echo "🎯 Próximos pasos:"
    echo "1. Ve a: https://github.com/VaninaLopetegui/Presentation-of-my-profile/actions"
    echo "2. Selecciona el workflow 'Generate GitHub Stats'"
    echo "3. Haz clic en 'Run workflow' para generar la primera captura"
    echo "4. Espera unos minutos y actualiza tu README para ver las stats"
    echo ""
    echo "⏰ El workflow se ejecutará automáticamente cada día a medianoche"
    echo "📸 También se ejecutará cada vez que modifiques los archivos HTML/CSS/JS"
else
    echo ""
    echo "⏸️  Push cancelado. Puedes hacerlo manualmente con:"
    echo "   git push -u origin main"
fi

echo ""
echo "🎉 ¡Configuración completa!"
