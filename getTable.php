<?PHP

//error_reporting(E_ALL | E_STRICT);
//ini_set('display_errors', true);

include 'config.php';
include 'checkSession.php';

$table = strip_tags($_POST["tableName"]);
$orderBy = strip_tags($_POST["orderBy"]);
$where = strip_tags($_POST["where"]);
$select = strip_tags($_POST["select"]);

$db_handle = mysql_connect($server, $user_name, $password);
$db_found = mysql_select_db($database, $db_handle);


if ($db_found) {

    //$SQL = "SELECT * FROM gasstore_tbl" . $table ;
    //$SQL = "SELECT * FROM gasstore_tbl" . $table . " order by IDProdotto";
    $SQL = "SELECT ";

// se tabella prodotti ricavo anche la sommatoria dei like/dislike e del nr acquisti globale
    if($table=="Prodotti"){
     $select="Codice, Titolo, Prezzo, Image1, sum(like_) as LikeSum, sum(dislike_) as DislikeSum";
    }
    if($select){
        $SQL = $SQL . $select;
    }
    else {
        $SQL = $SQL . "*";
    }

//$data = array('success' => false, 'message' => $SQL);
//echo json_encode($data);
//die();
//test

    $SQL = $SQL . " FROM GASSTORE_tbl" . $table;

// se tabella prodotti ricavo anche la sommatoria dei like/dislike e del nr acquisti globale
    if($table=="Prodotti"){
        $SQL= $SQL . " left join gasstore_tblprodotti_like on Codice=codiceProdotto";
        $orderBy="";
    }

    if($where){
        $SQL = $SQL . ' where ' . $where;
    }
    if($orderBy){
        $SQL = $SQL .' order by ' . $orderBy ;
    }

    if($table=="Prodotti"){
        $SQL= $SQL . " group by Codice, Titolo, Prezzo, Image1";
    }

    $result = mysql_query($SQL);

    $rows = array();



    while ($db_field = mysql_fetch_assoc($result)) {
        /*
          print $db_field['IDUtente'] . "<BR>";
          print $db_field['Nome'] . "<BR>";
          print $db_field['Cognome'] . "<BR>";
          print $db_field['EMail'] . "<BR>";
         */
        // elimina caratteri NON UTF-8
        foreach ($db_field as &$value) {
            $value = mb_convert_encoding($value, 'UTF-8', 'UTF-8');
            ;
        }
        $rows[] = $db_field;
    }
    try {
        //header("Content-type: application/json", true);
        //echo json_encode($rows, true);
        if ($rows) {
            $data = array('success' => true, 'data' => $rows);
            //$data = array('success' => true, $rows);
        } else {
            $data = array('success' => false, 'message' => 'nessun record con il seguente SQL: ' . $SQL);
        }
        echo json_encode($data);
    } catch (Exception $err) {
        //console . log("motivo dell'errore: " . $err);
        $data = array('success' => false, 'message' => $err);
        echo json_encode($data);
    }

    //print json_encode($rows);
    //console(json_encode($rows));
    mysql_close($db_handle);
} else {
    //console . log("DATABASE NOT FOUND ");
    $data = array('success' => false, 'message' => 'DATABASE NOT FOUND');
    echo json_encode($data);
    mysql_close($db_handle);
}
?>