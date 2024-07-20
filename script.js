document.addEventListener('DOMContentLoaded', () => {
    const textToTypeElement = document.getElementById('text-to-type');
    const userInputElement = document.getElementById('user-input');
    const startButton = document.getElementById('start-button');
    const resetButton = document.getElementById('reset-button');
    const resultElement = document.getElementById('result');
    const timerElement = document.getElementById('timer');
    const timeElement = document.getElementById('time');
    const mistakeCountElement = document.getElementById('mistake-count');

    const sampleText = "The quick brown fox jumps over the lazy dog. A fast-moving car swiftly glides through the city streets.";

    let startTime, endTime, timerInterval;
    let mistakes = 0;

    function startTest() {
        userInputElement.value = '';
        userInputElement.disabled = false;
        userInputElement.focus();
        startButton.disabled = true;
        resetButton.disabled = false;
        textToTypeElement.innerHTML = formatText(sampleText);
        startTime = new Date();
        timerElement.classList.remove('hidden');
        timerInterval = setInterval(updateTimer, 100);
        mistakes = 0;
        mistakeCountElement.textContent = mistakes;
    }

    function resetTest() {
        userInputElement.value = '';
        userInputElement.disabled = true;
        startButton.disabled = false;
        resetButton.disabled = true;
        textToTypeElement.innerHTML = 'Click the button below to start typing!';
        resultElement.textContent = '';
        timerElement.classList.add('hidden');
        clearInterval(timerInterval);
        timeElement.textContent = '0.00';
        mistakeCountElement.textContent = '0';
    }

    function formatText(text) {
        return text.split(' ').map(word => `<span class="word">${word}</span>`).join(' ');
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

    function updateTextHighlight() {
        const userText = userInputElement.value;
        const words = sampleText.split(' ');
        let typedWords = userText.split(' ');
        const textElements = Array.from(textToTypeElement.querySelectorAll('.word'));
        
        textElements.forEach((element, index) => {
            const expectedWord = words[index] || '';
            const typedWord = typedWords[index] || '';
            
            if (typedWord === expectedWord) {
                element.classList.remove('unfinished');
            } else if (typedWord.length > 0) {
                element.classList.add('unfinished');
            } else {
                element.classList.remove('unfinished');
            }
        });

        if (typedWords.length > words.length) {
            mistakes += typedWords.length - words.length;
            mistakeCountElement.textContent = mistakes;
        }
    }

    function checkInput() {
        const userText = userInputElement.value.trim();
        updateTextHighlight();

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
