export const manageScripts = (to) => {
  const main = document.querySelector("#main-script");

  const a = [...to.page.querySelectorAll("script:not([data-no-reload])")];
  const b = [...document.querySelectorAll("script:not([data-no-reload])")];

  for (let i = 0; i < b.length; i++) {
    const c = b[i];

    for (let j = 0; j < a.length; j++) {
      const d = a[j];

      if (c.outerHTML === d.outerHTML) {
        // Create Shadow Script
        const script = document.createElement(c.tagName);

        // Loop Over Attributes
        for (let k = 0; k < c.attributes.length; k++) {
          // Get Attribute
          const attr = c.attributes[k];

          // Set Attribute
          script.setAttribute(attr.nodeName, attr.nodeValue);
        }

        // Inline Script
        if (c.innerHTML) {
          script.innerHTML = c.innerHTML;
        }

        // Replace
        c.parentNode.replaceChild(script, c);

        // Clean Arrays
        b.splice(i, 1);
        a.splice(j, 1);

        // Exit Loop
        break;
      }
    }
  }
  // Remove Useless
  for (const script of b) {
    // Remove
    script.parentNode.removeChild(script);
  }
  // Add Scripts
  for (const script of a) {
    const loc = script.parentNode.tagName;
    if (loc === "HEAD") {
      document.head.appendChild(script);
    }
    if (loc === "BODY") {
      document.body.insertBefore(script, main);
    }
  }
};
