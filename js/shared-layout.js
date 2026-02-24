// shared-layout.js — injects sidebar + nav into every doc page
(function () {
    const SIDEBAR_HTML = `
<nav class="top-nav">
  <button class="sidebar-toggle" id="sidebar-toggle">☰</button>
  <a href="index.html" class="nav-brand">
    <div class="nav-logo">⚡</div>
    <span class="nav-title">ML Engineering Hub</span>
  </a>
  <div class="nav-search-wrap">
    <span class="search-icon">🔍</span>
    <input class="nav-search" id="main-search" type="text" placeholder="Search functions... (Ctrl+K)" autocomplete="off"/>
    <div class="search-results" id="search-results"></div>
  </div>
  <div class="nav-actions">
    <button class="btn-icon" id="theme-toggle" title="Toggle theme">☀️</button>
  </div>
</nav>
<div class="sidebar-overlay" id="sidebar-overlay"></div>
<div class="progress-bar"><div class="progress-fill" id="progress-fill"></div></div>
<aside class="sidebar" id="sidebar">
  <div class="sidebar-section">
    <div class="sidebar-heading">Home</div>
    <a href="index.html" class="sidebar-link">🏠 Overview</a>
  </div>
  <div class="sidebar-section">
    <div class="sidebar-heading">Core Libraries</div>
    <a href="numpy.html" class="sidebar-link">🔢 NumPy</a>
    <a href="pandas.html" class="sidebar-link">🐼 Pandas</a>
    <a href="matplotlib.html" class="sidebar-link">📈 Matplotlib</a>
  </div>
  <div class="sidebar-section">
    <div class="sidebar-heading">Scikit-learn</div>
    <a href="sklearn-preprocessing.html" class="sidebar-link">⚙️ Preprocessing</a>
    <a href="sklearn-models.html" class="sidebar-link">🤖 Models</a>
    <a href="sklearn-evaluation.html" class="sidebar-link">📊 Evaluation</a>
  </div>
  <div class="sidebar-section">
    <div class="sidebar-heading">Deep Learning</div>
    <a href="tensorflow.html" class="sidebar-link">🧠 TensorFlow / Keras</a>
  </div>
  <div class="sidebar-section">
    <div class="sidebar-heading">Production</div>
    <a href="pipelines.html" class="sidebar-link">🔗 ML Pipelines</a>
    <a href="advanced.html" class="sidebar-link">🔬 Advanced Topics</a>
  </div>
</aside>`;

    // Insert before body content
    document.body.insertAdjacentHTML('afterbegin', SIDEBAR_HTML);
})();
