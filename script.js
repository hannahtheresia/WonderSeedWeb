function generateStory() {
  const name = document.getElementById("childName").value.trim();
  const theme = document.getElementById("theme").value;
  const container = document.getElementById("storyContainer");

  if (!name) {
    container.innerHTML = "<span class='text-red-500 font-semibold'>Oops! What's your name, little dreamer? 🌙</span>";
    return;
  }

  container.innerHTML = "<div class='loader'></div><p class='text-center mt-4 text-purple-700 italic'>Spinning your story...</p>";

  setTimeout(() => {
    const story = `
✨ The Brave Heart ✨

🌟 Page 1
Once upon a time, there was a child named ${name}, who carried a quiet spark of ${theme} in their heart...

🌈 Page 2
One gentle morning, ${name} saw a baby bird fall from a tree and felt a tug of care inside...

💫 Page 3
${name} asked, "Why do we help some animals and not others?"

🌙 Sleep well, ${name}.
💭 What do you think: Can all animals be our friends?
    `;
    container.innerText = story;
  }, 1600);
}

