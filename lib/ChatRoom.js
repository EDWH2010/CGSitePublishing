class ChatRoom{

    name;
    msgList;
    
    constructor(name,array){
        if(typeof(array) != 'Array' || array == null){
            array = new Array();
       }
       
       this.name=name;
        this.msgList = array;
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