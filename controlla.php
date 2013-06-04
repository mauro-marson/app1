<?

$user = "luca";
$pass = "costantino";


if ($_POST['username'] == $user && $_POST['password'] == $pass) {

    session_start();
    $_SESSION['login'] = "ok";
    header("Location: session.php");
} else {

    header("Location: testSession.html");
}
?>