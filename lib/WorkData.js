const WorkType = {
    Model:'Model',
    Mat:'material',
    Tex:'texture'
}

class WorkData{
    
    constructor(title,src,userName,discription,type){
        this.title=title;
        this.src = src;
        this.userName = userName;
        this.discription = discription;
        this.type = type;
    }
}


class DisplayData{

    title;
    src;
    discription;

    constructor(title,src){
        this.title=title;
        this.src = src;
    }

    returnDisplayName(){
        if(this.title === 'dis-material'){
            return 'マテリアル'
        }else if(this.title === 'dis-3Dmodel'){
            return '3Dモデル'
        }else if(this.title === 'dis-texture'){
            return 'テクスチャマップ'
        }
    }

    setDiscription(discription){
        if(typeof discription === 'string'){
            this.discription = discription;
        }
    }
}


class WorkList{

    workList;

    constructor(){
        this.workList = new Array();
    }
}