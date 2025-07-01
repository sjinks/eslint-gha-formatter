import { equal } from 'node:assert/strict';
import { describe, test } from 'node:test';
import { escapeData, escapeProperty, formatMessage } from '../src/utils';

void describe('utils', async () => {
    await test('escapeData', () => {
        equal(escapeData(''), '');
        equal(escapeData('Hello, World!'), 'Hello, World!');
        equal(escapeData('Hello, World 100%!\r\n'), 'Hello, World 100%25!%0D%0A');
    });

    await test('escapeProperty', () => {
        equal(escapeProperty(''), '');
        equal(escapeProperty('Hello, World!'), 'Hello%2C World!');
        equal(escapeProperty('Hello, World: 100%!\r\n'), 'Hello%2C World%3A 100%25!%0D%0A');
    });

    await test('formatMessage', () => {
        equal(formatMessage('Hello, World!', 'rule-id'), 'Hello, World! (rule-id)');
        equal(formatMessage('Hello, World!', undefined), 'Hello, World!');
        equal(formatMessage('Hello, World!', null), 'Hello, World!');
    });
});
