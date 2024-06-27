const header = document.querySelector('h1')
const app = document.getElementById('app')
const ddMenu = document.querySelector('#ddMenu')
const sandwitch = document.querySelectorAll('svg')
const html = document.documentElement

const toggle = () => html.classList.toggle('dark')

// Function to set the view based on the selected menu item
const setView = (v) => {
    header.innerText = v
    toggleMenu(true)

    if (v === 'Calculator') {
        renderCalculator()
    } else if (v === 'About') {
        renderAbout()
    } else if (v === 'Contact') {
        renderContact()
    }
}

// Function to toggle the visibility of the dropdown menu
const toggleMenu = (hide) => {
    if (!hide) {
        ddMenu.classList.toggle('hidden')
        document.querySelectorAll('svg').forEach((el) => {
            el.classList.toggle('hidden')
        })
    } else {
        ddMenu.classList.add('hidden')
        document.querySelectorAll('svg')[0].classList.remove('hidden')
        document.querySelectorAll('svg')[1].classList.add('hidden')
    }
}

// Function to add a row of content to a container
const addRow = (container, content) => {
    const row = `<div class='grid grid-cols-5 gap-2'>${content}</div>`
    container.insertAdjacentHTML('beforeend', row)
}

// Function to add a monitor display to a container
const addMonitor = (container, text) => {
    const t = text ?? ''
    const monitor = `<div id='monitor' class="dark:bg-green-300 dark:text-gray-700 bg-white border-4 border-blue-400 h-20 flex items-center col-span-5 text-blue-800 p-2 rounded-lg mb-2 font-bold text-4xl">${t}</div>`
    container.insertAdjacentHTML('beforeend', monitor)
}

// Function to create a button element
const button = (text) => {
    const c = text === 'calculate' ? 'col-span-4' : ''
    return `<div class='bg-blue-400 hover:bg-blue-600 text-white ${c} py-1 rounded-md text-center text-lg font-bold cursor-pointer d-btn'>${text}</div>`
}

// Function to add buttons to a container
const addButtons = (container, nums) => {
    const btnHTML = nums.map((n) => button(n)).join('')
    addRow(container, btnHTML)
}

// Function to handle button clicks
const click = (event) => {
    const monitor = document.getElementById('monitor')
    const bac = monitor.innerText.trim()
    const a = event.target.innerText
    console.log(a)
    if (a === 'clear') {
        monitor.innerText = ''
    } else if (a === 'calculate') {
        monitor.innerText = bac + '=' + eval(bac)
    } else {
        monitor.innerText += a
    }
}

// Function to render the calculator view
const renderCalculator = () => {
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '**', 'calculate', 'clear']
    app.innerHTML = ''
    addMonitor(app)
    addButtons(app, labels)
    const buttons = document.querySelectorAll('.d-btn')
    //Adding the buttons with dark mode
    buttons.forEach((el) => {
        el.addEventListener('click', click);
        el.className += ' dark:text-black';
    });
    app.className += ' dark:bg-teal-800'
}

// Function to render the About view
const renderAbout = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for About</div>'
}

// Function to render the Contact view
const renderContact = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for Contact</div>'
}

// Function to render the menu
const renderMenu = () => {
    const menuItems = [
        { name: 'Calculator', action: () => setView('Calculator') },
        { name: 'About', action: () => setView('About') },
        { name: 'Contact', action: () => setView('Contact') }
    ];

    const menuContainer = document.querySelector('.sm\\:flex');

    // Clear existing menu items if any
    menuContainer.innerHTML = '';
    ddMenu.innerHTML = '';

    // Create menu items for dropdown menu
    menuItems.forEach(item => {
        const button = document.createElement('button');
        button.innerText = item.name;
        button.className = 'block py-1 px-2';
        button.onclick = item.action;
        ddMenu.appendChild(button);
    });

    // Create menu items for larger screens
    menuItems.forEach(item => {
        const button = document.createElement('button');
        button.innerText = item.name;
        button.onclick = item.action;
        menuContainer.appendChild(button);
    });
};

// Function to render the dark and light toggle buttons
const renderThemeToggle = () => {
    const darklightContainer = document.querySelector('#darklight');
    const darkbtn = document.createElement('button');
    const lightbtn = document.createElement('button');
    darkbtn.className = 'dark:hidden block'
    lightbtn.className = 'hidden dark:block'
    darkbtn.onclick = () => toggle();
    lightbtn.onclick = () => toggle();
    darkbtn.innerText = 'Dark'
    lightbtn.innerText = 'Light'
    darklightContainer.appendChild(darkbtn);
    darklightContainer.appendChild(lightbtn);
}

renderMenu()
renderThemeToggle()
renderCalculator()