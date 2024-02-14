class Header extends HTMLElement {
  constructor() {
    super();
  }

  // html code for the navbar
  connectedCallback() {
    this.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark" id="navbar">
          <div class="container-fluid">
            <a class="navbar-brand" href="./index.html">
              <img src="./images/favicon.ico" alt="Logo" style="border-radius: 100%">
              Oliver's Blog
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link" id="home" aria-current="page" href="./index.html">Home</a>
                </li>
                <!-- -->
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" id="programDrop" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Programming
                  </a>
                  <ul class="dropdown-menu dropdown-menu-dark">
                    <li><a class="dropdown-item" id="c" href="./c.html">C</a></li>
                    <li><a class="dropdown-item" id="python" href="./python.html">Python</a></li>
                    <li><a class="dropdown-item" id="html/css" href="./html+css.html">HTML/CSS</a></li>
                  </ul>
                </li>
                <!-- -->
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" id="caDrop" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Content Areas
                  </a>
                  <ul class="dropdown-menu dropdown-menu-dark">
                    <li><a class="dropdown-item" id="ca1-4" href="./ca 1-4.html">CA 1-4</a></li>
                    <li><a class="dropdown-item" id="ca5-8" href="./ca 5-8.html">CA 5-8</a></li>
                  </ul>
                </li>
                <!-- -->
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" id="projectDrop" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Projects
                  </a>
                  <ul class="dropdown-menu dropdown-menu-dark">
                    <li><a class="dropdown-item" id="ui/ux" href="./ui+ux.html">UI/UX</a></li>
                    <li><a class="dropdown-item" id="functionalRequirements" href="./functional requirements.html">Functional Requirements</a></li>
                  </ul>
                </li>
                <!-- -->
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" id="industryPlacement" href="./industry placement.html">Industry Placement</a>
                </li>
                <!-- -->
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" id="events" href="./events.html">Events</a>
                </li>
                <!-- -->
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" id="blog" href="./blog.html">Blog</a>
                </li>
                <!-- -->
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" id="masterClasses" href="./masterclasses.html">Masterclasses</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      `;
  }
}

customElements.define('header-component', Header);
