<?php
// Get the state from the URL parameter
$state = $_GET['state'];

// Define the file path
$filePath = 'state.txt';

// Open the file in write mode
$file = fopen($filePath, 'w');

// Write the state to the file
fwrite($file, $state);

// Close the file
fclose($file);
?>
