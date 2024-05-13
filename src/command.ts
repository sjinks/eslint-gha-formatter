import { EOL } from 'node:os';
import { escapeData, escapeProperty } from './utils';

class Command {
    public constructor(
        private readonly command: string,
        private readonly properties: Record<string, unknown>,
        private readonly message: string,
    ) {}

    public toString(): string {
        let cmdStr = `::${this.command}`;
        if (Object.keys(this.properties).length > 0) {
            const properties = Object.entries(this.properties)
                .filter(([key, val]) => Object.hasOwn(this.properties, key) && val)
                .map(([key, val]) => `${key}=${escapeProperty(val)}`)
                .join(',');

            cmdStr += ` ${properties}`;
        }

        cmdStr += `::${escapeData(this.message)}`;
        return cmdStr;
    }
}

export function issueCommand(command: string, properties: Record<string, unknown> = {}, message = ''): string {
    const cmd = new Command(command, properties, message);
    return cmd.toString() + EOL;
}
