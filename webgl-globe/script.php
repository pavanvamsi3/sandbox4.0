<?php
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
print_r($data);
fclose($myFile);
?>