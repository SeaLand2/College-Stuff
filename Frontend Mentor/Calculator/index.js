const removeBtn = document.getElementById('remove-btn');
const submitBtn = document.getElementById('butmit-btn');
const resetBtn = document.getElementById('reset-btn');
const screen = document.getElementById('screen');
const themeSwitcher = document.getElementById('theme-switch-bg');

let theme = localStorage.getItem('theme');
let screenContent = '';

const ToggleTheme = () => {
    let docstyle = document.documentElement.style;

    if (theme == 0) {
        docstyle.setProperty('--background', 'hsl(222, 26%, 31%)');
        docstyle.setProperty('--text-top', 'hsl(0, 0%, 100%)');
        docstyle.setProperty('--text-key', 'hsl(221, 14%, 31%)');
        docstyle.setProperty('--text-remove', 'hsl(0, 0%, 100%)');
        docstyle.setProperty('--text-submit', 'hsl(0, 0%, 100%)');
        docstyle.setProperty('--content-background', 'hsl(223, 31%, 20%)');
        docstyle.setProperty('--screen-background', 'hsl(224, 36%, 15%)');
        docstyle.setProperty('--keys', 'hsl(30, 25%, 89%)');
        docstyle.setProperty('--keys-shadow', 'hsl(28, 16%, 65%)');
        docstyle.setProperty('--keys-toggle', 'hsl(0, 0%, 100%)');
        docstyle.setProperty('--submit', 'hsl(6, 63%, 50%)');
        docstyle.setProperty('--submit-shadow', 'hsl(6, 70%, 34%)');
        docstyle.setProperty('--submit-toggle', 'hsl(6, 93%, 67%)');
        docstyle.setProperty('--remove', 'hsl(225, 21%, 49%)');
        docstyle.setProperty('--remove-shadow', 'hsl(224, 28%, 35%)');
        docstyle.setProperty('--remove-toggle', 'hsl(229, 100%, 82%)');

        localStorage.setItem("theme", theme);
        themeSwitcher.style.justifyContent = 'flex-start';
    } else if (theme == 1) {
        docstyle.setProperty('--background', 'hsl(0, 0%, 90%)');
        docstyle.setProperty('--text-top', 'hsl(60, 10%, 19%)');
        docstyle.setProperty('--text-key', 'hsl(60, 10%, 19%)');
        docstyle.setProperty('--text-remove', 'hsl(0, 0%, 100%)');
        docstyle.setProperty('--text-submit', 'hsl(0, 0%, 100%)');
        docstyle.setProperty('--content-background', 'hsl(0, 5%, 81%)');
        docstyle.setProperty('--screen-background', 'hsl(0, 0%, 93%)');
        docstyle.setProperty('--keys', 'hsl(45, 7%, 89%)');
        docstyle.setProperty('--keys-shadow', 'hsl(35, 11%, 61%)');
        docstyle.setProperty('--keys-toggle', 'hsl(0, 0%, 100%)');
        docstyle.setProperty('--submit', 'hsl(25, 98%, 40%)');
        docstyle.setProperty('--submit-shadow', 'hsl(25, 99%, 27%)');
        docstyle.setProperty('--submit-toggle', 'hsl(25, 100%, 61%)');
        docstyle.setProperty('--remove', 'hsl(185, 42%, 37%)');
        docstyle.setProperty('--remove-shadow', 'hsl(185, 58%, 25%)');
        docstyle.setProperty('--remove-toggle', 'hsl(185, 41%, 56%)');

        localStorage.setItem("theme", theme);
        themeSwitcher.style.justifyContent = 'center';
    } else if (theme == 2) {
        docstyle.setProperty('--background', 'hsl(268, 75%, 9%)');
        docstyle.setProperty('--text-top', 'hsl(52, 100%, 62%)');
        docstyle.setProperty('--text-key', 'hsl(52, 100%, 62%)')
        docstyle.setProperty('--text-remove', 'hsl(0, 0%, 100%)');
        docstyle.setProperty('--text-submit', 'hsl(198, 20%, 13%)');
        docstyle.setProperty('--content-background', 'hsl(268, 71%, 12%)');
        docstyle.setProperty('--screen-background', 'hsl(268, 71%, 12%)');
        docstyle.setProperty('--keys', 'hsl(268, 47%, 21%)');
        docstyle.setProperty('--keys-shadow', 'hsl(290, 70%, 36%)');
        docstyle.setProperty('--keys-toggle', 'hsl(268, 54%, 44%)');
        docstyle.setProperty('--submit', 'hsl(176, 100%, 44%)');
        docstyle.setProperty('--submit-shadow', 'hsl(177, 92%, 70%)');
        docstyle.setProperty('--submit-toggle', 'hsl(177, 100%, 79%)');
        docstyle.setProperty('--remove', 'hsl(281, 89%, 26%)');
        docstyle.setProperty('--remove-shadow', 'hsl(285, 91%, 52%)');
        docstyle.setProperty('--remove-toggle', ' 	hsl(280, 56%, 44%)');

        localStorage.setItem("theme", theme);
        themeSwitcher.style.justifyContent = 'flex-end';
    }
}

function themeSwitch() {
    if (theme < 2) {
        theme++;
    } else {
        theme = 0;
    }

    ToggleTheme();
}

function reset() {
    screenContent = '0';

    screen.innerHTML = '0';
}

const displayCheck = ['0', 'Error', 'Infinity', '/', '+', 'x', '-']
function keyPress(value) {
    if (value == '.' && screen.innerHTML == '0') {
        screenContent = '0.';

        screen.innerHTML = screenContent;
    } else if (screen.innerHTML == '0' && displayCheck.includes(value)) {
        reset()
    } else if (displayCheck.includes(screen.innerHTML)) {
        screenContent = value;

        screen.innerHTML = screenContent;
    } else {
        screenContent = screenContent + value;

        screen.innerHTML = screenContent;
    }
}

function remove() {
    screenContent = screenContent.slice(0, -1);

    if (screenContent == '') {
        screenContent = '0';
    }

    screen.innerHTML = screenContent;
}

function calc() {
    let sum = screen.innerHTML.replace(/x/g, "*");

    try {
        let result = eval(sum)

        if (typeof (result) == 'number' && !Number.isNaN(result) && !Number.isInteger(result)) {
            result = result.toFixed(2);
        }

        screenContent = result;

        screen.innerHTML = screenContent;
    } catch (error) {
        console.error(error);

        screen.innerHTML = 'Error';
    }
}

window.onload = () => {
    ToggleTheme();
    keyPress('0');
}
