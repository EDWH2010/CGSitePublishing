class ChatRoom{

    name;
    msgList;
    memberList;
    
    creator;

    constructor(name,array,members){
        if(typeof(array) != 'Array' || array == null){
            array = new Array();
       }
       
         this.name=name;
        this.msgList = array;
        this.memberList = members;

        alert('chatRoom object created');
    }

    addChatData(data){
        if(data instanceof ChatData)
            this.msgList.push(data);
    }

     detectChatData(index){

        this.msgList.forEach((i) =>{

        });
    }

}

class ChatMessageCreator{

    target;
    name;
    
    constructor(name,target,msg){
        this.name=name;
        this.target=target;
    }

    createMineMsg(msg,imgSrc){
       if(this.target instanceof DOMElement){
            var bWrapper = document.createElement('div');
            bWrapper.className="bubbleWrapper";

            var inContainer = document.createElement('div');
            inContainer.className="inlineContainer";

            var img = document.createElement('img');
            img.setAttribute('src',imgSrc);
            img.className="inlineIcon";

            var otherBub = document.createElement('div');
            otherBub.className = "otherBubble other";
            otherBub.innerHTML = msg;

            var otherTime = document.createElement('span');
            otherTime.className="other";

            inContainer.appendChild(img);
            inContainer.appendChild(otherBub);

            bWrapper.appendChild(inContainer);
            bWrapper.appendChild(otherTime);
            
             this.target.appendChild(bWrapper);
       }
    }

    createOtherMsg(msg,imgSrc){
         if(this.target instanceof DOMElement){
             var bWrapper = document.createElement('div');
            bWrapper.className="bubbleWrapper";

            var inContainer = document.createElement('div');
            inContainer.className="inlineContainer own";

            var img = document.createElement('img');
            img.setAttribute('src',imgSrc);
            img.className="inlineIcon";

            var otherBub = document.createElement('div');
            otherBub.className = "ownBubble own";
            otherBub.innerHTML = msg;

            var otherTime = document.createElement('span');
            otherTime.className="own";

            inContainer.appendChild(img);
            inContainer.appendChild(otherBub);

            bWrapper.appendChild(inContainer);
            bWrapper.appendChild(otherTime);

            this.target.appendChild(bWrapper);
       }
    }
}