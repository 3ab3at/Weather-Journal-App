/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=1f7491f337cfc35672d8eb12d1940464&units=imperial';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

//Function to handle the click event on the generate button
function performAction(e){
    const userZip =  document.getElementById('zip').value;
    if (isNaN(userZip)) {
        window.alert("Zip code can only contain numbers.")
    }
    else if (userZip.length != 5) {
        window.alert("Zip code has to be 5 digits.")
    }
    else {
        const userFeelings = document.getElementById('feelings').value; 
        const retrievedData = getData(baseURL + userZip + apiKey)
        .then( value => {
            postData('/all', {temp: value.main.temp, date: d, content: userFeelings})
        })
        .then(UpdateUI());
    }
}

// Async GET
const getData = async (url) => {
    const result = await fetch(url);
    try {
        const data = await result.json();
        console.log(data);
        return data;
    }
    catch(error) {
        console.log('error', error);
    }
}
// Async POST
const postData = async (url = '/all', data = {})=> {

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),       
  });
    try {
      const newData = await response.json();
      return newData;
    }
    catch(error) {
        console.log("error", error);
    }
};

//Update UI
const UpdateUI = async () => {
    const req = await fetch('/all');
    try{    
        const Data = await req.json()
        document.getElementById('temp').innerText = 'Temperature: ' + Math.round(Data.temp)+ ' degrees';
        document.getElementById('content').innerText = 'User Feelings: ' + Data.content;
        document.getElementById('date').innerText = 'Date: ' + Data.date;
    }
    catch(error) {
        console.log('error', error);
    }
}