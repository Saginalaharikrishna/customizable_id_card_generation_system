const cards = document.querySelectorAll('.id-card');
const formContainer = document.getElementById('formContainer');
const generateContainer = document.getElementById('generateContainer');

let currentCardType = null;
let currentCardElement = null;

cards.forEach(card => {
  card.addEventListener('click', () => {
    const type = card.dataset.type;
    currentCardType = type;
    currentCardElement = card;
    showForm(type);
  });
});

function showForm(type) {
  let formHtml = '<h3>Fill Details</h3><form id="idForm">';
  if (type === 'student-1') {
    formHtml += `
      <input name="college" placeholder="University Name" required />
      <input name="name" placeholder="Name" required />
      <input name="id" placeholder="ID" required />
      <input name="program" placeholder="Program" required />
      <input name="year" placeholder="Year" required />
      <input name="valid" placeholder="Valid Until" required />
      <input name="dob" placeholder="DOB" required />
      <input type="file" name="photo" accept="image/*" required />
    `;
  } else if (type === 'student-2') {
    formHtml += `
      <input name="school" placeholder="School Name" required />
      <input name="name" placeholder="Name" required />
      <input name="schoolId" placeholder="School ID" required />
      <input name="grade" placeholder="Grade" required />
      <input name="roll" placeholder="Roll No" required />
      <input name="dob" placeholder="DOB" required />
      <input name="blood" placeholder="Blood Group" required />
      <input type="file" name="photo" accept="image/*" required />
    `;
  } else if (type === 'employee') {
    formHtml += `
      <input name="company" placeholder="Company Name" required />
      <input name="name" placeholder="Name" required />
      <input name="position" placeholder="Position" required />
      <input name="empId" placeholder="Employee ID" required />
      <input name="department" placeholder="Department" required />
      <input name="joinDate" placeholder="Join Date" required />
      <input name="valid" placeholder="Valid Until" required />
      <input type="file" name="photo" accept="image/*" required />
    `;
  } else if (type === 'teacher') {
    formHtml += `
      <input name="school" placeholder="School Name" required />
      <input name="name" placeholder="Name" required />
      <input name="subject" placeholder="Subject" required />
      <input name="empId" placeholder="Employee ID" required />
      <input name="qualification" placeholder="Qualification" required />
      <input name="years" placeholder="Years of Service" required />
      <input name="valid" placeholder="Valid Until" required />
      <input type="file" name="photo" accept="image/*" required />
    `;
  }
  formHtml += `<button type="button" onclick="applyForm()">Apply to Card</button></form>`;
  formContainer.innerHTML = formHtml;
  formContainer.style.display = 'block';
}

function applyForm() {
  const type = currentCardType;
  const card = currentCardElement;

  const form = document.getElementById('idForm');
  const data = Object.fromEntries(new FormData(form).entries());
  const photoInput = form.querySelector('input[name="photo"]');
  const file = photoInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      updateCard(type, data, e.target.result, card);
      showGenerateButton();
    };
    reader.readAsDataURL(file);
  } else {
    updateCard(type, data, null, card);
    showGenerateButton();
  }
}

function updateCard(type, data, imgSrc, card) {
  if (type === 'student-1') {
    card.querySelector('.university-header').textContent = data.college;
    card.querySelector('.name').textContent = data.name;
    card.querySelector('.id-number').textContent = `ID: ${data.id}`;
    const details = card.querySelectorAll('.details p');
    details[0].innerHTML = `<strong>Program:</strong> ${data.program}`;
    details[1].innerHTML = `<strong>Year:</strong> ${data.year}`;
    details[2].innerHTML = `<strong>Valid Until:</strong> ${data.valid}`;
    details[3].innerHTML = `<strong>DOB:</strong> ${data.dob}`;
    if (imgSrc) card.querySelector('.photo img').src = imgSrc;

  } else if (type === 'student-2') {
    card.querySelector('.school-header span:first-child').textContent = data.school;
    card.querySelector('.school-header span:last-child').textContent = `ID: ${data.schoolId}`;
    card.querySelector('.name').textContent = data.name;
    card.querySelector('.grade').textContent = data.grade;
    const details = card.querySelectorAll('.details .detail');
    details[0].querySelector('.detail-value').textContent = data.roll;
    details[1].querySelector('.detail-value').textContent = data.dob;
    details[2].querySelector('.detail-value').textContent = data.blood;
    if (imgSrc) card.querySelector('.photo img').src = imgSrc;

  } else if (type === 'employee') {
    card.querySelector('.company').textContent = data.company;
    card.querySelector('.name').textContent = data.name;
    card.querySelector('.position').textContent = data.position;
    const details = card.querySelectorAll('.details .detail');
    details[0].textContent = `Employee ID: ${data.empId}`;
    details[1].textContent = `Department: ${data.department}`;
    details[2].textContent = `Join Date: ${data.joinDate}`;
    details[3].textContent = `Valid Until: ${data.valid}`;
    if (imgSrc) card.querySelector('.photo img').src = imgSrc;

  } else if (type === 'teacher') {
    card.querySelector('.school-seal').textContent = data.school;
    card.querySelector('.name').textContent = data.name;
    card.querySelector('.subject').textContent = data.subject;
    const details = card.querySelectorAll('.details .detail');
    details[0].querySelector('.detail-value').textContent = data.empId;
    details[1].querySelector('.detail-value').textContent = data.qualification;
    details[2].querySelector('.detail-value').textContent = data.years;
    details[3].querySelector('.detail-value').textContent = data.valid;
    if (imgSrc) card.querySelector('.photo img').src = imgSrc;
  }
}

function showGenerateButton() {
  generateContainer.innerHTML = `<button onclick="generatePNG()">Generate as PNG</button>`;
}

function generatePNG() {
  html2canvas(currentCardElement).then(canvas => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'id-card.png';
    link.click();
  });
}
