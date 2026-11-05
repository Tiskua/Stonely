class TabBar extends HTMLElement {
  connectedCallback() {
    // Capture custom attributes from the HTML tag
    const selected = this.getAttribute("selected") || "home";

    // Inject the HTML structure and styles
    this.innerHTML = `
      <div class="container">
        <a href="map.html">
          <i class="fa-solid fa-location-dot fa-lg ${selected == "map" && "selected"}"></i>
        </a>
        <a href="homepage.html">
          <i class="fa-solid fa-house fa-lg ${selected == "home" && "selected"}"></i>
        </a>
        <a href="chat.html">
          <i class="fa-solid fa-comment fa-lg ${selected == "chat" && "selected"}"> </i>
        </a>
      </div>
    `;
   
  }
}

customElements.define("tab-bar", TabBar);
