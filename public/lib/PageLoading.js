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
  });
  
 // localStorage.removeItem('workList');
 //localStorage.removeItem('memberList');
  //alert(localStorage.getItem('memberList'));
  //alert(localStorage.getItem('workList'));

  userSelectionInit();
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
         // localStorage.clear();
          newMemAddedInit();
            break;
        case 'referPage':
          //  alert('referPage');
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
        case 'RigisterSuccess':
          alert('registerSuccessPage loaded');
          break;
        default:
            alert('not found page');
            break;
    }
}

function changeToSimplePageName(pName){
  let name = '';
  switch(pName){
    
  }

  return name;
}

function createBreadButton(pName){
  let l = document.createElement('li');
  l.innerText = pName;

  return l;
}

function breadCreateInit(){
  let $bList = $('#breadNavList');
  $bList.empty();
  let pathList = window.location.href.split('/');
  
  for(let i=0;i<pathList.length;i++){
    let pName = pathList[i]
    if(pName === '' || pName === 'https' || pName === 'http'){
      continue;
    }
   let button = createBreadButton(changeToSimplePageName(pName));
   $bList.append(button);

    if(i == pathList.length-1){
      continue;
    }
    let arrow = document.createElement('span');
    arrow.innerHTML = '&raquo';
    $bList.append(arrow);

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

function headerInit(){ 
  userSelectionInit();
  smallListInit();
}

function smallListInit(){
  $('#small-area-button').click(function(){
    if($(this).hasClass('hide')){
      $(this).html('&times');
    }
    else{
      $(this).html(createMenuIcon());
    }
  });
}

function createMenuIcon(){
  let container = document.createElement('div');
  for(var i=0;i<3;i++){
    let p = document.createElement('p');
    p.innerHTML = '-';

    container.appendChild(p);
  }

  return container;
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

    if($('#testRemoveWorkButton') === null)
      return;

      $('#testRemoveWorkButton').show();
  }else{

    $('#user-icon').hide();
     $('.member-button').hide();
    $('.guest-button').show();

     $('#navSelection li[name="select-upload"]').hide();

      if($('#testRemoveWorkButton') === null)
        return;

      $('#testRemoveWorkButton').hide();
  }
}






//-------------------------------------------------------------------------------------





