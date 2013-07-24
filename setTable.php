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

/* * *************************************************************************** */
/* * *************************************************************************** */
/* FUNCTION: ARRAYUNIQUE                                                      */
/* * *************************************************************************** */

function arrayUnique($array, $preserveKeys = false) {
    $arrayRewrite = array();
    $arrayHashes = array();
    foreach ($array as $key => $item) {
        //$xx = array_values($item);
        $xx=$item;
        echo '$xx: ' .$xx."\n";
        if (!in_array($xx, $arrayHashes)) {
            $arrayHashes[] = $xx;
            // Add element to the unique Array
            if ($preserveKeys) {
                $arrayRewrite[$key] = $item;
            } else {
                $arrayRewrite[] = $item;
                echo "sono in arrayrewrite false"."\n";
            }
        }
    }
    return $arrayRewrite;
}

/* * *************************************************************************** */
/* * *************************************************************************** */
/* FUNCTION: FILTER                                                           */
/* * *************************************************************************** */

function filter($var, $value) {
    return (is_array($var) && $var['IDFornitore'] == $value);
}

/* * *************************************************************************** */
/* * *************************************************************************** */
/* MAIN                                                                       */
/* * *************************************************************************** */
$data = strip_tags($_POST["data"]);
$data = utf8_encode($data);
$my_arr = array();
$my_arr = json_decode($data, true);
if (json_last_error() === JSON_ERROR_NONE) {

    //var_dump($my_arr);
    if (array_key_exists('IDUtente', $my_arr)) {
        echo "The 'IDUtente' element is in the array\n";
        $my_arr[]=$my_arr;
    } else {
        echo "The 'IDUtente' element not is in the array\n";
    }

    $my_new_arr=array();
    foreach ($my_arr as $key => $value) {
        echo $key . ':' . $value . "\n";
        foreach ($value as $k => $v) {
            echo 'k:'.$k . '-' .'v:'. $v . "\n";
            //$my_new_arr[]=$value;
        }
    }

    echo '*** fine contenuto my_arr ***' . "\n";

    $db_handle = mysql_connect($server, $user_name, $password);
    $db_found = mysql_select_db($database, $db_handle);
    if ($db_found) {
        /* set autocommit to off */
        mysqli_autocommit($db_handle, FALSE);

        // RICAVO IL MAX IDORDINE
        $rs = mysql_query("select max(IDOrdine) as id from GASSTORE_tblordini");
        while ($row = mysql_fetch_assoc($rs)) {
            $idOrdine = $row['id'];
        }

        // ************************************************************************
        // CICLO PER "GROUP BY FORNITORE"
        // my_arr_fornitori  al termine conterrà il distinct dei fornitori

        $my_arr_fornitori = array();
        //$my_arr_fornitori=$my_arr;
        //$my_arr_fornitori1 = array();

        //global $my_arr_fornitori1;
        //ECHO_TEST
        //$data = array('success' => true, 'data' => $my_arr_fornitori);
        //echo json_encode($data);
        //die();
        // ELIMINO I CAMPI NON NECESSARI PER LE SUCCESSIVE OPERAZIONI
        foreach ($my_arr as $key => $value) {
            foreach ($value as $k => $v) {

                if($k=='IDFornitore') {
                    echo 'value[IDFornitore] di my_arr: ' . $v . "\n";
                    $my_arr_fornitori[] = $v;
                }
            }
        }

        // ORDINA L'ARRAY PER FORNITORE
        echo '******** inizio array fornitori ordinato ********' . "\n";
        sort($my_arr_fornitori);
        echo 'my_arr_fornitori ordinato per IDFornitore contiene:' . "\n";
        foreach ($my_arr_fornitori as $key => $value) {
            echo $key .':'.$value . "\n";
        }
         echo '******** fine array fornitori ordinato ********' . "\n";

        // ELIMINA GLI ELEMENTI DOPPI
        echo '******** inizio array fornitori per eliminazione doppioni ********' . "\n";
        //$my_arr_fornitori = array();
        $my_arr_fornitori = arrayUnique($my_arr_fornitori);

        //ECHO_TEST
        //$data = array('success' => true, 'data' => $my_arr_fornitori);
        //echo json_encode($data);
        //die();

        echo 'my_arr_fornitori contiene:' . "\n";
        foreach ($my_arr_fornitori as $value) {
            echo $value . "\n";
        }
        echo '******** fine array fornitori  per eliminazione doppioni ********' . "\n";

        // ************************************************************************
        // CICLO PER ESTRAZIONE RIGHE ORDINI PER FORNITORE
        // per ogni fornitore filtreremo i dati presenti in ingresso per formulare
        // i rispettivi ordini
        // my_arr_dettaglio  al termine conterrà i record del fornitore in esame

        foreach ($my_arr_fornitori as $result) {

            // VARIABILI DI LAVORO
            //$forn_value = $result['IDFornitore'];
            $forn_value = $result;
            echo '$forn_value: ' . $forn_value . "\n";
            $importoTotale = 0;
            $idOrdine = $idOrdine + 1;

            //ECHO_TEST
            echo "in questo momento stiamo analizzando il fornitore: " . $forn_value . "\n";



            $my_arr_dettaglio=array();
            foreach ($my_arr as $result => $value) {
                if ($value['IDFornitore'] == $forn_value) {
                    echo 'ok!!!!!!!!!!!!!!!!!!!!!!!!'."\n";
                    // CARICO L'ARRAY PER GENERARE L'SQL
                    $my_arr_dettaglio[] = $value;
                }
            }





            echo 'ecco i dati che elaborerò per questo fornitore:' . "\n";
            foreach ($my_arr_dettaglio as $key => $value) {
                foreach($value as $k => $v) {
                        echo 'key: '.$k.' - '.'value: '.$v."\n";
                        // CALCOLO IMPORTO TOTALE
                        if($k=='Importo'){
                            $importoTotale = $importoTotale + $v;
                        }
                }
            }


            echo "importo totale ordine in esame: " . $importoTotale . "\n";

// FINO A QUA TESTATO E FUNZIONANTE




            // *********************************************************************
            // OPERAZIONI PER RIGHE ORDINE
            // campi necessari
            //  IDDettagliOrdine
            //  Codice
            //  Titolo
            //  DescrizioneBreve
            //  Prezzo
            //  DataIns
            //  OperatoreIns
            //  IDProdotto
            //  Quantity
            //  IDOrdine

            echo('*** inizio costruzione istruzione SQL')."\n";

            foreach ($my_arr_dettaglio as $key => $value) {

                echo 'qtà: ' .$value['Quantity']."\n";

                $my_arr_SQL["IDOrdine"] = $idOrdine;
                $my_arr_SQL["Quantity"] = $value['Quantity'];
                $my_arr_SQL["Titolo"] = $value['Titolo'];


                // CREO SINTASSI SQL PER RIGHE ORDINE
                $sql1=null;
                foreach ($my_arr_SQL as $key => $value) {
                    echo 'key: '.$key.' - value: '.$value."\n";
                    $sql = (is_numeric($value)) ? "`$key` = $value" : "`$key` = '" . mysql_real_escape_string($value) . "'";
                    echo 'sql: '.$sql."\n";
                    //$sql1 = implode(",", $sql);
                    if(is_null($sql1)){
                        $sql1 = $sql;
                    }
                    else {
                    $sql1 = $sql1.','.$sql;
                    }
                    echo 'sql1: '.$sql1."\n";
                }
            $sql_dettaglio = 'INSERT INTO GASSTORE_tbldettagliordini SET '.$sql1;
            echo "dettaglio SQL :".$sql_dettaglio."\n";
            die();

                            try {
                                $rs = mysql_query($sql_dettaglio);

                            } catch (Exception $err) {
                                $data = array('success' => false, 'message' => 'errore in istruzione SQL: ' . $sql_dettaglio);

                            }
            }


die();
if(1==2) {
            // *********************************************************************
            // OPERAZIONI PER TESTATE ORDINE
            // carico variabili di appoggio
            $utente = $my_arr_dettaglio[1]['OperatoreIns'];
            $fornitore = $my_arr_dettaglio[1]['Fornitore'];
            $dataIns = $my_arr_dettaglio[1]['DataIns'];
            $idUtente = $my_arr_dettaglio[1]['IDUtente'];
            $idFornitore = $my_arr_dettaglio[1]['IDFornitore'];

            // creo l'array per la testata
            $date = date("Ymd");
            $time = time("hhmmss");
            $my_arr_testata = array();
            $my_arr_testata = $my_arr_dettaglio;
            //$my_arr_testata["IDOrdine"]
            $my_arr_testata["CodiceOrdine"] = "ORDM" . $date . $time;
            $my_arr_testata["Utente"] = $utente;
            $my_arr_testata["PrezzoTotale"] = $importoTotale;
            $my_arr_testata["DataIns"] = $dataIns;
            $my_arr_testata["OperatoreIns"] = $utente;
            $my_arr_testata["IDUtente"] = $idUtente;
            $my_arr_testata["IDNegozio"] = $idFornitore;
            $my_arr_testata["Negozio"] = $fornitore;
            $my_arr_testata["Utente"] = $utente;
            $my_arr_testata["NoteCliente"] = null;
            $my_arr_testata["NoteNegozioPubbliche"] = null;
            $my_arr_testata["NoteNegozioPrivate"] = null;
            $my_arr_testata["IDStato"] = 1; //1=Inviato; 2=Confermato; 3=Annullato; 4=Archiviato
            $my_arr_testata["NoteStatoPubbliche"] = null;
            $my_arr_testata["NoteStatoPrivate"] = null;
            $my_arr_testata["NoteAnnullamento"] = null;
            $my_arr_testata["DataStato"] = $dataIns;
            $my_arr_testata["OperatoreStato"] = null;
            $my_arr_testata["DataConferma"] = null;
            $my_arr_testata["OperatoreConferma"] = null;

            foreach ($my_arr_testata as $key => $value) {
                $sql1 = (is_numeric($value)) ? "`$key` = $value" : "`$key` = '" . mysql_real_escape_string($value) . "'";
                $sql1 = implode(",", $sql1);
                $sql_testata = "INSERT INTO GASSTORE_tblordini SET $sql1";
                try {
                    $rs = mysql_query($sql_testata);
                    echo $sql_testata . "\n";
                } catch (Exception $err) {
                    $data = array('success' => false, 'message' => 'errore in istruzione SQL: ' . $sql_testata);
                    echo json_encode($data) . "\n";
                }
            }

            // *********************************************************************
            // Eseguo COMIT

            mysqli_commit($db_handle);
        }
        }

        /* Rollback */
        mysqli_rollback($db_handle);
        mysql_close($db_handle);
        $data = array('success' => true, 'message' => 'creato ordine nr. ' . $idOrdine);
        echo json_encode($data) . "\n";
    } else {
        $data = array('success' => false, 'message' => 'DATABASE NOT FOUND');
        echo json_encode($data) . "\n";
        mysql_close($db_handle);
    }
} else {
          $data = array('success' => false, 'message' => 'not a valid json');
          echo json_encode($data) . "\n";

}
?>