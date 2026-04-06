<?php
$conn = mysqli_connect("localhost", "root", "niru", "student_db");

$roll = $_POST['roll'];

$result = mysqli_query($conn, "SELECT * FROM students WHERE roll_no='$roll'");

if ($row = mysqli_fetch_assoc($result)) {
    echo "Name: ".$row['fname']." ".$row['lname']."<br>";
    echo "Contact: ".$row['contact'];
} else {
    echo "No Record Found";
}
?>