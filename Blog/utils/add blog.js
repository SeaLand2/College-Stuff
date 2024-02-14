const trueData = window.data

const pages = [
    {
        "page": "Programming",
        "catagories": ["Python", "C", "HTML/CSS"]
    },
    {
        "page": "CA",
        "catagories": ["1", "2", "3", "4", "5", "6", "7", "8"]
    },
    {
        "page": "Projects",
        "catagories": ["UI/UX", "Functional Requirements"]
    },
    {
        "page": "Industry Placement",
        "catagories": []
    },
    {
        "page": "Events",
        "catagories": []
    },
    {
        "page": "Blog",
        "catagories": []
    },
    {
        "page": "Masterclasses",
        "catagories": []
    },
]

const pageDropTemplate = document.querySelector('.pageDropItem')
const cateDropTemplate = document.querySelector('.cateDropItem')

function CateClick(category) {
    document.querySelector('.cateDrop').innerHTML = category
}

function SelectPage(page) {
    cateDropTemplate.style.display = 'none'

    document.querySelector('.pageDrop').innerHTML = page

    var cateMenu = document.querySelector(".cateMenu");
    var child = cateMenu.lastElementChild; 
        while (child) {
            cateMenu.removeChild(child);
            child = cateMenu.lastElementChild;
        }
    const cateDrop = cateDropTemplate.cloneNode(true)
    document.querySelector('.cateMenu').appendChild(cateDrop)
    const exceptions = ['Industry Placement', 'Events', 'Blog', 'Masterclasses']
    if (exceptions.includes(page)) {
        document.querySelector('.cateDrop').innerHTML = 'N/A'
    } else {
        document.querySelector('.cateDrop').innerHTML = 'Select a Category'
    }

    var pageIndex = pages.findIndex(function (pageName) {
        return pageName.page == page
    })
    var pageData = pages[pageIndex]
    var catagories = pageData.catagories

    for (var x = 0; x < catagories.length; x++) {
        if (x > catagories.length) {
            break;
        }
        const cateDrop = cateDropTemplate.cloneNode(true)

        cateDrop.style.display = 'flex'
        cateDrop.innerHTML = catagories[x]
        const cateContent = `${catagories[x]}`
        cateDrop.onclick = () => { CateClick(cateContent) }
        document.querySelector('.cateMenu').appendChild(cateDrop)
    }
}

window.onload = () => {
    pageDropTemplate.style.display = 'none'

    for (var x = 0; x < pages.length; x++) {
        if (x > pages.length) {
            break;
        }
        var pageName = pages[x].page

        const pageDrop = pageDropTemplate.cloneNode(true)
        pageDrop.style.display = 'flex'
        pageDrop.innerHTML = pageName

        switch (pageName) {
            case 'Programming':
                pageDrop.onclick = function () { SelectPage('Programming') }
                break;
            case 'CA':
                pageDrop.onclick = function () { SelectPage('CA') }
                break;
            case 'Projects':
                pageDrop.onclick = function () { SelectPage('Projects') }
                break;
            case 'Industry Placement':
                pageDrop.onclick = function () { SelectPage('Industry Placement') }
                break;
            case 'Events':
                pageDrop.onclick = function () { SelectPage('Events') }
                break;
            case 'Blog':
                pageDrop.onclick = function () { SelectPage('Blog') }
                break;
            case 'Masterclasses':
                pageDrop.onclick = function () { SelectPage('Masterclasses') }
                break;
        }
        
        document.querySelector('.pageMenu').appendChild(pageDrop)
    }
}


//var page = "CA"
//SelectPage(page)

function AddBlog() {
    var title = document.querySelector('.title').value
    var page = document.querySelector('.pageDrop').innerHTML
    var category = document.querySelector('.cateDrop').innerHTML
    var text = document.querySelector('.text').value
    var date = new Date().getTime()/1000

    if (page.includes('Select a')) {
        page = ''
    }
    if (category.includes('Select a') || category.includes('N/A')) {
        category = ''
    }

    console.log(`Copy into data.js:
    {
        "title": "${title}",
        "page": "${page}",
        "category": "${category}",
        "text": "${text}",
        "date": "${date}"
    },` )
}