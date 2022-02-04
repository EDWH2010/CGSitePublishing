
let readIndex=0;

function workItemListInit(){
  let $modal = $('.modal:eq(0)');
   let $cap = $('#caption');
  let $readArea = $('.work-list.read');

  if($modal != null && $cap != null){
    $($readArea , ' .imgSelector').bind('click',function(){
        $('.prev.prev-add').show();
          $('.next.next-add').show();

        var $imgBlock = $(this);
        var $img = $imgBlock.find('img');

        changeModal($img.attr('src'),$img.attr('alt'),'Discription Test','read');
    });
  }


  $('.prev.prev-add').click(function(){
    prevImage($('.work-list.read'),readIndex);
});

  $('.next.next-add').click(function(){
    nextImage($('.work-list.read'),readIndex);
  });

  $('span.close').click(function(){
    $('.modal').hide();
  });
  
}

function expandWorkItem(count){
  let $workList = $('.work-list.read');
  let expIndex = $workList.children().length;

  for(let i = expIndex;i<expIndex + count;i++){
      let item = createIndexWorkItem('images/sample_image001.jpg','dummy' + i,'DiscriptionTest' + i);
      $workList.append(item);
  }
}

function createIndexWorkItem(src,title,dis){
  let wItem = document.createElement("div");
  wItem.className = 'work-item imgSelector';
  let wImg = document.createElement("div");
  wImg.className = 'work-image';
  let img = document.createElement("img");
  
  img.setAttribute('src',src);
  img.setAttribute('alt',title);
  wImg.appendChild(img);

  let disItem = document.createElement("div");
  disItem.style.display='none';
  disItem.className = 'work-discription';
  disItem.innerHTML = dis;

  wItem.appendChild(wImg);
  wItem.appendChild(disItem);

  return wItem;
}

function displayItemListInit(){

  let $list = $('.work-list.display');
  if($list != null){
    let children = $list.children();
    $(children).each(function(i,item){
      $(item).bind('click',function(){
          $('.prev.prev-add').hide();
          $('.next.next-add').hide();

          let img = $(this).find('img');

        let wData = new DisplayData($(img).attr('id'),$(img).attr('src'));
        if(wData.title === 'dis-material'){
          wData.setDiscription(`マテリアルとは3Dモデルに表面に物質表現に用いられる`);
        }else if(wData.title === 'dis-3Dmodel'){
          wData.setDiscription(`3Dモデルとは、3Dゲーム等で用いる3次元的に描かれたコンピュータグラフィックス(CG)で、立体的な形状データです。`);
        }else if(wData.title === 'dis-texture'){
          wData.setDiscription(`テクスチャマッピング とは、
          3次元コンピュータグラフィックスで作成された3Dモデル表面に質感を与えるための手法。`);
        }
          changeModal(wData.src,wData.returnDisplayName(),wData.discription,'display');
      })
    })
  }
}

function nextImage($iList,cur){
  let target = cur+1;
  let children = $iList.children();

  if(target > children.length-1){
    target=0;
  }
  readIndex=target;
  //alert('readIndex : ' + readIndex);

    let img = getReadImage($iList,readIndex);
    changeModal($(img).attr('src'),$(img).attr('alt')
    ,'Discription Test','read');
}

function prevImage($iList,cur){
    let target = cur-1;
    if(target < 0){
      target = $iList.children().length-1;
    }

    readIndex=target;
    let img = getReadImage($iList,readIndex);
    
    changeModal($(img).attr('src'),$(img).attr('alt')
    ,'Discription Test','read');
}

function getReadImage($list,target){
  let block = $list.children()[target];
  return $(block).find('img');
}

function ImageSlide($list,index){
  let children = $list.children();

  $(children).each(function(i,con){
    if(index == i){
      let $img = $(con).find('img');
      changeModal($img.attr('src'),$img.attr('alt'),'Discription Man');
    }
  });
}

function changeModal(src,alt,discription,type){
   $('#workImage').attr('src',src);
    $('#workImage').attr('alt',alt);  
    $('#caption').html(alt);
    $('#workDiscription').html(discription);  
  
  if(type == 'read'){
      $('.modal.read').show();
    }else if(type == 'display'){
      $('.modal').show();
    }
}