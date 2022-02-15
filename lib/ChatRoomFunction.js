
//ChatRoomFunction
function chatRoomPageInit(){
      let chatData = null;
      if(sessionStorage && sessionStorage.getItem('chatRoomData') != null){
            chatData = JSON.parse(sessionStorage.getItem('chatRoomData'));
      }

  $('#main-form').on('submit',function(e){
     e.preventDefault();
     //alert('submit message');
    createOwnMsg(document.getElementById('chat-display')
    ,$('#input-chatArea').val());
      
     $('#input-chatArea').val('');
      $('#chat-display').animate({
            scrollTop:this.innerHeight,
      },1000);

    });

    $('#members-block').css({
      'width': '500px',
      'height': '500px',
      'position': 'absolute',
      'background-color': 'white',
      'top':'10%',
      'left':'15%'
    });

    $('#members-block').on('mouseover',(e)=>{
          $('#members-headerList').html("X : " + e.pageX + "\nY : " + e.pageY);

          $('#members-headerList').on('mousedown',function(){
            console.log('mousedown event');
            $(this).css('background-color','#f00');
                  
            /*   $(this).on('mouseleave',function(){
                        $(this).css('background-color','#00ff00');
                  });*/

             });
    });

    

      $('#members-headerList').on('mouseup',function(e){
      console.log('mousedown event');
      $(this).css('background-color','#00ff00');
    });



}



function createOwnMsg(disBlock,msg){

      var bWrapper = document.createElement('div');
            bWrapper.className="bubbleWrapper";

            var inContainer = document.createElement('div');
            inContainer.className="inlineContainer";

            var img = document.createElement('img');
            img.setAttribute('src','images/guest.png');
            img.className="inlineIcon";
            
            var otherBub = document.createElement('div');
            otherBub.className = "otherBubble other";
            otherBub.innerHTML = msg;

            var otherTime = document.createElement('span');
            otherTime.className="other";
            otherTime.innerHTML = getNowTime();

            inContainer.appendChild(img);
            inContainer.appendChild(otherBub);

            bWrapper.appendChild(inContainer);
            bWrapper.appendChild(otherTime);
            
             disBlock.appendChild(bWrapper);
}

function createOtherMsg(disBlock,msg){

      var bWrapper = document.createElement('div');
            bWrapper.className="bubbleWrapper";

            var inContainer = document.createElement('div');
            inContainer.className="inlineContainer own";

            var img = document.createElement('img');
            img.setAttribute('src','images/guest.png');
            img.className="inlineIcon";

            var otherBub = document.createElement('div');
            otherBub.className = "ownBubble own";
            otherBub.innerHTML = msg;

            var otherTime = document.createElement('span');
            otherTime.className="own";
            otherTime.innerHTML = getNowTime();


            inContainer.appendChild(img);
            inContainer.appendChild(otherBub);

            bWrapper.appendChild(inContainer);
            bWrapper.appendChild(otherTime);

            disBlock.appendChild(bWrapper);
}

function chatDisplayMove(move){
      $('#chat-display');

}


function getNowTime(){
      return (new Date().getHours()) + ':' +  (new Date().getMinutes());
}

function displayMemberList(){
      let mBlock = document.getElementById('members-block');
      if(mBlock.style.display == 'block'){
            mBlock.style.display = 'none';
      }else{
            mBlock.style.display = 'block';
     }
}

function insertMembersToList(mTable,mList){
      if(typeof mList !== 'Array'){
            return;
      }

      mList.forEach(function(member){
            var row = mTable.insertRow();
            for(let i=0;i<2;i++){
                  let cell1 = row.insertCell();
                  let cell2 = row.insertCell();

                  cell1.innerHTML = member.id;
                  cell1.innerHTML = member.name;
            }
      });      
}


//charRoomCreatedFunction

function chatRoomCreatedPageInit(){
      alert('chatROomCreatedPageInit');

      $('#main-form').on('submit',(e)=>{
            e.preventDefault();
            let cName = e.target.chatroomName.value;

            let pCount =e.target.chatroomPeopleCount.value;

            let type = e.target.chatroomInvitation.value;

            createChatRoom(cName,pCount,type);
            alert('ChatRoom Created');
      });
}


function createChatRoom(name,pCount,type){
     // alert('start create');
      let jData = getChatRoomData(name,pCount,type);
      if(sessionStorage && sessionStorage.getItem('chatRoomData') == null){
          sessionStorage.setItem('chatRoomData',jData);  
      }
      alert(jData);
      window.location.href='chatRoom.html';
}

function getChatRoomData(name,pCount,type){
      const data =  {
            chatName:name,
            chatPeopleCount:pCount,
            chatType:type
      };

      return JSON.stringify(data); 
}