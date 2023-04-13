<?php

require_once('connection.php');


// Get the value of k from the request
$k = 5;

// Query the database to get a list of words
$sql = "SELECT * FROM words";
$result = $conn->query($sql);

// Get the number of words in the database
$num_words = $result->num_rows;

// Initialize an array to store the selected words
$selected_words = array();

// If k is greater than or equal to the number of words, select all the words
if ($k >= $num_words) {
  while ($row = $result->fetch_assoc()) {
    $selected_words[] = $row['word'];
  }
} else {
  // Otherwise, select k random words
  $rand_indexes = array_rand(range(0, $num_words - 1), $k);
  foreach ($rand_indexes as $index) {
    $result->data_seek($index);
    $row = $result->fetch_assoc();
    $selected_words[] = $row['word'];
  }
}

// Output the selected words as a JSON-encoded array
header('Content-Type: application/json');
echo json_encode($selected_words);

// Close the database connection
$conn->close();

?>
