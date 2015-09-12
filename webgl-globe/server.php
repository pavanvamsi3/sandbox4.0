<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');


$myFile = fopen('geo-ray.log', 'r') or die('Unable to open file!');
$counts = array();
$data = array();
$i = 0;
while(!feof($myFile)) {
  $line = fgets($myFile);
  $latitudeIndex = strpos($line, ",lat");
  $cityIndex = strpos($line, ",city");
  $latitude = (float)substr($line, $latitudeIndex + 5, 5);
  $data[$i]['latitude'] = $latitude;
  $longitude = (float)substr($line, strpos($line, ",long") + 6, 5);
  $data[$i]['longitude'] = $longitude;
  $city = substr($line, $cityIndex + 6, strpos($line, ',', $cityIndex + 1) - $cityIndex - 6);
  $data[$i]['city'] = $city;
  $counts[$city] = array_key_exists($city, $counts) ? $counts[$city] + 1 : 1;
  $data[$i]['city_counts'] = $counts[$city];
  $firstQuoteIndex = strpos($line, '"');
  $secondQuoteIndex = strpos($line, '"', $firstQuoteIndex + 1);
  $request = substr($line, $firstQuoteIndex + 1, $secondQuoteIndex - $firstQuoteIndex - 1);
  $urlTokens = explode('/', explode(' ', $request)[1]);
  $requestCategory = count($urlTokens) > 3 
                        ? $urlTokens[3] 
                        : null;
  $data[$i]['request_category'] = $requestCategory;
  $statusCode = (int)substr($line, $secondQuoteIndex + 2, 3);
  $data[$i]['status_code'] = $statusCode;
  $i++;
}
$array = array();
$array[] = array();
$i = 0;
$countOfCities = 0;
foreach($data as $d) {
  $countOfCities = $countOfCities + $d['city_counts'];
}
$array[0][0] = 'appointments';
$points = array();
foreach($data as $key => $d) {
  if ( $d['request_category'] == 'appointments') {
    array_push($points, $d['latitude'], $d['longitude'], ($d['city_counts']/$countOfCities)*10);
  }
}
$array[0][1] = $points;
$array = json_encode($array);
fclose($myFile);
//$array = array();
//$array[] = array();
//$array[0][0] = "1990";
//$array[0][1] = array(12, 77, rand(0, 9) / 10);
//array = json_encode($array);
echo "data: {$array}\n\n";

flush();
?>