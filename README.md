# Peter Russo's Portfolio

Built with Hugo static site generator, featuring a custom theme based on [Dot-Org](https://github.com/cncf/dot-org-hugo-theme), and automatically deployed to GitHub Pages.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
  - [Initial Setup](#initial-setup)
  - [Running the Development Server](#running-the-development-server)
  - [Building the Site](#building-the-site)
- [Content Editing](#content-editing)
  - [Content Structure](#content-structure)
  - [Basic Frontmatter Structure](#basic-frontmatter-structure)
  - [Custom Frontmatter Options](#custom-frontmatter-options)
  - [Adding New Content](#adding-new-content)
- [Assets](#assets)
  - [Directory Structure](#directory-structure)
  - [Where to Put Files](#where-to-put-files)
- [Deployment](#deployment)
  - [GitHub Actions Workflow](#github-actions-workflow)
  - [Site URL](#site-url)
- [Theme Notes](#theme-notes)
  - [Custom Theme Setup](#custom-theme-setup)
  - [Custom Shortcodes](#custom-shortcodes)
  - [Nested Shortcodes](#nested-shortcodes)
  - [Theme Customization](#theme-customization)
  - [Updating the Theme](#updating-the-theme)
- [Configuration](#configuration)
- [Helpful Hugo Resources](#helpful-hugo-resources)
  - [Official Documentation](#official-documentation)
  - [File Structure Overview](#file-structure-overview)
  - [Key Concepts](#key-concepts)
- [Search Index](#search-index)
- [Troubleshooting](#troubleshooting)
- [Support](#support)

## Tech Stack

- **Static Site Generator**: [Hugo](https://gohugo.io/)
- **Theme**: Custom theme based on [Dot-Org Hugo Theme](https://github.com/cncf/dot-org-hugo-theme) (installed as git submodule)
- **Styling**: SCSS/Sass with PostCSS and Autoprefixer
- **Hosting**: GitHub Pages
- **Deployment**: GitHub Actions (automated on push to main)
- **Node Version**: v25.1.0

## Prerequisites

- [Node.js](https://nodejs.org/) (v25.1.0 or compatible)
- Hugo Extended (installed automatically as an npm dependency when you run npm install, so there's no need to install Hugo separately on your system.)

## Local Development

### Initial Setup

1. Clone the repository with submodules:
```bash
git clone --recurse-submodules <repository-url>
```

If you already cloned without submodules:
```bash
git submodule update --init --recursive
```

2. Install dependencies:
```bash
npm install
```

### Running the Development Server

Start the local development server:

```bash
npm run start
```

Or use Hugo directly:

```bash
hugo server
```

The site will be available at `http://localhost:1313/parusso/`

The development server includes:
- Live reload on file changes
- Draft and future content rendering
- Detailed logging and performance metrics
- Cache disabled for accurate previews

### Building the Site

Build the site for production:

```bash
npm run build
```

This generates optimized static files in the `public/` directory.

## Content Editing

### Content Structure

All content files are located in the `content/` directory and written in Markdown:

```
content/
├── _index.md              # Homepage
├── about.md               # About page
├── contact.md             # Contact page
└── projects/
    ├── _index.md          # Projects landing page
    └── project-name.md    # Individual project pages
```

### Basic Frontmatter Structure

Each content file includes YAML frontmatter at the top:

```yaml
---
title: "Page Title"
date: 2024-11-18
description: "Description for SEO and social media"
images: ["https://example.com/image.jpg"]
showHeader: false          # Optional: hide page title
noindex: true             # Optional: prevent search engine indexing
layout: home              # Optional: specify custom layout
---

Your markdown content here...
```

### Custom Frontmatter Options

#### Hide Page Title/Header
```yaml
showHeader: false
```

#### Add Noindex Meta Tag
Page is published but tells search engines not to index it
```yaml
noindex: true
```

#### Add Draft Tag
Page is excluded from production builds entirely
```yaml
draft: true
```

### Adding New Content

Create a new page in the `content/` directory. You can just create a new file or run the following bash command:

```bash
hugo new about.md
# or
hugo new projects/new-project.md
```

## Assets

### Directory Structure

```
assets/              # Processed by Hugo's asset pipeline
├── fonts/          # Web fonts
├── img/            # Images processed by Hugo
├── js/             # JavaScript files
└── scss/           # Sass/SCSS stylesheets

static/             # Static files served as-is
├── fonts/          # Additional fonts
└── img/            # Static images
```

### Where to Put Files

- **Images**:
  - `assets/img/` - Images processed by Hugo. Use when you want Hugo to resize, crop, optimize, or generate multiple sizes for responsive images. Good for images that need manipulation or format conversion (e.g., WebP).
  - `static/img/` - Images served as-is without processing. Use for pre-optimized images, logos, icons, or when you don't need Hugo to manipulate them. Results in faster builds.

- **JavaScript**: `assets/js/` (processed by Hugo)
- **SCSS/CSS**: `assets/scss/` (compiled by Sass)
- **Fonts**: `assets/fonts/` or `static/fonts/`

Reference static files in content using root-relative paths: `/img/filename.jpg`



## Deployment

### GitHub Actions Workflow

The site automatically deploys to GitHub Pages when you push to the `main` branch.

**Workflow file**: [.github/workflows/hugo.yaml](.github/workflows/hugo.yaml)

**What happens on push to main**:
1. GitHub Actions checks out the code (including submodules)
2. Installs Hugo CLI (v0.128.0) and Dart Sass
3. Installs Node.js dependencies
4. Builds the site with Hugo (minified, production environment)
5. Uploads the build artifact
6. Deploys to GitHub Pages

**No manual deployment needed** - just push to main:

```bash
git add .
git commit -m "Update content"
git push origin main
```

**Manual deployment** (if needed):
You can also trigger the workflow manually from the Actions tab in GitHub.

### Site URL

The site is deployed to: `https://root-signal.github.io/parusso/`

## Theme Notes

### Custom Theme Setup

This site uses [Dot-Org Hugo Theme](https://github.com/cncf/dot-org-hugo-theme) as the baseline theme, installed as a git submodule in `themes/dot-org-hugo-theme`.

**Demo site with examples**: https://dot-org-hugo-theme-demo.netlify.app/

### Custom Shortcodes

The theme includes custom shortcodes for enhanced markdown functionality. 

- [Dot.Org Demo Example Formatting](https://github.com/cncf/dot-org-hugo-theme/blob/main/exampleSite/content/en/demo-page.md)
- [Local Demo Example Formatting](content/projects/demo-page.md)


#### Images
The `img` shortcode provides more control than standard markdown image syntax and includes performance optimizations.

```md
{{< img src="/img/image.png" alt="Description" width="800" height="600" >}}
```

##### Common attributes:
- src (required) - Path to the image file
- alt (optional) - Alt text for accessibility; defaults to filename if not provided
- width and height (optional) - Recommended for better performance; prevents layout shift as the page loads
- loading (optional) - Set to "eager" for above-the-fold images, defaults to "lazy" for automatic lazy loading
- caption (optional) - Adds a caption below the image; supports markdown formatting

#### Other Shortcodes
- `{{< current_year >}}` - Insert current year
- `{{< intro >}}` - Large intro paragraph
- `{{< spacer >}}` or `{{< spacer 100 >}}` - Add vertical spacing
- `{{< br >}}` - Force line break
- `{{< toc >}}` - Table of contents
- `{{< responsive_table >}}` - Wrap tables for mobile
- `{{< iframe src="url" >}}` - Embed iframe
- `{{< youtube_enhanced id="video-id" >}}` - Privacy-friendly YouTube embed

### Nested Shortcodes

If nested shortcodes don't render properly, enable unsafe HTML in your config:

```yaml
markup:
  goldmark:
    renderer:
      unsafe: true
```

### Theme Customization

Theme files can be overridden by placing files in the root project directories:
- `layouts/` - Override theme templates
- `assets/` - Override theme assets (CSS, JS, images)
- `static/` - Add additional static files

### Updating the Theme

To update the theme submodule to the latest version:

```bash
git submodule update --remote --merge
```

⚠️ **Warning**: After updating, check for breaking changes in any files you've customized in `/layouts` and `/assets`.



## Configuration

Main configuration files:

- **[hugo.toml](hugo.toml)**: Basic Hugo configuration (baseURL, title, theme)
- **config/**: Additional configuration files and parameters

Update the `baseURL` in [hugo.toml](hugo.toml) if deploying to a different location.

## Helpful Hugo Resources

### Official Documentation
- [Hugo Documentation](https://gohugo.io/documentation/)
- [Directory Structure](https://gohugo.io/getting-started/directory-structure/)
- [Content Organization](https://gohugo.io/content-management/organization/)
- [Hugo Templating](https://gohugo.io/templates/introduction/)

### File Structure Overview

```
.
├── archetypes/      # Content templates for `hugo new`
├── assets/          # Files processed by Hugo Pipes
├── config/          # Configuration files
├── content/         # All markdown content
├── data/            # Data files (JSON, YAML, TOML)
├── layouts/         # HTML templates
├── static/          # Static files (served as-is)
├── themes/          # Theme files (git submodule)
├── hugo.toml        # Main Hugo config
└── public/          # Generated site (gitignored)
```

### Key Concepts
- **Content**: Lives in `content/`, organized in sections (folders)
- **Templates**: In `layouts/`, render content into HTML
- **Partials**: Reusable template components in `layouts/partials/`
- **Shortcodes**: Reusable content snippets in `layouts/shortcodes/`
- **Static Files**: In `static/`, copied directly to output
- **Assets**: In `assets/`, processed by Hugo Pipes (Sass, JS bundling, etc.)

## Search Index

This site can use [Pagefind](https://pagefind.app/) for search functionality. To build the search index locally:

```bash
npm run build
npx -y pagefind --site public
```

**Note**: The search index is not automatically built during GitHub Actions deployment. You'll need to either run Pagefind locally and commit the generated index files, or add a Pagefind build step to the GitHub Actions workflow.

## Troubleshooting

### Submodule Issues
If the theme isn't loading:
```bash
git submodule update --init --recursive
```

### Build Errors
Check Hugo version compatibility:
```bash
hugo version
```

Should show Hugo Extended v0.128.0 or compatible.

### Cache Issues
Clear Hugo's cache:
```bash
hugo --gc
```

## Support

For issues with:
- **Hugo**: https://gohugo.io/
- **Dot-Org Theme**: https://github.com/cncf/dot-org-hugo-theme/issues
- **This Site**: Contact the development team
