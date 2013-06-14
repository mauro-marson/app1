<?PHP
/*
TESTATE ORDINI
campi:
IDOrdine
CodiceOrdine
Utente
PrezzoTotale
DataIns
OperatoreIns
IDUtente
IDNegozio
Negozio
NoteCliente
NoteNegozioPubbliche
NoteNegozioPrivate
IDStato
NoteStatoPubbliche
NoteStatoPrivate
NoteAnnullamento
DataStato
OperatoreStato
DataConferma
OperatoreConferma

DETTAGLIO ORDINI
campi:
IDDettagliOrdine
Codice
Titolo
DescrizioneBreve
Prezzo
DataIns
OperatoreIns
IDProdotto
Quantity
IDOrdine
*/

include 'config.php';

$data = strip_tags($_POST["data"]);
$my_arr = json_decode($data, true);



// log
//$data = array('success' => false, 'message' => $my_arr);
//echo json_encode($data);
//die();


$db_handle = mysql_connect($server, $user_name, $password);
$db_found = mysql_select_db($database, $db_handle);
if ($db_found) {
    /* set autocommit to off */
    mysqli_autocommit($db_handle, FALSE);

    // ricavo il max IDOrdine
    $rs=mysql_query("select max(IDOrdine) as id from GASSTORE_tblordini");
    while ($row = mysql_fetch_assoc($rs)) {
        $idOrdine= $row['id'];
    }

    // DETTAGLIO ORDINI *****************************************************

    // elimino i campi non utilizzati
    $my_arr_dettaglio= $my_arr;
    unset($my_arr_dettaglio["Fornitore"]);
    unset($my_arr_dettaglio["Importo"]);
    unset($my_arr_dettaglio["id"]);
    unset($my_arr_dettaglio["IDOrdine"]);

    // aggiungo nell'array la key IDOrdine
    $my_arr_dettaglio["IDOrdine"] = $idOrdine+1;

    foreach($my_arr_dettaglio as $key => $value){
        $sql[] = (is_numeric($value)) ? "`$key` = $value" : "`$key` = '" . mysql_real_escape_string($value) . "'";
    }
    $sql = implode(",",$sql);
    $sql_dettaglio = "INSERT INTO GASSTORE_tbldettagliordini SET $sql";

    // ORDINI **************************************************************

    // elimino i campi non utilizzati
    $my_arr_ordine= $my_arr;
    unset($my_arr_ordine["Fornitore"]);
    unset($my_arr_ordine["Importo"]);
    unset($my_arr_ordine["id"]);
    unset($my_arr_ordine["IDOrdine"]);

    foreach($my_arr_ordine as $key => $value){
            $sql[] = (is_numeric($value)) ? "`$key` = $value" : "`$key` = '" . mysql_real_escape_string($value) . "'";
        }
    $sql = implode(",",$sql);
    $sql_ordine = "INSERT INTO GASSTORE_tblordini SET $sql";
    *
    try {
    $rs = mysql_query($sql_dettaglio);
    $rs = mysql_query($sql_ordine);
        // ritorno il numero ordine
        $data = array('success' => true, 'data' => $rs);
        echo json_encode($data);

        /* commit transaction */
        mysqli_commit($db_handle);
    }
    catch (Exception $err) {
        $data = array('success' => false, 'message' => 'errore in istruzione SQL: ' . $SQL);
        echo json_encode($data);
    }

    /* Rollback */
    mysqli_rollback($db_handle);
    mysql_close($db_handle);
    }
else {
    $data = array('success' => false, 'message' => 'DATABASE NOT FOUND');
    echo json_encode($data);
    mysql_close($db_handle);
}
?>