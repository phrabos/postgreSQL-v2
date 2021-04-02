
const h1 = document.getElementById('h1');
const ul = document.getElementById('race-ul');
const getAllRacesButton = document.getElementById('get-all');
const addRaceButton = document.getElementById('add-race');
const nameInput = document.getElementById('name');
const locationInput = document.getElementById('location');
const distanceInput = document.getElementById('distance');

let raceObj = {
  name: nameInput.textContent,
  location: locationInput.textContent,
  distance: distanceInput.textContent,
}

async function fetchAllRaces() {
  const data = await fetch('http://localhost:7997/api/v1/races');
  const parsedData = await data.json();
  return parsedData
}

async function addRaceToList(obj) {
  const data = await fetch('http://localhost:7997/api/v1/races', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {"Content-type": "application/json; charset=UTF-8"},
  });
  const parsedData = await data.json();
  console.log(parsedData);
  return parsedData
}


h1.addEventListener('click', () => {
  alert('clicked!!!!')
})

getAllRacesButton.addEventListener('click', async () => {

  const dataArr = await fetchAllRaces()
  console.log(dataArr)
  dataArr.map(obj => {
    const li = document.createElement('li')
    li.textContent = `${obj.name}; Distance ${obj.distance} miles `
    ul.append(li)
  })
})

addRaceButton.addEventListener('click', async () => {
  alert('clicked!!!!')
  const data = await addRaceToList(raceObj)
  console.log(data)
})