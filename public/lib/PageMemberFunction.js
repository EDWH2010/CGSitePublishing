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

//save member data

function saveMember(data){

  if(localStorage != null){
    let dataArray=[];
    if(localStorage.getItem('memberList') == null){
      localStorage.setItem('memberList',JSON.stringify(dataArray));
    }

    if(localStorage.getItem('memberList') != null){
     // console.log('start searching data');
     // dataArray =JSON.parse(localStorage.getItem('memberList'));    
      $.ajax({
        url:`newMemAdded.ejs/${data.name}`,
        method:'POST',
        contentType:'application/json',
        data:JSON.stringify(data),
        success:function(response){
          if(response.exists){
            alert('登録成功');
            window.location.href = '/index.ejs/'+response.name;
          }else{
            alert('失敗しました');
            window.location.reload();
          }
        }
      }).fail(function(err){
        console.error(err);
      });      
      
    }
  }
}

function isDetectSameUser(data){

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
  let rData = new RoginData(uname,pass);

  $.ajax({
    url:`/rogin.ejs/${rData.userName}`,
    method:'POST',
    contentType:'application/json',
    data:JSON.stringify(rData)
  }).done(function(response){
    if(response.exists === true){
      alert('ログイン成功しました');
      if(localStorage != null && memberExist(rData)){
        localStorage.setItem('rogin',JSON.stringify(rData)); 
      }
      window.location.href = 'index.ejs?userName='+response.userName;
    }else if(response.exists === false){
      alert('ログイン失敗しました');
      window.location.reload();
    }
  }).fail(function(err){
    console.error(err);
  });
  
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
