# GitHub Actions Workflow

This directory contains the GitHub Actions workflow for automatically deploying your blog to GitHub Pages.

## Workflow: `deploy.yml`

### What it does

1. **Triggers** on:
   - Every push to `master` branch
   - Manual trigger via GitHub Actions UI

2. **Build Process**:
   - Checks out the code
   - Sets up Node.js 20
   - Installs dependencies
   - Builds the production bundle with `GITHUB_PAGES=true`
   - Configures GitHub Pages
   - Uploads the build artifact

3. **Deploy Process**:
   - Deploys the built site to GitHub Pages
   - Provides the deployment URL

### Requirements

- GitHub Pages must be enabled in repository settings
- Pages source must be set to "GitHub Actions"

### Monitoring

View deployment status:
- Go to your repository on GitHub
- Click the "Actions" tab
- See the latest workflow runs

### Manual Trigger

To manually trigger a deployment:
1. Go to Actions → "Deploy to GitHub Pages"
2. Click "Run workflow"
3. Select the branch and run

### Troubleshooting

If deployment fails:
- Check the Actions tab for error messages
- Verify `vite.config.ts` has correct base path
- Ensure all dependencies are in `package.json`
- Check that the build works locally: `npm run build`

### Customization

To change when the workflow runs, edit `deploy.yml`:

```yaml
on:
  push:
    branches:
      - main  # Change to your default branch
```

To change Node version:

```yaml
- name: Setup Node
  uses: actions/setup-node@v4
  with:
    node-version: '20'  # Change version here
```

