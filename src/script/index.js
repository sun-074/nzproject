//渲染
!function () {
    $.ajax(
        {
            url: 'http://localhost/vancl/nzproject/dist/php/vacal.php',
            dataType: 'json',
        }
    ).done(function (d) {
        console.log(d)
        let $str = '';
        $.each(d, function (index, value) {
            $str += `
                    <li sid='${value.sid}'>
                        <a href='detail.html'>
                            <img class='lazy'  data-original="${value.url}" alt="">
                            <p>${value.title}</p>
                            <p>￥${value.price}</p>
                        </a>    
                    </li>
            `
        });
        $('.goods ul').html($str);

        $(function() {
            $("img.lazy").lazyload({effect: "fadeIn"});
        });
    })

    // 用户登录修改
    if (localStorage.getItem('username')) {
        $('.open').hide();
        $('.clock').show();
        $('.clock span').html(localStorage.getItem('username'));
    }

    $('.clock a').on('click', function () {
        $('.open').show();
        $('.clock').hide();
        localStorage.removeItem('username');
    });

    // 回到顶部
    $('.iconfont').on('click', function () {
        $('html,body').animate({
            scrollTop: 0
        });
    })
}();

// 轮播图效果
!function () {

    let $index = 0;

    // 鼠标移入
    $('.banner ol li').on('mouseover', function () {
        $index = $(this).index();

        $(this).addClass('active').siblings('li').removeClass('active');
        $('.banner ul li').eq($index).css({ 'opacity': 1 }).siblings('li').css({ 'opacity': 0 });
    })

    // 左箭头点击

    let $all = function () {
        $('.banner ol li').eq($index).addClass('active').siblings('li').removeClass('active');
        $('.banner ul li').eq($index).css({ 'opacity': 1 }).siblings('li').css({ 'opacity': 0 });
    }

    $('.banner .left').on('click', function () {
        if ($index <= 0) {
            $index = 5;
            $all()
        } else {
            $index--;
           $all();
        }

    })
    let $move = function () {
        if ($index >= $('ol li').length-1) {
            $index = 0;
            $all();
        }
        else {
            $index++;
            $all();
        }
    }

    $('.banner .right').on('click',$move)

    let $timer = setInterval(()=>{
        $move()
    },3000)
    
    $('.lunbo').on('mouseout',function(){
        $timer = setInterval(()=>{
            $move()
        },3000)
    })

    $('.lunbo').on('mouseover',function(){
        clearInterval($timer)
    })

    // 顶部悬浮
    
    $(window).on('scroll',function(){
       let $top =$(window).scrollTop();
       if($top>120){
            $('.head').css({'position':'fixed','top':0,'z-index':100})
       }
       if($top<100){
        $('.head').css({'position':'static'})
       }
    })
}();



