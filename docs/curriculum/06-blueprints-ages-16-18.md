# Course Blueprints — Ages 16–18

> Courses 21–25 · Advanced level · Durations 8–10 weeks

---

## Course 21 — AI Foundations for Future Leaders

| Field | Value |
|---|---|
| Age Group | 16–18 |
| Slug | `ai-foundations-future-leaders` |
| Category | AI |
| Level | Intermediate |
| Duration | 9 weeks · 9 lessons · 60 min each |
| Price | **FREE** |
| Status | Published |

### Learner Outcomes
1. Explain how machine learning models learn from data using supervised and unsupervised approaches.
2. Describe the societal impacts of AI including bias, fairness, privacy, and automation.
3. Build and test a simple classification model using a visual ML tool (e.g., Teachable Machine).
4. Evaluate AI systems critically — distinguishing hype from capability.
5. Articulate a personal perspective on responsible AI development.

### Module 1 — How AI Learns

**Lesson 1: Data, Patterns, Predictions**
- *Objective:* Understand that AI models find patterns in data to make predictions.
- *Summary:* Introduces supervised learning with relatable examples (spam filters, recommendations). Students examine a small labelled dataset and predict what a model would learn.
- *Activity:* Sort 20 example emails into spam/not-spam — then compare decisions with a classmate.
- *Assessment:* Short-answer: "What makes a good training dataset?"

**Lesson 2: Training a Model**
- *Objective:* Train a simple image or sound classifier using a no-code tool.
- *Summary:* Students use Google Teachable Machine to train a model with their own images or sounds. Observe how more data improves accuracy.
- *Activity:* Train a gesture recogniser with 3 classes; test accuracy at different data volumes (10, 30, 60 samples).
- *Assessment:* Screenshot of trained model + written reflection: "What surprised you?"

**Lesson 3: When Models Fail**
- *Objective:* Identify why ML models make mistakes and what underfitting/overfitting mean.
- *Summary:* Uses analogies (memorising vs. understanding) to explain overfitting. Students deliberately break their model to observe failure modes.
- *Activity:* Train a model on only 3 images — observe poor generalisation. Then fix it.
- *Assessment:* Quiz — 4 scenario questions on model failure types.

---

### Module 2 — AI in Society

**Lesson 4: Bias in the Machine**
- *Objective:* Explain how biased training data leads to discriminatory AI outputs.
- *Summary:* Case studies: facial recognition errors, hiring algorithms, predictive policing. Students learn to audit datasets for representation gaps.
- *Activity:* Analyse a mock job-application dataset — identify which demographic groups are over- or under-represented in the "hired" label.
- *Assessment:* Written response: "How could you reduce bias in this dataset?"

**Lesson 5: Privacy and Surveillance**
- *Objective:* Assess how AI-powered surveillance affects individual rights.
- *Summary:* Covers data collection, facial recognition deployment, and consent. Introduces GDPR principles in accessible language.
- *Activity:* Debate exercise — teams argue for/against smart-city surveillance cameras using provided evidence cards.
- *Assessment:* One-page position paper: pro or against a chosen AI surveillance application.

**Lesson 6: Automation and the Future of Work**
- *Objective:* Evaluate which job categories are most and least affected by automation.
- *Summary:* Research-backed overview of tasks vs. jobs. Students map job roles against automation risk using a simple framework.
- *Activity:* Group analysis — pick 5 careers and score each task within them on "routine/non-routine" and "physical/cognitive" axes.
- *Assessment:* Group presentation slide deck (3 slides) on their findings.

---

### Module 3 — Responsible AI Leadership

**Lesson 7: Ethical Frameworks for AI**
- *Objective:* Apply two ethical frameworks (utilitarian, rights-based) to an AI dilemma.
- *Summary:* Introduces practical ethics without philosophy jargon. Students use structured decision matrices to evaluate real AI dilemmas.
- *Activity:* Apply both frameworks to the trolley-problem variant: "A self-driving car must choose between two accident outcomes."
- *Assessment:* Completed decision matrix with written justification.

**Lesson 8: Designing for Good**
- *Objective:* Propose design choices that promote fairness, transparency, and inclusivity in an AI product.
- *Summary:* Covers responsible design principles: explainability, human oversight, diverse teams. Students critique a fictional AI product brief.
- *Activity:* Redesign the fictional product's data collection, consent flow, and error-handling to meet ethical standards.
- *Assessment:* Annotated product redesign document.

**Lesson 9: Your AI Manifesto (Capstone)**
- *Objective:* Synthesise learning into a personal or team AI ethics manifesto.
- *Summary:* Students draft a 1-page manifesto outlining their principles for building and using AI responsibly — a portfolio-ready artefact.
- *Activity:* Peer review of manifestos using a provided rubric; give structured feedback to two classmates.
- *Assessment:* Final manifesto (graded on clarity, depth, originality) + self-reflection paragraph.

---

## Course 22 — Full-Stack Thinking

| Field | Value |
|---|---|
| Age Group | 16–18 |
| Slug | `full-stack-thinking` |
| Category | CODING |
| Level | Advanced |
| Duration | 10 weeks · 9 lessons · 75 min each |
| Price | $79 |
| Status | Published |

### Learner Outcomes
1. Explain the difference between front-end, back-end, and database layers of a web application.
2. Build a working multi-page web app with HTML/CSS/JavaScript front-end and a REST API back-end.
3. Store and retrieve data using a simple database (SQLite or Firebase).
4. Deploy a project to a live URL using a free hosting service.
5. Read and contribute to a codebase using version control (Git/GitHub).

### Module 1 — Front-End Foundations

**Lesson 1: HTML + CSS Revisited**
- *Objective:* Build a responsive multi-section landing page from scratch.
- *Summary:* Speed run through semantic HTML and CSS Flexbox/Grid. Focus on clean structure and mobile-first thinking.
- *Activity:* Build a personal portfolio landing page with nav, hero section, and contact form.
- *Assessment:* Screenshot of completed page on desktop and mobile viewports.

**Lesson 2: JavaScript in the Browser**
- *Objective:* Use JavaScript to manipulate the DOM and respond to user events.
- *Summary:* Covers `querySelector`, event listeners, and updating content dynamically. Students add interactivity to their portfolio page.
- *Activity:* Add a dark-mode toggle and a form validation script to the portfolio page.
- *Assessment:* Code review checklist — does the JS follow separation-of-concerns principles?

**Lesson 3: Fetch and APIs**
- *Objective:* Consume a public REST API and render the response in the browser.
- *Summary:* Introduces `fetch`, `async/await`, and JSON. Students connect their page to a live public API.
- *Activity:* Add a weather widget to the portfolio using the Open-Meteo free API (no key needed).
- *Assessment:* Reflection: "What happens if the API is slow or fails? How would you handle that?"

---

### Module 2 — Back-End Basics

**Lesson 4: Servers and Routes**
- *Objective:* Create a simple Express.js server with three working routes.
- *Summary:* Explains request-response cycle, HTTP verbs, and route handlers. Students scaffold a minimal API.
- *Activity:* Build a "/todos" API with GET, POST, and DELETE routes using an in-memory array.
- *Assessment:* Test all three routes using a REST client (e.g., Thunder Client in VS Code).

**Lesson 5: Connecting a Database**
- *Objective:* Persist data using a simple database (SQLite with better-sqlite3 or Firebase Firestore).
- *Summary:* Introduces the concept of persistence vs. in-memory storage. Students replace the array with database reads/writes.
- *Activity:* Migrate the Todos API to use SQLite — add a "completed" field and a PATCH route.
- *Assessment:* Quiz — 5 questions on CRUD operations and SQL vs. NoSQL trade-offs.

**Lesson 6: Authentication Basics**
- *Objective:* Implement simple username/password authentication with hashed passwords.
- *Summary:* Covers bcrypt hashing, JWTs (or sessions), and protected routes. Students add login/register to their API.
- *Activity:* Add `/auth/register` and `/auth/login` routes — protect the DELETE todo route with a JWT check.
- *Assessment:* Security audit checklist — are passwords hashed? Is the token secret stored in `.env`?

---

### Module 3 — Ship It

**Lesson 7: Wiring Front-End to Back-End**
- *Objective:* Connect the JavaScript front-end to the Express API to create a working full-stack app.
- *Summary:* Students replace static HTML content with dynamic data from their own API. Covers CORS and environment variables.
- *Activity:* Build a full-stack "Bucket List" app — users can add, check off, and delete items. Persisted in the database.
- *Assessment:* Peer test — swap apps with a classmate and try to break it; file a "bug report."

**Lesson 8: Deployment**
- *Objective:* Deploy front-end to Vercel (or Netlify) and back-end to Render (free tier).
- *Summary:* Step-by-step deployment walkthrough. Covers environment variables in production, build commands, and logs.
- *Activity:* Deploy the Bucket List app — share the live URL with the class.
- *Assessment:* Live URL submitted + README with setup instructions.

**Lesson 9: Git, GitHub, and Collaboration**
- *Objective:* Use branching, pull requests, and code review to contribute to a shared codebase.
- *Summary:* Simulates a team development workflow. Students fork a shared repo, make a feature branch, open a PR, and review a peer's PR.
- *Activity:* Add one new feature (e.g., due dates) to a classmate's Bucket List repo via a pull request.
- *Assessment:* Merged PR with at least one round of code review comments addressed.

---

## Course 23 — Data Decisions & Society

| Field | Value |
|---|---|
| Age Group | 16–18 |
| Slug | `data-decisions-society` |
| Category | DATA_SCIENCE |
| Level | Advanced |
| Duration | 8 weeks · 9 lessons · 60 min each |
| Price | $69 |
| Status | Published |

### Learner Outcomes
1. Collect, clean, and explore a real dataset using Python (pandas) or Google Sheets.
2. Create clear data visualisations that communicate findings to a general audience.
3. Identify misleading statistics and data visualisation tricks in media.
4. Apply basic descriptive statistics (mean, median, correlation) correctly.
5. Present a data-driven argument on a social or civic topic with evidence and ethical caveats.

### Module 1 — Data Literacy

**Lesson 1: Every Number Tells a Story**
- *Objective:* Distinguish between raw data, statistics, and conclusions — and why each step matters.
- *Summary:* Uses memorable examples (polling errors, sports statistics) to show how the same data can support opposing arguments.
- *Activity:* Given three different news headlines based on the same dataset, students trace each back to its source numbers and evaluate accuracy.
- *Assessment:* Short quiz — 5 questions on data interpretation terms (sample size, selection bias, correlation vs. causation).

**Lesson 2: Cleaning Messy Data**
- *Objective:* Identify and fix common data quality problems (missing values, inconsistent formatting, outliers).
- *Summary:* Introduces the concept of "garbage in, garbage out." Students work with a deliberately dirty CSV file.
- *Activity:* Clean a 100-row dataset about fictional city air quality — fix date formats, fill missing values, remove duplicates.
- *Assessment:* Submit cleaned CSV + a 3-bullet "data quality report" describing what was found and fixed.

**Lesson 3: Descriptive Statistics**
- *Objective:* Calculate and interpret mean, median, mode, range, and correlation.
- *Summary:* Focuses on when to use mean vs. median (income distributions are a classic example). Light introduction to scatter plots and correlation coefficients.
- *Activity:* Analyse a salary dataset — compare mean vs. median salaries for different job families. Draw scatter plot of salary vs. experience.
- *Assessment:* Reflection: "Which measure best represents a 'typical' salary in this dataset, and why?"

---

### Module 2 — Visualise and Communicate

**Lesson 4: Chart Types and When to Use Them**
- *Objective:* Select the appropriate chart type for a given dataset and question.
- *Summary:* Covers bar, line, pie, scatter, and heatmap. Explains when each type misleads (e.g., truncated axes, 3D pie charts).
- *Activity:* Remake three "bad" charts from real media into clear, accurate versions.
- *Assessment:* Peer review — swap remakes and evaluate using a "Good Chart" rubric.

**Lesson 5: Telling a Story with Data**
- *Objective:* Build a narrative data presentation that guides an audience from question to conclusion.
- *Summary:* Covers the "story arc" structure for data presentations: context → conflict → data → insight → action.
- *Activity:* Students choose a public dataset (UN, Our World in Data, Kaggle public) and build a 5-slide data story.
- *Assessment:* 5-slide presentation with at least 3 visualisations and a clear recommendation.

**Lesson 6: Spotting Misleading Data**
- *Objective:* Detect at least 5 common data manipulation techniques used in media and advertising.
- *Summary:* Catalogue of manipulation techniques: cherry-picking dates, truncated y-axes, percentage vs. absolute, survivor bias.
- *Activity:* "Data Detective" worksheet — 10 real-world charts; students flag manipulations and explain corrections.
- *Assessment:* Score on worksheet + written note to a fictional editor requesting a correction.

---

### Module 3 — Data for Good

**Lesson 7: Open Data and Civic Tech**
- *Objective:* Locate and query a relevant open government or NGO dataset.
- *Summary:* Introduces open data portals (data.gov, WHO, World Bank). Discusses data licensing and attribution.
- *Activity:* Find a dataset related to a community issue students care about (climate, education, health) and write a 1-paragraph "data brief."
- *Assessment:* Data brief submitted with dataset source, key stats, and one visualisation.

**Lesson 8: Algorithmic Decision-Making**
- *Objective:* Evaluate the fairness of an algorithmic decision system using real-world criteria.
- *Summary:* Credit scoring, recidivism prediction, university admissions algorithms. Students learn to ask: "Who benefits? Who is harmed?"
- *Activity:* Case study analysis of a chosen algorithm — complete a fairness audit template covering accuracy, impact, transparency, and accountability.
- *Assessment:* Completed fairness audit (1 page).

**Lesson 9: Data for Change (Capstone)**
- *Objective:* Produce a complete data investigation on a real social issue and present recommendations.
- *Summary:* Students select an issue, gather open data, clean it, analyse it, visualise it, and present to the class.
- *Activity:* 10-minute presentation + visualisation dashboard (Google Slides, Canva, or Flourish).
- *Assessment:* Rubric grading on: question clarity, data quality, visualisation accuracy, insight depth, ethical awareness.

---
