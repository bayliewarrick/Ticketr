// let viewAllButton = document.getElementById("viewAllButton");
// let ticketSubject = document.getElementById("ticketSubject");
// let ticketDescription = document.getElementById("ticketDescription");
// let allTicketsUL = document.getElementById("allTicketsUL");
// let ticketSubmit = document.getElementById("ticketSubmit");
// let ticketPriority = document.getElementById("ticketPriority");
// let userEmail = document.getElementById("userEmail");
// let date = Date();

var database = firebase.database();
let root = database.ref();
let ticketsRef = root.child("Tickets");

function priorityRanking(Priority) {
  // console.log(Priority);
  if (Priority == "Low") {
    return 1;
  } else if (Priority == "Medium") {
    return 2;
  } else if (Priority == "High") {
    return 3;
  }
}

function sortByPriority(allTickets) {
  allTickets.sort((a, b) => {
    return priorityRanking(b.Priority) - priorityRanking(a.Priority);
  });
  console.log(allTickets);
}

function statusRanking(Status) {
  if (Status === "Resolved") {
    return 1;
  } else if (Status === "Unresolved") {
    return 2;
  } else if (Status === "In Progress") {
    return 3;
  } else {
    return null;
  }
}

function sortByStatus(allTickets) {
  allTickets.sort((a, b) => {
    return statusRanking(b.Status) - statusRanking(a.Status);
  });
}

function setupObservers() {
  ticketsRef.on("value", snapshot => {
    let allTickets = [];
    let snapshotValue = snapshot.val();

    for (let key in snapshotValue) {
      let ticket = snapshotValue[key];
      ticket.ticketId = key;
      allTickets.push(ticket);
    }
    sortByStatus(allTickets);
    updateUI(allTickets);
  });
}

function displayPriority() {
  allTicketsUL.innerHTML = "";
  ticketsRef.on("value", snapshot => {
    let allTickets = [];
    let snapshotValue = snapshot.val();

    console.log(snapshotValue);

    for (let key in snapshotValue) {
      let ticket = snapshotValue[key];
      ticket.ticketId = key;
      allTickets.push(ticket);
    }
    sortByPriority(allTickets);
    console.log(allTickets);
    updateUI(allTickets);
  });
}

function displayStatus() {
  allTicketsUL.innerHTML = "";
  ticketsRef.on("value", snapshot => {
    let allTickets = [];
    let snapshotValue = snapshot.val();

    console.log(snapshotValue);

    for (let key in snapshotValue) {
      let ticket = snapshotValue[key];
      ticket.ticketId = key;
      allTickets.push(ticket);
    }
    sortByStatus(allTickets);
    console.log(allTickets);
    updateUI(allTickets);
  });
}

function displayOptions(value) {
  console.log(value);
  if (value === "Priority") {
    displayPriority();
  } else if (value === "Status") {
    displayStatus();
  } else if (value === "Date") {
    setupObservers();
  } else {
    alert("Error, your dumbass code isn't working");
  }
}

function changeStatus(val, id) {
  event.preventDefault;
  ticketsRef.on("value", snapshot => {
    snapshotVal = snapshot.val();
    // snapshotVal.filter(snap => snap.ticketId === id);
    console.log(snapshotVal);
  });
}

function updateUI(allTickets) {
  let allTicketsAttributes = allTickets.map(ticket => {
    return `
                <div class="ticket">
                    Subject: ${ticket.Subject}
                    <p>Submitted at: ${ticket.Date}</p>
                    <p>Priority: ${ticket.Priority}</p>
                    <p>Status: ${ticket.Status} 
                      <br><br>Set Status:
                      <form>
                      <select id="ticketStatus" name="Sort" form="sort-form" onclick='changeStatus(this.value, "${ticket.ticketId}")'>
                        <option value="" disabled selected>Select status...</option>
                        <option value="Unresolved">Unresolved</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                      <input type="submit" value="Submit"/>
                      </form>
                    </p>
                    <p>Email: ${ticket.Request_From}</p>
                    <p>Description: ${ticket.Description}</p>
                </div>
               `;
  });
  allTicketsUL.innerHTML = allTicketsAttributes.join("");
  console.log();
}
setupObservers();
