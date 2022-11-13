document.addEventListener("DOMContentLoaded", function() {
    const title = "BxV, Baloo X Voltic";
    const title_element = document.getElementById("bxv-title");
    
    let offset = 1;
    
    setInterval(async function() {
        if (offset > title.length) return;
    
        title_element.innerHTML = "<i class=\"fas fa-bolt\"></i> " + title.slice(0, offset) + "_";
    
        offset++;
    }, 100);
})