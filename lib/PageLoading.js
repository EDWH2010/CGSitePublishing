
window.onload = function(){
    //alert('loaded');
    let chatData = new ChatData();

    switch(getPageName()){
        case 'index.html':
           // alert('index');
            break;
        case 'chatRoomCreatedPage.html':
            //alert('chatRoomCreatedPage');
            break;
        case 'chatRoom.html':
          //  alert('chatRoom');
            break;
        case 'newMemAdded.html':
          //  alert('newMemAdded');

            break;
        case 'referPage.html':
           // alert('referPage');
            break;
        case 'rogin.html':
           // alert('rogin');
            break;
        case 'watchPage.html':
           // alert('watchPage');
            break;
        case 'workUploadPage.html':
            break;
        default:
            alert('not found page');
            break;
    }
    //alert(fname);

}

function changePage(pname){
  alert('page loading');
  window.location.href=pname;
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

function changeCursor(block){
    block.style.cursor = 'pointer';
}

function clickItemImage(){

}

function getArticle(className){
    return document.getElementsByClassName(className)[0];
}



function sendChatRoomData(){
    
}
//new member added function

function getNewMemberData(form){
  let name = form.nickname.value;
  let email = form.email.value;
  let password = form.password.value;
  let career = form.career.value;
    let usedtarget = form.usedtarget.value;

    let data = new Member(name,email,password,career,usedtarget);

    alert(JSON.stringify(data) + "\n\n送信完了");

    return JSON.stringify(data);
}

function detectRightPassword(form){
    if(form.password.value === form.cpassword.value){
        $('#pass-error').hide();
    }else{
    $('#pass-error').show();
    }
}
function detectRightEmail(form){
     if(form.email.value === form.cemail.value){
        $('#email-error').hide();
    }else{
        $('#email-error').show();
    }
}



//guest or member
function detectIsRogin(){

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
