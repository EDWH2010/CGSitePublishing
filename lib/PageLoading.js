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
            //updateNumberList('index');
            break;
        case 'chatRoomCreatedPage':
            
            break;
        case 'chatRoom':       
            chatRoomPageInit();
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
          watchPageInit();
           // alert('watchPage');
            break;
        case 'workUploadPage':
          workUploadInit();
            break;
        case 'UserProperty':

          break;
        default:
            alert('not found page');
            break;
    }

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
  let $readArea = $('.work-list.read');

  if($modal != null && $cap != null){
    $($readArea , ' .imgSelector').bind('click',function(){
        $('.prev.prev-add').show();
          $('.next.next-add').show();

        var $imgBlock = $(this);
        var $img = $imgBlock.find('img');

        
        changeModal($img.attr('src'),$img.attr('alt'),'Discription Test','read');
    });
  }


  $('.prev.prev-add').click(function(){
    prevImage($('.work-list.read'),readIndex);
});

  $('.next.next-add').click(function(){
    nextImage($('.work-list.read'),readIndex);
  });

  $('span.close').click(function(){
    $('.modal').hide();
  });
  
}

function expandWorkItem(count){
  let $workList = $('.work-list.read');
  let expIndex = $workList.children().length;

  for(let i = expIndex;i<expIndex + count;i++){
      let item = createIndexWorkItem('images/sample_image001.jpg','dummy' + i,'DiscriptionTest' + i);
      $workList.append(item);
  }
}

function createIndexWorkItem(src,title,dis){
  let wItem = document.createElement("div");
  wItem.className = 'work-item imgSelector';
  let wImg = document.createElement("div");
  wImg.className = 'work-image';
  let img = document.createElement("img");
  
  img.setAttribute('src',src);
  img.setAttribute('alt',title);
  wImg.appendChild(img);

  let disItem = document.createElement("div");
  disItem.style.display='none';
  disItem.className = 'work-discription';
  disItem.innerHTML = dis;

  wItem.appendChild(wImg);
  wItem.appendChild(disItem);

  return wItem;
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

function getReadImage($list,target){
  let block = $list.children()[target];
  return $(block).find('img');
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



function updateNumberList(pName){
  $('div.number-list:first').empty();
  
  let $jTarget = null;
  if(pName == 'watchPage'){
    $jTarget = $('table.watch-table tr:first')
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


//ChatRoomFunction

function chatRoomPageInit(){

  $('#main-form').on('submit',function(e){
     e.preventDefault();
    createOwnMsg(document.getElementById('chat-display')
    ,$('#input-chatArea').val());


    
     $('#input-chatArea').val('');

    });

}


//WorkUploadPage and workWatch
function workUploadInit(){
  let form = document.forms['main-form'];

  $('#work-uploadCount').hide();

  $('input[name="fileSelect"]').on('change',(e)=>{
    if($(e.target).val() == '単数'){
      $('#work-uploadCount').hide();
      clearWorkTable();
      form.appendChild(createWorkTable());
    }else if($(e.target).val() == '複数'){
      $('#work-uploadCount').show();
      let count = detectWorkItem($('#work-uploadCount select').val());
      for(let i=0;i<count;i++){
        form.appendChild(createWorkTable());
      }
    }
  });


  $('#work-uploadCount select').on('change',(e)=>{
      let gCount = 0;
      gCount = detectWorkItem($(e.target).val());
        for(let i=0;i<gCount;i++){
         form.appendChild(createWorkTable());
        }
  });


  form.onsubmit = function(e){
    e.preventDefault();
    //alert(e.target.tagName);
    if($('.file-selectTable').length == 0){
      return;
    }

    let wName = this.workname.value;
    let dis = this.discription.value;

    const workItem = {
      name:wName,
      discription:dis
    };

    if(localStorage && localStorage.getItem('workList') == null){

    }
  }
}

function detectWorkItem(value){
    let count=0;
    switch(value){
        case '1':
          count=1;
          clearWorkTable();
          break;
        case '2':
          count=2;
          clearWorkTable();
          break;
        case '3':
          count=3;
          clearWorkTable();
          break;
        case '4':
          count=4;
          clearWorkTable();
          break;
        case '5':
          count=5;
          clearWorkTable();
          break;
        default:
          clearWorkTable();
          break;
      }


      return count;
}


function clearWorkTable(){
  $('#main-form').children('.file-selectTable').remove();
}

function createWorkTable(){
  let table = document.createElement('table');
  table.className = 'file-selectTable';
  table.name = 'work-uploadTable';
  table.setAttribute('align','center');

  let tr1 = table.insertRow();
  tr1.insertCell().innerHTML = '作品名';
  let input = document.createElement('input');
  input.setAttribute('type','text');
  input.name = 'workname';
  tr1.insertCell().appendChild(input);

  let tr2 = table.insertRow();
  tr2.insertCell().innerHTML = '作品説明文';

  let tArea = document.createElement('textarea');
  $(tArea).attr({
    name:'discription',
    cols:30,
    rows:5
  });

  tr2.insertCell().appendChild(tArea);

  let tr3 = table.insertRow();
  tr3.insertCell().innerHTML = 'ファイル選択';

  let itFile = document.createElement('input');
  $(itFile).attr({
    type:'file',
    id:'file-selection',
    name:'file-selection'
  });

  let ul = document.createElement('ul');
  $(ul).attr("id","file-imageList");

  let cell = tr3.insertCell();
  cell.appendChild(itFile);
  cell.appendChild(ul);

  return table;

}


function addMultiFileSet(){
  let sTable = document.createElement('table');
  let row1 = sTable.insertRow();
  let row2 = sTable.insertRow();
}

//watchPage Function

function watchPageInit(){
  $('.watch-block').hover(function(){
    let img = $(this).find('img');
    $(img).animate({
      width:'+=15px',
      height:'+=15px'
    });
  },function(){
      let img = $(this).find('img');
    $(img).animate({
      width:'-=15px',
      height:'-=15px'
    });
  });
  
  
  $('.watch-block').click(function(){

    let img = $(this).find('img');
    let fcap = $(this).find('figcaption');
    let title = $(this).find('h3');

    if(sessionStorage){
      if(sessionStorage.getItem('watchWork')!=null){
        sessionStorage.clear();
      }

      const data = JSON.stringify({
        workName:$(title).html(),
        src:$(img).attr('src'),
        alt:$(img).attr('alt'),
        exp:$(fcap).html()
      });

      alert(data);
      
      sessionStorage.setItem('watchWork',data);

      window.location.href = 'referPage.html';
    }
  });

}

function fileSearch(e){
  let name= e.target.name;
  


}

function insertWatchItem(table){

}

function clearWatchItem(){

}

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


function workSearch(name){


}


function workUpload(){


}