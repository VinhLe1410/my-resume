<script lang="ts">
  import { goToSection, revealTarget } from '$lib/navigation';
  import { searchResume, type SearchEntry } from '$lib/search';
  import { tick } from 'svelte';

  let dialog: HTMLDialogElement;
  let input: HTMLInputElement;
  let query = $state('');
  let activeIndex = $state(0);
  let status: { key: string; text: string } | null = $state(null);

  const groups = $derived(searchResume(query));
  const results = $derived(groups.flatMap((group) => group.results));
  const activeResult = $derived(results.at(activeIndex));

  const actionLabels = {
    section: 'Go',
    reveal: 'Go',
    copy: 'Copy',
    open: 'Open',
  } satisfies Record<SearchEntry['action']['kind'], string>;

  function openBar() {
    query = '';
    activeIndex = 0;
    status = null;
    dialog.showModal();
    input.focus();
  }

  function isTyping(target: EventTarget | null): boolean {
    return (
      target instanceof HTMLElement &&
      target.closest('input, textarea, select, [contenteditable], [role="textbox"]') !== null
    );
  }

  function handleWindowKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented || event.isComposing || event.repeat) return;
    const commandK = event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey) && !event.altKey;
    if (commandK) {
      event.preventDefault();
      if (dialog.open) dialog.close();
      else openBar();
      return;
    }
    const slash = event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey;
    if (slash && !dialog.open && !isTyping(event.target)) {
      event.preventDefault();
      openBar();
    }
  }

  async function moveActive(step: number) {
    if (results.length === 0) return;
    activeIndex = (activeIndex + step + results.length) % results.length;
    await tick();
    document.getElementById(`command-option-${activeIndex}`)?.scrollIntoView({ block: 'nearest' });
  }

  function handleQueryKeydown(event: KeyboardEvent) {
    if (event.isComposing) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      void moveActive(event.key === 'ArrowDown' ? 1 : -1);
    } else if (event.key === 'Enter' && activeResult) {
      event.preventDefault();
      void run(activeResult.entry);
    }
  }

  async function run(entry: SearchEntry) {
    const { action } = entry;
    if (action.kind === 'copy') {
      try {
        await navigator.clipboard.writeText(action.value);
        status = { key: entry.key, text: 'Copied' };
      } catch (error) {
        console.error(error);
        status = { key: entry.key, text: 'Copy failed' };
      }
      return;
    }
    dialog.close();
    if (action.kind === 'section') goToSection(action.id);
    else if (action.kind === 'reveal') revealTarget(action.id, action.block);
    else if (action.href.startsWith('mailto:')) location.href = action.href;
    else window.open(action.href, '_blank', 'noopener,noreferrer');
  }

  function handleDialogClick(event: MouseEvent) {
    // A click on the dialog element itself lands on the backdrop, outside the panel.
    if (event.target === dialog) dialog.close();
  }
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<button type="button" class="trigger" aria-haspopup="dialog" aria-keyshortcuts="/ Control+K Meta+K" onclick={openBar}>
  <kbd>/</kbd><span>search</span>
</button>

<!-- Escape closes the dialog natively; the click handler only adds backdrop dismissal. -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<dialog bind:this={dialog} class="command-bar" aria-label="Search the resume" onclick={handleDialogClick}>
  <div class="prompt">
    <span class="prompt-mark" aria-hidden="true">/</span>
    <input
      bind:this={input}
      bind:value={query}
      oninput={() => {
        activeIndex = 0;
        status = null;
      }}
      onkeydown={handleQueryKeydown}
      type="text"
      role="combobox"
      aria-label="Search the resume"
      aria-expanded="true"
      aria-controls="command-results"
      aria-autocomplete="list"
      aria-activedescendant={activeResult ? `command-option-${activeResult.index}` : undefined}
      placeholder="Search skills, roles, grades, contact"
      autocomplete="off"
      spellcheck="false"
    />
    <button type="button" class="close" onclick={() => dialog.close()}>
      <kbd>Esc</kbd><span>Close</span>
    </button>
  </div>

  <div id="command-results" class="results" role="listbox" aria-label="Results" hidden={results.length === 0}>
    {#each groups as group (group.name)}
      <div class="group" role="group" aria-labelledby="command-group-{group.name}">
        <div id="command-group-{group.name}" class="group-label">{group.name}</div>
        {#each group.results as result (result.entry.key)}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <div
            id="command-option-{result.index}"
            class="option"
            role="option"
            tabindex="-1"
            aria-selected={result.index === activeIndex}
            onmousemove={() => (activeIndex = result.index)}
            onmousedown={(event) => event.preventDefault()}
            onclick={() => run(result.entry)}
          >
            <span class="option-title"
              >{#each result.title as part, i (i)}{#if part.match}<mark>{part.text}</mark
                  >{:else}{part.text}{/if}{/each}</span
            >
            <span class="option-detail">{result.entry.detail}</span>
            <span class="option-action" class:has-status={status?.key === result.entry.key} aria-hidden="true"
              >{status?.key === result.entry.key ? status.text : `↵ ${actionLabels[result.entry.action.kind]}`}</span
            >
          </div>
        {/each}
      </div>
    {/each}
  </div>

  {#if results.length === 0}
    <p class="empty">
      Nothing matches “{query.trim()}”. Try a skill like <em>Lambda</em>, a company like <em>Evolit</em>, or
      <em>grades</em>.
    </p>
  {/if}

  <p class="sr-only" aria-live="polite">{status?.text ?? ''}</p>

  <div class="hints" aria-hidden="true">
    <span><kbd>↑</kbd><kbd>↓</kbd> move</span>
    <span><kbd>↵</kbd> select</span>
    <span><kbd>Esc</kbd> close</span>
  </div>
</dialog>

<style>
  :global(html:has(.command-bar[open])) {
    overflow: hidden;
  }

  .trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    color: var(--color-muted);
    font: 400 0.6rem/1.3 var(--font-mono);
    cursor: pointer;
    transition: color 180ms ease;
  }

  .trigger:hover {
    color: var(--color-primary);
  }

  .trigger:hover kbd {
    border-color: var(--color-outline);
    color: var(--color-primary);
  }

  .command-bar {
    width: min(40rem, calc(100vw - 2rem));
    max-width: none;
    max-height: min(36rem, calc(100dvh - 4rem));
    margin: min(14vh, 8rem) auto auto;
    padding: 0;
    overflow: hidden;
    border: 1px solid var(--color-outline-subtle);
    background: var(--color-surface);
    color: var(--color-secondary);
    box-shadow: 0 2rem 5rem -1rem rgb(0 0 0 / 0.7);
  }

  .command-bar[open] {
    display: flex;
    flex-direction: column;
    animation: command-in 160ms ease-out;
  }

  .command-bar::backdrop {
    background: rgb(0 0 0 / 0.62);
  }

  @keyframes command-in {
    from {
      opacity: 0;
    }
  }

  .prompt {
    display: flex;
    flex: none;
    align-items: center;
    gap: 0.9rem;
    min-height: 3.75rem;
    padding-inline: 1.25rem 0.75rem;
    border-bottom: 1px solid var(--color-outline-subtle);
  }

  .prompt-mark {
    color: var(--color-muted);
    font: 400 1rem/1 var(--font-mono);
  }

  input {
    flex: 1;
    min-width: 0;
    background: none;
    color: var(--color-primary);
    caret-color: var(--color-primary);
    font: 500 1.2rem/1.3 var(--font-headline);
    letter-spacing: -0.02em;
  }

  input:focus-visible {
    outline: none;
  }

  input::placeholder {
    color: var(--color-muted);
  }

  .close {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    padding-inline: 0.5rem;
    color: var(--color-muted);
    font: 400 0.62rem/1 var(--font-mono);
    cursor: pointer;
  }

  .close:hover kbd {
    border-color: var(--color-outline);
    color: var(--color-primary);
  }

  .close span {
    display: none;
  }

  .results {
    overflow-y: auto;
    overscroll-behavior: contain;
    padding-bottom: 0.5rem;
    scrollbar-color: var(--color-surface-high) transparent;
    scrollbar-width: thin;
  }

  .group-label {
    padding: 1rem 1.25rem 0.45rem;
    color: var(--color-muted);
    font: 400 0.62rem/1.4 var(--font-mono);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .option {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    column-gap: 1.5rem;
    row-gap: 0.2rem;
    padding: 0.6rem 1.25rem;
    cursor: pointer;
  }

  .option[aria-selected='true'] {
    background: var(--color-surface-high);
  }

  .option-title {
    display: -webkit-box;
    overflow: hidden;
    color: var(--color-secondary);
    font: 400 0.95rem/1.45 var(--font-headline);
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }

  .option[aria-selected='true'] .option-title {
    color: var(--color-primary);
  }

  .option-detail {
    grid-row: 2;
    overflow: hidden;
    color: var(--color-muted);
    font: 400 0.68rem/1.4 var(--font-mono);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .option-action {
    grid-column: 2;
    grid-row: 1 / 3;
    color: var(--color-muted);
    font: 400 0.65rem/1 var(--font-mono);
    white-space: nowrap;
    visibility: hidden;
  }

  .option[aria-selected='true'] .option-action {
    visibility: visible;
  }

  mark {
    background: none;
    color: var(--color-primary);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.2em;
  }

  .empty {
    padding: 1.5rem 1.25rem;
    color: var(--color-secondary);
    font: 400 0.95rem/1.6 var(--font-headline);
  }

  .empty em {
    color: var(--color-primary);
    font-style: normal;
  }

  .hints {
    display: flex;
    flex: none;
    gap: 1.5rem;
    padding: 0.75rem 1.25rem;
    border-top: 1px solid var(--color-outline-subtle);
    color: var(--color-muted);
    font: 400 0.62rem/1 var(--font-mono);
  }

  .hints span {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
  }

  @media (max-width: 760px) {
    .trigger {
      min-height: 2.75rem;
      padding-inline: 0.9rem;
      border: 1px solid var(--color-outline-subtle);
      color: var(--color-primary);
      font-size: 0.67rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .trigger kbd {
      display: none;
    }

    .command-bar {
      margin-top: 1rem;
    }

    .close kbd,
    .hints,
    .option-action:not(.has-status) {
      display: none;
    }

    .close span {
      display: inline;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .trigger {
      transition: none;
    }
  }
</style>
