chrome.runtime.onMessage.addListener((message) => {
  if (message.type !== "show-toast") return;
  showToast(message.text);
});

function showToast(text) {
  document.getElementById("memry-toast-host")?.remove();

  const host = document.createElement("div");
  host.id = "memry-toast-host";
  const shadow = host.attachShadow({ mode: "open" });

  shadow.innerHTML = `
    <style>
      #toast {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 2147483647;
        display: flex;
        align-items: center;
        gap: 10px;
        background: #111;
        color: #eee;
        padding: 12px 16px;
        border-radius: 10px;
        box-shadow: 0 4px 24px rgba(0,0,0,0.4);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: 13px;
        max-width: 300px;
        border: 1px solid #2a2a2a;
        opacity: 0;
        transform: translateY(-8px);
        transition: opacity 0.2s ease, transform 0.2s ease;
      }
      #icon { font-size: 18px; color: #4CAF50; flex-shrink: 0; }
      #title { font-weight: 600; margin-bottom: 2px; color: #fff; }
      #body-text { color: #888; line-height: 1.4; }
    </style>
    <div id="toast">
      <div id="icon">✦</div>
      <div>
        <div id="title">Saved to Memry</div>
        <div id="body-text">${text.slice(0, 80)}${text.length > 80 ? "…" : ""}</div>
      </div>
    </div>
  `;

  document.documentElement.appendChild(host);

  const toast = shadow.getElementById("toast");

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-8px)";
    setTimeout(() => host.remove(), 200);
  }, 3000);
}
