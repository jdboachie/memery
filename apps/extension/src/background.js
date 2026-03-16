import { ConvexHttpClient } from "convex/browser";
import { api } from "@memry/backend/convex/_generated/api.js";

const client = new ConvexHttpClient("https://neighborly-cricket-848.eu-west-1.convex.cloud");

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "save-to-memery",
    title: "Save to memery",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== "save-to-memery") return;

  const entry = {
    text: info.selectionText,
    url: info.pageUrl,
    title: tab.title,
    savedAt: new Date().toISOString(),
  };

  chrome.storage.local.get({ memories: [] }, async (data) => {
    const updated = [entry, ...data.memories];

    chrome.storage.local.set({ memories: updated }, () => {
      chrome.tabs.sendMessage(tab.id, {
        type: "show-toast",
        text: entry.text,
      });
    });

    try {
      await client.mutation(api.entries.create, {
        text: entry.text,
        url: entry.url,
        title: entry.title,
      }).catch((error) => console.log(error))
      console.log("Saved to Convex");
    } catch (err) {
      console.error("Convex mutation failed:", err);
    }
  });
});
