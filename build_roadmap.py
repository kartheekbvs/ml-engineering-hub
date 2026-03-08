import os

categories = [
    {
        "id": "python-core",
        "title": "1. Python Core Concepts",
        "files": [
            ("python-variables.html", "Variables & Types", "Available (Extensive Depth)"),
            ("python-operators.html", "Operators", "Available (Extensive Depth)"),
            ("python-control-flow.html", "Control Flow (if/else)", "Available (Extensive Depth)"),
            ("python-loops.html", "Loops (for/while)", "Available (Extensive Depth)"),
            ("python-functions.html", "Functions & Scope", "Available (Extensive Depth)"),
            ("python-basics.html", "Lists & Mutability", "Available (Extensive Depth)"),
            ("python-tuples.html", "Tuples & Immutability", "Available (Extensive Depth)"),
            ("python-dictionaries.html", "Dictionaries & Sets", "Available (Extensive Depth)"),
            ("python-strings.html", "String Operations", "Available (Extensive Depth)"),
            ("python-comprehensions.html", "Comprehensions", "Available (Extensive Depth)"),
            ("python-modules.html", "Modules & SYS Path", "Available (Extensive Depth)"),
            ("python-file-io.html", "File I/O & Context", "Available (Extensive Depth)"),
            ("python-exceptions.html", "Exceptions & Tracebacks", "Available (Extensive Depth)"),
            ("python-advanced-functions.html", "Advanced Functions (*args)", "Available (Extensive Depth)"),
            ("python-generators.html", "Generators & Yield", "Available (Extensive Depth)"),
            ("python-oop.html", "OOP & Metaclasses", "Available (Extensive Depth)"),
            ("python-concurrency.html", "Concurrency & the GIL", "Available (Extensive Depth)")
        ]
    },
    {
        "id": "data-engineering",
        "title": "2. Data Engineering (NumPy & Pandas)",
        "files": [
            ("numpy-creation.html", "NumPy Arrays & Memory", "Available (Extensive Depth)"),
            ("numpy-linear-algebra.html", "NumPy Linear Algebra", "Available (Extensive Depth)"),
            ("matplotlib.html", "Matplotlib Visualization", "Available (Extensive Depth)"),
            ("pandas-dataframe.html", "Pandas DataFrames", "Available (Extensive Depth)"),
            ("pandas-merging.html", "Pandas Merges & Joins", "Available (Extensive Depth)"),
            ("pandas-timeseries.html", "Pandas Time Series", "Available (Extensive Depth)"),
            ("pandas-cleaning.html", "Pandas Data Cleaning", "Available (Extensive Depth)")
        ]
    },
    {
        "id": "ml-core",
        "title": "3. Machine Learning (Scikit-Learn)",
        "files": [
            ("sklearn-preprocessing.html", "Data Preprocessing", "Available (Extensive Depth)"),
            ("sklearn-models.html", "Supervised ML Models", "Available (Extensive Depth)"),
            ("sklearn-evaluation.html", "Model Evaluation & Metrics", "Available (Extensive Depth)")
        ]
    },
    {
        "id": "dl-core",
        "title": "4. Deep Learning (TensorFlow/Keras)",
        "files": [
            ("tensorflow.html", "TensorFlow Core & Graphs", "Available (Extensive Depth)"),
            ("tensorflow-nlp.html", "NLP Tokenization", "Available (Extensive Depth)"),
            ("tensorflow-lstm.html", "RNNs & LSTMs", "Available (Extensive Depth)")
        ]
    },
    {
        "id": "transformers",
        "title": "5. Transformers & LLMs",
        "files": [
            ("transformers-attention.html", "Self-Attention Mechanism", "Available (Extensive Depth)"),
            ("transformers-llm.html", "Large Language Models (GPT)", "Available (Extensive Depth)")
        ]
    },
    {
        "id": "cv-core",
        "title": "6. Computer Vision",
        "files": [
            ("cv-convolutions.html", "CNNs & Convolutions", "Available (Extensive Depth)"),
            ("cv-transfer-learning.html", "Transfer Learning (ResNet)", "Available (Extensive Depth)")
        ]
    },
    {
        "id": "mlops",
        "title": "7. MLOps & Deployment",
        "files": [
            ("deployment-fastapi.html", "FastAPI Model Serving", "Available (Extensive Depth)"),
            ("deployment-docker.html", "Docker Containerization", "Available (Extensive Depth)"),
            ("deployment-cloud.html", "Cloud Deployment & CI/CD", "Available (Extensive Depth)")
        ]
    }
]


html_start = """<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Master Curriculum Roadmap — TWSS</title>
    <link rel="stylesheet" href="css/style.css" />
    <style>
        .roadmap-list {
            display: flex;
            flex-direction: column;
            gap: 24px;
            margin-top: 32px;
        }

        .roadmap-category {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 32px;
        }

        .roadmap-cat-title {
            font-size: 24px;
            font-weight: 800;
            color: var(--primary-light);
            margin-bottom: 24px;
            border-bottom: 2px solid var(--border);
            padding-bottom: 12px;
            display: flex;
            justify-content: space-between;
        }

        .roadmap-cat-title span {
            background: rgba(16, 185, 129, 0.15);
            color: var(--accent);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 14px;
        }

        .roadmap-topics {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 16px;
        }

        .roadmap-topic {
            padding: 16px;
            background: var(--bg-card-hover);
            border: 1px solid var(--border-soft);
            border-radius: var(--radius);
            text-decoration: none;
            color: var(--text);
            transition: all 0.2s;
        }

        .roadmap-topic:hover {
            border-color: var(--primary-light);
            transform: translateY(-2px);
        }

        .topic-name {
            font-weight: 700;
            font-size: 15px;
            color: var(--text-heading);
            margin-bottom: 8px;
        }

        .topic-status {
            font-size: 12px;
            color: var(--text-dim);
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #ef4444;
        }

        .status-dot.done {
            background: #10b981;
        }
    </style>
</head>

<body>
    <script src="js/shared-layout.js"></script>
    <div class="app-layout has-toc">
        <main class="main-content">
            <div class="content-inner">
                <div class="page-header">
                    <div class="page-breadcrumb"><a href="index.html">Home</a> › Curriculum</div>
                    <h1 class="page-title">The Master Curriculum Roadmap</h1>
                    <p class="page-subtitle">The complete ML Engineering master curriculum. Every concept listed here receives an ultra-deep conversational breakdown detailing arrays, memory layouts, and architectural routing.</p>
                </div>
                <div class="roadmap-list">
"""

html_end = """
                </div>
            </div>
        </main>
    </div>
</body>

</html>
"""

with open("C:/Users/DELL/.gemini/antigravity/scratch/ml-engineering-hub/roadmap.html", "w", encoding="utf-8") as f:
    f.write(html_start)
    for cat in categories:
        num_topics = len(cat['files'])
        f.write(f'''
                    <div class="roadmap-category" id="{cat['id']}">
                        <div class="roadmap-cat-title">{cat['title']} <span>{num_topics} Topics</span></div>
                        <div class="roadmap-topics">''')
        for file_name, topic_name, status_text in cat['files']:
            f.write(f'''
                            <a href="{file_name}" class="roadmap-topic">
                                <div class="topic-name">{topic_name}</div>
                                <div class="topic-status">
                                    <div class="status-dot done"></div>{status_text}
                                </div>
                            </a>''')
        f.write('''
                        </div>
                    </div>''')
    f.write(html_end)

print("Generated roadmap.html successfully.")
