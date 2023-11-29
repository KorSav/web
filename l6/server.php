<?php
    $reqm = $_SERVER["REQUEST_METHOD"];
    if ($reqm === "POST"){
        $dataToWrite = $_POST["data"];
        file_put_contents("masonry.txt", $dataToWrite);
        echo "Data are stored.";
    } else if ($reqm === "GET"){
        if ($_GET["q"] === "time"){
            echo filemtime("masonry.txt");
        }
        else if($_GET["q"] === "data"){
            echo file_get_contents("masonry.txt");
        }
        else{
            http_response_code(400);
            echo "Wrong request. Only q=time and q=data are supported.";
        }
    }
    else{
        http_response_code(400);
        echo "Request method is not supported.";
    }
?>