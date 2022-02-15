const SAVETYPE = {
  Local:0,
  Server:1
}


//new member added function
const MEMBERLIST = 'memberList';

function sendDataServer(form){

     let name = form.nickname.value;
  let email = form.email.value;
  let password = form.password.value;
  let career = form.career.value;
    let usedtarget = form.usedtarget.value;

    let data = new Member(name,email,password,career,usedtarget);

    $.ajax({
      type:'GET',
      url:``,
      
    });

}



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

//save member data

function saveMember(data){

  if(localStorage != null){
    let dataArray=null;

    if(localStorage.getItem('memberList') != null){
      dataArray =JSON.parse(localStorage.getItem('memberList'));
    }else{
      dataArray = new Array();
    }

    dataArray.push(data);
    localStorage.setItem('memberList',JSON.stringify(dataArray));
    
  }
}

/*
function registerMember(name,email,pass,career,usdtarget){
  if(localStorage == null)
  return;
  let members = null;
  if(localStorage.getItem('member') == null){
    members = new Array();
  }else{
    members =JSON.parse(localStorage.getItem('member'));
  }

  let member = new Member(name,email,pass,career,usdtarget);
  members.push(member);

  localStorage.setItem('member',JSON.stringify(members));
}
*/

//すべての会員の表示(テスト用)
function getMembers(){
    if(localStorage != null){
        if(localStorage.getItem('memberList') != null){
            
            var arr = localStorage.getItem('memberList');
            var list = JSON.parse(arr);

            list.forEach(function(value){
                alert(value.name);

            });
            return list;
        }
        return null;
    }
    return null;
}



function createMemberWindow(url){


}

function clearDataTable(table){

}


function appendToDataTable(table,data){
    let list = JSON.parse(data);

    list.forEach(function(value){

    });
}

function clearAllMember(){
  if(localStorage != null)
    localStorage.clear();
}

//guest or member
function detectIsRogin(){
  if(localStorage && localStorage.getItem('rogin') != null)
    return true;

    return false;
}


function isMember(uname){
  if(localStorage && localStorage.getItem('memberList')){

    let members = JSON.toJSON(localStorage.getItem('memberList'));
    members.forEach(function(data){

      alert(data.name);
      if(data.name == uname){
        return true;
      }
    });

    return false;
  }

  return false;
}

function getUserName(){
  if(localStorage && localStorage.getItem('rogin')){
    let data = JSON.parse(localStorage.getItem('rogin'));
    return data.userName;
  }
}

function rogout(){
  localStorage.removeItem('rogin');
  window.location.href='index.html';

  alert('ログアウトしました');
}

function memberExist(data){
  let found = false;

  if(localStorage != null && localStorage.getItem('memberList') != null){
    let list = JSON.parse(localStorage.getItem('memberList'));  

    list.forEach(function(mem){
      //alert(mem.pass);
      if(data.userName == mem.name && data.password == mem.pass){
        //alert(true);

        found=true;
      }
    });

    return found; 
  }

  alert(false);
  return found;
}


function rogin(form){
  //alert('clicked rogin');
  let uname = form.username.value;
  let pass = form.password.value;

  if(uname == '' || pass == ''){
    alert('ユーザーネームあるいはパスワード未入力です');
    return;
  }

  
  let data = new RoginData(uname,pass);
  if(localStorage != null && memberExist(data)){
    localStorage.setItem('rogin',JSON.stringify(data));
    window.location.href='index.html';
  }

}

function detectRoginData(uname,passwd){
  if(localStorage == null){
    return false;
  }
  if(localStorage.getItem('rogin') == null){
    let data = localStorage.getItem('rogin');

    let list = JSON.parse(data);

  }


}
