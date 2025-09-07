<?php
// Set the path to the folder with downloadable files
$file_path = 'uploads/';

// Check if the 'file' parameter was passed in the URL
if (isset($_GET['file'])) {
    $file_name = basename($_GET['file']);
    $file_full_path = $file_path . $file_name;

    // Check if the file exists on the server
    if (file_exists($file_full_path)) {
        // Set HTTP headers that will prompt the browser to download the file
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . $file_name . '"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file_full_path));

        // Clear the output buffer and read the file, sending it to the browser
        ob_clean();
        flush();
        readfile($file_full_path);
        exit;
    } else {
        // If the file does not exist, display an error
        http_response_code(404);
        die('File does not exist.');
    }
} else {
    // If the 'file' parameter was not passed, display an error
    http_response_code(400);
    die('Bad request.');
}
?>