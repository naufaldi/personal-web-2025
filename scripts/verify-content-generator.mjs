import { spawnSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const cwd = process.argv[2];
if (!cwd) throw new Error('Usage: node scripts/verify-content-generator.mjs /absolute/path/to/content-generator');
function run(command, args) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
  if (result.error || result.status !== 0) throw new Error(`${command} failed. Inspect the local test run; evidence was not replaced.`);
  return result.stdout;
}
if (run('git', ['status', '--porcelain']).trim()) throw new Error('Use a clean checkout so evidence maps to a source revision.');
const revision = run('git', ['rev-parse', 'HEAD']).trim();
const files = ['src/services/generation-durability.test.ts', 'src/services/generation-dispatcher.test.ts', 'src/services/charged-operations.test.ts', 'src/services/astraflow-client.test.ts', 'src/generation-queue-policy.test.ts'];
const output = run('pnpm', ['--filter', '@content-generator/api', 'exec', 'vitest', 'run', ...files, '--reporter=verbose']);
const safe = output.replace(/\x1b\[[0-9;]*[A-Za-z]/g, '').split('\n').filter(line => /^(?:\s*✓|\s*Test Files|\s*Tests |\s*Start at|\s*Duration)/.test(line));
if (!safe.some(line => /Tests.*passed/.test(line))) throw new Error('No recognized test summary; evidence was not replaced.');
const directory = fileURLToPath(new URL('../public/evidence/content-generator/', import.meta.url));
mkdirSync(directory, { recursive: true });
writeFileSync(resolve(directory, 'reliability-tests.txt'), `Local reliability verification: ${new Date().toISOString()}\nSource: ${revision}\nLocal Worker/D1 test bindings; fake providers. Test names and summary only.\n\n${safe.join('\n')}\n`);
console.log(`Saved sanitized evidence for ${revision}. Review the case study date and claims before publishing.`);
