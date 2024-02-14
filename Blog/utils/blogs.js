const blogData = window.data
const pageLocation = window.location.href
const template = document.querySelector('.blog')
const colours = {
    'Programming': '#39FF14',
    'CA': '#FFF01F',
    'Projects': '#FFFFFF',
    'Industry Placement': '#ED2939',
    'Events': '#1F51FF',
    'Blog': '#9D00FF',
    'Masterclasses': '#83EEFF',
}

// list of the html documents to be used when filtering blogs (0-3 has no categories)
const siteList = ['industry%20placement.html', 'events.html', 'blog.html', 'masterclasses.html', 'ui+ux.html', 'functional%20requirements.html', 'ca%201-4.html', 'ca%205-8.html', 'c.html', 'python.html', 'html+css.html']

// Creates the HTML for a blog post from an example of the html file
function CreateBlog(x) {
    // capture teh example blog from the html page
    var newBlog = template.cloneNode(true)
    // choose the colour for the blog outline
    var categoryColour = blogData[blogData.length - x].page
    // format the blog category
    var pageCate;
    if (blogData[blogData.length - x].category === "") {
        pageCate = blogData[blogData.length - x].page
    } else {
        pageCate = blogData[blogData.length - x].page + ' - ' + blogData[blogData.length - x].category
    }

    // format the blog title
    var title = blogData[blogData.length - x].title;
    title = title.charAt(0).toUpperCase() + title.substr(1).toLowerCase()

    // unix timestamp
    var ts = blogData[blogData.length - x].date

    // convert unix timestamp to milliseconds
    var ts_ms = ts * 1000

    // initialize new Date object
    var date_ob = new Date(ts_ms)

    // year as 4 digits (YYYY)
    var year = date_ob.getFullYear()

    // month as 2 digits (MM)
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2)

    // date as 2 digits (DD)
    var date = ("0" + date_ob.getDate()).slice(-2)

    var time = date + "-" + month + "-" + year

    // change the contents and styling for the blog post
    newBlog.style.display = 'flex'
    newBlog.querySelector('.blog-title').innerHTML = `<h3>${title}</h3>`
    newBlog.querySelector('.blog-date').innerHTML = time
    newBlog.querySelector('.blog-page').innerHTML = pageCate
    newBlog.querySelector('.blog-page').style.color = colours[categoryColour]
    newBlog.style.borderColor = colours[categoryColour]
    newBlog.querySelector('.blog-desc').innerHTML = blogData[blogData.length - x].text

    // add the new blog onto the page
    document.querySelector('.blog-con').appendChild(newBlog)
}

// check if user is on the home page
if (pageLocation.includes('index' || pageLocation == 'https://github.com/SeaLandBestLand/blog/')) {
    // display the latest blogs
    for (var x = 1; x < 4; x++) {
        if (x > blogData.length) {
            break;
        }
        CreateBlog(x)
    }
} else {
    // display all blogs for related to the page
    var currentSite = pageLocation.substring(pageLocation.indexOf('/') + 1)
    while (currentSite.includes('/')) {
        currentSite = currentSite.substring(pageLocation.indexOf('/') - 1)
    }

    var hasCategories = siteList.slice(4,)
    var makeBlog = false
    var filterCategories = false
    var sitePage = ''
    var siteCate = 'N/A'

    if (siteList.includes(currentSite)) {
        makeBlog = true
        switch (currentSite) {
            case 'industry%20placement.html':
                sitePage = 'Industry Placement'
                break;
            case 'events.html':
                sitePage = 'Events'
                break;
            case 'blog.html':
                sitePage = 'Blog'
                break;
            case 'masterclasses.html':
                sitePage = 'Masterclasses'
                break;
        }
        if (hasCategories.includes(currentSite)) {
            filterCategories = true
            switch (currentSite) {
                case 'ui+ux.html':
                    sitePage = 'Projects'
                    siteCate = 'UI/UX'
                    break;
                case 'functional%20requirements.html':
                    sitePage = 'Projects'
                    siteCate = 'Functional Requirements'
                    break;
                case 'ca%201-4.html':
                    sitePage = 'CA'
                    siteCate = ''
                    break;
                case 'ca%205-8.html':
                    sitePage = 'CA'
                    siteCate = ''
                    break;
                case 'c.html':
                    sitePage = 'Programming'
                    siteCate = 'C'
                    break;
                case 'python.html':
                    sitePage = 'Programming'
                    siteCate = 'Python'
                    break;
                case 'html+css.html':
                    sitePage = 'Programming'
                    siteCate = 'HTML/CSS'
                    break;
            } //Programming , CA , Projects , Industry Placement , Events , Blog , Masterclasses
        }
    }

    for (var x = 1; x < (blogData.length + 1); x++) {
        if (x > blogData.length) {
            break;
        }
        if (blogData[blogData.length - x].page == sitePage) {
            if (siteCate != 'N/A') {
                console.log('test')
                if (sitePage == 'CA') {
                    if (currentSite.includes('1') && currentSite.includes('4')) {
                        // blogs for ca1-4
                        var cateList = ['1', '2', '3', '4']
                        if (cateList.includes(blogData[blogData.length - x].category)) {
                            CreateBlog(x)
                        }
                    } else if (currentSite.includes('5') && currentSite.includes('8')) {
                        // blogs for ca5-8
                        var cateList = ['5', '6', '7', '8']
                        if (cateList.includes(blogData[blogData.length - x].category)) {
                            CreateBlog(x)
                        }
                    }
                } else if (blogData[blogData.length - x].category == siteCate) {
                    CreateBlog(x)
                }
            } else {
                console.log('no categories')
                CreateBlog(x)
            }
        }
    }
}
