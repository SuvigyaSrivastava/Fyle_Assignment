
// Octokit.js
// https://github.com/octokit/core.js#readme
import { Octokit, App } from "https://esm.sh/octokit";
const token = "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"


const octokit = new Octokit({
    auth: token
  })

  const microphoneIcon = document.querySelector('.fa-search');

  // Add a click event listener to the microphone icon
  microphoneIcon.addEventListener('click', search);
  
  // Rest of your code...
  async function search() {
      console.log("Clicked")
      const usernameInput = document.querySelector('.form-input');

    const username = usernameInput.value.trim();

      try {
          const response = await octokit.request('GET /users/{username}', {
              username: username,
        
          });
  
          // Log the response to the console
          console.log(response);
          openResultPage(username, response);

      } catch (error) {
          // Handle errors if any
          alert("GitHub User not found!");

          
      }
  }

  function openResultPage(username, userData) {
    // Create a URL with query parameters
    const url = `index2.html?username=${encodeURIComponent(username)}&data=${encodeURIComponent(JSON.stringify(userData))}`;

    // Navigate to the new page
    window.location.href = url;
}

