<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if ($_REQUEST["type"] == "clear"){
        file_put_contents('server.json', "");
        file_put_contents('localStorage.json', "");
        return;
    }
    $microtime = microtime(true);
    $data = json_decode($_REQUEST["data"]);
    $data[] = round($microtime * 1000);
    if (json_last_error() == JSON_ERROR_NONE) {
        if ($_REQUEST["type"] == "single"){
            if (!file_exists('server.json')){
                file_put_contents("server.json", "");
            }
            $existingData = json_decode(file_get_contents('server.json'), true);
            if (!is_array($existingData)) {
                $existingData = [];
            }
            $existingData[] = $data;
            file_put_contents('server.json', json_encode($existingData));
            echo "Data saved.";
        }else if ($_REQUEST["type"] == "multiple"){
            file_put_contents('localStorage.json', $_REQUEST["data"]);
            echo "Data saved.";
        }else{
            http_response_code(400);
            echo "Invalid save type.";
        }
    } else {
        http_response_code(400);
        echo "Invalid JSON data.";
    }
} else {
    http_response_code(400);
    echo "Send a POST request.";
}
?>
