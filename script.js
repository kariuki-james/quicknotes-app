const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const category = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

let notes = [];

function render() {
  notesList.innerHTML = "";

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.className = `note-card category-${note.category.toLowerCase()}`;

    const textP = document.createElement("p");
    textP.className = "note-text";
    textP.textContent = note.text; // Never using innerHTML for text

    const metaDiv = document.createElement("div");
    metaDiv.className = "note-meta";
    metaDiv.textContent = `${note.category} • ${note.createdAt}`;

    li.append(textP, metaDiv);
    notesList.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();

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
