<?php
require_once('FirePHPCore/FirePHP.class.php');
require_once('FirePHPCore/fb.php');
ob_start();  //<--- not needed we have output_buffering = 4096 in our php.ini file
//echo "PHP works too :}";
/*echo ($result); //pkostov
die();*/

//$test = "Test for FirePHP";
//fb($test, 'Teeest');

fb( 'We are in my_data_2.php ');


$page = $_GET['page']; // get the requested page
$limit = $_GET['rows']; // get how many rows we want to have into the grid
$sidx = $_GET['sidx']; // get index row - i.e. user click to sort
$sord = $_GET['sord']; // get the direction
if(!$sidx) $sidx =1;
// connect to the database
$db = mysql_connect('localhost', 'root', '') or die("Connection Error: " . mysql_error());

mysql_select_db('newmg') or die("Error conecting to db.");

$result = mysql_query("SELECT COUNT(*) AS count FROM log l JOIN user u ON l.user_id = u.id");
$row = mysql_fetch_array($result,MYSQL_ASSOC);
$count = $row['count'];

if( $count >0 )
{
    $total_pages = ceil($count/$limit);
}
else
{
    $total_pages = 0;
}
if ($page > $total_pages) $page=$total_pages;
$start = $limit*$page - $limit; // do not put $limit*($page - 1)
$SQL = "SELECT  l.message as message , l.category as category, l.created as created, u.username as username, u.email as email, u.role as role, u.modified as modified
                FROM log l JOIN user u ON l.user_id = u.id
                ORDER BY $sidx $sord LIMIT $start , $limit";
fb( $SQL, "SQL_2: ");
$result = mysql_query( $SQL ) or die("Couldn t execute query.".mysql_error());



$responce = new stdClass();
$responce->page = $page;
$responce->total = $total_pages;
$responce->records = $count;

$i=0;
while($row = mysql_fetch_array($result,MYSQL_ASSOC)) {
  //  $responce->rows[$i]['id']=$row['id'];
    $responce->rows[$i]['cell']=array($row['message'], $row['category'], $row['created'], $row['username'], $row['email'], $row['role'], $row['modified'] );
    $i++;
}
fb($responce, "responce_2 ->");
echo json_encode($responce);

?>