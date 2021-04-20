# ESLint Formatter for GitHub Actions

A custom formatter for ESLint that creates annotations for GitHub Actions.

## Installation

```bash
npm install --save-dev eslint-formatter-gha
```

## Usage

```bash
eslint . -f gha
```

If `eslint-formatter-gha` detects that ESLint runs in a GitHub runner (`GITHUB_ACTIONS` environment variable has the value of `true`), it creates annotations for GitHub Actions.
Otherwise, it invokes ESLint's `stylish` formatter.

**Since 1.1.0:** if the `SONARSCANNER` environment variable equals `true`, the formatter produces the result in the JSON format. Additionally, if the [`GITHUB_WORKSPACE` environment variable](https://docs.github.com/en/actions/reference/environment-variables#default-environment-variables) has a non-empty value, `eslint-formatter-gha` writes the generated JSON into `${GITHUB_WORKSPACE}/eslint-report.json` file.