var active = document.activeElement;
var prevClass = null;
var sideBarCollapsed = false;

document.onclick = highlightActive;
document.onkeyup = highlightActive;

function highlightActive(){
    //if active element changes
    if (active != document.activeElement){
        //revert element's class name to before focused
        if (prevClass != null){
            active.className = prevClass;
        }

        //update active element
        active = document.activeElement;
        prevClass = active.className;

        if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA"){
        active.className += " focused";
        }
    }
}

/* //WIP
function collapseSideBar(){
    var sideBar = document.getElementById("sideBar");
    var content = document.getElementById("content");
    if (!sideBarCollapsed){
        sideBar.style.width = "100px";
        content.style.marginLeft = "100px";
        sideBarCollapsed = true;
    }
    else{
        sideBar.style.width = "200px";
        content.style.marginLeft = "200px";
        sideBarCollapsed = false;
    }
    
}
*/
