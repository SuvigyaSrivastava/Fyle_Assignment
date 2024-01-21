// Octokit.js
// https://github.com/octokit/core.js#readme
import { Octokit, App } from "https://esm.sh/octokit";
const decrypted = "11DUJABCB04JHpgt3m1Rxh_uVALLr5kWLY7ridiJ5l1h0e1pdNuADMl9xadaM5fqeP2I324SPGCu00dtBB"
const token = "github_pat_"+caesarCipher(decrypted, 3, true);;


const octokit = new Octokit({
    auth: token
  })

  const microphoneIcon = document.querySelector('.fa-search');

  // Add a click event listener to the microphone icon
  microphoneIcon.addEventListener('click', search);
  
  // Rest of your code...
  async function search() {
      console.log("Clicked" + token)
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
    const url = `index2.html?username=${encodeURIComponent(username)}&data=${encodeURIComponent(JSON.stringify(userData))};`

    // Navigate to the new page
    window.location.href = url;
}
function encrypt(text, shift) {
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);
  
      if (text[i] >= 'a' && text[i] <= 'z') {
        result += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
      } else if (text[i] >= 'A' && text[i] <= 'Z') {
        result += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
      } else {
        result += text[i];
      }
    }
  
    return result;
  }
  
  function caesarCipher(text, shift, decrypt = false) {
    return text.replace(/[a-zA-Z]/g, char => {
      const base = char.toLowerCase() === char ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
      const offset = (char.charCodeAt(0) - base + (decrypt ? 26 - shift : shift)) % 26;
      return String.fromCharCode(base + offset);
    });
  }
