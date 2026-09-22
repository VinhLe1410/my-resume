---
name: writing-svelte-code
description: Looks up official Svelte 5 and SvelteKit docs and checks Svelte components with the official CLI. Use when editing or reviewing .svelte and .svelte.ts files in this project.
---

Adapted from [Svelte's official skill](https://github.com/sveltejs/ai-tools/tree/a5a92c680ebe0d432593f4228a122cb59f5a0c74/tools/skills/svelte-code-writer). MIT license: [../LICENSE](../LICENSE).

## CLI tools

You have access to `@sveltejs/mcp` CLI for Svelte-specific assistance. Use these commands via `npx`:

### List documentation sections

```bash
npx @sveltejs/mcp list-sections
```

Lists all available Svelte 5 and SvelteKit documentation sections with titles and paths.

### Get documentation

```bash
npx @sveltejs/mcp get-documentation "<section1>,<section2>,..."
```

Retrieves full documentation for specified sections. Use after `list-sections` to fetch relevant docs.

**Example:**

```bash
npx @sveltejs/mcp get-documentation "$state,$derived,$effect"
```

### Svelte autofixer

```bash
npx @sveltejs/mcp svelte-autofixer "<code_or_path>" [options]
```

Analyzes Svelte code and suggests fixes for common issues.

**Options:**

- `--async` - Enable async Svelte mode (default: false)
- `--svelte-version` - Target version: 4 or 5 (default: 5)

**Examples:**

```bash
# Single quotes keep the shell from expanding $state
npx @sveltejs/mcp svelte-autofixer '<script>let count = $state(0);</script>'

# Analyze a file
npx @sveltejs/mcp svelte-autofixer ./src/lib/components/Sidebar.svelte
```

**Important:** Use single quotes for inline code with runes (`$state`, `$derived`, etc.) so the shell does not expand `$`.

## Workflow

1. **Uncertain about syntax?** Run `list-sections` then `get-documentation` for relevant topics
2. **Reviewing/debugging?** Run `svelte-autofixer` on the code to detect issues
3. **Always validate** - Run `svelte-autofixer` before finalizing any Svelte component
