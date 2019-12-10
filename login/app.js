

let loginUsernameTextBox = document.getElementById("loginEmailTextBox");
let loginPasswordTextBox = document.getElementById("loginPasswordTextBox");
let loginButton = document.getElementById("loginButton");
let message = document.getElementById('message')
let welcome = document.getElementById('welcome')
let page_content = document.getElementById('clear-content-on-login')
let loginOrOut = document.getElementById('loginorout')
let script = document.getElementById('script')

firebase.auth().onAuthStateChanged(function(user) {
  if (user) { // if the user is logged in...
    page_content.innerHTML = `
    <div class="container-fluid">
    <h1 class='text-light'>Submit a Ticket</h1>
    <div class="row">
      <div class="col">
    <div class='form-group'>
      <label class='text-light'>Hello, ${user.email}</label>
      <label class='text-light'>Ticket Subject</label>
      <input type="text" class="form-control" id="ticketSubject" placeholder="subject">
      <label for="exampleFormControlTextarea1" class='text-light'>Ticket Description</label>
      <textarea class="form-control" id="ticketDescription" rows="3"></textarea>
          <div class="form-group">
              <label for="exampleFormControlSelect1" class="text-light" >Ticket Priority</label>
              <select class="form-control" id="ticketPriority">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
              </select>
          </div>
              <button type="submit" onclick="submitTicket()" class="btn btn-light" id="ticketSubmit">Submit Ticket</button>
        </div>
        </div>
      </div>
  </div>
    `

 

    let signoutButton = document.getElementById("signoutButton");
    page_content.innerHTML += `<br/><button type="submit" id="signoutButton" onclick="signOut()" class="btn btn-light">Sign Out</button>`
  } else {
    // User is signed out.
    // ...
  }
});

loginButton.addEventListener("click", () => {
event.preventDefault()
  let email = loginEmailTextBox.value;
  let password = loginPasswordTextBox.value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      message.innerHTML = errorMessage
      // ...
    });
})

function signOut() {
    firebase
      .auth()
      .signOut()
      .then(
        function() {
          message.innerHTML = 'Signed Out!'
          window.location.reload()
        },
        function(error) {
          console.error("Sign Out Error", error);
        }
      );
  }
