const btnRunTests = document.querySelector('#btn-run-tests');
const spinnerRunTests = document.querySelector('#spinner-run-tests');
const terminal = document.querySelector('#terminal');
let runningTests = false;

function createTerminalLine(testPassed, testNum, testDuration) {
    const p = document.createElement('p');
    p.classList.add('terminal__line');
    
    if (testPassed) {
        const textFgRed = document.createElement('span');
        textFgRed.classList.add('terminal__text', 'terminal__text--fg-green');
        textFgRed.innerText = '✓\u00A0';
        
        const textFgBlackBgRed = document.createElement('span');
        textFgBlackBgRed.classList.add('terminal__text', 'terminal__text--fg-black-bg-green');
        textFgBlackBgRed.innerText = '\u00A0PASS\u00A0';

        p.appendChild(textFgRed);
        p.appendChild(textFgBlackBgRed);
    } else {
        const textFgRed = document.createElement('span');
        textFgRed.classList.add('terminal__text', 'terminal__text--fg-red');
        textFgRed.innerText = '✖\u00A0';
        
        const textFgBlackBgRed = document.createElement('span');
        textFgBlackBgRed.classList.add('terminal__text', 'terminal__text--fg-black-bg-red');
        textFgBlackBgRed.innerText = '\u00A0FAIL\u00A0';

        p.appendChild(textFgRed);
        p.appendChild(textFgBlackBgRed);
    }
    
    p.appendChild(document.createTextNode(`\u00A0Test ${testNum} (${testDuration} ms)`));
    return p;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function randBool() {
    return Math.random() < 0.5;
}

btnRunTests.addEventListener('click', async () => {
    if (!runningTests) {
        terminal.textContent = '';
        runningTests = true;
        btnRunTests.disabled = runningTests;
        spinnerRunTests.style.removeProperty('display');
    }
    
    for (let testNum = 1; testNum <= 10; testNum++) {
        const testDuration = Math.floor(Math.random() * 1001); // 0 a 1000
        const pass = randBool();
        const runningTestTxt = document.createTextNode(`\u00A0\u00A0Running Test ${testNum}`);
        terminal.appendChild(runningTestTxt);
        await sleep(testDuration);
        terminal.removeChild(runningTestTxt);
        terminal.appendChild(createTerminalLine(pass, testNum, testDuration));
    }

    const finishText = document.createTextNode('All tests have been run.');
    terminal.appendChild(finishText);

    runningTests = false;
    btnRunTests.disabled = runningTests;
    spinnerRunTests.style.display = 'none';
});

