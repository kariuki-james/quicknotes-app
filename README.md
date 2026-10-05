# QuickNotes

QuickNotes is a lightweight, responsive note-taking web application that allows you to instantly jot down and categorize thoughts, keeping them securely saved directly on your device.

## Features

- **Add & Categorize**: Create text notes with automatic timestamps and tag them as Personal, Work, or Study.
- **Visual Design**: Clean, card-based UI with category-specific colored borders and responsive layouts for mobile screens.
- **Data Persistence**: Uses browser `localStorage` to ensure your notes survive page refreshes.
- **Instant Search**: Filter your list of notes in real-time as you type in the search bar.
- **Validation Constraints**: Prevents empty submissions and limits character count to 200 max.
- **Clear All (Bonus)**: One-click button with a safety confirmation prompt to easily wipe the entire note board.

## How to Run Locally

1. Clone this repository to your machine using `git clone`.
2. Open the `quicknotes-app` folder.
3. Double-click the `index.html` file to open it in your default web browser (No server setup required).

## What I Learned

- **DOM Security**: How to safely render user-generated text using `document.createElement()` and `textContent` to avoid Cross-Site Scripting (XSS) risks associated with `innerHTML`.
- **Data Persistence**: How to convert JavaScript arrays to strings with `JSON.stringify()` to store them in `localStorage`, and parse them back to objects upon reloading.
- **Array Methods for UI**: Using `.filter()` to handle both note deletion and real-time search logic efficiently.
