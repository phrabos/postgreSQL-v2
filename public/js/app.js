
const h1 = document.getElementById('h1');
const ul = document.getElementById('race-ul');
const ulWrapper = document.getElementById('ul-wrapper');
const getAllRacesButton = document.getElementById('get-all');
const addRaceButton = document.getElementById('add-race');
const nameInput = document.getElementById('name');
const locationInput = document.getElementById('location');
const distanceInput = document.getElementById('distance');

const dataArr = await fetchAllRaces();

createList(dataArr, ul);

addRaceButton.addEventListener('click', async () => {
  const raceObj = {
    name: nameInput.value,
    location: locationInput.value,
    distance: parseInt(distanceInput.value)
  }
  await addRaceToList(raceObj)

  const arr = await fetchAllRaces()
  while (ul.firstChild){ul.removeChild(ul.firstChild)}
  createList(arr, ul);
  nameInput.value = '';
  locationInput.value = '';
  distanceInput.value = '';
})

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
  const parsedData = await data.json()
  return parsedData
}

async function removeRaceFromList(id) {
  const data = await fetch(`http://localhost:7997/api/v1/races/${id}`, {
    method: 'DELETE',
    headers: {"Content-type": "application/json; charset=UTF-8"},
  });
  const parsedData = await data.json()
  console.log(parsedData)
}

function createList(arr, ul) {
  arr.map((obj) => {
    const li = document.createElement('li')
    const button = document.createElement('button')
    li.textContent = `${obj.name}; Distance ${obj.distance} miles `
    button.textContent = 'delete'
    ul.append(li);
    li.append(button);
    button.addEventListener('click', async () => {
      await removeRaceFromList(obj.id)
      const arr = await fetchAllRaces()
      while (ul.firstChild) { ul.removeChild(ul.firstChild) }
      createList(arr, ul)
    })
  })
}
