const ROWCOUNT = 2;
const COLCOUNT = 4;

//watchPage Function
//捜索画面のロード
function watchPageInit(){
    alert('searchPage loaded');

  catchWorkItems(1,8);
  updateNumberList('watchPage');
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
        sessionStorage.setItem('whName',wName);
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
  let con = e.target.value;
  
  $.ajax({
    url:'',
    method:'POST',
    contentType:'application/json',
    data:JSON.stringify({})
  }).done(function(response){

  }).fail(function(err){
    console.error(err);
  });

}


//データベースからCG作品をキャッチします
async function catchWorkItems(i1,i2){
//  alert('catch item');
  let total = 0;
  const sData = {
    first:i1,
    last:i2
  };
/*
 let res = await fetch('/watchPage.ejs/workTotalCount',
  {method:'POST'}).then(res=>{

  }).catch(err=>{
    console.error(err);
  });
  */

  $.ajax({
    url:'/watchPage.ejs/select',
    method:'POST',
    contentType:'application/json',
    data:JSON.stringify(sData)
  }).done(function(response){
    alert(response);
      updateWatchItem(document.getElementById('watch-table'),2,4,response);
  }).fail(function(err){
    console.error(err);
  });

}



function updateWatchItem(table,rCount=ROWCOUNT,cCount=COLCOUNT,itemArray){
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

function clearWatchItem(table){
  if(table.rows.length == 0)
    return;
  let count = table.rows.length;
  for(let i=0;i<count;i++){
    table.deleteRow(0);
  }
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


function getTableCellCount(table){
  return table.rows.length * table.rows[0].cells.length;
}

function filterEventEmit(element){
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

function itemFilter(e){
  let val = e.target.value;
  $.ajax({
    method:'POST',
    url:'/watchPage.ejs/SearchWorkItem',
    contentType:'application/json',
    data:JSON.stringify({key:val}),
    success:function(res){
      console.log(res);
    }
  }).fail(err=>{
    console.log(err);
  });


}

function getLocalWorlItems(){
  if(localStorage && localStorage.getItem('workList')){
    let wList = JSON.parse(localStorage.getItem('workList'));
    return wList;
  }

  return null;
}

async function updateNumberList(pName){
  let $jTarget = null;
  if(pName == 'watchPage'){
    $jTarget = $('table.watch-table tr:first');
  }else{
    alert('not found target');
    return;
  }

  let val = 8;

   //alert("workItemCount : " +count);
   let tCount = ROWCOUNT * COLCOUNT;
  let num = Math.ceil(val/tCount);

  $('div.number-list:first').empty();
  for(let i=0;i<num;i++){
    let circle = createCircleNumber();
    circle.addEventListener('click',()=>{
      if(!$(this).hasClass('selected')){
         catchWorkItems(i*tCount+1,(i+1)*tCount);
      }
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