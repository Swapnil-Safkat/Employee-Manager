const data = JSON.parse(localStorage.getItem('users'));
const userSection = document.getElementById("user-table");
const createUserSection = document.getElementById("user-create");
const profileSection = document.getElementById("user-profile");
const editSection = document.getElementById("user-edit");

//manage view
const viewManager = (users, create, profile, edit) => {
  if (users) userSection.classList.replace("hidden", "block");
  else userSection.classList.replace("block", "hidden");
  if (create) createUserSection.classList.replace("hidden", "block");
  else createUserSection.classList.replace("block", "hidden");
  if (profile) profileSection.classList.replace("hidden", "block");
  else profileSection.classList.replace("block", "hidden");
  if (edit) editSection.classList.replace("hidden", "block");
  else editSection.classList.replace("block", "hidden");
  return;
};


const loadDataToTable = users => {
  users = users || null;
  if (users === null) {
    document.getElementById("no-data").innerText = `No data found`;
    return;
  }
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML=''
  users.map(user => {
    const { id, firstName, lastName, email, point, phone, company } = user;
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <th>${id + 1}</th>
    <td>${firstName} ${lastName}</td>
    <td>${email}</td>
    <td>${point}</td>
    <td>${phone}</td>
    <td>${company}</td>
    <td><button onclick="showProfile(${id})" class="btn btn-xs btn-neural font-semibold">Profile</button></td>
    <td><button onclick="editProfile(${id})" class="btn btn-xs btn-secondary font-semibold">Edit</button></td>
    <td><button onclick="deleteProfile(${id})" class="btn btn-xs btn-accent font-semibold">Delete</button></td>
    `;
    tableBody.appendChild(tr)
  })
  viewManager(true, false, false, false);
  return;
};

//search user
document.getElementById('title').addEventListener('click', () => { loadDataToTable(data) })
document.querySelector('#search-box').addEventListener('change', (event) => {
  const searchBy = event.target.value;
  if (searchBy === '') {
    console.log('here');
    document.getElementById('all-users-title').innerText = `All Users`
    loadDataToTable(data);
    return;
  }
  document.getElementById('all-users-title').innerText = `Searched by '${searchBy}'`
  console.log(searchBy);
  loadDataToTable(data.filter(user => (user.firstName.includes(searchBy) || user.lastName.includes(searchBy))));
  return;
});

//show user profile
const showProfile = (id) => {
  viewManager(false, false, true, false);
  document.getElementById('profile-name').innerText = `${data[id].firstName} ${data[id].lastName}`;
  document.getElementById('profile-email').innerText = `${data[id].email}`;
  document.getElementById('profile-phone').innerText = `${data[id].phone}`;
  document.getElementById('profile-company').innerText = `Works at ${data[id].company}`;
  document.getElementById('profile-point').innerText = `User point: ${data[id].point}`;
  document.getElementById('profile-edit').addEventListener('click', () => { editProfile(id) }
  )
  return;
};

const editProfile = (id) => {
  console.log(id);
  viewManager(false, false, false, true);
  return;
};
const createUserBtn = document.getElementById('create-user-btn');
createUserBtn.addEventListener('click', () => {
  viewManager(false, true, false, false);
});
loadDataToTable(data);