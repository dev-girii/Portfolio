# Personal Portfolio Website
This repository contains the source code for my personal portfolio website. It is a fully responsive, single-page site built with pure HTML, CSS, and modern JavaScript, showcasing my skills, projects, and professional experience.

**Live Site: [https://giridharan-portfolio.netlify.app/](https://giridharan-portfolio.netlify.app/)**

## Features

-   **Modern UI:** A clean, Google-inspired dark theme with a focus on readability and a professional aesthetic.
-   **Fully Responsive:** The layout adapts seamlessly to all screen sizes, from mobile phones to desktops, using a combination of Flexbox, Grid, and media queries.
-   **Interactive Elements:** Engaging user experience with features like animated counters on scroll, custom tooltips for detailed information, and smooth scrolling for navigation.
-   **Modular Codebase:** Built without any frameworks, using modular Vanilla JavaScript and a component-based CSS structure for high maintainability and performance.
-   **Netlify Form Integration:** A functional contact form with client-side validation that submits directly to Netlify's backend, complete with success/error notifications.
-   **Live Activity Feed:** Integrates with third-party services to display real-time GitHub and LeetCode statistics, providing a dynamic look at my coding activity.
-   **Optimized for Performance & SEO:** Implements web best practices including extensive meta tags, a sitemap, `robots.txt`, and efficient caching via Netlify headers to ensure fast load times and search engine visibility.

## Tech Stack

-   **Frontend:** HTML5, CSS3 (Custom Properties, Flexbox, Grid), Vanilla JavaScript (ES6+)
-   **Deployment:** Netlify
-   **Analytics:** Google Analytics, Microsoft Clarity

## Project Structure

The project is organized into a clear and maintainable structure:

```
└── /
    ├── index.html              # Main HTML entry point
    ├── css/                    # All stylesheets
    │   ├── main.css            # Global styles and variables
    │   └── components/         # Component-specific styles (sidebar, sections, etc.)
    ├── js/                     # All JavaScript files
    │   ├── main.js             # Main script to initialize modules
    │   ├── navigation.js       # Handles smooth scrolling and active nav states
    │   ├── form-handler.js     # Manages contact form submission and validation
    │   └── tooltip.js          # Logic for custom tooltips
    ├── images/                 # Static image assets and favicons
    ├── _headers                # Netlify-specific file for setting custom caching headers
    ├── site.webmanifest        # PWA manifest
    └── sitemap.xml             # Sitemap for SEO
```

## Getting Started

To run this project locally:

1.  Clone the repository to your local machine:
    ```sh
    git clone https://github.com/dev-girii/portfolio.git
    ```

2.  Navigate to the project directory:
    ```sh
    cd portfolio
    ```

3.  Open the `index.html` file in your preferred web browser.