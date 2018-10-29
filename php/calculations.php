<?php
class saveCSVToTable
{
    public function csvToArray()
    {
        $arr  = array();
        $file = fopen('../saved-data.csv', 'r');
        while (($result = fgetcsv($file)) !== FALSE) {
            $arr[] = $result;
        }
        return $arr;   
    }
    public function arrayToTable()
    {
        $arr = $this->CSVToArray();
        echo "<table><tr><th>Answer</th><th>Date</th><th>IP Address</th><th>Browser</th></tr>";
        foreach ($arr as $v) {
            echo "<tr>";
            foreach ($v as $vv) {
                echo "<td>{$vv}</td>";
            }
            echo "<tr>";
        }
    }
}
$csv = new saveCSVToTable();
$csv->arrayToTable();
?>