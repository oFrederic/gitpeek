# GitPeek

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E=16.0.0-brightgreen)
![React](https://img.shields.io/badge/react-19.x-blue)

A modern, accessible, and fully-typed React application for searching GitHub repositories. Built with TypeScript, React, and best practices in component structure, hooks, and accessibility.

---

## Features

- **Search GitHub Repositories:** Enter a query to search public repositories on GitHub.
- **Pagination:** Browse results with easy-to-use pagination controls.
- **Repository Details:** View repository name, description, stars, and owner info.
- **Responsive & Accessible:** Clean, responsive UI with ARIA attributes for accessibility.
- **Modern React Structure:** Uses functional components, custom hooks, and TypeScript types.

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation
```bash
npm install
```

### Running the App
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Building for Production
```bash
npm run build
```

---

## Usage
1. Enter a search term in the input field.
2. Click "Search" or press Enter.
3. Browse results and use pagination to navigate.
4. Click a repository to view it on GitHub.

---

## Project Structure

```
src/
  components/      # Reusable UI components (SearchForm, RepoList, RepoListItem, Pagination)
  hooks/           # Custom React hooks (useGithubRepos)
  types/           # TypeScript type definitions (Repo)
  App.tsx          # Main application component
  App.css          # Application styles
  index.tsx        # Entry point
  index.css        # Global styles
public/
  index.html       # HTML template
  favicon.ico      # App icon
  manifest.json    # PWA manifest
```

---

## License

MIT
