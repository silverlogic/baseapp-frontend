# Contributing to BaseApp

Thank you for your interest in contributing to BaseApp! We welcome contributions from the community to help improve and grow the project. Please take a moment to review these guidelines before getting started.

## Table of Contents

- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)
- [Contributing Code](#contributing-code)
- [Code of Conduct](#code-of-conduct)

---

## Reporting Bugs

When you encounter a bug or unexpected behavior in BaseApp, please follow these steps to report it:

1. Check the [GitHub Issues](https://github.com/silverlogic/baseapp-frontend/issues) to ensure that the bug hasn't already been reported.

2. If the issue hasn't been reported, create a new issue by clicking on the "New Issue" button. Please make sure to use the `bug` label when creating feature requests to help categorize and prioritize them effectively.

3. Use a clear and descriptive title and provide detailed information about the issue, including steps to reproduce it and any error messages or logs.

4. If possible, include any relevant code snippets or configuration files that can help in diagnosing the problem.

5. Assign appropriate labels and milestones to the issue, if you have access.

## Requesting Features

If you have an idea for a new feature or enhancement in BaseApp, please follow these steps to request it:

1. Check the [GitHub Issues](https://github.com/silverlogic/baseapp-frontend/issues) to ensure that the feature hasn't already been requested.

2. If the feature hasn't been requested, create a new issue by clicking on the "New Issue" button. Please make sure to use the `enhancement` label when creating feature requests to help categorize and prioritize them effectively.

3. Use a clear and descriptive title and provide detailed information about the feature request, including its use case and benefits.

4. If possible, include any design or implementation suggestions you may have.

5. Assign appropriate labels and milestones to the issue, if you have access.

## Contributing Code

We welcome code contributions to BaseApp! How you get your branch onto a Pull Request depends on your
access; everything after that is the same.

### Getting your branch up

**With write access to this repository**, clone it and branch directly. **The branch name must start with
`feature/`, `epic/` or `hotfix/`.** A repository ruleset rejects any other new branch with
`GH013: Cannot create ref due to creations being restricted`, so a name outside those three prefixes fails
on push rather than at review. Use `hotfix/` for a bug fix or dependency bump, `feature/` for new work,
`epic/` for a long-lived branch that several PRs will target. A Jira ID is optional and goes after the
prefix:

```
git checkout -b feature/BA-1234-comment-reactions
git checkout -b hotfix/stale-data-after-navigation
```

**Without write access**, fork the repository and push your branch to your fork. The branch-prefix
ruleset applies only to this repository, so your fork can use any branch name.

### Then, either way

1. Make your changes, write tests if applicable, and ensure the existing tests pass.

2. Commit with a [Conventional Commits](https://www.conventionalcommits.org) subject. `feat:`, `fix:` and
   `chore:` cover nearly everything in this repository's history; the spec defines the rest:

   ```
   git commit -m "fix: prevent sending messages that contain only whitespace"
   ```

3. Open a Pull Request against `master`, with a descriptive title and an explanation of what changed and
   why.

4. Add a changeset (`pnpm changeset`) if your change should publish a new package version. A PR that
   touches no package source — documentation, CI, repository config — does not need one, and the
   changeset bot's warning can be ignored in that case.

5. Participate in review, addressing feedback as it comes.

6. Before submitting, read the
   [Packages Versioning and Publishing](README.md#packages-versioning-and-publishing) section of the
   README.

Once the PR is approved with CI green, a maintainer merges it into `master`.

## Code of Conduct

Please note that by contributing to BaseApp, you are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). We want all contributors to maintain a respectful and inclusive environment for everyone.

Thank you for your interest in contributing to BaseApp! Your contributions are greatly appreciated, and they help make the project better for everyone.

If you have any questions or need further assistance, feel free to reach out to us on the GitHub issue tracker or by [contacting us](mailto:info@tsl.io).

Happy coding! 🚀
