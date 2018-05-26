window.onload = function () {
    var jsonData = null;
    var banner = document.getElementsByClassName("banner")[0];
    var bannerInner = banner.getElementsByClassName('banner-inner')[0],
        bannerTip = banner.getElementsByClassName('banner-tip')[0],
        bannerLeft = banner.getElementsByClassName('prev-banner'),
        bannerR = banner.getElementsByClassName('next-banner'),
        divList = bannerInner.getElementsByTagName('div'),
        imgList = bannerInner.getElementsByTagName('img'),
        liList = bannerTip.getElementsByTagName('li');
    //首页轮播图
    ~function () {
        var xhr = new XMLHttpRequest;
        xhr.open("get", "json/banner.txt?_=" + Math.random(), false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                jsonData = JSON.parse(xhr.responseText);
            }
        }
        xhr.send(null);
    }();

    //数据绑定
    ~function () {
        var str = '', str2 = '';
        if (jsonData) {
            for (let i = 0; i < jsonData.length; i++) {
                const curData = jsonData[i];
                str += "  <div><img src=''  trueImg='" + curData.img + "' alt='' srcset=''> </div>";
                i === 0 ? str2 += "<li class='active'></li>" : str2 += "<li></li>";
            }
        }
        bannerInner.innerHTML = str;
        bannerTip.innerHTML = str2;
    }();

    //延迟加载
    window.setTimeout(lazyImg, 500)
    function lazyImg() {
        for (var i = 0; i < imgList.length; i++) {
            ~function (i) {
                var curImg = imgList[i];
                var oImg = new Image;
                oImg.src = curImg.getAttribute("trueImg");
                oImg.onload = function () {
                    curImg.src = this.src;
                    curImg.style.display = 'block';
                    if (i === 0) {
                        var curDiv = curImg.parentNode;
                        console.log(curDiv);
                        curDiv.style.zIndex = 1;
                        curDiv.style.opacity = 1;
                    }
                    oImg = null;
                }
            }(i);

        }
    }

    //实现自动轮播
    var interval =3000, autoTimer = null;
    var step = 0;//当前展示图片的索引
    autoTimer = window.setInterval(autoMove, interval);
    function autoMove() {
        if(step===jsonData.length-1){
            step=0;
        }else{
            step++; 
        }
      
        setBanner();
        
    }

    //实现切换效果
    function setBanner() {
        //让step对应的div的z-index=1，让其余的等于0
        for (var i = 0, len = divList.length; i < len; i++) {
            var curDiv=divList[i];
            if (i === step) {
                curDiv.style.zIndex=1;
                    curDiv.style.opacity = 1;
            
                
                continue;
            }
            curDiv.style.zIndex=0;
            curDiv.style.opacity = 0;

        }
        for (i = 0; i < liList.length; i++) {
           i===step?liList[i].classList.add('active'):liList[i].classList.remove('active');
            
        }
    }


}