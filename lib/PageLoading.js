
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

function getArticle(className){
    return document.getElementsByClassName(className)[0];
}



function sendChatRoomData(){
    
}


//table functions


function addImageDataToTable(table,img){
 // resetImageTable(table);
  
  for(let i=0;i<table.rows.length;i++){
    for(let j=0;j<table.rows[i].cells.length;j++){


    }
  }
}

function changeNextTable(){

}

function resetImageTable(table){
  for(let i=0;i<table.rows.length;i++){
    for(let j=0;j<table.rows[i].cells.length;j++){
      let cell = table.rows[i].cells[j];

      cell.removeChild(cell.childNodes[0]);
      let img = document.createElement('img');
      cell.appendChild(img);
    }
  }
}
