

let expression = "";
let justCalculated = false;
let brainrot = 0;

const display = document.getElementById("display");
const calculator = document.getElementById("calculator");

const comments = [
    "🗿 ABSOLUTE SIGMA!",
    "💀 BRO IS COOKING!",
    "🍌 BANANA CALCULATIONS!",
    "🤡 WHAT IS THIS MATH?!",
    "🔥 THAT'S CRAZY BRO!",
    "💀 SKIBIDI MATHEMATICS!",
    "🗿 RIZZ LEVEL: MAX!",
    "🐸 FROG APPROVED!",
    "💯 CERTIFIED GENIUS!",
    "🚨 MATH POLICE ARE COMING!"
];

const memes = [
    ["🗿", "YOU ARE THE SIGMA"],
    ["💀", "BRO JUST COOKED"],
    ["🤡", "WHAT DID I JUST WITNESS"],
    ["🍌", "BANANA MATHEMATICS"],
    ["🔥", "ABSOLUTE CINEMA"],
    ["🐸", "FROG APPROVES"],
    ["🚨", "MATHEMATICAL EMERGENCY"]
];

function update() {
    display.value = expression || "0";
}

function add(value) {

    if (justCalculated && /[0-9.]/.test(value)) {
        expression = "";
    }

    justCalculated = false;

    if (expression.length >= 18) return;

    if (/[+\-*/.]$/.test(expression) && /[+\-*/.]/.test(value)) {
        expression = expression.slice(0, -1);
    }

    expression += value;

    update();

    document.getElementById("comment").textContent =
        "🧠 PROCESSING SIGMA NUMBERS...";

    brainrot = Math.min(100, brainrot + 2);
    updateBrainrot();
}

function clearDisplay() {

    expression = "";
    justCalculated = false;

    update();

    document.getElementById("comment").textContent =
        "🧹 BRAIN RESET COMPLETE";

}

function del() {

    expression = expression.slice(0, -1);
    update();

}

function calculate() {

    if (!expression) return;

    try {

        if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
            throw new Error();
        }

        let result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error();
        }

        let oldExpression = expression;

        expression = String(Number(result.toFixed(10)));

        update();

        justCalculated = true;

        brainrot = Math.min(100, brainrot + 15);
        updateBrainrot();

        const randomComment =
            comments[Math.floor(Math.random() * comments.length)];

        document.getElementById("comment").textContent =
            randomComment;

        addHistory(oldExpression + " = " + expression);

        shake();

        if (brainrot >= 100) {
            showMeme();
            brainrot = 0;
            updateBrainrot();
        }

    } catch {

        document.getElementById("comment").textContent =
            "💀 ERROR 404: BRAIN NOT FOUND";

        showMeme();

        shake();

    }

}

function updateBrainrot() {

    document.getElementById("level").textContent = brainrot;

    document.getElementById("progress").style.width =
        brainrot + "%";

}

function addHistory(text) {

    const history = document.getElementById("history");

    if (history.textContent.includes("История пока пуста")) {
        history.innerHTML = "";
    }

    const item = document.createElement("div");

    item.className = "history-item";
    item.textContent = "🗿 " + text;

    history.prepend(item);

    while (history.children.length > 8) {
        history.lastElementChild.remove();
    }

}

function shake() {

    calculator.classList.remove("shake");

    void calculator.offsetWidth;

    calculator.classList.add("shake");

}

function showMeme() {

    const random =
        memes[Math.floor(Math.random() * memes.length)];

    document.getElementById("memeEmoji").textContent = random[0];
    document.getElementById("memeText").textContent = random[1];

    document.getElementById("bigMeme").style.display = "flex";

}

function closeMeme() {

    document.getElementById("bigMeme").style.display = "none";

}

document.addEventListener("keydown", function(e) {

    if (/^[0-9.]$/.test(e.key)) add(e.key);

    else if (["+", "-", "*", "/"].includes(e.key)) add(e.key);

    else if (e.key === "Enter") calculate();

    else if (e.key === "Backspace") del();

    else if (e.key === "Escape") clearDisplay();

});

