let data = JSON.parse(localStorage.getItem('users'));
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
  tableBody.innerHTML = ''
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
  document.getElementById('profile-edit').addEventListener('click', () => { editProfile(id) })
  document.getElementById('profile-delete').addEventListener('click', () => { deleteProfile(id) })
  return;
};
//Edit Profile
const editProfile = (id) => {
  viewManager(false, false, false, true);
  const { firstName, lastName, email, point, phone, company } = data[id];
  const FN = document.getElementById('edit-first-name');
  const LN = document.getElementById('edit-last-name');
  const EM = document.getElementById('edit-email');
  const PON = document.getElementById('edit-point');
  const PHO = document.getElementById('edit-phone');
  const COM = document.getElementById('edit-company');
  FN.value = firstName;
  LN.value = lastName;
  EM.value = email;
  PON.value = point;
  PHO.value = phone;
  COM.value = company;
  document.getElementById('add-changes').addEventListener('click', () => {
    const editedUser = {
      id,
      firstName : FN.value,
      lastName : LN.value,
      email: EM.value,
      point: PON.value,
      phone: PHO.value,
      company: COM.value,
    };
    data[id] = editedUser;
    localStorage.setItem('users', data);
    viewManager(true, false, false, false);
    console.log(data[id]);
  });
  return;
};
//delete profile
const deleteProfile = (id) => {
  viewManager(true, false, false, false);
  console.log(data.splice(id, 1));
  let newId = 0;
  data.map(d => {
    d["id"] = newId;
    newId++;
  })
  localStorage.setItem('users', JSON.stringify(data));
  loadDataToTable(data);
  return;
};

//load create user page
document.getElementById('create-user-btn').addEventListener('click', () => {
  viewManager(false, true, false, false);
});

//create a new user
document.getElementById('create-user').addEventListener('click', () => {
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const email = document.getElementById('email').value;
  const point = document.getElementById('point').value;
  const phone = document.getElementById('phone').value;
  const company = document.getElementById('company').value;
  const id = data.length;
  const newUser = { id, firstName, lastName, email, point, phone, company };
  data.push(newUser);
  localStorage.setItem('users', JSON.stringify(data));
  loadDataToTable(data);
});

loadDataToTable(data);