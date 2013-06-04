<?PHP

/*
 *
 * per provare questa pagina aprire FIDDLER e via POST
 * http://localhost:8080/gas/login.php
 * Content-type: application/json; charset=utf-8;
 * nella Request:
 * {"data":[{"userName":"mauro","password":"marson"}]}
 */
include 'config.php';

//error_reporting(E_ALL | E_STRICT);
//ini_set('display_errors', true);

$json = json_decode($_POST['data'], true);
//echo $json[userName];
//echo $json[password];
$user = $_POST[userName];
$pssw = $_POST[password];

//echo $user;
//echo $pssw;
//$data = array('user' => $_POST);
//echo json_encode($data);
//die();
$db_handle = mysql_connect($server, $user_name, $password);
$db_found = mysql_select_db($database, $db_handle);
if ($db_found) {
    //console . log('db trovato');
    $SQL = "SELECT Nome, Cognome FROM gasstore_tblutenti where UserName='" . $user . "' and PWD='" . $pssw . "'";
    //echo $SQL;
    $result = mysql_query($SQL);

    $rows = array();

    while ($db_field = mysql_fetch_assoc($result)) {

        // elimina caratteri NON UTF-8
        foreach ($db_field as &$value) {
            $value = mb_convert_encoding($value, 'UTF-8', 'UTF-8');
            ;
        }
        $rows[] = $db_field;
    }
    //echo $rows;
    try {
        //header("Content-type: application/json", true);
        if ($rows) {
            $data = array('success' => true, 'data' => $rows);
            session_start();
            $_SESSION['userName'] = $user;
            $_SESSION['password'] = $pssw;
            $_SESSION['login'] = 'ok';
        } else {
            $data = array('success' => false, 'message' => 'credenziali errate: ' . $user . '*' . $pass);
            session_destroy();
        }
        echo json_encode($data);
    } catch (Exception $err) {
        $data = array('success' => false, 'message' => $err);
        session_destroy();
        echo json_encode($data);
    }
    mysql_close($db_handle);
} else {
    $data = array('success' => false, 'message' => 'database non trovato');
    session_destroy();
    echo json_encode($data);
}
?>