console.log('connected')

const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

getAllBtn.addEventListener('click', getAllChars);

for(let i = 0; i < charBtns.length; i++){
  charBtns[i].addEventListener('click', getCharacter)
}

ageForm.addEventListener('submit', getOldCharacters);

createForm.addEventListener('submit', createNewCharacter);

const baseURL = 'http://localhost:4000'; 

function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}

function getAllChars(){
  clearCharacters();
  axios.get(`${baseURL}/characters`)
   .then(res => {
    res.data.map((char) => {
      createCharacterCard(char);
    })
   }).catch(error => {
    console.log(error);
   });
}

function getCharacter(e){
  clearCharacters();
  axios.get(`${baseURL}/character/${e.target.id}`)
  .then(res => {
    //console.log(res.data);
    createCharacterCard(res.data);
  }).catch(error => {
    console.log(error);
  });
}

function getOldCharacters(e){
  e.preventDefault();
  let age = e.target.querySelector('#age-input').value;
  e.target.querySelector('#age-input').value = '';

  clearCharacters();
  axios.get(`${baseURL}/character?age=${age}`)
  .then(res => {
    res.data.map(char => {
      createCharacterCard(char);
    })
  }).catch(error => {
    console.log(error);
  })
}

function createNewCharacter(e){
  e.preventDefault();
  clearCharacters();

  let newLikes = [...newLikesText.value.split(',')];
  let character = {
    firstName: newFirstInput.value,
    lastName: newLastInput.value,
    gender: newGenderDropDown.value,
    age: newAgeInput.value,
    likes: newLikes
  };

  axios.post(`${baseURL}/character`, character)
  .then(res => {
    res.data.map(char => {
      createCharacterCard(char);
    })
  }).catch(error => {
    console.log(error)
  });

  newFirstInput.value='';
  newLastInput.value='',
  newGenderDropDown.value='';
  newAgeInput.value='';
  newLikesText.value='';
}