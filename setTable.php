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

function arrayUnique($array, $preserveKeys = true)
{
    // Unique Array for return
    $arrayRewrite = array();
    $arrayHashes = array();
    foreach($array as $key => $item) {
        $xx=array_values($item);
        if (!in_array($xx, $arrayHashes)){
            $arrayHashes[] = $xx;
            // Add element to the unique Array
            if ($preserveKeys) {
                $arrayRewrite[$key] = $item;
            } else {
                $arrayRewrite[] = $item;
            }
        }
    }
    //$data = array('success' => false, 'message' => $arrayRewrite);
    //echo json_encode($data);
    //die();

    return $arrayRewrite;
}


function filter($var, $value)
{
    return (is_array($var) && $var['IDFornitore'] == $value);
}


$data = strip_tags($_POST["data"]);
$my_arr = json_decode($data, true);



// TEST
//$data = array('success' => false, 'message' => $my_arr);
//echo json_encode($data);
//die();


$db_handle = mysql_connect($server, $user_name, $password);
$db_found = mysql_select_db($database, $db_handle);
if ($db_found) {
    /* set autocommit to off */
    mysqli_autocommit($db_handle, FALSE);

     // TEST
     //$data = array('success' => true, 'data' => 'dopo il comit false');
     //echo json_encode($data);
     //die();

    // ricavo il max IDOrdine
    $rs=mysql_query("select max(IDOrdine) as id from GASSTORE_tblordini");
    while ($row = mysql_fetch_assoc($rs)) {
        $idOrdine= $row['id'];
    }
    // TEST
    //$data = array('success' => true, 'data' => $idOrdine);
    //echo json_encode($data);
    //die();

    // CICLO PER "GROUP BY FORNITORE"
    // my_arr_fornitori conterrà i fornitori presenti nei dati in ingresso
    $my_arr_fornitori= array();
    $my_arr_fornitori=$my_arr;

    // TEST
    //$data = array('success' => true, 'data' => $my_arr_fornitori);
    //echo json_encode($data);
    //die();
    global $my_arr_fornitori1;

    foreach($my_arr_fornitori as $value)
    {
        unset($value["Codice"]);
        unset($value["Titolo"]);
        unset($value["DescrizioneBreve"]);
        unset($value["Prezzo"]);
        unset($value["DataIns"]);
        unset($value["OperatoreIns"]);
        unset($value["IDProdotto"]);
        unset($value["Quantity"]);
        unset($value["IDOrdine"]);
        unset($value["Importo"]);
        unset($value["Fornitore"]);
        unset($value["IDUtente"]);
        unset($value["id"]);

        $my_arr_fornitori1[]=$value;
    }

    //TEST
    //$data = array('success' => true, 'data' => $my_arr_fornitori1);
    //echo json_encode($data);
    //die();

    // ordina l'array per idFornitore
    sort($my_arr_fornitori1);

    // TEST
    //$data = array('success' => true, 'data' => $my_arr_fornitori1);
    //echo json_encode($data);
    //die();


    // elimina gli elementi doppi
    $my_arr_fornitori = array();
    $my_arr_fornitori = arrayUnique($my_arr_fornitori1);

    //TEST
    //$data = array('success' => true, 'data' => $my_arr_fornitori);
    //echo json_encode($data);
    //die();

    // CICLO PER RIGHE PER FORNITORE
    // per ogni fornitore filtreremo i dati presenti in ingresso per formulare i rispettivi ordini
    //foreach($my_arr_fornitori as $result) {
    //             echo "array fornitori:".$result['IDFornitore'].'<br>';
    //}

    foreach($my_arr_fornitori as $result){
        $forn_value=$result['IDFornitore'];
        // TEST
        //echo "in questo momento stiamo analizzando il fornitore: ".$forn_value;
        $my_arr_dettaglio=array();
        //foreach($my_arr as $result) {
        //     echo "array dettagli:".$result['IDProdotto'].'<br>';
        //}
        foreach ($my_arr as $result) {
            $forn_value1=$result['IDFornitore'];
            //echo "fornitore array dettaglio: ".$forn_value1;
            if ($result['IDFornitore']== $forn_value)  {
                //$my_arr_dettaglio[] = $value;
                //echo "dettaglio"."<br/>";
                //echo "articolo: ".$result['IDProdotto']." del fornitore: ".$forn_value;
                $my_arr_dettaglio=$result;
            }
        }
        //foreach($my_arr_dettaglio as $result) {
        //    echo $result['IDProdotto'].'-'.$result['Quantity'].'<br>';
        //}
        // TEST
        //foreach($my_arr_dettaglio as $key => $value){
        //            echo "key: ".$key;
        //            echo "value: ".$value;
        //        }

        //echo "fine dettaglio"."<br/>";
        //die();
        // DETTAGLIO ORDINI *****************************************************
        /*
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

        // Calcolo importo totale
        $importoTotale=0;
        foreach($my_arr_dettaglio as $result){
                        $importoTotale= $importoTotale+$result["Importo"];
        }

        // elimino i campi non utilizzati
        unset($my_arr_dettaglio["Fornitore"]);
        unset($my_arr_dettaglio["Importo"]);
        unset($my_arr_dettaglio["id"]);
        unset($my_arr_dettaglio["IDOrdine"]);

        // aggiungo nell'array la key IDOrdine
        $my_arr_dettaglio["IDOrdine"] = $idOrdine+1;

        // aggiungo i campi mancanti
        //$my_arr_dettaglio["Codice"] = '';
        //$my_arr_dettaglio["Titolo"] = '';
        //$my_arr_dettaglio["DescrizioneBreve"] = '';
        //$my_arr_dettaglio["Prezzo"] = 0;
        //$my_arr_dettaglio["DataIns"] = null;
        //$my_arr_dettaglio["OperatoreIns"] = '';
        //$my_arr_dettaglio["IDProdotto"] = null;
        //$my_arr_dettaglio["Quantity"] = 0;

        // creo la sintassi SQL
        foreach($my_arr_dettaglio as $key => $value){
            $sql[] = (is_numeric($value)) ? "`$key` = $value" : "`$key` = '" . mysql_real_escape_string($value) . "'";
        }
        $sql = implode(",",$sql);
        $sql_dettaglio = "INSERT INTO GASSTORE_tbldettagliordini SET $sql";
        // TEST
        //echo "dettaglio SQL :".$sql_dettaglio;
        //die();

        // ORDINI **************************************************************

        // carico variabili di appoggio
        $utente=$my_arr[1]['OperatoreIns'];
        $fornitore=$my_arr[1]['Fornitore'];
        $dataIns=$my_arr[1]['DataIns'];
        $idUtente=$my_arr[1]['IDUtente'];
        $idFornitore=$my_arr[1]['IDFornitore'];

        // creo l'array per la testata
        $date= date("Ymd");
        $time= time("hhmmss");
        //$my_arr_ordinr["IDOrdine"]
        $my_arr_ordine["CodiceOrdine"] = "ORDM".$date.$time;
        $my_arr_ordine["Utente"] = $utente;
        $my_arr_ordine["PrezzoTotale"] = $importoTotale;
        $my_arr_ordine["DataIns"] = $dataIns;
        $my_arr_ordine["OperatoreIns"] = $utente;
        $my_arr_ordine["IDUtente"] = $idUtente;
        $my_arr_ordine["IDNegozio"] = $idFornitore;
        $my_arr_ordine["Negozio"] = $fornitore;
        $my_arr_ordine["Utente"] = $utente;
        $my_arr_ordine["NoteCliente"] = null;
        $my_arr_ordine["NoteNegozioPubbliche"] = null;
        $my_arr_ordine["NoteNegozioPrivate"] = null;
        $my_arr_ordine["IDStato"] = 1; //1=Inviato; 2=Confermato; 3=Annullato; 4=Archiviato
        $my_arr_ordine["NoteStatoPubbliche"] = null;
        $my_arr_ordine["NoteStatoPrivate"] = null;
        $my_arr_ordine["NoteAnnullamento"] = null;
        $my_arr_ordine["DataStato"] = $dataIns;
        $my_arr_ordine["OperatoreStato"] = null;
        $my_arr_ordine["DataConferma"] = null;
        $my_arr_ordine["OperatoreConferma"] = null;

        foreach($my_arr_ordine as $key => $value){
            $sql[] = (is_numeric($value)) ? "`$key` = $value" : "`$key` = '" . mysql_real_escape_string($value) . "'";
        }
        $sql = implode(",",$sql);
        $sql_ordine = "INSERT INTO GASSTORE_tblordini SET $sql";

        // *********************************************************************
        // Eseguo le istruzioni SQL
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