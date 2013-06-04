<?PHP

//include 'config.php';

$value = json_decode(stripslashes($_POST), true);

echo $value;
/*
  $db_handle = mysql_connect($server, $user_name, $password);
  $db_found = mysql_select_db($database, $db_handle);
  if ($db_found) {
  $SQL = "update gasstore_tblutenti set Email='" . $email . "', Telefono='" . $telefono . "', PWD='" . $PWD . "' where UserName='" . $user . "'";
  try {
  $result = mysql_query($SQL);
  } catch (Exception $err) {
  console . log("errore nell'aggiornamento delle informazioni utente");
  }
  mysql_close($db_handle);
  }
 *
 */
?>