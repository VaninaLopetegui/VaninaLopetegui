const username = 'VaninaLopetegui';
const GITHUB_TOKEN = ''; // Opcionalmente, agrega tu token aquí para evitar límites de rate

// Colores para los lenguajes
const languageColors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Java': '#b07219',
    'Rust': '#dea584',
    'C#': '#178600',
    'ShaderLab': '#222c37',
    'Python': '#3572A5',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Vue': '#41b883',
    'React': '#61dafb'
};

async function fetchGitHubStats() {
    try {
        const headers = GITHUB_TOKEN ? {
            'Authorization': `token ${GITHUB_TOKEN}`
        } : {};

        // Obtener información del usuario
        const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers });
        const userData = await userResponse.json();

        // Obtener repositorios
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers });
        const repos = await reposResponse.json();

        // Calcular total de estrellas
        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

        // Obtener commits del último año
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        
        let totalCommits = 0;
        try {
            const commitsResponse = await fetch(
                `https://api.github.com/search/commits?q=author:${username}+committer-date:>${oneYearAgo.toISOString().split('T')[0]}`,
                { 
                    headers: {
                        ...headers,
                        'Accept': 'application/vnd.github.cloak-preview'
                    }
                }
            );
            const commitsData = await commitsResponse.json();
            totalCommits = commitsData.total_count || 0;
        } catch (error) {
            console.log('No se pudieron obtener commits, usando valor estimado');
            totalCommits = userData.public_repos * 10; // Estimación
        }

        // Contar Pull Requests
        let totalPRs = 0;
        try {
            const prsResponse = await fetch(
                `https://api.github.com/search/issues?q=author:${username}+type:pr`,
                { headers }
            );
            const prsData = await prsResponse.json();
            totalPRs = prsData.total_count || 0;
        } catch (error) {
            console.log('No se pudieron obtener PRs');
            totalPRs = 0;
        }

        // Obtener lenguajes
        const languageStats = {};
        for (const repo of repos) {
            if (!repo.fork) {
                try {
                    const langResponse = await fetch(repo.languages_url, { headers });
                    const languages = await langResponse.json();
                    
                    for (const [lang, bytes] of Object.entries(languages)) {
                        languageStats[lang] = (languageStats[lang] || 0) + bytes;
                    }
                } catch (error) {
                    console.log(`Error obteniendo lenguajes para ${repo.name}`);
                }
            }
        }

        // Calcular porcentajes
        const totalBytes = Object.values(languageStats).reduce((sum, bytes) => sum + bytes, 0);
        const languagePercentages = Object.entries(languageStats)
            .map(([lang, bytes]) => ({
                name: lang,
                percentage: ((bytes / totalBytes) * 100).toFixed(2)
            }))
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 6);

        // Calcular grado basado en actividad
        const activityScore = Math.min(100, (totalStars * 2 + totalCommits / 5 + totalPRs * 5));
        const grade = calculateGrade(activityScore);

        return {
            stars: formatNumber(totalStars),
            commits: formatNumber(totalCommits),
            prs: formatNumber(totalPRs),
            languages: languagePercentages,
            grade: grade,
            gradePercentage: activityScore
        };
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        return null;
    }
}

function calculateGrade(score) {
    if (score >= 95) return 'A+';
    if (score >= 90) return 'A';
    if (score >= 85) return 'A-';
    if (score >= 80) return 'B+';
    if (score >= 75) return 'B';
    if (score >= 70) return 'B-';
    if (score >= 65) return 'C+';
    if (score >= 60) return 'C';
    return 'C-';
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

function updateUI(stats) {
    if (!stats) {
        document.getElementById('stars').textContent = 'Error';
        document.getElementById('commits').textContent = 'Error';
        document.getElementById('prs').textContent = 'Error';
        return;
    }

    // Actualizar estadísticas
    document.getElementById('stars').textContent = stats.stars;
    document.getElementById('commits').textContent = stats.commits;
    document.getElementById('prs').textContent = stats.prs;
    document.getElementById('grade').textContent = stats.grade;

    // Actualizar círculo de progreso
    const circle = document.getElementById('progress-circle');
    const circumference = 2 * Math.PI * 70;
    const offset = circumference - (stats.gradePercentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;

    // Actualizar barra de lenguajes
    const languageBar = document.getElementById('language-bar');
    languageBar.innerHTML = '';
    
    stats.languages.forEach(lang => {
        const segment = document.createElement('div');
        segment.className = 'language-segment';
        segment.style.width = `${lang.percentage}%`;
        segment.style.backgroundColor = languageColors[lang.name] || '#888';
        segment.title = `${lang.name}: ${lang.percentage}%`;
        languageBar.appendChild(segment);
    });

    // Actualizar lista de lenguajes
    const languageList = document.getElementById('language-list');
    languageList.innerHTML = '';
    
    stats.languages.forEach(lang => {
        const item = document.createElement('div');
        item.className = 'language-item';
        
        const dot = document.createElement('div');
        dot.className = 'language-dot';
        dot.style.backgroundColor = languageColors[lang.name] || '#888';
        
        const name = document.createElement('span');
        name.className = 'language-name';
        name.textContent = lang.name;
        
        const percentage = document.createElement('span');
        percentage.className = 'language-percentage';
        percentage.textContent = `${lang.percentage}%`;
        
        item.appendChild(dot);
        item.appendChild(name);
        item.appendChild(percentage);
        languageList.appendChild(item);
    });
}

// Cargar estadísticas al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    const stats = await fetchGitHubStats();
    updateUI(stats);
});
