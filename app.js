const apiBase = "http://localhost:3000";
const username = "demoUser"; // Replace with dynamic user logic

document.getElementById("username").textContent = username;

// Fetch and display links
async function fetchLinks() {
  const res = await fetch(`${apiBase}/${username}`);
  const links = await res.json();
  const linksList = document.getElementById("links");
  linksList.innerHTML = links
    .map(
      (link) => `
    <li>
      <a href="${link.url}" target="_blank">${link.title}</a>
      <button onclick="deleteLink(${link.id})">Delete</button>
    </li>
  `
    )
    .join("");
}

// Add new link
document.getElementById("linkForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const url = document.getElementById("url").value;
  await fetch(`${apiBase}/links`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, title, url }),
  });
  fetchLinks();
});

// Delete a link
async function deleteLink(id) {
  await fetch(`${apiBase}/links/${id}`, { method: "DELETE" });
  fetchLinks();
}

// Initial fetch
fetchLinks();
