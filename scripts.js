document.addEventListener('DOMContentLoaded', () => {
    const textToTypeElement = document.getElementById('text-to-type');
    const userInputElement = document.getElementById('user-input');
    const startButton = document.getElementById('start-button');
    const resetButton = document.getElementById('reset-button');
    const resultElement = document.getElementById('result');
    const timerElement = document.getElementById('timer');
    const timeElement = document.getElementById('time');

    let startTime, endTime, timerInterval;

    const sampleText = "The quick brown fox jumps over the lazy dog.";

    function startTest() {
        userInputElement.value = '';
        userInputElement.disabled = false;
        userInputElement.focus();
        startButton.disabled = true;
        resetButton.disabled = false;
        textToTypeElement.textContent = sampleText;
        startTime = new Date();
        timerElement.classList.remove('hidden');
        timerInterval = setInterval(updateTimer, 100);
    }

    function resetTest() {
        userInputElement.value = '';
        userInputElement.disabled = true;
        startButton.disabled = false;
        resetButton.disabled = true;
        textToTypeElement.textContent = 'Click the button below to start typing!';
        resultElement.textContent = '';
        timerElement.classList.add('hidden');
        clearInterval(timerInterval);
        timeElement.textContent = '0';
    }

    function updateTimer() {
        const elapsedTime = ((new Date() - startTime) / 1000).toFixed(2);
        timeElement.textContent = elapsedTime;
    }

    function calculateSpeed() {
        endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000; // in seconds
        const wordsTyped = userInputElement.value.trim().split(/\s+/).length;
        const speed = Math.round(wordsTyped / (timeTaken / 60));
        return { timeTaken, speed };
    }

    function checkInput() {
        const userText = userInputElement.value.trim();
        if (userText === sampleText) {
            clearInterval(timerInterval);
            const { timeTaken, speed } = calculateSpeed();
            resultElement.textContent = `Congratulations! Your typing speed is ${speed} words per minute. Time taken: ${timeTaken.toFixed(2)} seconds.`;
            userInputElement.disabled = true;
            startButton.disabled = false;
            resetButton.disabled = false;
        }
    }

    startButton.addEventListener('click', startTest);
    resetButton.addEventListener('click', resetTest);
    userInputElement.addEventListener('input', checkInput);
});

