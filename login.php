<?php
require 'db.php';

$username = $_POST['username'];
$password = $_POST['password'];

$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
  $user = $result->fetch_assoc();
  if (password_verify($password, $user['password'])) {
    echo $user['role']; // send role back to JS
  } else {
    echo "wrong";
  }
} else {
  echo "not_found";
}

$stmt->close();
$conn->close();
?>
