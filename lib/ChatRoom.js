class ChatRoom{

    msgList;
    
    constructor(array){
        if(typeof(array) != 'Array' || array == null){
            array = new Array();
       }
        this.msgList = array;
    }

     detectChatData(index){

        this.msgList.forEach((i) =>{

        });
    }
}