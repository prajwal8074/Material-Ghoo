// content.js

// Inject the stylesheet once when the script first runs. This is more efficient.
if (!document.getElementById('material-you-theme-stylesheet')) {
    const themeStylesheet = document.createElement('link');
    themeStylesheet.rel = 'stylesheet';
    themeStylesheet.id = 'material-you-theme-stylesheet';
    themeStylesheet.type = 'text/css';
    themeStylesheet.href = chrome.runtime.getURL('material-you.css');
    document.head.appendChild(themeStylesheet);
}


/**
 * Applies the theme based on the enabled state and mode (automatic, light, dark).
 * @param {boolean} enabled - Whether the theme is active.
 * @param {string} mode - The theme mode to apply.
 */
function applyThemeState(enabled, mode) {
    const htmlEl = document.documentElement;

    // 1. First, enable or disable the entire theme by toggling the parent class.
    if (enabled) {
        htmlEl.classList.add('material-you-enabled');
    } else {
        htmlEl.classList.remove('material-you-enabled');
        // If the theme is off, we don't need to do anything else.
        return;
    }

    // 2. Next, handle the dark/light mode based on user selection.
    switch (mode) {
        case 'light':
            htmlEl.removeAttribute('dark');
            console.log("Material You: Forcing Light Mode.");
            break;
        case 'dark':
            htmlEl.setAttribute('dark', '');
            console.log("Material You: Forcing Dark Mode.");
            break;
        case 'automatic':
        default:
            // In "automatic" mode, we don't change the 'dark' attribute.
            // We respect whatever the website has set by default.
            console.log("Material You: Using Automatic Mode.");
            break;
    }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateTheme') {
        applyThemeState(request.enabled, request.mode);
        sendResponse({ status: 'Theme state updated successfully' });
    }
    return true; // Keep the message channel open for async response
});

// Apply the theme on initial page load based on saved settings
chrome.storage.sync.get(['themeEnabled', 'themeMode'], (data) => {
    const isEnabled = data.themeEnabled !== false;
    const mode = data.themeMode || 'automatic';
    applyThemeState(isEnabled, mode);
});

/**
 * Applies Material You styling to new or existing elements on the page.
 * This is where you add `material-you-processed` to avoid re-styling.
 * @param {HTMLElement} element - The DOM element to process.
 */
function applyMaterialYouStyles(element) {
  // Ensure the body/main app element always has the dark attribute for CSS to target
  // YouTube already sets this, but good to ensure if needed
  if (document.documentElement.hasAttribute('dark') || document.body.classList.contains('dark')) {
      document.documentElement.setAttribute('dark', ''); // Or add class 'dark' to body/ytd-app
  } else {
      document.documentElement.removeAttribute('dark');
  }


  // Universal selector to add a marker class to elements that have been processed.
  // This prevents redundant style applications and event listener attachments.
  // We'll target specific YouTube components and add our custom classes to them.

  // Top Bar elements
  element.querySelectorAll('#masthead-container.ytd-masthead').forEach(el => {
    if (!el.classList.contains('material-you-processed')) { el.classList.add('material-you-processed'); }
  });
  element.querySelectorAll('#search.ytd-searchbox').forEach(el => {
    if (!el.classList.contains('material-you-processed')) { el.classList.add('material-you-processed'); }
  });
  element.querySelectorAll('#search-icon-legacy.ytd-searchbox').forEach(el => {
    if (!el.classList.contains('material-you-processed')) { el.classList.add('material-you-processed'); }
  });
  element.querySelectorAll('#voice-search-button.ytd-masthead').forEach(el => {
    if (!el.classList.contains('material-you-processed')) { el.classList.add('material-you-processed'); }
  });
  element.querySelectorAll('ytd-topbar-menu-button-renderer yt-button-shape').forEach(el => {
    if (!el.classList.contains('material-you-processed')) { el.classList.add('material-you-processed'); }
  });
  element.querySelectorAll('ytd-button-renderer.ytd-topbar-menu-button-renderer button.yt-spec-button-shape-next').forEach(el => {
    if (!el.classList.contains('material-you-processed')) { el.classList.add('material-you-processed'); }
  });


  // Sidebar elements
  element.querySelectorAll('#guide-content.ytd-app').forEach(el => {
    if (!el.classList.contains('material-you-processed')) { el.classList.add('material-you-processed'); }
  });
  element.querySelectorAll('ytd-guide-entry-renderer').forEach(el => {
    if (!el.classList.contains('material-you-processed')) { el.classList.add('material-you-processed'); }
  });

  // Filter Chips elements
  element.querySelectorAll('#chips-wrapper.ytd-feed-filter-chip-bar-renderer').forEach(el => {
    if (!el.classList.contains('material-you-processed')) { el.classList.add('material-you-processed'); }
  });
  element.querySelectorAll('yt-chip-cloud-chip-renderer').forEach(el => {
    if (!el.classList.contains('material-you-processed')) { el.classList.add('material-you-processed'); }
  });

  // Video Grid and Card elements
  element.querySelectorAll('ytd-rich-grid-renderer').forEach(el => {
    if (!el.classList.contains('material-you-processed')) { el.classList.add('material-you-processed'); }
  });
  element.querySelectorAll('ytd-rich-grid-media').forEach(el => {
    if (!el.classList.contains('material-you-processed')) { el.classList.add('material-you-processed'); }
  });
  element.querySelectorAll('ytd-compact-video-renderer').forEach(el => {
    if (!el.classList.contains('material-you-processed')) { el.classList.add('material-you-processed'); }
  });
  element.querySelectorAll('ytd-thumbnail').forEach(el => {
    if (!el.classList.contains('material-you-processed')) { el.classList.add('material-you-processed'); }
  });
  element.querySelectorAll('#img.yt-img-shadow').forEach(el => {
    if (!el.classList.contains('material-you-processed')) { el.classList.add('material-you-processed'); }
  });
  element.querySelectorAll('ytd-video-meta-block').forEach(el => {
    if (!el.classList.contains('material-you-processed')) { el.classList.add('material-you-processed'); }
  });


  // Add the 'material-you-button' class to general YouTube buttons if they aren't specific
  element.querySelectorAll('button.yt-spec-button-shape-next').forEach(button => {
    if (!button.classList.contains('material-you-processed')) {
      button.classList.add('material-you-button', 'material-you-processed');
    }
  });

  console.log("Applied Material You styles to processed elements.", element);
}


// The forwardEvents and MutationObserver remain the same as previously provided
/**
 * Sets up event forwarding for Material You styled elements to their original counterparts.
 * This is crucial for maintaining YouTube's functionality.
 * @param {HTMLElement} element - The DOM element to process for event forwarding.
 */
function forwardEvents(container) {
  container.querySelectorAll('.material-you-button').forEach(materialYouButton => {
    // Check if event listener is already attached
    if (materialYouButton.dataset.eventForwarded === 'true') {
        return;
    }

    // For Material You theme, we are mostly _styling_ existing elements
    // rather than replacing them entirely. So, their native event listeners
    // should continue to work. This function is more of a placeholder or
    // for very specific cases where you might re-create an element.
    // If you are just adding classes, the original click event will fire.

    // If you explicitly hid an original button and replaced it:
    // const originalButton = materialYouButton.dataset.originalId ? document.getElementById(materialYouButton.dataset.originalId) : null;
    // if (originalButton) {
    //     materialYouButton.addEventListener('click', (event) => {
    //         event.preventDefault();
    //         event.stopPropagation();
    //         originalButton.click();
    //     });
    //     materialYouButton.dataset.eventForwarded = 'true';
    // } else {
        // If we are just styling, no explicit forwarding needed.
        // Mark as processed to avoid re-attaching any (conceptual) listeners
        materialYouButton.dataset.eventForwarded = 'true';
    // }
  });

  // console.log("Forwarded events for new elements."); // Too chatty for console
}


/**
 * Observes the DOM for changes (new elements being added) and applies styles/event forwarding.
 * Only connect this observer when the theme is enabled.
 */
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach(node => {
        // Ensure it's an element node (type 1)
        if (node.nodeType === 1) {
          applyMaterialYouStyles(node);
          forwardEvents(node);
        }
      });
    }
  });
});

// Initial logic is now inside toggleTheme, which is called on load
// based on chrome.storage.sync state.
console.log("YouTube Material You content script loaded (waiting for theme state).");