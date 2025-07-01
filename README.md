# ESLint Formatter for GitHub Actions

[![Build and Test](https://github.com/sjinks/eslint-gha-formatter/actions/workflows/build.yml/badge.svg)](https://github.com/sjinks/eslint-gha-formatter/actions/workflows/build.yml)
[![CodeQL](https://github.com/sjinks/eslint-gha-formatter/actions/workflows/codeql.yml/badge.svg)](https://github.com/sjinks/eslint-gha-formatter/actions/workflows/codeql.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=sjinks_eslint-gha-formatter&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=sjinks_eslint-gha-formatter)

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

**Since 1.1.0:** If the `SONARSCANNER` environment variable equals `true`, the formatter produces the result in the JSON format. Additionally, if the [`GITHUB_WORKSPACE` environment variable](https://docs.github.com/en/actions/reference/environment-variables#default-environment-variables) has a non-empty value, `eslint-formatter-gha` writes the generated JSON into `${GITHUB_WORKSPACE}/eslint-report.json` file.

## Sample Output

![Inline annotations](https://github.com/user-attachments/assets/4e320821-5b0a-463a-a3cd-fd31420a1360)

![Annotations in summary](https://github.com/user-attachments/assets/eccbbaa7-6c54-43e0-acf9-64bab77390d5)
