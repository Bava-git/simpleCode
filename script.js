const Myarr = JSON.parse(localStorage.getItem("calcy")) || [];
const InputBox = document.getElementById('js-InputBox');
const historyDiv = document.getElementById('js-historyDiv');
let isVisible = true;

const showHistory = () => {
    if (isVisible) {
        historyDiv.style.display = 'block';
        isVisible = false;
        History();
    } else {
        historyDiv.style.display = 'none';
        isVisible = true;
    }
}

function History() {
    if (Myarr.length === 0) {
        historyDiv.innerHTML = '<p>No history available</p>';
    } else {
        let html = '';
        Myarr.forEach(element => {
            html += `<p class="css-historyText">${element}</p>`;
        });
        historyDiv.innerHTML = html;
    }
}

function DisplayElement(value) {
    InputBox.value += value;
}

function Calcution() {

    let input = InputBox.value.trim();
    if (/^[0-9+\-*/(). ]+$/.test(input)) {
        try {
            let result = math.evaluate(input);
            InputBox.value = result;
            if (input != result) {
                Myarr.push(`${input} = ${result}`);
                localStorage.setItem("calcy", JSON.stringify(Myarr));
                History();
            }
        } catch (error) {
            console.error(error);
            alert("Invalid input! Please check your expression.");
        }
    } else {
        alert("Invalid characters in input! Only numbers and math symbols are allowed.");
    }
}

function Clear() {
    InputBox.value = '';
}

function Backspace() {
    InputBox.value = InputBox.value.slice(0, -1);
}

document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (/^[0-9+\-*/(). ]+$/.test(event.key)) {
        InputBox.value += event.key;
    }

    if (event.key === 'Enter') {
        Calcution();
    } else if (event.key === 'Delete') {
        Clear();
    } else if (event.key === "Backspace") {
        Backspace();
    }
});

function Reset() {
    localStorage.removeItem("calcy");
    Myarr.length = 0;
    Clear();
    History();
}