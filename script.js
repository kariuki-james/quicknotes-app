const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const category = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMsg = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");

let notes = [];

function render() {
  notesList.innerHTML = "";

  // Update count text
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }

  notes.forEach((note) => {
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
      render();
    });

    li.append(textP, metaDiv, deleteBtn);
    notesList.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();

  // Validation
  if (text.length === 0) {
    errorMsg.textContent = "Please type a note first.";
    return;
  }
  if (text.length > 200) {
    errorMsg.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMsg.textContent = ""; // Clear error on success

  const newNote = {
    id: Date.now().toString(),
    text: text,
    category: category.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(newNote);
  input.value = "";
  render();
});

render();
