// shared-layout.js — injects sidebar + nav into every doc page
(function () {
  const SIDEBAR_HTML = `
<nav class="top-nav">
  <button class="sidebar-toggle" id="sidebar-toggle">☰</button>
  <a href="index.html" class="nav-brand">
    <span class="nav-title">TWSS</span>
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
</aside>
<div id="ai-chat-widget">
    <button id="ai-chat-toggle" class="glow-effect" aria-label="Toggle AI Assistant">✨</button>
    <div id="ai-chat-window" class="glass-panel hidden">
        <div class="ai-chat-header">
            <h3>TWSS AI Assistant</h3>
            <button id="ai-chat-close">✖</button>
        </div>
        <div id="ai-chat-messages">
            <div class="message ai-message">Hello! I'm your TWSS AI Assistant. How can I help you?</div>
        </div>
        <div class="ai-chat-input-area">
            <input type="text" id="ai-chat-input" placeholder="Ask anything..." autocomplete="off">
            <button id="ai-chat-send">Send</button>
        </div>
    </div>
</div>
`;

  // Insert before body content
  document.body.insertAdjacentHTML('afterbegin', SIDEBAR_HTML);

  // Initialize AI Chat logic if the script is loaded
  if (window.initAIChat) window.initAIChat();
  if (window.initSidebar) window.initSidebar();
})();
