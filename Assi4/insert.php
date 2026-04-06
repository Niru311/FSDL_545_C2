<?php
$conn = mysqli_connect("localhost", "root", "niru", "student_db");

$fname = $_POST['fname'];
$lname = $_POST['lname'];
$roll = $_POST['roll'];
$pass = $_POST['pass'];
$cpass = $_POST['cpass'];
$contact = $_POST['contact'];

// Validation
if ($pass != $cpass) {
    echo "Passwords do not match!";
    exit();
}

$sql = "INSERT INTO students(fname,lname,roll_no,password,contact)
        VALUES('$fname','$lname','$roll','$pass','$contact')";

if (mysqli_query($conn, $sql)) {
    echo "Student Registered Successfully";
} else {
    echo "Error: " . mysqli_error($conn);
}
?>