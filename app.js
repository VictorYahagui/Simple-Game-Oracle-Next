let numberHasSelected = [];
const maxNumber = 100
let attemptCount = 1;
let generatedNumber = generateNewRandomNumber();

initialText();

function showNewTextOnScreen(tag, text) {
    document.querySelector(tag).innerHTML = text
    responsiveVoice.speak(text, 'UK English Female', { rate: 1.1 });
}

function initialText() {
    showNewTextOnScreen('h1', 'Secret Game');
    showNewTextOnScreen('p', `Choose a number between 1 and ${maxNumber}`);
}

function generateNewRandomNumber() {
    let number = Math.floor(Math.random() * maxNumber) + 1;
    console.log('====================================');
    console.log(`Generating new random number ${number}`);
    console.log('====================================');
    if (numberHasSelected.length === maxNumber) {
        numberHasSelected = []
    }
    if (numberHasSelected.includes(number)) {
        return generateNewRandomNumber();
    } else {
        numberHasSelected = [...numberHasSelected, number]
        console.log('====================================');
        console.log(numberHasSelected);
        console.log('====================================');
        return number;
    }


}

function verifyGuess() {
    const guess = parseInt(document.querySelector('input').value);
    if (guess === generatedNumber) {
        const word = attemptCount > 1 ? 'Attempts' : 'Attempt';
        showNewTextOnScreen('h1', 'Congratulations!!!');
        showNewTextOnScreen('p', `Right answer!!! ${word}: ${attemptCount}`);
        document.getElementById('rematch').removeAttribute('disabled')

    } else {
        if (guess > generatedNumber) {
            showNewTextOnScreen('p', 'The number is smaller');
        } else {
            showNewTextOnScreen('p', 'The number is higher');

        }
        attemptCount++;
    }
    clearField();
}

function clearField() {
    document.querySelector('input').value = '';
}

function rematch() {
    generatedNumber = generateNewRandomNumber();
    clearField();
    attemptCount = 1;
    document.getElementById('rematch').setAttribute('disabled', 'true');
    initialText();
}