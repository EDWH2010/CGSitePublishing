class ChatData{
    
    username;
    message;

    constructor(username,message){
        this.usename=username;
        this.message = message;
    }

    recordMsg(msg){
        if(typeof this.message != 'Array')
            return;
        this.message.push(msg);
    }

    getOneMsg(index){
        if(typeof this.message != 'Array')
            return null;
        return this.message[index];
    }
}