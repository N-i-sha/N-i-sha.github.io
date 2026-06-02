const GITHUB_USERNAME = "N-i-sha";
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

const LANG_COLORS = {
  "Python": "#3572A5",
  "JavaScript": "#f1e05a",
  "TypeScript": "#3178c6",
  "HTML": "#e34c26",
  "CSS": "#563d7c",
  "Jupyter Notebook": "#DA5B0B",
  "Java": "#b07219",
  "C++": "#f34b7d",
  "Shell": "#89e051",
  "Vue": "#41b883",
  "React": "#61dafb",
};

const REPO_ICONS = {
  "Python": "🐍",
  "Jupyter Notebook": "📊",
  "JavaScript": "⚡",
  "TypeScript": "📘",
  "HTML": "🌐",
  "CSS": "🎨",
  "Java": "☕",
  "Shell": "🖥️",
  "Vue": "💚",
};

function getIcon(lang) {
  return REPO_ICONS[lang] || "📁";
}

function getLangColor(lang) {
  return LANG_COLORS[lang] || "#8888a0";
}

function timeAgo(dateStr) {
  const now = new Date();
  const then = new Date(dateStr);
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`;
  return `${Math.floor(diff / 31536000)}y ago`;
}

function buildCard(repo) {
  const hasHomepage = repo.homepage && repo.homepage.trim() !== "";
  const desc = repo.description || "No description provided.";

  return `
    <a class="project-card" href="${repo.html_url}" target="_blank" data-lang="${repo.language || ''}">
      <div class="project-header">
        <span class="project-icon">${getIcon(repo.language)}</span>
        <div class="project-links">
          ${hasHomepage ? `<a class="project-link" href="${repo.homepage}" target="_blank" title="Live Demo" onclick="event.stopPropagation()">🔗</a>` : ""}
          <a class="project-link" href="${repo.html_url}" target="_blank" title="View on GitHub" onclick="event.stopPropagation()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
        </div>
      </div>
      <div class="project-name">${repo.name.replace(/-/g, " ").replace(/_/g, " ")}</div>
      <div class="project-desc">${desc}</div>
      <div class="project-footer">
        <div class="project-lang">
          ${repo.language ? `<span class="lang-dot" style="background:${getLangColor(repo.language)}"></span>${repo.language}` : "—"}
          ${repo.fork ? '<span class="fork-badge">fork</span>' : ""}
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          ${repo.stargazers_count > 0 ? `<span class="project-stars">★ ${repo.stargazers_count}</span>` : ""}
          <span class="project-updated">${timeAgo(repo.updated_at)}</span>
        </div>
      </div>
    </a>
  `;
}

let allRepos = [];

async function fetchRepos() {
  const loading = document.getElementById("projects-loading");
  const error = document.getElementById("projects-error");
  const grid = document.getElementById("projects-grid");
  const empty = document.getElementById("projects-empty");

  try {
    const res = await fetch(GITHUB_API, {
      headers: { "Accept": "application/vnd.github+json" }
    });

    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const repos = await res.json();

    // Filter out the portfolio repo itself, sort by updated
    allRepos = repos
      .filter(r => r.name.toLowerCase() !== "portfolio" && !r.archived)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    // Update stats
    const langs = [...new Set(allRepos.map(r => r.language).filter(Boolean))];
    document.getElementById("repo-count").textContent = allRepos.length;
    document.getElementById("lang-count").textContent = langs.length;

    loading.style.display = "none";

    if (allRepos.length === 0) {
      empty.style.display = "block";
      return;
    }

    renderCards(allRepos);

  } catch (err) {
    console.error(err);
    loading.style.display = "none";
    error.style.display = "block";
  }
}

function renderCards(repos) {
  const grid = document.getElementById("projects-grid");
  const empty = document.getElementById("projects-empty");

  if (repos.length === 0) {
    grid.innerHTML = "";
    empty.style.display = "block";
    return;
  }

  empty.style.display = "none";
  grid.innerHTML = repos.map(buildCard).join("");
}

// FILTER
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const lang = btn.dataset.lang;
    if (lang === "all") {
      renderCards(allRepos);
    } else {
      renderCards(allRepos.filter(r => r.language === lang));
    }
  });
});

// NAV highlight on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute("href") === "#" + entry.target.id ? "#fff" : "";
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// Init
fetchRepos();
