# Coding Standards

This document outlines the coding standards and conventions for the Share Bounce project. All contributors and AI assistants should follow these guidelines to maintain consistency and code quality.

## General Principles

- **Consistency**: Follow established patterns within the codebase
- **Readability**: Write self-documenting code with clear naming
- **Maintainability**: Structure code for easy updates and debugging
- **Performance**: Consider performance implications of coding choices

## CSS Standards

### Property Organization

- **Alphabetize properties**: All CSS properties within a rule should be listed in alphabetical order
- **Use nesting**: Leverage CSS nesting for better organization and reduced repetition
- **flexbox required**: Use flexbox for layout solutions when appropriate

### CSS Structure Example

```css
.example-component {
  align-items: center;
  background-color: var(--primary-color);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  .nested-element {
    color: var(--text-color);
    font-size: 1rem;
    margin: 0;
    text-align: center;
  }

  &:hover {
    background-color: var(--primary-hover);
    transform: translateY(-2px);
  }
}
```

### CSS Guidelines

- Use CSS custom properties (variables) for consistent theming
- Prefer rem units over absolute units (px) when appropriate
- Use semantic class names that describe purpose, not appearance
- Group related selectors using nesting for better organization
- Include hover states and responsive behavior within nested structures

## JavaScript Standards

### ES6+ Modern JavaScript

- Use ES6 modules with `import`/`export` syntax
- Prefer `const` and `let` over `var`
- Use arrow functions for short, non-method functions
- Utilize template literals for string interpolation
- Implement destructuring for cleaner variable assignment

### Code Organization

- Create separate modules for distinct functionality
- Use classes for complex state management
- Implement custom events for inter-module communication
- Keep functions focused on a single responsibility
- Use meaningful variable and function names

### JavaScript Structure Example

```javascript
// recent-changes.js - ES6 Module Example
export class RecentChangesManager {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.data = [];
    this.initialize();
  }

  async initialize() {
    await this.loadData();
    this.renderComponents();
    this.attachEventListeners();
  }

  handleCompanyClick(company) {
    const event = new CustomEvent("companySelected", {
      detail: { ticker: company.ticker },
    });
    document.dispatchEvent(event);
  }
}
```

## HTML Standards

### Semantic HTML

- Use semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<article>`, etc.)
- Implement proper heading hierarchy (h1 → h2 → h3)
- Include appropriate ARIA attributes for accessibility
- Use meaningful `id` and `class` attributes

### HTML Structure

- Maintain consistent indentation (2 spaces)
- Group related elements logically
- Include comments for complex sections
- Ensure proper document structure with DOCTYPE, lang attribute, and meta tags

## File Organization

### Directory Structure

```
/
├── index.html          # Main application entry point
├── index.js           # Main JavaScript controller
├── style.css          # Global styles and components
├── scripts/           # Modular JavaScript files
│   └── recent-changes.js
├── public/            # Static assets
└── docs/              # Documentation files
```

### Naming Conventions

- Use kebab-case for file names: `recent-changes.js`
- Use camelCase for JavaScript variables and functions: `handleCompanyClick`
- Use PascalCase for JavaScript classes: `RecentChangesManager`
- Use kebab-case for CSS classes: `.recent-changes-container`

## Version Control

### Commit Messages

- Use conventional commit format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Keep first line under 50 characters
- Include detailed description for complex changes

### Branch Naming

- Use descriptive branch names: `feature/recent-changes-display`
- Follow pattern: `type/short-description`

## AI Assistant Guidelines

When working with AI assistants on this project:

1. **Reference this document**: Always mention following the coding standards
2. **Provide examples**: Include the specific standards relevant to the task
3. **Request validation**: Ask AI to confirm adherence to these standards
4. **Iterative improvement**: Use these standards to refine generated code

### Example AI Prompt

```
Please implement a new component following our coding standards:
- CSS: Use nesting, flexbox, and alphabetized properties
- JavaScript: Use ES6 modules with proper class structure
- HTML: Use semantic markup with proper accessibility
Refer to CODING_STANDARDS.md for complete guidelines.
```

## Tools and Automation

### Recommended Extensions (VS Code)

- CSS formatting and nesting support
- ESLint for JavaScript linting
- Prettier for consistent formatting
- HTML validation tools

### Future Enhancements

- Add ESLint configuration file
- Implement Prettier configuration
- Set up pre-commit hooks for standards validation
- Add automated testing for code quality

---

**Note**: These standards should evolve with the project. Update this document when new patterns emerge or requirements change.

**Last Updated**: September 2025
