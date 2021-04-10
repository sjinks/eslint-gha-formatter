# ESLint Formatter for GitHub Actions

A custom formatter for ESLint that creates annotations for GitHub Actions.

## Installation

```bash
npm install --save-dev eslint-gha-formatter
```

## Usage

```bash
eslint . -f eslint-gha-formatter
```

If `eslint-gha-formatter` detects that ESLint runs in a GitHub runner (`GITHUB_ACTIONS` environment variable is set to `true`), it creates annotations for GitHub Actions..
Otherwise, it invokes ESLint's `stylish` formatter.
