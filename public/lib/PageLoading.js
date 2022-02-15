function slickInit(){
  $('.work-slider').slick({
    centerPadding:'60px',
    autoplay:true,
    autoplaySpeed:5000,
    dots:true,
    slidesToShow: 3,
    centerMode: true,
    variableWidth: true
  });

}



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
<<<<<<< HEAD:lib/PageLoading.js
  
    userSelectionInit();
=======

  //alert(window.location.href);
    userSelectionInit();
 // alert(getPageName());
>>>>>>> nodejsRout:public/lib/PageLoading.js
 switch(getPageName()){
        case 'index':
          slickInit();
          threeLoading();
           //  threeInit();
            workItemListInit();
            displayItemListInit();   
            headerListInit();
            break;
        case 'chatRoomCreatedPage':
            chatRoomCreatedPageInit();
            break;
        case 'chatRoom':       
            chatRoomPageInit();
           alert('chatRoom init');
            break;
        case 'newMemAdded':
          NewMemAddedPageInit();
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
          watchPageInit();
           // alert('watchPage');
            break;
        case 'workUploadPage':
          workUploadInit();
            break;
        case 'UserProperty':

          break;
        case 'RegisterSuccess':

          break;
        default:
            alert('not found page');
            break;
    }
<<<<<<< HEAD:lib/PageLoading.js
}


=======

}


function NewMemAddedPageInit(){
    $('#main-form').on('submit',function(e){
      e.preventDefault();


      //alert('submit');

    });
}



function addWorkItem(block,src,alt){
  let wBlock = document.createElement('div');
  wBlock.className = 'work-item imgSelector';

  let wImgBlock = document.createElement('div');
  wImgBlock.className = 'work-image';
  let img = document.createElement('img');
  img.setAttribute('src',src);
  img.setAttribute('alt',alt);

  wImgBlock.appendChild(img);
  wBlock.appendChild(wImgBlock);

  block.appendChild(wBlock);
}


>>>>>>> nodejsRout:public/lib/PageLoading.js
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
    if(fname == ''){
      return 'index';
    }

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

function resetImageTable(table){
  for(let i=0;i<table.rows.length;i++){
    for(let j=0;j<table.rows[i].cells.length;j++){
      let cell = table.rows[i].cells[j];
      cell.removeChild(cell.childNodes[0]);
      let img = document.createElement('img');
      cell.appendChild(img);
<<<<<<< HEAD:lib/PageLoading.js
=======
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

 // expandWorkItem();
  
}

function expandWorkItem(){
  addWorkItem($('.work-list.read:first'),"images/sample_image001.jpg",'dummy');
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
          let pho = $(this).find('p');
        changeModal($(img).attr('src'),$(pho).html(),'WorkDiscription','display');
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
>>>>>>> nodejsRout:public/lib/PageLoading.js

    }
  }
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

//-------------------------------------------------------------------------------------

function referPageInit(){
  //alert('referPage loaded');
  if(sessionStorage && sessionStorage.getItem('watchWork') != null){
    let data = JSON.parse(sessionStorage.getItem('watchWork'));

    $('.refer-image img').attr({
      src:data.src,
      alt:data.alt
    });

    $('#work-infoActorName p:nth-child(2)').html(data.workName);
    $('#work-fileType p:nth-child(2)').html('FILE');

    $('#work-explanation p:nth-child(2)').html(data.exp);

  }

}



<<<<<<< HEAD:lib/PageLoading.js
=======
function addWatchBlockTable(table,isrc,dis){
  let tr = table.insertRow();
  let cnt = table.rows[0].cells.length;

  for(let i=0;i<cnt;i++){
    let cell = tr.insertCell();
    let wBlk = document.createElement('figure');
    wBlk.className = 'watch-block';

    let img = document.createElement('img');
    img.setAttribute('src',isrc);

    let caption = document.createElement('figcaption');
    caption.className = 'watch-dis';
    caption.innerHTML = dis;

    wBlk.appendChild(img);
    wBlk.appendChild(caption);
  }

}


//ChatRoomFunction
function chatSendMsg(){
  
}




function chatRoomInit(){
  chatCreator = new ChatMessageCreator('testChat',document.getElementById('chat-display'));
  
  if(chatcreator == null){
    alert('chat creator existed');
  }


}

function chatRoomCreatedPageInit(){

}

function referPageInit(){
  
}



>>>>>>> nodejsRout:public/lib/PageLoading.js
