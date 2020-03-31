!function () {
    let $user = $('.username');
    let $password = $('.password');
    let $repass = $('.repass');
    let $email = $('.email');
    let $spans = $('p span')

    let $usernameflag = true;

    // 获得焦点
    $user.on('focus', function () {
        $spans.eq(0).html('请输入长度在4到20之间的字符').css('color', '#999')
    })
    $password.on('focus', function () {
        $spans.eq(1).html('请输入长度在6到20之间的字符').css('color', '#999')
    })
    $repass.on('focus', function () {
        $spans.eq(2).html('重新输入密码').css('color', '#999')
    })
    $email.on('focus', function () {
        $spans.eq(3).html('输入正确格式邮箱').css('color', '#999')
    })
    $user.on('blur', function () {
        $.ajax({
            type: 'post',
            url: 'http://localhost/vancl/nzproject/dist/php/registry.php',
            data: {
                username: $user.val()
            }
        }).done(function (result) {
            if (!result) {//不存在
                let reg = /^\w{4,20}$/g;
                if ($user.val() !== '') {
                    if (reg.test($user.val())) {
                        $spans.eq(0).html('√').css('color', 'green')
                        $usernameflag = true;
                    } else {
                        $spans.eq(0).html('格式错误').css('color', 'red')
                        $usernameflag = false;
                    }
                }else{
                    $spans.eq(0).html('内容不能为空').css('color', 'red')
                }
            } else {
                $spans.eq(0).html('该名已经存在').css('color', 'red');
                $usernameflag = false;
            }
        })
    });

    $password.on('blur', function () {
        let reg = /^\w{6,20}$/g;
        if ($password.val() !== '') {
            if (reg.test($password.val())) {
                $spans.eq(1).html('√').css('color', 'green')
                $usernameflag = true;
            } else {
                $spans.eq(1).html('格式错误').css('color', 'red')
                $usernameflag = false;
            }
        }
        else{
            $spans.eq(1).html('内容不能为空').css('color', 'red')
        }
    })

    $repass.on('blur', function () {
        if ($repass.val() !== '') {
            if ($repass.val() == $password.val()) {
                $spans.eq(2).html('√').css('color', 'green')
                $usernameflag = true;
            } else {
                $spans.eq(2).html('密码错误').css('color', 'red')
                $usernameflag = false;
            }
        }
        else{
            $spans.eq(2).html('内容不能为空').css('color', 'red')
        }
    })

    $email.on('blur',function(){
        if($email.val() !== ''){
            $spans.eq(3).html('√').css('color', 'green')
            $usernameflag = true;
        }else{
            $spans.eq(3).html('密码错误').css('color', 'red')
            $usernameflag = false;
        }
    })


    $('form').on('submit', function () {
        if (!$usernameflag) {
            return false;//阻止提交
        }
    });

}();