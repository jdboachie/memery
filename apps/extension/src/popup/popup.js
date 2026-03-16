function formatDate(iso) {
  const d = new Date(iso);
  return (
    d.toLocaleDateString(undefined, { month: "short", day: "numeric" }) +
    " · " +
    d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
  );
}

function getDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

function render(memories) {
  const list = document.getElementById("list");
  const count = document.getElementById("count");

  count.textContent = `${memories.length} saved`;

  if (memories.length === 0) {
    list.innerHTML = `<p class="empty">Select text on any page,<br>right-click → Save to Memry.</p>`;
    return;
  }

  list.innerHTML = memories
    .map(
      (m) => `
    <div class="card">
      <div class="card-text">${m.text}</div>
      <div class="card-meta">
        <a href="${m.url}" target="_blank" title="${m.title}">${getDomain(m.url)}</a>
        <span>${formatDate(m.savedAt)}</span>
        <button class="delete-btn" data-id="${m.id}" title="Delete">✕</button>
      </div>
    </div>
  `,
    )
    .join("");

  list.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      chrome.storage.local.get({ memories: [] }, (data) => {
        const updated = data.memories.filter((m) => m.id !== id);
        chrome.storage.local.set({ memories: updated }, () => render(updated));
      });
    });
  });
}

chrome.storage.local.get({ memories: [] }, (data) => render(data.memories));
