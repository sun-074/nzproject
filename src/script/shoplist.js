!function () {
    const $input = $('.car-head input')
    const $inputLast = $('.car-foot input')
    const $sums = $('.sum span')
    const $count = $('.count span')

    function showlist(sid, num) {

        $.ajax({
            url: 'http://localhost/vancl/nzproject/dist/php/list.php',
            dataType: 'json',
        }).done(function (data) {
            let $str = '<tr class="car-goods">'
            $.each(data, function (index, value) {
                if (sid == value.sid) {
                    $str += `
                        <td class='chose'><input type="checkbox" checked="checked"></td>
                        <td><img src="${value.url}"sid="${value.sid}" alt="" style="width: 50px;height: 50px;"></td>
                        <td class="title">
                            <a href="">${value.title}</a>
                        </td>
                        <td class="price">￥<span>${value.price}</span></td>
                        <td class="btn"><button class="down">-</button><input type="text"value="${num}"><button class="add">+</button></td>
                        <td class="single">￥<span>${parseInt(value.price * num).toFixed(2)}</span></td>
                        <td class="move"><a href="">删除</a></td>
                   `
                }
            });
            $str += '</tr>';
            $('table tbody').append($str)
            calcprice()


            //全选
            $input.on('click', function () {
                if ($(this).prop('checked')) {
                    $('.car-goods input').prop('checked', true);
                    $inputLast.prop('checked', true)
                    calcprice()

                } else {
                    $('.car-goods input').prop('checked', false);
                    $inputLast.prop('checked', false)
                    calcprice()
                }
            })

            $('.chose input').on('click', function () {
                if ($('.chose input:checked').length === $('.chose input').length) {
                    $inputLast.prop('checked', true)
                    $input.prop('checked', true)
                    calcprice()
                } else {
                    $inputLast.prop('checked', false)
                    $input.prop('checked', false)
                    calcprice()
                }
            })

            // 计算总价
            function calcprice() {
                let sum = 0;
                let count = 0;
                $('.car-goods').each(function (index, ele) {
                    if ($(ele).find('.chose input').prop('checked')) {
                        sum += parseInt($(ele).find('.btn input').val())
                        count += parseFloat($(ele).find('.single span').html());
                    }
                });

                $sums.html(sum)
                $count.html(count.toFixed(2))
            }
        });
    };

    //取数据
    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
        let sid = $.cookie('cookiesid').split(',');//获取cookie 同时转换成数组[1,2]
        let num = $.cookie('cookienum').split(',');//获取cookie 同时转换成数组[10,20]
        $.each(sid, function (index, value) {
            showlist(sid[index], num[index]);
        });
    }


      // 计算总价
      function calcprice() {
        let sum = 0;
        let count = 0;
        $('.car-goods').each(function (index, ele) {
            if ($(ele).find('.chose input').prop('checked')) {
                sum += parseInt($(ele).find('.btn input').val())
                count += parseFloat($(ele).find('.single span').html());
            }
        });

        $sums.html(sum)
        $count.html(count.toFixed(2))
    }

    // 计算单价
    function calcsingleprice(obj) {//obj元素对象
        let $dj = parseFloat(obj.parents('.car-goods').find('.price span').html());
        let $num = parseInt(obj.parents('.car-goods').find('.btn input').val());
        return ($dj * $num).toFixed(2)
    }

     // 5.数量的改变
     $('table').on('click','.add', function () {
        let $num = $(this).parents('.car-goods').find('.btn input').val();
            $num++;
            $(this).parents('.car-goods').find('.btn input').val($num);
            $(this).parents('.car-goods').find('.single span').html(calcsingleprice($(this)));
            calcprice();//计算总价
            setcookie($(this));
    });

    $('table').on('click','.down', function () {
        let $num = $(this).parents('.car-goods').find('.btn input').val();
        $num--;
        if ($num < 1) {
            $num = 1;
        }
        $(this).parents('.car-goods').find('.btn input').val($num);
        $(this).parents('.car-goods').find('.single span').html(calcsingleprice($(this)));
        calcprice();//计算总价
        console.log($(this).parents('.car-goods').find('.btn input').val())
        setcookie($(this));
    });



    $('table').on('input','.btn input', function () {
        let $reg = /^\d+$/g;//只能输入数字
        let $value = $(this).val();
        if (!$reg.test($value)) {//不是数字
            $(this).val(1);
        }
        calcprice();//计算总价
        setcookie($(this));
    });



     //将改变后的数量存放到cookie中
     let arrsid = [];//存储商品的编号。
     let arrnum = [];//存储商品的数量。
     function cookietoarray() {
         if ($.cookie('cookiesid') && $.cookie('cookienum')) {
             arrsid = $.cookie('cookiesid').split(',');//获取cookie 同时转换成数组。[1,2,3,4]
             arrnum = $.cookie('cookienum').split(',');//获取cookie 同时转换成数组。[12,13,14,15]
         } else {
             arrsid = [];
             arrnum = [];
         }
     }

     function setcookie(obj) {
        cookietoarray();
        let $sid = obj.parents('.car-goods').find('img').attr('sid');
        arrnum[$.inArray($sid, arrsid)] = obj.parents('.car-goods').find('.btn input').val();
        $.cookie('cookienum', arrnum, 10);
    }


    // 删除
    function delcookie(sid, arrsid) {//sid:当前删除的sid  arrsid:存放sid的数组[3,5,6,7]
        let $index = -1;//删除的索引位置
        $.each(arrsid, function (index, value) {
            if (sid === value) {
                $index = index;
            }
        });
        arrsid.splice($index, 1);
        arrnum.splice($index, 1);
 
        $.cookie('cookiesid', arrsid, 10);
        $.cookie('cookienum', arrnum, 10);
    }


    $('table').on('click','.move a', function () {
        cookietoarray();
        if (window.confirm('你确定要删除吗?')) {
            $(this).parents('.car-goods').remove();
            delcookie($(this).parents('.car-goods').find('img').attr('sid'), arrsid);
            calcprice();//计算总价
        }
    });
    
    $('.left a').on('click', function () {
        cookietoarray();
        if (window.confirm('你确定要全部删除吗?')) {
            $('.car-goods').each(function () {
                if ($(this).find(':checkbox').is(':checked')) {//判断复选框是否选中
                    $(this).remove();
                    delcookie($(this).find('img').attr('sid'), arrsid);
                }
            });
            calcprice();//计算总价
        }
    });
}();