<?php
//1.设置字符编码
header('content-type:text/html;charset=utf-8');
 
//2.数据库连接
define('HOST', 'localhost'); //主机名
define('USERNAME', 'root'); //用户名
define('PASSWORD', ''); //密码，如果没有密码，直接设为空define('PASSWORD', '');
define('DBNAME', 'shopping'); //数据库的名称
$conn = @new mysqli(HOST, USERNAME, PASSWORD, DBNAME);
if ($conn->connect_error) {
    die('数据库连接错误，请检查用户名和密码！' . $conn->connect_error);
}

$sql = 'select * from vacal';
$result = $conn->query($sql);
$arr = array();
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i] = $result->fetch_assoc();
};
echo json_encode($arr);