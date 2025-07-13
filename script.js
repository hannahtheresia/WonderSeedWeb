async function generateStory() {
  const name = document.getElementById("childName").value.trim();
  const theme = document.getElementById("theme").value;
  const container = document.getElementById("storyContainer");

  if (!name) {
    container.innerHTML = "<span style='color:red;'>Oops! What's your name, little dreamer? 🌙</span>";
    return;
  }

  container.innerHTML = "<div class='loader'></div><p style='text-align:center; color:#7c3aed; font-style: italic;'>Spinning your story...</p>";

  try {
    const response = await fetch("/.netlify/functions/generateStory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ childName: name, theme: theme })
    });

    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    const data = await response.json();
    container.textContent = data.story;
  } catch (error) {
    container.innerHTML = `<span style='color:red;'>Oops, something went wrong: ${error.message}</span>`;
  }
}


