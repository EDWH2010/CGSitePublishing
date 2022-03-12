const baseImagePath = 'images/';


function removeAllWorkItems(){
  if(localStorage && localStorage.getItem('workList')){
    localStorage.removeItem('workList');
    alert('すべて投稿した作品を削除しました');
    window.location.reload();
  }
}


//WorkUploadPage and workWatch
function workUploadInit(){
  const single = '単数',many='複数';

  let form = document.forms['main-form'];

  $('#work-uploadCount').hide();

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
        //alert($('.file-selectTable').length);
  });
  form.onsubmit = sendWorkFormData;  
}

function updatePreview(view,img){
  view.empty();
  view.append(img);
}

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
    console.log(ele.files[0]);   
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

      savePacketData(packetData);
    }
  
  }else{
    const fileArr = [];
    let len = $tList.length;
    let wCount = 0;

    const fReaders = [];
    for(let i=0;i<len;i++)
      fReaders.push(new FileReader());
   while(wCount < len){
       let ele = $($tList[wCount]).find('input[type="file"]').get(0);
      console.log('workInadex : ' + wCount);
      
      fReaders[wCount].onload = function(){
       let wName = $($tList[wCount]).find('input[type="text"]').val();
       let wDis = $($tList[wCount]).find('textarea').val();
       ele = $($tList[wCount]).find('input[type="file"]').get(0);

       let result = turnToWorkSingleData(wName,wDis,this.result);
       fileArr.push(result);

       if(wCount == len - 1){
        packetData = JSON.stringify({
          Result:fileArr,
          DataType:'Array'
        });
     
        alert(packetData);
         
       }
    }
    if(wCount >= len-1){
      console.log('over fileLength');
      continue;
    }

    fReaders[wCount++].readAsDataURL(ele.files[0]);
   }

   
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

//パケット形式でローカル保存やサーバー処理行います
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



function previewFile(preview,file){
  const reader = new FileReader();

  reader.onload = function(){
    let img = document.createElement('img');
    img.src = reader.result;

    preview.appendChild(img);
  }

  reader.readAsDataURL(file);
}


function typedArrayToURL(typedArray, mimeType) {
  return URL.createObjectURL(new Blob([typedArray.buffer], {type: mimeType}));
}


function getSubmitFileName(file){
  
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();

    reader.onerror = function(err){
      reject(err);
    }

    reader.onloadstart = function(){
      console.log('loading start');
    }
  
    reader.onprogress = function(e){
      console.log(Math.round((e.loaded/e.total)*100) + '%');
    }
  
    reader.onload = function(){
  
    }
  
    reader.readAsDataURL(file);
  });
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

function clearWorkTable(){
  $('#main-form').children('.file-selectTable').remove();
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


function addMultiFileSet(){
  let sTable = document.createElement('table');
  let row1 = sTable.insertRow();
  let row2 = sTable.insertRow();
}













const ROWCOUNT = 2;
const COLCOUNT = 4;


//watchPage Function

function watchPageInit(){
  /*
  if(localStorage.getItem('workList')){
    let wList = JSON.parse(localStorage.getItem('workList'));
    updateWatchItem(document.getElementById('watch-table'),2,4,wList);
  }else{
    clearWatchItem(document.getElementById('watch-table'));
  }
*/
  catchWorkItems(1,8);
  $('.watch-block').hover(watchHoverIn,watchHoverOut);
  $('.watch-block').click(watchBlockClick);
}


function watchHoverIn(){
  let img = $(this).find('img');
  $(img).animate({
    width:'+=15px',
    height:'+=15px'
  });
}

function watchHoverOut(){
  let img = $(this).find('img');
  $(img).animate({
    width:'-=15px',
    height:'-=15px'
  });
}



function watchBlockClick(){
  let img = $(this).find('img');
  let fcap = $(this).find('figcaption');
  let title = $(this).find('h3');

  if(sessionStorage){
    if(sessionStorage.getItem('watchWork')!=null){
      sessionStorage.clear();
    }

    const jdata = JSON.stringify({
      workName:$(title).html(),
      src:$(img).attr('src'),
      alt:$(img).attr('alt'),
      exp:$(fcap).html()
    });

    alert('Get WorkData : ' + jdata);
    
    $.ajax({
      method:'POST',
      url:'/watchPage/work',
      contentType:'application/json',
      data:jdata,
      success:function(response){
        let wName = response.workName;
       // console.log(name);
        window.location.href = 'referPage.ejs?workName='+wName;
      }
    }).fail(function(err){
      console.error(err);
    });
    
    sessionStorage.setItem('watchWork',jdata);
  }
}

function testUpload(){
  let itemArray = [];
  let iCount = $('.watch-block').length;
  $('.watch-block').each((index,element)=>{
    let img = $(element).find('img');
    let fcap = $(element).find('figcaption');
    let title = $(element).find('h3');

    const tData = {
      workName:$(title).html(),
      workDiscription:$(fcap).html(),
      workSource:$(img).attr('src')
    };

    itemArray.push(tData);
  });

  $.ajax({
    url:'/watchPage.ejs/initInsert',
    method:'POST',
    contentType:'application/json',
    data:JSON.stringify(itemArray),
    success:function(response){
      alert('insert successful');
      alert(JSON.stringify(response));
    }
  }).fail(function(err){
    console.error(err);
  });
}

function fileSearch(e){
  let name= e.target.name;

  $.ajax({

  });
}



function catchWorkItems(i1,i2){
  const sData = {
    first:i1,
    last:i2
  };

  $.ajax({
    url:'/watchPage.ejs/select',
    method:'POST',
    contentType:'application/json',
    data:JSON.stringify(sData),
    success:function(response){
      alert(JSON.stringify(response));
      updateWatchItem(document.getElementById('watch-table'),2,4,response);
    }
  }).fail(function(err){
    console.error(err);
  });

}

function createWatchBlock(data){
  let figure = document.createElement('figure');
  figure.className='watch-block';

  let h3 = document.createElement('h3');
  h3.className = 'watch-title';
  h3.innerHTML = data.workName;

  let dImg = document.createElement('div');
  dImg.className = 'work-image';
  let wImg = document.createElement('img');
  wImg.src = data.workSource;
  wImg.alt = data.workName;

  let fDis = document.createElement('figcaption');
  fDis.className = 'watch-title';
  fDis.innerHTML = data.workDiscription;

  dImg.appendChild(wImg);

  figure.appendChild(h3);
  figure.appendChild(dImg);
  figure.appendChild(fDis);

  figure.addEventListener('click',watchBlockClick);
  $(figure).hover(watchHoverIn,watchHoverOut);

  return figure;
}


function updateWatchItem(table,rCount,cCount,itemArray){
  clearWatchItem(table);

  for(let i=0;i<rCount;i++){
    let row = table.insertRow();
    let start = i * cCount;
    for(let j=start;j<start+cCount;j++){
      let cell = row.insertCell();
      if(j > itemArray.length-1)
        break;

      cell.appendChild(createWatchBlock(itemArray[j]));
    }
  }
  return table;
}

function getTableCellCount(table){
  return table.rows.length * table.rows[0].cells.length;
}

function clearWatchItem(table){
  if(table.rows.length == 0)
    return;
  let count = table.rows.length;
  for(let i=0;i<count;i++){
    table.deleteRow(0);
  }
}

function filterEventEmit(element){
  //alert('filter event occured');
    if(element.value == 'boxShow'){
      element.value='boxHide';
      element.innerHTML = 'サーチ条件Off';
      $('#search-filter').show();
    }else if(element.value=='boxHide'){
       element.value='boxShow';
         element.innerHTML = 'サーチ条件On';
      $('#search-filter').hide();
    }
}


function createCircleNumber(){
  let circle = document.createElement('div');
  circle.className = 'circle-number';

  let cnt = $('div.number-list:first').children().length;
  circle.innerHTML = cnt+1;
  circle.addEventListener('click',function(){
    $(this).parent().children('.selected').removeClass('selected');
    $(this).addClass('selected');
  });
  $('div.number-list').append(circle);
  return circle;
}


function getLocalWorlItems(){
  if(localStorage && localStorage.getItem('workList')){
    let wList = JSON.parse(localStorage.getItem('workList'));
    return wList;
  }

  return null;
}


function updateNumberList(pName){
  let $jTarget = null;

  if(pName == 'watchPage'){
    $jTarget = $('table.watch-table tr:first');

  }else if(pName == 'index'){
    $jTarget = $('.work-list.read');
    //alert('index nmberList found');
  }else{
    alert('not found target');
    return;
  }

   let count = getLocalWorlItems() == null ? 1 : getLocalWorlItems().length;
   //alert("workItemCount : " +count);
   let tCount = getTableCellCount(document.getElementById('watch-table'));
  let num = Math.ceil(count/tCount);

  $('div.number-list:first').empty();
  for(let i=0;i<num;i++){
    let circle = createCircleNumber();
    circle.addEventListener('click',()=>{

     /*
      if(!$(this).hasClass('selected')){
         catchWorkItems(i*8+1,(i+1)*8);
      }
*/
    });
  }
  
  $('.number-list div.circle-number:first').addClass('selected');
}

function catchLocalWorkData(first,last){
  let wDataArr = JSON.parse(localStoarge.getItem('workList'));
  if(first > wDataArr.length-1){
    alert('can\'t catch work data');
    return;
  }

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


