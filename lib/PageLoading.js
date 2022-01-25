const modal=null;

const chatCreator=null;

window.onload = function(){

  let returnBtn = createReturnTopButton();
  this.addEventListener('scroll',()=>{
    if(this.scrollY >= 150){
      $(returnBtn).fadeIn(500);
    }else{
      $(returnBtn).fadeOut(500);
    }
    $('#testBlock').html(this.scrollY);
  });
  
    userSelectionInit();
  //alert(getPageName());
 switch(getPageName()){
        case 'index':
            //alert('index');
             threeInit();
            workItemListInit();
            displayItemListInit();   
            updateNumberList('index');
            break;
        case 'chatRoomCreatedPage':
            
            break;
        case 'chatRoom':
           
            chatRoomInit();
           alert('chatRoom init');
            break;
        case 'newMemAdded':
            break;
        case 'referPage':
           // alert('referPage');
           referPageInit();
            break;
        case 'rogin':
           // alert('rogin');   
            break;
        case 'watchPage':
          updateNumberList('watchPage');
           // alert('watchPage');
            break;
        case 'workUploadPage':
            break;
        case 'UserProperty':

          break;
        default:
            alert('not found page');
            break;
    }

}



function chatRoomInit(){
  chatCreator = new ChatMessageCreator('testChat',document.getElementById('chat-display'));
  
}


function referPageInit(){

}

function createReturnTopButton(){
  let btn = document.createElement('div');
  btn.id='returnTop';
  btn.innerHTML = '&uarr;';

  $(btn).hide();
  $(btn).click(function(){
     $('html,body').animate({
        scrollTop:0
      },300);

      this.fadeOut(1000);
  });

  document.body.appendChild(btn);
  return btn;
}


function changePage(pname){
  //alert('page loading');
  window.location.href=pname;
}

function changePageByTime(pname,time){
  setTimeout(function(){
     window.location.href=pname;
  },time)
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

function getArticle(className){
    return document.getElementsByClassName(className)[0];
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

let readIndex=0;

function workItemListInit(){

  let $modal = $('.modal:eq(0)');
   let $cap = $('#caption');

  if($modal != null && $cap != null){
    $('.work-list.read .imgSelector').bind('click',function(){
        
        $('.prev.prev-add').show();
          $('.next.next-add').show();

        var $imgBlock = $(this);
        var $img = $imgBlock.find('img');
        //alert($img.attr('src'));
        changeModal($img.attr('src'),$img.attr('alt'),'Discription Test','read');
    });
  }

  $('.prev.prev-add').click(function(){
  //  alert('prev!');
    prevImage($('.work-list.read'),readIndex);
});

  $('.next.next-add').click(function(){
    nextImage($('.work-list.read'),readIndex);
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
          $('.prev.prev-add').hide();
          $('.next.next-add').hide();

          let img = $(this).find('img');

        let wData = new DisplayData($(img).attr('id'),$(img).attr('src'));
        if(wData.title === 'dis-material'){
          wData.setDiscription(`マテリアルとは3Dモデルに表面に物質表現に用いられる`);
        }else if(wData.title === 'dis-3Dmodel'){
          wData.setDiscription(`3Dモデルとは、3Dゲーム等で用いる3次元的に描かれたコンピュータグラフィックス(CG)で、立体的な形状データです。`);
        }else if(wData.title === 'dis-texture'){
          wData.setDiscription(`テクスチャマッピング とは、
          3次元コンピュータグラフィックスで作成された3Dモデル表面に質感を与えるための手法。`);
        }
          changeModal(wData.src,wData.returnDisplayName(),wData.discription,'display');
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

function userSelectionInit(){
  if(detectIsRogin()){
    $('#user-icon').show();
    $('.guest-button').hide();
    $('.member-button').show();
    $('.member-button').click(function(){
      rogout();
    });

    $('#user-image').attr('src','images/guest.png');
    $('#user-name').html(getUserName());
    $('#navSelection li[name="select-upload"]').show();
  }else{

    $('#user-icon').hide();
     $('.member-button').hide();
    $('.guest-button').show();

     $('#navSelection li[name="select-upload"]').hide();
  }
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
  img.setAttribute('alt',alt+(len+1));

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
      $('.modal').show();
    }
}

//-------------------------------------------------------------------------------------


function createCircleNumber(){
  let circle = document.createElement('div');
  circle.className = 'circle-number';

  let cnt = $('div.number-list:first').children().length;
  circle.innerHTML = cnt+1;
  circle.addEventListener('click',function(){
    $(this).parent().children('.selected').removeClass('selected');
    $(this).addClass('selected');
/*
    let num = $(this).html();
    alert('called page ' + num);*/

  });

  $('div.number-list').append(circle);
  return circle;
}


function watchPageInit(){
  
}


function updateNumberList(pName){
  $('div.number-list:first').empty();
  
  let $jTarget = null;
  if(pName == 'watchPage'){
    $jTarget = $('table.watch-table td:first')
  }else if(pName == 'index'){
    $jTarget = $('.work-list.read');
    //alert('index nmberList found');
  }else{
    alert('not found target');
    return;
  }

   let count = $jTarget.children().length;
  let num = Math.ceil(count/4);

  for(let i=0;i<num;i++){
    createCircleNumber();
  }
  
  $('.number-list div.circle-number:first').addClass('selected');
}


//watchPage Function
function filterEventEmit(element){
  //alert('filter event occured');
    if(element.value == 'boxShow'){
      element.value='boxHide';
      element.innerHTML = 'サーチ条件Off';
      $('#search-filter').show();
    }else if(element.value=='boxHide'){
       element.value='boxShow';
         element.innerHTML = 'サーチ条件On';
      $('#search-filter').hide();
    }
}


//ChatRoomFunction
function chatSendMsg(){
  
}