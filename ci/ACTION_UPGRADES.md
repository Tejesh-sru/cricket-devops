CI workflow action upgrades and notes

What I changed already:
- Added FORCE_JAVASCRIPT_ACTIONS_TO_NODE24='true' to these workflows:
  - .github/workflows/deploy-frontend.yml
  - Criconnnect/.github/workflows/deploy.yml
  - Criconnnect/.github/workflows/cicd1.,yml
- Bumped peaceiris/actions-gh-pages to v6.4.1 in .github/workflows/deploy-frontend.yml

Recommended next steps (apply in a PR):
- Review and, if wanted, pin or bump the following actions to their latest stable releases that explicitly support Node.js 24:
  - actions/checkout -> v4 (already used)
  - actions/setup-node -> v4 (already used)
  - actions/cache -> v4 (already used)
  - peaceiris/actions-gh-pages -> v6.4.1 (applied)
  - docker/* actions (setup-qemu, setup-buildx, login-action, build-push-action) -> v2/v4 (already used)

Notes on pushing and Pages:
- If the Pages deployment still fails with a 403, check repository branch-protection rules or use a PAT-based deploy token (store in `secrets.DEPLOY_PG_TOKEN`) and pass it as `github_token` to the action.

How to open the PR locally (example):

```powershell
git checkout -b ci/upgrade-actions
# make or review changes
git add -A
git commit -m "ci: propose action bumps and Node.js24 opt-in"
git push -u origin ci/upgrade-actions
# then open a PR in the browser or use GitHub CLI:
# gh pr create --fill --title "ci: upgrade actions & opt into Node.js 24" --body-file ci/ACTION_UPGRADES.md
```

If you want, I can create the branch and push it for you now.