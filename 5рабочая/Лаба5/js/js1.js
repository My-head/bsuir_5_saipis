const colorSet = new Set(); 
document.addEventListener("click", (event)=>{ 
    console.log(event.target.getAttribute('value')) 
    if(event.target.getAttribute('value') != null){ 
        colorSet.add(event.target.getAttribute('value')) 
    } 
    console.log(colorSet.keys()) 
})  