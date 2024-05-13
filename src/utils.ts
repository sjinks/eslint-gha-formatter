const map: Record<string, string> = {
    '\r': '%0D',
    '\n': '%0A',
    '%': '%25',
    ',': '%2C',
    ':': '%3A',
};

const replacer = (match: string): string => map[match]!;

export const escapeData = (s: unknown): string => String(s).replace(/[%\r\n]/gu, replacer);
export const escapeProperty = (s: unknown): string => String(s).replace(/[%\r\n:,]/gu, replacer);
