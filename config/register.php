<?php
// Datenbankverbindung
$pdo = new PDO('mysql:host=jyvg.your-database.de;dbname=kljqly_db1', 'kljqly_j', 'r4:)1J9Gct.5$B');

// Eingaben holen
$username = $_POST['username'];
$password = $_POST['password'];
$email = $_POST['email'];
$role = $_POST['role'];

// Passwort verschlüsseln
$hash = password_hash($password, PASSWORD_DEFAULT);

// Nutzer speichern
$stmt = $pdo->prepare("INSERT INTO users (username, password, role, email) VALUES (?, ?, ?, ?)");
$stmt->execute([$username, $hash, $role, $email]);

echo "Registrierung erfolgreich!";
?>