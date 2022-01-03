const modal=null;

window.onload = function(){
/*
    this.addEventListener('resize',()=>{
      alert("Width : " + this.innerWidth + "\nHeight : " + this.innerHeight);
    });
*/
    switch(getPageName()){
        case 'index':
            alert('index');
            workItemListInit();
            displayItemListInit();
            break;
        case 'chatRoomCreatedPage':
            //alert('chatRoomCreatedPage');
            break;
        case 'chatRoom':
          //  alert('chatRoom');
            break;
        case 'newMemAdded':
          //  alert('newMemAdded');
          MemberAddedPageInit();
            break;
        case 'referPage':
           // alert('referPage');
            break;
        case 'rogin':
           // alert('rogin');
            break;
        case 'watchPage':
           // alert('watchPage');
            break;
        case 'workUploadPage':
            break;
        default:
            alert('not found page');
            break;
    }

}

function changePage(pname){
  //alert('page loading');
  window.location.href=pname;
}

function getPageName(){
    let tarr = window.location.href.split('/');
    let fname = tarr[tarr.length-1];

    return fname.split('.')[0];
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

   saveMember(data);

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
  if(localStorage && localStorage.getItem('rogin') != null)
    return true;

    return false;
}

function rogout(){
  localStorage.removeItem('rogin');
  window.location.reload();
}
//table functions


function addImageDataToTable(table,img){
 // resetImageTable(table);
  for(let i=0;i<table.rows.length;i++){
    for(let j=0;j<table.rows[i].cells.length;j++){
      

    }
  }
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


//save member data

function saveMember(data){
  let jDa = JSON.stringify(data);

  if(localStorage != null){
    let dataArray=null;
    if(localStorage.getItem('memberList') != null){
      dataArray =JSON.toJSON(localStorage.getItem('memberList'));
    }else{
      dataArray = new Array();
    }

    dataArray.push(data);

    alert(JSON.stringify(dataArray));
    return;

    localStorage.setItem('memberList',JSON.stringify(dataArray));
    
  }
}

function clearAllMember(){
  if(localStorage != null)
    localStorage.clear();
}

let readIndex=0;

function workItemListInit(){

  let $modal = $('.modal:eq(0)');
   let $cap = $('#caption');

  if($modal != null && $cap != null){
    $('.work-list.read .imgSelector').bind('click',function(){
  //      alert('clicked');
        $('.prev.prev-add').show();
          $('.next.next-add').show();

        var $imgBlock = $(this);
        var $img = $imgBlock.find('img');
        alert($img.attr('src'));
        changeModal($img.attr('src'),$img.attr('alt'),'Discription Test','read');
    });
  }
  $('.prev.prev-add').click(function(){
  //  alert('prev!');
    prevImage($('.work-list.read'),readIndex);
   // alert('current index : ' + readIndex);
});

  $('.next.next-add').click(function(){
    nextImage($('.work-list.read'),readIndex);
    //alert('current index : ' + readIndex);
  });

  $('span.close').click(function(){
    $('.modal').hide();
  });
}

function displayItemListInit(){

  let $list = $('.work-list.display');
  if($list != null){
    let children = $list.children();
    $(children).each(function(i,item){
      $(item).bind('click',function(){
        //alert($(item).find('p').html());

          $('.prev.prev-add').hide();
          $('.next.next-add').hide();

          let img = $(this).find('img');
          //alert($(img).attr('src'));
        changeModal($(img).attr('src'),$(img).attr('alt'),'WorkDiscription','display');
      })
    })
  }
}

function nextImage($iList,cur){
  let target = cur+1;
  let children = $iList.children();

  if(target > children.length-1){
    target=0;
  }
  readIndex=target;
  //alert('readIndex : ' + readIndex);

    let img = getReadImage($iList,readIndex);
    changeModal($(img).attr('src'),$(img).attr('alt')
    ,'Discription Test','read');
}

function prevImage($iList,cur){
    let target = cur-1;
    if(target < 0){
      target = $iList.children().length-1;
    }

    readIndex=target;

    let img = getReadImage($iList,readIndex);
    changeModal($(img).attr('src'),$(img).attr('alt')
    ,'Discription Test','read');
}


function getReadImage($list,target){
  let block = $list.children()[target];
  return $(block).find('img');
}

function appendWorkItem(block,src,alt){
  let len = $(block).children().length;

  let wItem = document.createElement('div');
  wItem.className='work-item imgSelector';

  let wImg = document.createElement('div');
  wImg.className='work-image';

  let img = document.createElement('img');
  img.setAttribute('src',src);
  img.setAttribute('alt',alt+len);

  wImg.appendChild(img);
  wItem.appendChild(wImg);

}



function ImageSlide($list,index){
  let children = $list.children();

  $(children).each(function(i,con){
    if(index == i){
      let $img = $(con).find('img');
      changeModal($img.attr('src'),$img.attr('alt'),'Discription Man');
    }
  });
}

function changeModal(src,alt,discription,type){
   $('#workImage').attr('src',src);
    $('#workImage').attr('alt',alt);  
    $('#caption').html(alt);
    $('#workDiscription').html(discription);  
  
  if(type == 'read'){
      $('.modal.read').show();
    }else if(type == 'display'){

/*
      let $h2B = $('.modal.display .display-title').find('h2');
      $h2B.html(alt);

      let $img = $('.modal.display .display-image').find('img');
      $img.attr('src',src);
      $img.attr('alt',alt);
      
      $dist = $('.modal.display .display-discription');
      $dist.html(discription);
*/
      $('.modal').show();
    }
    
}


function MemberAddedPageInit(){

  if(detectIsRogin()){
    $('.guest-button').hide();
    $('#user-login').show();
    //alert('status:rogin');
  }else{
    $('.guest-button').show();
    $('#user-login').hide();
    //alert('status : rogout');
  }
}
