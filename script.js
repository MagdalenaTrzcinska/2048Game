let tab = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const el = document.querySelectorAll('td div');
const spanScore = document.querySelector('.score-span');
const spanBest = document.querySelector('.best-span');
let score = 0;


let bestScore = localStorage.getItem("best");
spanBest.innerHTML = bestScore;

function start() {
    for (let i = 0; i < 2; i++) {
        let los = Math.floor(Math.random() * 16);

        if (tab[los] === 0) {
            tab[los] = 2;
        } else {
            los = Math.floor(Math.random() * 16);
            tab[los] = 2;
        }

        render();
    }
}

function render() {
    el.forEach(x => {
        x.innerHTML = '';
        x.className = '';
    });
    for (let i = 0; i < tab.length; i++) {
        if (tab[i]) {
            el[i].innerHTML = tab[i];
            el[i].classList.add('card');
            el[i].classList.add(`_${tab[i]}`);
        }

    }
    ifWill();
    ifFall();
}


window.addEventListener("keyup", (e) => {
    if (e.keyCode === 39) {
        keyup37or39(e.keyCode);
    }
    if (e.keyCode === 37) {
        keyup37or39(e.keyCode);
    }
    if (e.keyCode === 38) {
        keyup38or40(e.keyCode);
    }
    if (e.keyCode === 40) {
        keyup38or40(e.keyCode);
    }

});

function keyup38or40(e) {
    for (let i = 0; i < 4; i++) {
        let column = [tab[i], tab[i + 4], tab[i + 8], tab[i + 12]];
        let filteredRow = column.filter(num => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow;

        if (e === 38) {
            newRow = filteredRow.concat(zeros);
        }
        if (e === 40) {
            newRow = zeros.concat(filteredRow);
        }

        tab[i] = newRow[0];
        tab[i + 4] = newRow[1];
        tab[i + 8] = newRow[2];
        tab[i + 12] = newRow[3];
    }

    if (e === 38) {
        combineColumn();
    }
    if (e === 40) {
        combineColumn2();
    }
}


function keyup37or39(e) {
    for (let i = 0; i < 16; i++) {
        if (i % 4 === 0) {
            let row = [tab[i], tab[i + 1], tab[i + 2], tab[i + 3]];

            let filteredRow = row.filter(num => num);
            let missing = 4 - filteredRow.length;
            let zeros = Array(missing).fill(0);
            let newRow;

            if (e === 37) {
                newRow = filteredRow.concat(zeros);
            }

            if (e === 39) {
                newRow = zeros.concat(filteredRow);
            }

            tab[i] = newRow[0];
            tab[i + 1] = newRow[1];
            tab[i + 2] = newRow[2];
            tab[i + 3] = newRow[3];
        }
    }

    if (e === 37) {
        combineRow(37);
    }
    if (e === 39) {
        combineRow(39);
    }
}

function dodawanie() {
    let los = Math.floor(Math.random() * 16);
    if (tab[los] === 0) {
        tab[los] = 2;
    } else {
        dodawanie();
    }
}


function combineRow(e) {
    for (let i = 0; i < 15; i++) {
        if (tab[i] === tab[i + 1]) {
            let combinedTotal = tab[i] + tab[i + 1];

            if(e === 37) {
                tab[i] = combinedTotal;
                tab[i + 1] = 0;
            }

            if(e === 39) {
                tab[i] = 0;
                tab[i + 1] = combinedTotal;
            }

            score += combinedTotal;
            spanScore.innerHTML = score;

            if(bestScore < score) {
                spanBest.innerHTML = score;
                localStorage.setItem("best", score);
            }
        }

    }
    dodawanie();
    render();
}


function combineColumn() {
    for (let i = 0; i < 12; i++) {
        if (tab[i] === tab[i + 4]) {
            let combinedTotal = tab[i] + tab[i + 4];
            tab[i] = combinedTotal;
            tab[i + 4] = 0;
            score += combinedTotal;
            spanScore.innerHTML = score;

            if(bestScore < score) {
                spanBest.innerHTML = score;
                localStorage.setItem("best", score);
            }
        }

    }
    dodawanie();
    render();
}

function combineColumn2() {
    for (let i = 0; i < 12; i++) {
        if (tab[i] === tab[i + 4]) {
            let combinedTotal = tab[i] + tab[i + 4];
            tab[i] = 0;
            tab[i + 4] = combinedTotal;
            score += combinedTotal;
            spanScore.innerHTML = score;

            if(bestScore < score) {
                spanBest.innerHTML = score;
                localStorage.setItem("best", score);
            }
        }

    }
    dodawanie();
    render();
}

function ifWill() {
    for (let i = 0; i < 15; i++) {
        if (tab[i] === 2048) {
            alert("Wygrałeś");
        }
    }
}


function ifFall() {
    let a = [];
    for (let i = 0; i < 15; i++) {
        if (i === 3 || i === 7 || i === 11 || i === 15) {
            a.push(tab[i] !== tab[i - 1] && tab[i] !== 0 && tab[i - 1] !== 0);
            a.push(tab[i - 2] !== tab[i - 1] && tab[i - 2] !== 0 && tab[i - 1] !== 0);
            a.push(tab[i - 2] !== tab[i - 3] && tab[i - 2] !== 0 && tab[i - 3] !== 0);
        }
    }

    const all = a.every(el => {
        return el === true;
    });
    if (all) {
        alert("Przegrałeś");
    }
}


start();

