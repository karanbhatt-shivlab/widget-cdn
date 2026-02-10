(function () {
  // Prevent loading twice
  if (window.__MY_APP_WIDGET_LOADED__) return;
  window.__MY_APP_WIDGET_LOADED__ = true;

  // Find the current script tag
  const script = document.currentScript || (function () {
    const scripts = document.getElementsByTagName("script");
    return scripts[scripts.length - 1];
  })();

  const apiKey =
    script.getAttribute("data-api-key") ||
    script.getAttribute("data-key");

  if (!apiKey) {
    console.error("[Widget] Missing data-api-key");
    return;
  }

  const host = window.location.hostname;

  // Backend endpoint (change later)
  const API_URL = "https://api.yourapp.com/embed/config";

  // Fetch config from backend
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apiKey,
      host,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Config fetch failed");
      return res.json();
    })
    .then((config) => {
      if (!config || !config.features) {
        console.warn("[Widget] Invalid config");
        return;
      }

      initFeatures(config.features);
    })
    .catch((err) => {
      console.error("[Widget] Error loading widget:", err);
    });

  // ==========================
  // Feature Initializers
  // ==========================

  function initFeatures(features) {
    if (features.CHAT?.enabled) {
      initChatWidget();
    }

    if (features.FEEDBACK?.enabled) {
      initFeedbackWidget();
    }

    if (features.ANALYTICS?.enabled) {
      initAnalytics();
    }
  }

  function initChatWidget() {
    console.log("[Widget] Chat enabled");
    // Placeholder
    // loadChatIframe() or inject DOM
  }

  function initFeedbackWidget() {
    console.log("[Widget] Feedback enabled");
    // Placeholder
  }

  function initAnalytics() {
    console.log("[Widget] Analytics enabled");
    // Placeholder
  }
})();
