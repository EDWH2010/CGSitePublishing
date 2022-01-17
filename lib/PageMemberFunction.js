
//new member added function
const MEMBERLIST = 'memberList';

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


function appendToDataTable(table,data){
    let list = JSON.parse(data);

    list.forEach(function(value){

    });
}

function clearDataTable(table){

}

function clearAllMember(){
  if(localStorage != null)
    localStorage.clear();
}