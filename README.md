# Personal Portfolio

> This is Zhuyu Teng's personal website, showcasing research papers, projects, and CV.

Built with React + Vite, deployed on GitHub Pages.

## Features

- **Home** - Personal introduction with recent work and news
- **CV** - Education, work experience, internships, awards, and skills
- **Research** - Academic publications with detailed article pages
- **Projects** - Project showcase with technology tags
- **Blog** - Blog posts with external links

## Tech Stack

- **Frontend**: React 18 + Vite 5
- **Routing**: React Router 6
- **Styling**: CSS Modules with CSS Variables
- **Deployment**: GitHub Pages

## Project Structure

```
├── public/
│   └── images/          # Static images
├── src/
│   ├── components/      # Reusable components
│   ├── data/            # JSON data files
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions
│   └── App.jsx          # Main app component
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Tenzyoo/profile.git

# Navigate to project directory
cd profile

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

## Customization

All content is stored in JSON files under `src/data/`:

- `profile.json` - Personal information
- `education.json` - Education history
- `experiences.json` - Work experience
- `internships.json` - Internship experience
- `research.json` - Research papers
- `projects.json` - Project portfolio
- `blog.json` - Blog posts
- `awards.json` - Awards and honors
- `skills.json` - Skills

## License

MIT License

## Author

**Zhuyu Teng**

- GitHub: [@Tenzyoo](https://github.com/Tenzyoo)