import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

console.log('🚀 1/3 Building production bundle...');
execSync('npm run build', { stdio: 'inherit' });

console.log('📦 2/3 Preparing deployment for GitHub Pages...');
const tempDir = path.join(os.tmpdir(), `portfolio-deploy-${Date.now()}`);

try {
  execSync(`git worktree add "${tempDir}" gh-pages`, { stdio: 'pipe' });

  // Clean old files in worktree except .git
  const entries = fs.readdirSync(tempDir);
  for (const entry of entries) {
    if (entry !== '.git') {
      fs.rmSync(path.join(tempDir, entry), { recursive: true, force: true });
    }
  }

  // Copy dist files into worktree
  fs.cpSync('dist', tempDir, { recursive: true });

  console.log('🌐 3/3 Pushing to gh-pages branch...');
  execSync(`cd "${tempDir}" && git add -A && git commit -m "deploy: ${new Date().toISOString()}" --allow-empty && git push origin gh-pages`, {
    stdio: 'inherit',
    shell: true,
  });

  console.log('\n✅ Deployed successfully! Live site: https://tsurya06.github.io/portfolio/\n');
} finally {
  try {
    execSync(`git worktree remove --force "${tempDir}"`, { stdio: 'pipe' });
  } catch {}
}
