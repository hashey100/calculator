<?php
class saveArrayToCSV
{
    public function pushArray()
    {
        $array = array();
        array_push($array,$_POST['answer'], date('Y-m-d H:i:s'), $_SERVER["REMOTE_ADDR"], $_SERVER['HTTP_USER_AGENT']);
        return $array;
    }
    public function saveToCSV()
    {
        $array = $this->pushArray();
        $file = fopen("../saved-data.csv","a");
        fputcsv($file,$array);
        fclose($file);
    }
}
$csv = new saveArrayToCSV();
$csv->saveToCSV();
?>