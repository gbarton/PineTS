import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { badgen } from 'badgen';
import path from 'path';

const coveragePath = 'coverage/coverage-summary.json';
const badgePath = '.github/badges/coverage.svg';

try {
    if (!existsSync(coveragePath)) {
        console.error('Coverage summary not found. Run tests with coverage first.');
        process.exit(1);
    }

    const summary = JSON.parse(readFileSync(coveragePath, 'utf-8'));
    // Format to 1 decimal place if needed
    const total = Math.round(summary.total.lines.pct * 10) / 10;
    const color = total > 80 ? 'green' : total > 50 ? 'yellow' : 'red';

    const svgString = badgen({
        label: 'coverage',
        status: `${total}%`,
        color: color,
        scale: 1,
    });

    const dir = path.dirname(badgePath);
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }

    writeFileSync(badgePath, svgString);
    console.log(`Badge generated at ${badgePath}`);
} catch (error) {
    console.error('Error generating badge:', error);
    process.exit(1);
}

