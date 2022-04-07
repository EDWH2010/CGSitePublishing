const baseImagePath = 'images/';


function getWorkItemsCount(){
  $.ajax({
    url:'/watchPage.ejs/workTotalCount',
    method:'POST',
    contentType:'application/json',
    data:JSON.stringify({})
  }).done(function(response){
   // console.log(response);
   alert('現在の作品数は : ' + response.Results.length);
   
  }).fail(err=>{
    console.error(err);
  });

}

function removeAllWorkItems(){
  $.ajax({
    url:'/watchPage.ejs/workRemoveAll',
    method:'POST',
    contentType:'application/json',
    data:JSON.stringify({}),
    success:function(response){
      console.log(response);
    }
  });

}


//WorkUploadPage and workWatch(作品閲覧画面のローディング)
function workUploadInit(){
  const single = '単数',many='複数';

  let form = document.forms['main-form'];

  $('#work-uploadCount').hide();

  //
  $('input[name="fileSelect"]').on('change',(e)=>{
    if($(e.target).val() == single){
      $('#work-uploadCount').hide();
      clearWorkTable();
      form.appendChild(createWorkTable(0));
    }else if($(e.target).val() == many){
      $('#work-uploadCount').show();
      let count = detectWorkItem($('#work-uploadCount select').val());
      for(let i=0;i<count;i++){
        form.appendChild(createWorkTable(i));
      }
    }
    updateUploadButton();
  });


  $('#work-uploadCount select').on('change',(e)=>{
      let gCount = 0;
      gCount = detectWorkItem($(e.target).val());
        for(let i=0;i<gCount;i++){
         form.appendChild(createWorkTable(i));
        }
        updateUploadButton();
  });
  
  form.onsubmit = sendWorkFormData;  
}

//作品のアップロード
function sendWorkFormData(e){
  e.preventDefault();

  var resultData = null;
  var packetData = {};

  if($('.file-selectTable').length == 0){
    return;
  }

  $tList = $('.file-selectTable');

  if($tList.length == 1){
    let wName = $tList.find('input[type="text"]').val();
    let wDis = $tList.find('textarea').val();
     let ele = $tList.find('input[type="file"]').get(0);
       
    let fReader = new FileReader();

    fReader.readAsDataURL(ele.files[0]);
    fReader.onload = function(){
      //alert(this.result);
      let wUrl = this.result;
      resultData = turnToWorkSingleData(wName,wDis,wUrl);
      packetData = JSON.stringify({
        Result:resultData,
        DataType:'Object'
      });

      alert(packetData);

      return;
      savePacketData(packetData);
    }
  
  }else{
     resultData = {};
     resultData.workArray = new Array();

    $tList.each(function(i){
      let wName = $(this).find('input[type="text"]').val();
      let wDis = $(this).find('textarea').val();
       let ele = $(this).find('input[type="file"]').get(0);

       let dta = new Blob([ele.files[0]],{type:'image/*'});
        let src = URL.createObjectURL(dta);

        const rData = turnToWorkSingleData(wName,wDis,src);

        alert(JSON.stringify(rData));
        resultData.workArray.push(rData);

    });

     packetData = JSON.stringify({
      Result:resultData,
      DataType:'Array'
    });
    
    savePacketData(packetData);
   return;
  }
 
}

//データをサーバーに送って処理する
function savePacketData(packet){
  $.ajax({
   url:'/workUploadPage.ejs/upload',
   method:'POST',
   contentType:'application/json',
   data:packet,
   success:function(response){
     alert('アップロード成功');
     console.log(response);

     window.location.reload();
   }
 }).fail((err)=>{
   console.log(err);
 });

}

//一つのパケットにまとめる
function turnToWorkSingleData(wName,wDis,wSource){  
  const resultData = {};

  resultData.workName = wName;
  resultData.workDiscription = wDis;
  resultData.workSource = wSource;

  return resultData;
}

function turnToMultiWorkData(wArray){
  const resultData = {};
  resultData.workArray = wArray;

  return resultData;
}

//パケット形式でローカル環境で保存する
function saveDataToLocal(packet){
  if(localStorage.getItem('workList') == null){
    let wList = [];
    localStorage.setItem('workList',JSON.stringify(wList));
  }

  if(localStorage.getItem('workList') != null){
    let wList = JSON.parse(localStorage.getItem('workList'));
    let pData = JSON.parse(packet);
    if(pData.DataType == 'Object'){
      wList.push(pData.Result);
    }else if(pData.DataType == 'Array'){
      pData.workArray.forEach(function(item){
        wList.push(item);
      });
    }

    localStorage.setItem('workList',JSON.stringify(wList));
    alert('アップロード成功');
  }
}



function typedArrayToURL(typedArray, mimeType) {
  return URL.createObjectURL(new Blob([typedArray.buffer], {type: mimeType}));
}


function testSubmitFile(dta){
  $.ajax({
    url:'/workUploadPage.ejs/testSaveFile',
    method:'POST',
    contentType:'application/json',
    data:dta,
    success:function(response){
      console.log(response);
    }
  }).fail(function(err){
    console.log(err);
  });
}


function convertAbsPathToLastPath(fPath){
  let fArr = fPath.split('\\');
  return fArr[fArr.length-1];
}


function detectWorkItem(value){
    let count=0;
    switch(value){
        case '1':
          count=1;
          clearWorkTable();
          break;
        case '2':
          count=2;
          clearWorkTable();
          break;
        case '3':
          count=3;
          clearWorkTable();
          break;
        case '4':
          count=4;
          clearWorkTable();
          break;
        case '5':
          count=5;
          clearWorkTable();
          break;
        default:
          clearWorkTable();
          break;
      }
      

      return count;
}

function clearWorkContent(){
   clearWorkTable();
}

function clearWorkTable(){
  $('#main-form').children('.file-selectTable').remove();
}


function updateUploadButton(){
  $('p#submitBlock').remove();
  
  let p = $('<p id="submitBlock" align="center">');
  let sBtn = $('<input>',{
    type:'submit',
    name:'uploadButton',
    value:'アップロード'
  }).appendTo(p);

  $('#main-form').append(p);

}

function createWorkTable(index){
  let table = document.createElement('table');
  table.className = 'file-selectTable';
  table.name = 'work-uploadTable'+index;
  table.setAttribute('align','center');

  let tr1 = table.insertRow();
  tr1.insertCell().innerHTML = '作品名';
  let input = document.createElement('input');
  input.setAttribute('type','text');
  input.name = 'workname'+index;
  tr1.insertCell().appendChild(input);

  let tr2 = table.insertRow();
  tr2.insertCell().innerHTML = '作品説明文';

  let tArea = document.createElement('textarea');
  $(tArea).attr({
    name:'discription'+index,
    cols:30,
    rows:5
  });

  tr2.insertCell().appendChild(tArea);

  let tr3 = table.insertRow();
  tr3.insertCell().innerHTML = 'ファイル選択';

  let itFile = document.createElement('input');
  $(itFile).attr({
    type:'file',
    id:'file-selection',
    name:'file-selection'+index
  });

  let ul = document.createElement('ul');
  $(ul).attr("class","file-imageList");

  let cell = tr3.insertCell();
  cell.appendChild(itFile);
  cell.appendChild(ul);

  return table;

}



/* ---------------------------------------------------------------referSetting------------------------------------------------*/ 
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


