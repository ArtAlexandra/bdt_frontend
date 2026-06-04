# Commits & Branches

## Commit Naming:

```
<type>: <short description>
```

### Commit types ([Conventional Commits standard](https://www.conventionalcommits.org/en/v1.0.0/)):

- feat — adding new functionality
- fix — bug fix
- refactor — refactoring code without changing logic
- docs — documentation updates
- chore — changes that do not affect the code (updating dependencies, CI/CD configuration)
- test — adding or updating tests
- style — changes that do not affect logic (formatting, spaces)
- perf — improving performance

Examples:

feat: added Google authentication support  
fix: fixed image upload bug in Safari  
refactor: optimized request handling code  
test: added tests for validation function  
docs: updated API documentation  
chore: updated dependencies  

## Branch Naming

```
<type>/<task-number>-<short-description>
```

### Branch Type Breakdown:

- feature/ — new features
- bugfix/ — bug fixes
- hotfix/ — urgent production fix
- chore/ — documentation updates, refactoring, other work

Examples:

feat/1234-dark-theme  
fix/5678-image-upload-bug  
refactor/auth-middleware  
docs/update-readme  
hotfix/critical-bug  
