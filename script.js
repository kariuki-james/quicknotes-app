const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const category = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMsg = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input");
const clearAllBtn = document.querySelector("#clear-all-btn");

let notes = JSON.parse(localStorage.getItem("quicknotes")) || [];

function saveNotes() {
  localStorage.setItem("quicknotes", JSON.stringify(notes));
}

function render(notesToDisplay = notes) {
  notesList.innerHTML = "";

  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }

  if (notesToDisplay.length === 0 && notes.length > 0) {
    const li = document.createElement("li");
    li.textContent = "No notes match your search.";
    li.style.color = "#666";
    notesList.appendChild(li);
    return;
  }

  notesToDisplay.forEach((note) => {
    const li = document.createElement("li");
    li.className = `note-card category-${note.category.toLowerCase()}`;

    const textP = document.createElement("p");
    textP.className = "note-text";
    textP.textContent = note.text;

    const metaDiv = document.createElement("div");
    metaDiv.className = "note-meta";
    metaDiv.textContent = `${note.category} • ${note.createdAt}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
      notes = notes.filter((n) => n.id !== note.id);
      saveNotes();
      render();
    });

    li.append(textP, metaDiv, deleteBtn);
    notesList.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();

  if (text.length === 0) {
    errorMsg.textContent = "Please type a note first.";
    return;
  }
  if (text.length > 200) {
    errorMsg.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMsg.textContent = "";
  const newNote = {
    id: Date.now().toString(),
    text: text,
    category: category.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(newNote);
  saveNotes();
  input.value = "";
  render();
});

searchInput.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(term),
  );
  render(filteredNotes);
});

clearAllBtn.addEventListener("click", () => {
  if (notes.length === 0) return;
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});

render();
