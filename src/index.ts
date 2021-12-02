import { writeFileSync } from 'fs';
import { startGroup, endGroup } from '@actions/core';
import { issueCommand } from '@actions/core/lib/command';
import { ESLint, Linter } from 'eslint';
import stylish from 'eslint-formatter-stylish';
import json from 'eslint-formatter-json';

type SeverityMap = { [key in Linter.Severity]: string };

const severities: SeverityMap = {
    0: 'debug',
    1: 'warning',
    2: 'error',
};

interface AnnotationProps {
    file: string;
    line: string;
    col: string;
}

function hookStdout(
    callback: (
        orig: typeof process.stdout.write,
        ...params: Parameters<typeof process.stdout.write>
    ) => ReturnType<typeof process.stdout.write>,
) {
    const old_write = process.stdout.write;

    process.stdout.write = (function (write) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return function (...params: any): ReturnType<typeof process.stdout.write> {
            return callback(write, params);
        };
    })(process.stdout.write);

    return (): void => {
        process.stdout.write = old_write;
    };
}

const format: ESLint.Formatter['format'] = (results: ESLint.LintResult[], data?: ESLint.LintResultData): string => {
    if (process.env.GITHUB_ACTIONS !== 'true') {
        // @ts-expect-error typings are broken, `stylish` does expects `results`.
        return stylish(results, data);
    }

    if (process.env.SONARSCANNER === 'true') {
        // @ts-expect-error typings are broken, `json` does expects `results`.
        const result = json(results, data);
        if (process.env.GITHUB_WORKSPACE) {
            writeFileSync(`${process.env.GITHUB_WORKSPACE}/eslint-report.json`, result, { encoding: 'utf-8' });
            return '';
        }

        return result;
    }

    startGroup('ESLint Annotations');

    var result = '';
    let unhook = hookStdout((_orig, s, encoding, cb): boolean => {
        const callback = typeof encoding === 'function' ? encoding : cb;

        result += s.toString();
        callback?.();
        return true;
    });

    results.forEach(({ filePath, messages }) => {
        messages.forEach(({ message, severity, line, column }: Linter.LintMessage) => {
            const properties: AnnotationProps = {
                file: filePath,
                line: `${line}`,
                col: `${column}`,
            };

            issueCommand(severities[severity], properties, message);
        });
    });

    endGroup();
    unhook();
    return result;
};

export = format;
