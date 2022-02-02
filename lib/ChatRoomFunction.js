function createOwnMsg(disBlock,msg){

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
            img.setAttribute('src',imgSrc);
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