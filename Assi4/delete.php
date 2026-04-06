<?php
$conn = mysqli_connect("localhost", "root", "niru", "student_db");

$roll = $_POST['roll'];

$sql = "DELETE FROM students WHERE roll_no='$roll'";

if (mysqli_query($conn, $sql)) {
    echo "Record Deleted Successfully";
} else {
    echo "Error deleting record";
}
?>