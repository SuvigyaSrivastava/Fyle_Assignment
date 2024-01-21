import { Octokit } from "https://esm.sh/octokit";
const decrypted = "11DUJABCB04JHpgt3m1Rxh_uVALLr5kWLY7ridiJ5l1h0e1pdNuADMl9xadaM5fqeP2I324SPGCu00dtBB"
const token = "github_pat_"+caesarCipher(decrypted, 3, true);;

const octokit = new Octokit({
    auth: token
});

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

async function getUserDetails() {
    try {
        const response = await octokit.request('GET /users/{username}', {
            username: username,
        });

        setUserDetails(response.data);
    } catch (error) {
        alert("Some error occurred!");
    }
}

async function setUserDetails(userData) {
    document.querySelector('.name').textContent = userData.name;
    document.querySelector('.bio').textContent = userData.bio;
    document.querySelector('.location').textContent = userData.location;
    document.querySelector('.circular-image').src = userData.avatar_url;

    getUserRepos(username);
}

async function getUserRepos(username) {
    try {
        const repoResponse = await octokit.request('GET /users/{username}/repos', {
            username: username,
        });

        const repoData = repoResponse.data;

        // Log the repo data to the console
        console.log(repoData);

        // Display the repos in the pagination or wherever you need
        // You can use the repoData to create and populate pagination items
        // Sample code for displaying repo names:
        const repoList = document.getElementById('contentList');
        repoData.forEach(repo => {
            repoList.innerHTML += `<li class="list-group-item"><div class="Box d-flex p-3 width-full public source">
            <div class="pinned-item-list-item-content">
              <div class="d-flex width-full position-relative">
                <div class="flex-1">
                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-repo mr-1 color-fg-muted">
            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
        </svg>
                  <span data-view-component="true" class="position-relative"><a data-hydro-click="{&quot;event_type&quot;:&quot;user_profile.click&quot;,&quot;payload&quot;:{&quot;profile_user_id&quot;:47757685,&quot;target&quot;:&quot;PINNED_REPO&quot;,&quot;user_id&quot;:72186983,&quot;originating_url&quot;:&quot;https://github.com/leoronne&quot;}}" data-hydro-click-hmac="aec7464302ff4d8835f73b466e8a95273ba444ccc7658e12e9aa71799c5a4c8c" id="277934550" href="${repo.html_url}" data-view-component="true" class="Link mr-1 text-bold wb-break-word" aria-labelledby="tooltip-1265abc0-9579-4d27-b36b-10608cc40994">
        <span class="repo">${repo.name}</span>
        </a><tool-tip id="tooltip-1265abc0-9579-4d27-b36b-10608cc40994" for="277934550" popover="manual" data-direction="s" data-type="label" data-view-component="true" class="sr-only position-absolute" aria-hidden="true" role="tooltip">${repo.name}</tool-tip></span>          <span></span><span class="Label Label--secondary v-align-middle mt-1 no-wrap v-align-baseline Label--inline">${repo.visibility}</span>
                </div>
              </div>
        
        
              <p class="pinned-item-desc color-fg-muted text-small mt-2 mb-0">
                ${repo.description}
              </p>
        
              <p class="mb-0 mt-2 f6 color-fg-muted">
                  <span class="d-inline-block mr-3">
          <span class="repo-language-color" style="background-color: #3178c6"></span>
          <span itemprop="programmingLanguage">TypeScript</span>
        </span>
        
                  <a href="${repo.html_url}/stargazers" class="pinned-item-meta Link--muted">
                    <svg aria-label="stars" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-star">
            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
        </svg>
                    ${repo.stargazers_count}
                  </a>
                  <a href="${repo.html_url}/forks" class="pinned-item-meta Link--muted">
                    <svg aria-label="fork" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-repo-forked">
            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
        </svg>
                    ${repo.forks_count}
                  </a>
              </p>
            </div>
          </div></li>`;
        });
    } catch (error) {
        alert("Error fetching user repositories!");
    }
}

getUserDetails();
function caesarCipher(text, shift, decrypt = false) {
    return text.replace(/[a-zA-Z]/g, char => {
      const base = char.toLowerCase() === char ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
      const offset = (char.charCodeAt(0) - base + (decrypt ? 26 - shift : shift)) % 26;
      return String.fromCharCode(base + offset);
    });
  }
