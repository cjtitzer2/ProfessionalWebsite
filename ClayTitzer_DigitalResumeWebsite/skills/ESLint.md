# ESLint

## Version
ESLint 9

## Usage in Project
ESLint provides static code analysis to enforce code quality and catch common errors in the React codebase.

## Configuration
- Config file: `claytitzer_digitalresumewebsite.client/eslint.config.js` (flat config format)
- Plugins:
  - `eslint-plugin-react-hooks` — Enforces Rules of Hooks
  - `eslint-plugin-react-refresh` — Validates React Fast Refresh compatibility

## Commands
- `npm run lint` — Runs ESLint across the entire client project

## Key Rules
- React Hooks rules enforced (no conditional hooks, correct dependency arrays)
- React Refresh compatibility checks (only components and hooks exported from modules)
