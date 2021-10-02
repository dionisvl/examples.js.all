//https://learn.javascript.ru/async-await
// const delay = ms => new Promise(yea => setTimeout(yea, ms));
// delay(1000).then(() => console.log('waited 1000 secs'))

// difference-between-promise-and-async-await
// https://www.geeksforgeeks.org/difference-between-promise-and-async-await-in-node-js/
function setHorses(count) {
    const hippodrome = document.getElementById('hippodrome');
    hippodrome.innerHTML = '';
    for (let i = 0; i < count; i++) {
        let horse = document.createElement('div');
        horse.className = 'fas fa-horse';
        horse.classList.add("mystyle");
        horse.setAttribute('id', 'horse' + i);
        horse.innerHTML = ' ' + horse.getAttribute('id');
        hippodrome.appendChild(horse);
    }
}

function startHorsesPromisesAsync(count) {
    for (let i = 0; i < count; i++) {
        new Promise(function (resolve) {
            let ar = [];
            ar['currHorseId'] = i;
            ar['currHorseTime'] = getTime(1, 10000);
            console.log(ar['currHorseId'] + ' - ' + ar['currHorseTime']);
            setTimeout(function () {
                resolve(ar);
            }, ar['currHorseTime'])
        }).then(function (result) {
            let id = 'horse' + result['currHorseId'];
            let time = (result['currHorseTime'] / 1000).toFixed(1)
            document.getElementById(id).innerHTML += " - ran for " + time + " sec.";
        });
    }
}

async function startHorsesSync(count) {
    // JS arrow functions https://learn.javascript.ru/arrow-functions
    const horseRun = ms => new Promise(yea => setTimeout(yea, ms));
    for (let i = 0; i < count; i++) {
        let currHorseTime = getTime(1, 4000);
        console.log(i + ' - ' + currHorseTime);
        await horseRun(currHorseTime).then(() => {
            let id = 'horse' + i;
            let time = (currHorseTime / 1000).toFixed(1);
            document.getElementById(id).innerHTML += " - ran for " + time + " sec.";
        });
    }
}

function getTime(min, max) {
    return Math.random() * (max - min) + min;
}

const start = document.getElementById('start');
start.onclick = function () {
    const count = document.getElementById('count').value;

    setHorses(count);

    if (document.getElementById('promisesAsync').checked) {
        startHorsesPromisesAsync(count);
    } else if (document.getElementById('sync').checked) {
        startHorsesSync(count);
    }
};





const promise = new Promise(function (resolve, reject) {
    const string1 = "geeksforgeeks";
    const string2 = "geeksforgeeks";
    if (string1 === string2) {
        resolve();
    } else {
        reject();
    }
});

promise
    .then(function () {
        console.log("Promise resolved successfully");
    })
    .catch(function () {
        console.log("Promise is rejected");
    });


const helperPromise = function () {
    const promise = new Promise(function (resolve, reject) {
        const x = "geeksforgeeks";
        const y = "geeksforgeeks";
        if (x === y) {
            resolve("Strings are same");
        } else {
            reject("Strings are not same");
        }
    });

    return promise;
};

async function demoPromise() {
    try {
        let message = await helperPromise();
        console.log(message);
    } catch (error) {
        console.log("Error: " + error);
    }
}

demoPromise();