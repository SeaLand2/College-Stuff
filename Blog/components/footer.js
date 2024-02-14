class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <footer class="text-center text-lg-start" id="footer" style="">
            <div class="text-center text-white p-3">
                <div>
                    <p><b>Email:</b> osharp248@fareham.ac.uk</p>
                </div>
            </div>
        </footer>
      `;
    }
}

customElements.define('footer-component', Footer);
