<?

session_start();
if ($_SESSION['login'] != "ok") {

    header("Location: testSession.html");
}
?>