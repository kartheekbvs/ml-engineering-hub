/* =====================================================
   ML Engineering Reference Hub — Main JavaScript
   ===================================================== */

// ── Theme ──────────────────────────────────────────────
const Theme = {
    key: 'mlhub-theme',
    init() {
        const saved = localStorage.getItem(this.key) || 'dark';
        this.apply(saved, false);
    },
    toggle() {
        const next = document.body.classList.contains('light-mode') ? 'dark' : 'light';
        this.apply(next);
    },
    apply(mode, animate = true) {
        if (animate) document.body.style.transition = 'background 0.3s, color 0.3s';
        if (mode === 'light') document.body.classList.add('light-mode');
        else document.body.classList.remove('light-mode');
        localStorage.setItem(this.key, mode);
        const btn = document.getElementById('theme-toggle');
        if (btn) btn.innerHTML = mode === 'light' ? '🌙' : '☀️';
        if (animate) setTimeout(() => document.body.style.transition = '', 400);
    }
};

// ── Copy to Clipboard ──────────────────────────────────
function initCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const wrap = btn.closest('.code-wrap');
            const pre = wrap ? wrap.querySelector('pre') : null;
            const text = pre ? pre.innerText : '';
            try {
                await navigator.clipboard.writeText(text);
                btn.classList.add('copied');
                btn.innerHTML = '✓ Copied!';
                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.innerHTML = '<span>⎘</span> Copy';
                }, 2000);
            } catch {
                btn.innerHTML = 'Error';
            }
        });
    });
}

// ── Sidebar Toggle ─────────────────────────────────────
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const toggle = document.getElementById('sidebar-toggle');

    if (!sidebar || !overlay || !toggle) return;

    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    });
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    });
}

// ── Active Sidebar Link ────────────────────────────────
function initActiveLink() {
    const links = document.querySelectorAll('.sidebar-link[href]');
    const path = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(link => {
        const href = link.getAttribute('href').split('#')[0];
        if (href === path) link.classList.add('active');
    });
}

// ── Func Card Accordion ────────────────────────────────
function initFuncCards() {
    document.querySelectorAll('.func-card-header').forEach(header => {
        header.addEventListener('click', () => {
            const card = header.closest('.func-card');
            const wasExpanded = card.classList.contains('expanded');
            // Optionally close others
            // document.querySelectorAll('.func-card.expanded').forEach(c => c.classList.remove('expanded'));
            card.classList.toggle('expanded', !wasExpanded);
        });
    });
}

// ── Func Card Tabs ─────────────────────────────────────
function initFuncTabs() {
    document.querySelectorAll('.func-tabs').forEach(tabsEl => {
        const tabs = tabsEl.querySelectorAll('.func-tab');
        const card = tabsEl.closest('.func-card');
        const contents = card.querySelectorAll('.func-tab-content');

        tabs.forEach((tab, i) => {
            tab.addEventListener('click', (e) => {
                e.stopPropagation();
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                if (contents[i]) contents[i].classList.add('active');
            });
        });
        // Activate first tab by default
        if (tabs[0]) tabs[0].classList.add('active');
        if (contents[0]) contents[0].classList.add('active');
    });
}

// ── Scroll Progress Bar ────────────────────────────────
function initScrollProgress() {
    const fill = document.getElementById('progress-fill');
    if (!fill) return;
    window.addEventListener('scroll', () => {
        const h = document.documentElement;
        const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
        fill.style.width = pct + '%';
    }, { passive: true });
}

// ── TOC Highlighting ───────────────────────────────────
function initTOC() {
    const tocLinks = document.querySelectorAll('.toc-link[href^="#"]');
    if (!tocLinks.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                tocLinks.forEach(l => l.classList.remove('active'));
                const id = entry.target.id;
                const active = document.querySelector(`.toc-link[href="#${id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { rootMargin: '-60px 0px -70% 0px' });

    tocLinks.forEach(link => {
        const id = link.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });
}

// ── Search Engine ──────────────────────────────────────
const SEARCH_INDEX = [
    // NumPy
    { lib: 'NumPy', name: 'np.array()', desc: 'Create N-dimensional array', url: 'numpy.html#np-array' },
    { lib: 'NumPy', name: 'np.zeros()', desc: 'Array of zeros', url: 'numpy.html#np-zeros' },
    { lib: 'NumPy', name: 'np.ones()', desc: 'Array of ones', url: 'numpy.html#np-ones' },
    { lib: 'NumPy', name: 'np.arange()', desc: 'Evenly spaced values', url: 'numpy.html#np-arange' },
    { lib: 'NumPy', name: 'np.linspace()', desc: 'Linear space array', url: 'numpy.html#np-linspace' },
    { lib: 'NumPy', name: 'np.reshape()', desc: 'Reshape array', url: 'numpy.html#np-reshape' },
    { lib: 'NumPy', name: 'np.dot()', desc: 'Dot product', url: 'numpy.html#np-dot' },
    { lib: 'NumPy', name: 'np.random.seed()', desc: 'Set random seed', url: 'numpy.html#np-random-seed' },
    { lib: 'NumPy', name: 'np.mean()', desc: 'Compute mean', url: 'numpy.html#np-mean' },
    { lib: 'NumPy', name: 'np.std()', desc: 'Standard deviation', url: 'numpy.html#np-std' },
    // Pandas
    { lib: 'Pandas', name: 'pd.read_csv()', desc: 'Read CSV file', url: 'pandas.html#read-csv' },
    { lib: 'Pandas', name: 'df.head()', desc: 'First N rows', url: 'pandas.html#head' },
    { lib: 'Pandas', name: 'df.info()', desc: 'DataFrame info', url: 'pandas.html#info' },
    { lib: 'Pandas', name: 'df.describe()', desc: 'Statistical summary', url: 'pandas.html#describe' },
    { lib: 'Pandas', name: 'df.isnull()', desc: 'Detect missing values', url: 'pandas.html#isnull' },
    { lib: 'Pandas', name: 'df.dropna()', desc: 'Drop missing rows', url: 'pandas.html#dropna' },
    { lib: 'Pandas', name: 'df.fillna()', desc: 'Fill missing values', url: 'pandas.html#fillna' },
    { lib: 'Pandas', name: 'df.groupby()', desc: 'Group and aggregate', url: 'pandas.html#groupby' },
    { lib: 'Pandas', name: 'df.merge()', desc: 'Merge DataFrames', url: 'pandas.html#merge' },
    { lib: 'Pandas', name: 'df.loc[]', desc: 'Label-based indexing', url: 'pandas.html#loc' },
    { lib: 'Pandas', name: 'df.iloc[]', desc: 'Integer-based indexing', url: 'pandas.html#iloc' },
    { lib: 'Pandas', name: 'df.apply()', desc: 'Apply function along axis', url: 'pandas.html#apply' },
    // Matplotlib
    { lib: 'Matplotlib', name: 'plt.plot()', desc: 'Line plot', url: 'matplotlib.html#plt-plot' },
    { lib: 'Matplotlib', name: 'plt.scatter()', desc: 'Scatter plot', url: 'matplotlib.html#plt-scatter' },
    { lib: 'Matplotlib', name: 'plt.hist()', desc: 'Histogram', url: 'matplotlib.html#plt-hist' },
    { lib: 'Matplotlib', name: 'plt.bar()', desc: 'Bar chart', url: 'matplotlib.html#plt-bar' },
    { lib: 'Matplotlib', name: 'plt.subplots()', desc: 'Create figure and axes', url: 'matplotlib.html#plt-subplots' },
    { lib: 'Matplotlib', name: 'plt.imshow()', desc: 'Display image', url: 'matplotlib.html#plt-imshow' },
    // Scikit-learn
    { lib: 'sklearn', name: 'train_test_split()', desc: 'Split data for training/testing', url: 'sklearn-preprocessing.html#train-test-split' },
    { lib: 'sklearn', name: 'StandardScaler', desc: 'Standardize features', url: 'sklearn-preprocessing.html#standard-scaler' },
    { lib: 'sklearn', name: 'MinMaxScaler', desc: 'Scale to [0,1] range', url: 'sklearn-preprocessing.html#minmax-scaler' },
    { lib: 'sklearn', name: 'LabelEncoder', desc: 'Encode categorical labels', url: 'sklearn-preprocessing.html#label-encoder' },
    { lib: 'sklearn', name: 'OneHotEncoder', desc: 'One-hot encode categories', url: 'sklearn-preprocessing.html#onehot-encoder' },
    { lib: 'sklearn', name: 'SimpleImputer', desc: 'Handle missing values', url: 'sklearn-preprocessing.html#simple-imputer' },
    { lib: 'sklearn', name: 'Pipeline', desc: 'Chain transformers and estimator', url: 'sklearn-preprocessing.html#pipeline' },
    { lib: 'sklearn', name: 'LinearRegression', desc: 'Ordinary least squares regression', url: 'sklearn-models.html#linear-regression' },
    { lib: 'sklearn', name: 'LogisticRegression', desc: 'Logistic regression classifier', url: 'sklearn-models.html#logistic-regression' },
    { lib: 'sklearn', name: 'RandomForestClassifier', desc: 'Ensemble tree classifier', url: 'sklearn-models.html#random-forest' },
    { lib: 'sklearn', name: 'GradientBoostingClassifier', desc: 'Gradient boosting ensemble', url: 'sklearn-models.html#gradient-boosting' },
    { lib: 'sklearn', name: 'SVC', desc: 'Support Vector Classifier', url: 'sklearn-models.html#svc' },
    { lib: 'sklearn', name: 'KMeans', desc: 'K-Means clustering', url: 'sklearn-models.html#kmeans' },
    { lib: 'sklearn', name: 'GridSearchCV', desc: 'Exhaustive hyperparameter search', url: 'sklearn-evaluation.html#gridsearchcv' },
    { lib: 'sklearn', name: 'cross_val_score()', desc: 'K-fold cross validation', url: 'sklearn-evaluation.html#cross-val-score' },
    { lib: 'sklearn', name: 'confusion_matrix()', desc: 'Confusion matrix', url: 'sklearn-evaluation.html#confusion-matrix' },
    { lib: 'sklearn', name: 'classification_report()', desc: 'Full classification metrics', url: 'sklearn-evaluation.html#classification-report' },
    // TensorFlow
    { lib: 'TensorFlow', name: 'tf.keras.Sequential', desc: 'Sequential model API', url: 'tensorflow.html#sequential' },
    { lib: 'TensorFlow', name: 'model.compile()', desc: 'Configure training', url: 'tensorflow.html#compile' },
    { lib: 'TensorFlow', name: 'model.fit()', desc: 'Train model', url: 'tensorflow.html#fit' },
    { lib: 'TensorFlow', name: 'model.evaluate()', desc: 'Evaluate on test data', url: 'tensorflow.html#evaluate' },
    { lib: 'TensorFlow', name: 'EarlyStopping', desc: 'Stop training on plateau', url: 'tensorflow.html#early-stopping' },
    { lib: 'TensorFlow', name: 'tf.data.Dataset', desc: 'Efficient data pipeline', url: 'tensorflow.html#tf-data' },
    { lib: 'TensorFlow', name: 'ModelCheckpoint', desc: 'Save best model during training', url: 'tensorflow.html#model-checkpoint' },
    // Pipelines
    { lib: 'Pipelines', name: 'Full ML Pipeline', desc: 'End-to-end production pipeline', url: 'pipelines.html' },
    // Advanced
    { lib: 'Advanced', name: 'joblib.dump()', desc: 'Save model with joblib', url: 'advanced.html#joblib-save' },
    { lib: 'Advanced', name: 'Feature Importance', desc: 'Extract feature importance', url: 'advanced.html#feature-importance' },
    { lib: 'Advanced', name: 'Random State Theory', desc: 'Reproducibility deep dive', url: 'advanced.html#random-state' },
];

function initSearch() {
    const input = document.getElementById('main-search');
    const resultsEl = document.getElementById('search-results');
    if (!input || !resultsEl) return;

    function render(query) {
        const q = query.toLowerCase().trim();
        if (!q) { resultsEl.classList.remove('active'); return; }

        const hits = SEARCH_INDEX.filter(item =>
            item.name.toLowerCase().includes(q) ||
            item.desc.toLowerCase().includes(q) ||
            item.lib.toLowerCase().includes(q)
        ).slice(0, 8);

        if (!hits.length) {
            resultsEl.innerHTML = `<div class="search-result-item"><span class="result-desc">No results for "${query}"</span></div>`;
        } else {
            resultsEl.innerHTML = hits.map(h => `
        <a class="search-result-item" href="${h.url}">
          <span class="result-lib">${h.lib}</span>
          <div>
            <div class="result-name">${h.name}</div>
            <div class="result-desc">${h.desc}</div>
          </div>
        </a>`).join('');
        }
        resultsEl.classList.add('active');
    }

    input.addEventListener('input', () => render(input.value));
    input.addEventListener('focus', () => { if (input.value) render(input.value); });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-search-wrap')) {
            resultsEl.classList.remove('active');
        }
    });

    document.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            input.focus();
        }
    });
}

// ── Smooth Scroll for Anchor Links ─────────────────────
function initAnchorLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const id = this.getAttribute('href').slice(1);
            const target = document.getElementById(id);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

// ── Fade-up Animation ──────────────────────────────────
function initAnimations() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.lib-card, .func-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        obs.observe(el);
    });
}

// ── Init All ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    Theme.init();
    initCopyButtons();
    initSidebar();
    initActiveLink();
    initFuncCards();
    initFuncTabs();
    initScrollProgress();
    initTOC();
    initSearch();
    initAnchorLinks();
    initAnimations();

    // Theme toggle button
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', () => Theme.toggle());
});
