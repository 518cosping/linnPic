		

	// 查看滚动条的滚动距离！！！
	getScrollOffset = function (direction) {
        if (window.pageXOffset || window.pageYOffset) {
            var obj = {
                left: window.pageXOffset,
                top: window.pageYOffset
            }
            return obj[direction];
        }else if (document.body.scrollLeft || document.body.scrollTop) {
            var obj = {
                left: document.body.scrollLeft,
                top: document.body.scrollTop
            }
            return obj[direction];
        }else {
            var obj = {
                left: document.documentElement.scrollLeft,
                top: document.documentElement.scrollTop
            }
            return obj[direction];
        }
     }

     // 查看可视口的尺寸！！！！
    getViewPort = function (direction) {
        if (window.innerHeight || window.innerWidth) {
            var obj = {
                width: window.innerWidth,
                height: window.innerHeight
            }
            return obj[direction];
            // 判断是否是标准模式或者是怪异模式
        }else if (document.compatMode === 'CSS1Compat') {
            var obj = {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
            return obj[direction];
        }else {
            var obj = {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            }
            return obj[direction];
        }
     }
     ajax = function (method, url, flag, data,  callback) {
        if (window.XMLHttpRequest){
            xml = new XMLHttpRequest();
        }else {
        xml = new ActiveXObject('Microsoft.XMLHTTP');
        }
        if(method == 'GET'){
            xml.open(method, url + '?' + data, flag);
            xml.send();
        }else if(method == 'POST'){
            xml.open(method, url, flag);
            xml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xml.send(data);
        }
        xml.onreadystatechange = function(){
            if(xml.readyState == 4){
                if(xml.status == 200){
                    callback(xml.responseText);
                }
            }
        }        
    }

    var oUl = document.getElementsByClassName('all_photo')[0];
	var oLi = document.getElementsByClassName('photo');
	var key = true;

	//获取高度最短的一列
	function getSmallLi(){
		var smallHeight = oLi[0].offsetHeight;
		var dex = 0;
		for (var i = 1; i < oLi.length; i ++){
			if(smallHeight > oLi[i].offsetHeight){
				smallHeight = oLi[i].offsetHeight;
				dex = i;
			}
		}
		return dex;
	}

	show  = function(data){
		JSON.parse(data).forEach(function(ele,index){
			var dex = getSmallLi();
			oImg = document.createElement('img');
			oImg.style.height = parseInt(ele.height/ele.width * 202) + 'px';
			oDiv = document.createElement('div');
			oDiv.appendChild(oImg);
			oLi[dex].appendChild(oDiv);
			oImg.src = ele.image;
			key = true;
		})
	}
	

	var iPage = 1;
	function load(){
		if(key){
			key = false;
			ajax('GET','getPics.php',true,'',show);
		}
	}
	load();

	window.onscroll = function(){
		var dex = getSmallLi();
		var liHeight = oLi[dex].offsetHeight;
		var scrollTop = getScrollOffset('top');
		var clientHeight = getViewPort('height');
		if((scrollTop + clientHeight) > (liHeight + document.body.offsetHeight - liHeight)){
			load();
		}
	}