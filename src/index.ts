import { writeFile } from 'node:fs/promises';
import type { ESLint, Linter } from 'eslint';
import stylish from 'eslint-formatter-stylish';
import json from 'eslint-formatter-json';
import { issueCommand } from './command';
import { formatMessage } from './utils';

type SeverityMap = Record<Linter.Severity, string>;

const severities: SeverityMap = {
    0: 'debug',
    1: 'warning',
    2: 'error',
} as const;

const format: ESLint.Formatter['format'] = async (
    results: ESLint.LintResult[],
    data?: ESLint.LintResultData,
): Promise<string> => {
    if (process.env['GITHUB_ACTIONS'] !== 'true') {
        // @ts-expect-error typings are broken, `stylish` does expect `results`.
        return stylish(results, data);
    }

    if (process.env['SONARSCANNER'] === 'true') {
        // @ts-expect-error typings are broken, `json` does expect `results`.
        let result = json(results, data);
        if (process.env['GITHUB_WORKSPACE']) {
            writeFile(`${process.env['GITHUB_WORKSPACE']}/eslint-report.json`, result, { encoding: 'utf-8' });
            return '';
        }

        return result;
    }

    var commands = [
        issueCommand('group', {}, 'ESLint Annotations'),
        ...results.flatMap(({ filePath: file, messages }) =>
            messages.map(({ message, severity, line, column: col, ruleId }) =>
                issueCommand(severities[severity], { file, line, col }, formatMessage(message, ruleId)),
            ),
        ),
        issueCommand('endgroup'),
    ];

    return commands.length > 2 ? commands.join('') : '';
};

export = format;
