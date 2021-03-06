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
}

function newMemAddedInit(){
 // localStorage.clear();
}


function getNewMemberData(form){
  let name = form.nickname.value === '' ? null : form.nickname.value;
  let email = form.email.value === '' ? null : form.email.value;
  let password = form.password.value === '' ? null : form.password.value;
  let career = form.career.value === '' ? null : form.career.value;
    let usedtarget = form.usedtarget.value === '' ? null : form.usedtarget.value;

  if(email !== form.cemail.value){
    alert('メールアドレスが一致していません');
    return;
  }
  if(password !== form.cpassword.value){
    alert('パスワードが一致していません');
    return;
  }

  if(name == null || email == null || password == null || career == null || usedtarget == null){
    alert('入力されてない項目があります');
    return;
  }
  
    let data = new Member(name,email,password,career,usedtarget);
    alert(data.name + '   ' + data.email);
    saveMember(data);

    return JSON.stringify(data);
}

function detectIsEmail(eValue){
  let detect = /(\w)+(@)(\w{1,})+/i;
}

function localMemberListInit(){
  if(localStorage){
    let array = [];
    localStorage.setItem('memberList',JSON.stringify(array));
  }else{
    alert('No LocalStorage API');
  }
}

function memberListExist(){
  if(localStorage && localStorage.getItem('memberList'))
    return true;
  else
    return false;
}

//save member data

function saveMember(data){

  if(localStorage != null){
    if(localStorage.getItem('memberList') == null){
      let array = [];
      localStorage.setItem('memberList',JSON.stringify(array));
    }
    if(localStorage.getItem('memberList') != null){
      /*
      if(!isMember(data.name)){
         let array = JSON.parse(localStorage.getItem('memberList'));
        array.push(data);
       // alert(JSON.stringify(array));
        localStorage.setItem('memberList',JSON.stringify(array));
        alert('登録成功しました');
        window.location.href = 'RigisterSuccess.ejs?lastCount='+3;
      }else{
           alert('会員の加入失敗しました');
            window.location.reload();
      }   */
    }

    $.ajax({
      url:`newMemAdded.ejs/${data.name}`,
      method:'POST',
      contentType:'application/json',
      data:JSON.stringify(data),
      success:function(response){
        if(response.exists){
          alert('登録成功');
          window.location.href = 'RigisterSuccess.ejs?lastCount='+3;
        }else{
          alert('会員の加入失敗しました');
          window.location.reload();
        }
      }
    }).fail(function(err){
      console.error(err);
    });   

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
  alert('clicked memberButton');
    if(localStorage != null){
        if(localStorage.getItem('memberList') != null){
            
            var arr = localStorage.getItem('memberList');
            var list = JSON.parse(arr);

            //alert(typeof list);
            list.forEach(function(value){
                //alert(value.name + "\nPASS : " + value.pass);

            });
            return list;
        }
        return null;
    }
    return null;
}

function clearAllLocalData(){
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

    let members = JSON.parse(localStorage.getItem('memberList'));
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
  window.location.href='index.ejs';
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
  //alert(false);
  return found;
}


function rogin(form){

  let uname = form.username.value;
  let pass = form.password.value;

  if(uname == '' || pass == ''){
    alert('ユーザーネームあるいはパスワード未入力です');
    return;
  }
  let rData = new RoginData(uname,pass);
/*
  if(memberExist(rData)){
    localStorage.setItem('rogin',JSON.stringify(rData)); 
    alert('ログイン成功しました');
    window.location.href = 'RigisterSuccess.ejs?lastCount='+(3).toString();
  }else{
    alert('ログイン失敗しました');
  }*/

  $.ajax({
    url:`/rogin.ejs/${rData.userName}`,
    method:'POST',
    contentType:'application/json',
    data:JSON.stringify(rData)
  }).done(function(response){
    if(response.exists === true){
      alert('ログイン成功しました');
      if(localStorage && localStorage.getItem('rogin') == null){
        localStorage.setItem('rogin',JSON.stringify(rData)); 
      }
      window.location.href = 'RigisterSuccess.ejs?lastCount='+(3).toString();
    }else if(response.exists === false){
      alert('ログイン失敗しました');
      window.location.reload();
    }
  }).fail(function(err){
    console.error(err);
  });
  
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