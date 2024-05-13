import { equal } from 'node:assert/strict';
import { EOL } from 'node:os';
import { describe, test } from 'node:test';
import { issueCommand } from '../src/command';

void describe('command', async () => {
    await describe('issueCommand', async () => {
        await test('without properties, with message', () => {
            const command = 'group';
            const message = 'ESLint Annotations';
            const expected = `::${command}::${message}${EOL}`;
            const actual = issueCommand(command, {}, message);
            equal(actual, expected);
        });

        await test('without properties and message', () => {
            const input = 'endgroup';
            const expected = `::${input}::${EOL}`;
            const actual = issueCommand(input);
            equal(actual, expected);
        });

        await test('ignore empty properties', () => {
            const command = 'warning';
            const message = 'Unexpected console statement.';
            const properties = { title: '', file: 'eslint-gha-formatter/src/index.ts', line: 36, col: 9, something: 0 };
            const expected = `::${command} file=${properties.file},line=${properties.line},col=${properties.col}::${message}${EOL}`;
            const actual = issueCommand(command, properties, message);
            equal(actual, expected);
        });
    });
});
