interface AttachSearchOptions {
  input: HTMLInputElement;
  results: HTMLElement;
  empty: HTMLElement;
  maxResults?: number;
}

function loadPagefind(): Promise<any> {
  // Loaded via a plain <script type="module" is:inline> in BaseLayout.astro —
  // Vite refuses to `import()` files inside public/ from processed code,
  // so the module is fetched natively by the browser and bridged here.
  const win = window as typeof window & { __pagefind?: Promise<any> };

  return win.__pagefind ?? Promise.resolve(null);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderResult(entry: any) {
  const title = escapeHtml(String(entry.meta?.title ?? entry.url));
  const url = escapeHtml(String(entry.url));

  // entry.excerpt is Pagefind-generated HTML (plain text with its own
  // <mark> highlights around matches) — safe to inject as-is, unlike the
  // title/url above which come from page metadata and need escaping.
  return `
    <a href="${url}" class="block rounded-xl px-3 py-2 transition hover:bg-gray-50 dark:hover:bg-gray-800">
      <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">${title}</div>
      <div class="mt-0.5 line-clamp-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">${entry.excerpt}</div>
    </a>
  `;
}

export function attachSearch({ input, results, empty, maxResults = 8 }: AttachSearchOptions) {

  let debounceTimer: ReturnType<typeof setTimeout>;

  async function runSearch() {

    const query = input.value.trim();

    if (!query) {
      results.innerHTML = "";
      empty.classList.add("hidden");
      return;
    }

    const pagefind = await loadPagefind();

    if (!pagefind) {
      results.innerHTML = "";
      empty.textContent = "Suche ist derzeit nicht verfügbar.";
      empty.classList.remove("hidden");
      return;
    }

    const search = await pagefind.search(query);
    const entries = await Promise.all(
      search.results.slice(0, maxResults).map((result: any) => result.data())
    );

    if (entries.length === 0) {
      results.innerHTML = "";
      empty.textContent = `Keine Ergebnisse für „${query}“.`;
      empty.classList.remove("hidden");
      return;
    }

    empty.classList.add("hidden");
    results.innerHTML = entries.map(renderResult).join("");

  }

  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(runSearch, 150);
  });

  return {
    clear() {
      input.value = "";
      results.innerHTML = "";
      empty.classList.add("hidden");
    }
  };

}
