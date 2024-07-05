const noOfWordInp = document.querySelector(".que-cnt input");
const noOfWordSubmit = document.querySelector(".que-cnt button");
const txtCnt = document.querySelector('.txt-cnt');
const textInp = document.querySelector(".inp");
let spans;
let noOfWord = 100;
let startIndex = 0;
let index = 0;
let time = 60;
let isTimerExpired = false;
let intervalId;
let arrWord = [];


noOfWordSubmit.onclick = () => {
    if (!noOfWordInp.value) return;
    noOfWord = parseInt(noOfWordInp.value);
    console.log(noOfWord)
}



// Calling Important functions
randomText();







// Important functions
function randomText() {
    fetch(`https://random-word-api.herokuapp.com/word?number=${noOfWord}`)
        .then(raw => raw.json())
        .then(result => {
            arrWord = [];
            result.forEach(e => {
                arrWord.push(e);
            });
            spanCreator();
            checker();
        })
}


function spanCreator() {
    txtCnt.innerHTML = '';

    for (let i = startIndex; i < Math.min(startIndex + 6, arrWord.length); i++) {
        let span = document.createElement("span");
        span.textContent = arrWord[i];
        txtCnt.appendChild(span);
    }

    startIndex += 6;

    if (startIndex >= arrWord.length) {
        startIndex = 0;
    }
}


function checker() {
    spans = document.querySelectorAll(".txt-cnt span");
    inp.onkeyup = (event) => {
        if (event.keyCode === 32) {
            if (spans[index].textContent.trim() === inp.value.trim()) {
                spans[index].style.color = 'green';
                spans[index].style.backgroundColor = 'transparent';
                index++;
                if (index < spans.length) {
                    spans[index].style.backgroundColor = '#111';
                } else {
                    spanCreator();
                    checker();
                    index = 0;
                }
            } else {
                spans[index].style.color = 'rgba(255, 0, 0, 0.5)';
                spans[index].style.backgroundColor = 'transparent';
                index++;
                if (index < spans.length) {
                    spans[index].style.backgroundColor = '#111';
                } else {
                    spanCreator();
                    checker();
                    index = 0;
                }
            }
            inp.value = '';
        }
    }
}

inp.oninput = () => {
    let currentWord = spans[index].textContent;
    let inputText = inp.value.trim();

    inputText = inputText.slice(0, currentWord.length);

    let allLettersMatch = true;

    for (let i = 0; i < inputText.length; i++) {

        if (currentWord[i] !== inputText[i]) {
            spans[index].style.backgroundColor = "red";
            allLettersMatch = false;
            break;
        } else {
            spans[index].style.backgroundColor = "#111";
        }
    }

    if (!intervalId) {
        intervalId = setInterval(() => {
            if (time > 0) {
                time--;
                timer.textContent = "0:" + (time < 10 ? "0" + time : time);
            } else {
                clearInterval(intervalId);
                timer.textContent = "0:00";
                isTimerExpired = true;
                console.log("done");
                inp.disabled = true;
            }
        }, 1000);
    }
};

inp.onkeydown = (event) => {
    if (event.keyCode === 8) {
        spans[index].style.backgroundColor = "#111";
    }
};




// inp.oninput = () => {


// };

inp.onkeydown = () => {

    if (isTimerExpired) {
        clearInterval(intervalId);
        time = 60;
        isTimerExpired = false;
        intervalId = null;
        console.log("Timer reset.");
    }
};