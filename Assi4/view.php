<?php
$conn = mysqli_connect("localhost", "root", "niru", "student_db");

$result = mysqli_query($conn, "SELECT * FROM students");

echo "<table border='1'>
<tr>
<th>ID</th><th>Name</th><th>Roll</th><th>Contact</th>
</tr>";

while($row = mysqli_fetch_assoc($result)) {
    echo "<tr>
    <td>".$row['id']."</td>
    <td>".$row['fname']." ".$row['lname']."</td>
    <td>".$row['roll_no']."</td>
    <td>".$row['contact']."</td>
    </tr>";
}

echo "</table>";
?>