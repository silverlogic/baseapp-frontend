# Mirrored skills

These skills are **mirrored from the template** so they load when working directly inside this submodule
(`baseapp-frontend/`), where the `@baseapp-frontend/*` packages and their tests live.

**Canonical source:** `../../.claude/skills/` (the `baseapp-frontend-template` repo).
Edit there, then re-sync:

```bash
# from baseapp-frontend-template/
for s in frontend-unit-testing frontend-ensure-test-coverage; do
  rm -rf "baseapp-frontend/.claude/skills/$s"
  cp -R ".claude/skills/$s" "baseapp-frontend/.claude/skills/$s"
done
```

Mirrored (testing track):
- `frontend-unit-testing` — runner-aware (Jest + Vitest) unit test generation.
- `frontend-ensure-test-coverage` — the no-regress coverage gate + coverage-measurability matrix.

Do not edit the copies here directly — changes will be overwritten on the next sync and diverge from the
canonical template versions.
