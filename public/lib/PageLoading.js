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
  alert(localStorage.getItem('workList'));

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
        case 'RegisterSuccess':

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





