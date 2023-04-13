<?php

require_once('connection.php');
 
// Create the words table if it doesn't exist
$sql = "CREATE TABLE IF NOT EXISTS words (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        word VARCHAR(255) NOT NULL
    )";

if (mysqli_query($conn, $sql)) {
    echo "Table words created successfully\n";
} else {
    echo "Error creating table: " . mysqli_error($conn) . "\n";
}

// Read from the text file and insert words of length between 5 to 10
$filename = "words.txt";
$file = fopen($filename, "r");

if ($file) {
    while (($word = fgets($file)) !== false) {
        // Trim the word
        $word = trim($word);

        // Insert the word if it is between 5 to 10 characters long
        if (strlen($word) >= 5 && strlen($word) <= 10) {
            $sql = "SELECT * FROM words WHERE word = '$word'";
            if (mysqli_query($conn, $sql)->num_rows == 0) {
                $sql = "INSERT INTO words (word) VALUES ('$word')";
                if (mysqli_query($conn, $sql)) {
                    echo "Word '$word' inserted successfully\n";
                } else {
                    echo "Error inserting word '$word': " . mysqli_error($conn) . "\n";
                }
            } else {
                echo "Word '$word' already exists\n";
            }
        }
    }
    fclose($file);
} else {
    echo "Error reading file\n";
}

$conn->close();
?>
