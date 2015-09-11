<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$array = array();
$array[] = array();
$array[0][0] = "1990";
$array[0][1] = array(12, 77, rand(0, 9) / 10);
$array = json_encode($array);
// $time = date('r');
echo "data: {$array}\n\n";
// echo "data: {$array}";
flush();
?>