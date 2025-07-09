document.addEventListener('DOMContentLoaded', () => {
    const enableThemeCheckbox = document.getElementById('enableTheme');
    const themeModeRadios = document.querySelectorAll('input[name="themeMode"]');

    // Function to send the current state to the content script
    function sendThemeUpdate() {
        const isEnabled = enableThemeCheckbox.checked;
        const currentMode = document.querySelector('input[name="themeMode"]:checked').value;

        // Save settings to storage
        chrome.storage.sync.set({ themeEnabled: isEnabled, themeMode: currentMode }, () => {
            console.log('Theme state saved:', { isEnabled, currentMode });

            // Send message to the active tab
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0] && tabs[0].id) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: 'updateTheme',
                        enabled: isEnabled,
                        mode: currentMode
                    }, (response) => {
                        if (chrome.runtime.lastError) {
                            console.error("Error sending message:", chrome.runtime.lastError.message);
                        } else if (response) {
                            console.log('Response from content script:', response.status);
                        }
                    });
                }
            });
        });
    }

    // Load saved state when popup opens
    chrome.storage.sync.get(['themeEnabled', 'themeMode'], (data) => {
        enableThemeCheckbox.checked = data.themeEnabled !== false; // Default to true if not set
        const savedMode = data.themeMode || 'automatic'; // Default to automatic
        document.querySelector(`input[name="themeMode"][value="${savedMode}"]`).checked = true;
    });

    // Add event listeners to all controls
    enableThemeCheckbox.addEventListener('change', sendThemeUpdate);
    themeModeRadios.forEach(radio => {
        radio.addEventListener('change', sendThemeUpdate);
    });
});