import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'

const configUrl = new URL('../wrangler.jsonc', import.meta.url)
const workflowUrl = new URL('../.github/workflows/deploy.yml', import.meta.url)

test('Cloudflare config serves the portfolio build on the apex domain', async () => {
  const config = JSON.parse(await readFile(configUrl, 'utf8'))

  assert.equal(config.name, 'personal-web-2025')
  assert.equal(config.compatibility_date, '2026-09-01')
  assert.deepEqual(config.assets, {
    directory: './dist',
    not_found_handling: 'single-page-application',
    html_handling: 'auto-trailing-slash',
  })
  assert.equal('main' in config, false)
  assert.equal(config.workers_dev, true)
  assert.deepEqual(config.routes, [
    {
      pattern: 'naufaldi.com/*',
      zone_name: 'naufaldi.com',
    },
  ])

  await assert.rejects(access(new URL('../public/_redirects', import.meta.url)), {
    code: 'ENOENT',
  })
})

test('GitHub validates Cloudflare artifacts without redeploying Docker to the VPS', async () => {
  const workflow = await readFile(workflowUrl, 'utf8')

  assert.match(workflow, /bun run deploy:dry-run/)
  assert.doesNotMatch(workflow, /docker|ssh-action|VPS_|Deploy to VPS/i)
})
