/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   10-02-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 10-02-2017
*/

export function userSkeleton(data){
  return `
    <section>

      <header>
        <div class="row">
          <div class="col s6">
            <div class="input-field">
              <input id="search" type="search" required>
              <label class="label-icon" for="search"><i class="material-icons">search</i></label>
              <i class="material-icons">close</i>
            </div>
          </div>
          <div class="col s6 right-align">
            <span id="download" class=""><i class=" material-icons">file_download</i></span>
          </div>
        </div>
      </header>

      <main class="displayTable">
        <div class="displayCell">
          <h1 id="time"></h1>
          <p class="greetings">${data.pageTitle} ${data.userName}!</p>
          <div id="btnList">

          </div>
        </div>
      </main>

      <ul id="slide-out" class="side-nav">
        <li>
          <aside class="container left-align">
            <div>
              <h1>User Profil</h1>
              <div>
                <p class="flow-text">
                  You're connected as <b>${data.email}</b>. Want to <span id="logout">logout?</span>
                </p>
              </div>
              <h1>Links Settings:</h1>
              <div id="linkList">
                <span id="noLinks">Pas de liens pour le moment...</span>
              </div>
              <form id="linkSettingForm">
                <input name="key" type="hidden" class="validate" value="">
                <input placeholder="title" name="title" type="text" class="validate" value="titre">
                <br>
                <input placeholder="url" name="url" type="url" class="validate" value="http://toto.ch">
                <div>
                    <button>
                      Save
                    </button>
                </div>
              </form>
            </div>
          </aside>
        </li>
      </ul>



      <footer>
        <div class="row">
          <div class="col s4 left-align">
            <div>Photo by <address class="author"></address></div>
          </div>
          <div class="col s4 left-align">
            <a href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons">menu</i></a>
          </div>
          <div class="col s4 right-align">
            <div>data app using <a href="https://unsplash.com" target="_blank" title="Unsplash API">Unsplash API</a></div>
          </div>
        </div>

      </footer>

    </section>
  `;
}
