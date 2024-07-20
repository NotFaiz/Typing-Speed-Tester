document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const activityContent = document.getElementById('activity-content');
    const homeButtons = document.querySelectorAll('#home button');
    const textToTypeElement = document.getElementById('text-to-type');
    const userInputElement = document.getElementById('user-input');
    const resultElement = document.getElementById('result');
    const timerElement = document.getElementById('timer');
    const timeElement = document.getElementById('time');
    const mistakeCountElement = document.getElementById('mistake-count');

    const sampleTexts = {
        basic: [
            "The quick brown fox jumps over the lazy dog.",
            "Pack my box with five dozen liquor jugs.",
            "How razorback-jumping frogs can level six piqued gymnasts!"
        ],
        professional: [
            "A fast-moving car swiftly glides through the city streets.",
            "The sleek, aerodynamic design of the new sports car enhances its performance and speed.",
            "Advanced technology in automotive engineering provides a smoother driving experience."
        ],
        coding: [
            "function test() { return 'Hello World'; }",
            "const add = (a, b) => a + b; console.log(add(5, 10));",
            "let data = [1, 2, 3, 4]; data.forEach(num => console.log(num));"
        ]
    };

    let startTime, endTime, timerInterval;
    let mistakes = 0;

    function startTest(activity) {
        const texts = sampleTexts[activity];
        const sampleText = texts[Math.floor(Math.random() * texts.length)];
        userInputElement.value = '';
        userInputElement.disabled = false;
        userInputElement.focus();
        textToTypeElement.innerHTML = formatText(sampleText);
        startTime = new Date();
        timerElement.classList.remove('hidden');
        timerInterval = setInterval(updateTimer, 100);
        mistakes = 0;
        mistakeCountElement.textContent = mistakes;
        activityContent.classList.add('hidden');
    }

    function resetTest() {
        userInputElement.value = '';
        userInputElement.disabled = true;
        timerElement.classList.add('hidden');
        clearInterval(timerInterval);
        timeElement.textContent = '0.00';
        mistakeCountElement.textContent = '0';
        resultElement.textContent = '';
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
        const sampleText = textToTypeElement.innerText;
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

        if (userText === textToTypeElement.innerText.trim()) {
            clearInterval(timerInterval);
            const { timeTaken, speed } = calculateSpeed();
            resultElement.textContent = `Congratulations! Your typing speed is ${speed} words per minute. Time taken: ${timeTaken.toFixed(2)} seconds.`;
            userInputElement.disabled = true;
            resetButton.disabled = false;
        }
    }

    function loadActivity(activity) {
        activityContent.classList.remove('hidden');
        activityContent.innerHTML = `
            <h1>${activity.charAt(0).toUpperCase() + activity.slice(1)} Speed Test</h1>
            <div id="text-to-type"></div>
            <textarea id="user-input" placeholder="Start typing..."></textarea>
            <div id="result"></div>
            <div id="timer" class="hidden">
                <span>Time: <span id="time">0.00</span> seconds</span>
                <span>Mistakes: <span id="mistake-count">0</span></span>
            </div>
            <button id="back">Back to Home</button>
        `;

        document.getElementById('back').addEventListener('click', () => {
            activityContent.classList.add('hidden');
            mainContent.classList.remove('hidden');
        });

        userInputElement.addEventListener('input', checkInput);

        startTest(activity);
    }

    function loadCredits() {
        activityContent.classList.remove('hidden');
        activityContent.innerHTML = `
            <h1>Credits</h1>
            <p><strong>Source:</strong> [Link]</p>
            <p><strong>Libraries:</strong> [List of Libraries]</p>
            <p><strong>Owner:</strong> Your Name</p>
            <p><strong>Creator:</strong> Your Name</p>
            <p><strong>Coder:</strong> Your Name</p>
            <p><strong>Font:</strong> [Font Name]</p>
            <p><strong>License:</strong> [License Information]</p>
            <button id="back">Back to Home</button>
        `;

        document.getElementById('back').addEventListener('click', () => {
            activityContent.classList.add('hidden');
            mainContent.classList.remove('hidden');
        });
    }

    homeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.id;
            mainContent.classList.add('hidden');
            if (id === 'credits') {
                loadCredits();
            } else {
                loadActivity(id.replace('-', ' '));
            }
        });
    });
});
