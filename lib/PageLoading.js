
window.onload = function(){
    //alert('loaded');
    let chatData = new ChatData();

    
    //alert(fname);

}


function getPageName(){
    let tarr = window.location.href.split('/');
    let fname = tarr[tarr.length-1];

    return fname;
}

function addWorkItme(block){
    let item = document.createElement('div');
    item.className = 'work-item';


    block.appendChild(item);
}

function clickItemImage(){

}

