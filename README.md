# Universal Material You Themer

![Screenshot from 2025-07-09 21-24-08](https://github.com/user-attachments/assets/e4ff2e56-94b3-46f9-94a2-785c5df37cad)

A browser extension that brings Google's beautiful Material You design system to your favorite websites. Originally designed for YouTube, it now includes generic styling to give a consistent, modern feel across the web.

---

## ✨ Features

![Screenshot from 2025-07-09 21-59-35](https://github.com/user-attachments/assets/af85eb36-39b6-47a4-9dc8-50472ecee942)

- **🎨 Material You Design:** Applies a modern, clean theme inspired by Google's Material You color palette.
- ** toggler Dark/Light Mode Control:** From the popup, you can:
    - **Force Dark Mode:** Make any website dark.
    - **Force Light Mode:** Make any website light.
    - **Automatic Mode:** Respect the website's default theme.
- **✅ Simple On/Off Toggle:** Easily enable or disable the entire theme with a single click.
- **🌐 Universal Application:** While highly customized for YouTube, it also applies a base theme to many other popular websites for a more consistent browsing experience.
- **🚀 Lightweight & Efficient:** Works by injecting a single stylesheet and toggling a class, ensuring minimal performance impact.

---

## 📸 Screenshots

| Light Mode | Dark Mode |
| :---: | :---: |
| ![Screenshot from 2025-07-09 21-26-15](https://github.com/user-attachments/assets/1e2a1440-0f8b-4e2f-bbb2-8b778a0cc87b) | ![Screenshot from 2025-07-09 21-25-45](https://github.com/user-attachments/assets/354ff755-a5b5-45a5-9dd4-282fa0ac7247) |

### More Screenshots
<details>
  <summary>Click to view screenshots</summary>
  <p>
    <img src="https://github.com/user-attachments/assets/516ccac2-aaf3-4d2b-91fb-d32a87c646ac" alt="Screenshot 1"><hr>
    <img src="https://github.com/user-attachments/assets/7213fb61-e3ed-44eb-b828-0dfcd94b5951" alt="Screenshot 2"><hr>
    <img src="https://github.com/user-attachments/assets/85e4a066-121a-4f62-a99b-004ab7ee196a" alt="Screenshot 3"><hr>
    <img src="https://github.com/user-attachments/assets/7cb13e98-2a9c-4832-8e59-2dfd68bd29b9" alt="Screenshot 4"><hr>
    <img src="https://github.com/user-attachments/assets/a8008040-bb4b-44d9-8a00-e9a199d2a0aa" alt="Screenshot 5"><hr>
    <img src="https://github.com/user-attachments/assets/b3d525fe-66bd-47d7-951d-d3664dc93129" alt="Screenshot 6"><hr>
    <img src="https://github.com/user-attachments/assets/ede688d7-235a-437f-a9fd-eb5b003a6f86" alt="Screenshot 7"><hr>
    <img src="https://github.com/user-attachments/assets/3e5f1989-d4a8-4dfe-9ede-2477af4b55b9" alt="Screenshot 8"><hr>
    <img src="https://github.com/user-attachments/assets/c7f0e705-e8e6-4f7f-a1b6-8f9fbdda116b" alt="Screenshot 9"><hr>
    <img src="https://github.com/user-attachments/assets/0b5c5261-e177-48bc-b03f-b8d0d463d1a8" alt="Screenshot 10"><hr>
    <img src="https://github.com/user-attachments/assets/196e3abf-4ff2-403f-85c5-a1b54fb0d594" alt="Screenshot 11"><hr>
  </p>
</details>

---

## 📦 Installation

This extension is not yet on the Chrome Web Store, but you can easily install it manually.

1.  **Download the code:** Clone this repository or download it as a ZIP file and unzip it.
    ```sh
    git clone https://github.com/prajwal8074/Material-Ghoo.git
    ```
2.  **Open Chrome Extensions:** Open Google Chrome and navigate to `chrome://extensions`.
3.  **Enable Developer Mode:** In the top-right corner, turn on the "Developer mode" toggle.
4.  **Load the Extension:** Click the "Load unpacked" button that appears on the top-left.
5.  **Select the Folder:** In the file dialog, select the folder where you cloned or unzipped the project files (containing manifest.json).

The extension should now be installed and ready to use!

---

## 📁 File Structure
```
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── content.js          # Injects CSS and applies theme on web pages
├── manifest.json       # Extension configuration
├── material-you.css    # All theme styles
├── popup.html          # The HTML structure for the popup
├── popup.js            # The logic for the popup controls
└── README.md           # You are here!
```
---

## ⚙️ How It Works

The extension uses a simple but powerful architecture:

-   **`content.js`**: This script is injected into every webpage. It's responsible for:
    -   Injecting the `material-you.css` stylesheet into the page's `<head>`.
    -   Listening for messages from the popup to change settings.
    -   Applying the theme by adding or removing the `.material-you-enabled` class to the `<html>` element.
    -   Forcing a color mode by adding or removing the `dark` attribute on the `<html>` element.
-   **`popup.html` & `popup.js`**: These files create the popup menu you see when you click the extension icon. This interface allows you to enable/disable the theme and select your preferred color mode. The settings are saved to `chrome.storage.sync` so they persist across browsing sessions.
-   **`material-you.css`**: This is the heart of the theme. It contains all the CSS rules:
    -   Specific, fine-tuned styles for YouTube's complex interface.
    -   Generic override styles designed to apply a consistent theme to other websites.
-   **`manifest.json`**: The core configuration file that tells Chrome how the extension works, what permissions it needs, and which scripts to run.

---

## 🤝 Contributing & Future Ideas

Contributions are welcome! If you have ideas for improvements or want to fix a bug, feel free to fork the repository and submit a pull request.

Some ideas for the future:

-   [ ] **Custom Color Palettes:** Allow users to choose their own primary/accent colors.
-   [ ] **Site-Specific Toggles:** Let users enable or disable the theme for specific websites.
-   [ ] **Improved Specificity:** Add custom, fine-tuned styles for other popular websites (like Reddit, Twitter, etc.).
-   [ ] **Publish to Chrome Web Store:** Package the extension for easy installation.
