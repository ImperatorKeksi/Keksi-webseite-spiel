<?php
session_start();
$pdo = new PDO('mysql:host=jyvg.your-database.de;dbname=kljqly_db1', 'kljqly_j', 'r4:)1J9Gct.5$B');

$username = $_POST['username'];
$password = $_POST['password'];

$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$username]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['username'] = $user['username'];
    $_SESSION['role'] = $user['role'];
    echo "Login erfolgreich!";
} else {
    echo "Login fehlgeschlagen!";
}
?>