<?php 
$showAlert = false;
$showError = false;
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
$server = "localhost";
$username = "root";
$password = "";
$database = "ca";

$conn = mysqli_connect($server, $username, $password, $database);
if (!$conn){
//     echo "success";
// }
// else{
    die("Error". mysqli_connect_error());
}
$name=$_POST['name'];
$email=$_POST['email'];
$phone=$_POST['phone'];
$message=$_POST['message'];
    // $exists=false;

    // Check whether this username exists
    $existSql = "SELECT * FROM `contact` WHERE name = '$name'";
    $result = mysqli_query($conn, $existSql);
    
        if(!empty($name) && !empty($email) && !empty($phone) && !empty($message)){
            // INSERT INTO `contact` (`sno`, `name`, `email`, `phone`, `message`) VALUES ('1', 'akhi', 'akhi@gmail.com', '86374554', 'hii');
            $sql = "INSERT INTO `contact` (`name`, `email`, `phone`, `message`) VALUES ('$name', '$email', '$phone', '$message')";
            $result = mysqli_query($conn, $sql);
            if ($result) {
                $showAlert = true;
            }
        } else {
            $showError = "Incomplete information!,Please fill the complete information";
        }
    
}
?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
    <link rel="stylesheet" href="contact.css">
    <script>
    src = "https://kit.fontawesome.com/64d58efce2.js"
    crossorigin = "anonymous"
    </script>
    <title>Contact Form</title>
    <style>
    .alert {
        padding: 20px;
        background-color: #f44336;
        color: white;
        opacity: 1;
        transition: opacity 0.6s;
        margin-bottom: 15px;
    }

    .alert.success {
        background-color: #04AA6D;
    }

    .alert.info {
        background-color: #2196F3;
    }

    .alert.warning {
        background-color: #ff9800;
    }

    .closebtn {
        margin-left: 15px;
        color: white;
        font-weight: bold;
        float: right;
        font-size: 22px;
        line-height: 20px;
        cursor: pointer;
        transition: 0.3s;
    }

    .closebtn:hover {
        color: black;
    }
    </style>

</head>

<body>

    <?php
    

    if ($showAlert) {
        echo '<div class="alert success">
  <span class="closebtn" o">&times;</span>
  <strong>Success!</strong> Your information is submitted successfully.
</div>';
    }
    if ($showError) {
        
     echo '<div class="alert success">
  <span class="closebtn" o">&times;</span>
  <strong>Error!</strong> ' . $showError . '.
</div>';
    }
    ?>

  
    <div class="container">
        <span class="big-circle"></span>
        <img src="/CA/contact/shape.png" class="square" alt="">
        <div class="form">
            <div class="contact-info">
                <h3 class="title">Let's get in touch</h3>
                <br>
                <br>

                <div class="info">
                    <div class="information">
                        <img src="/CA/contact/location.png" class="icon" alt="">
                        <p>A. P. Dhavaleshwar, Tal. Khanapur, Dist. Sangli</p>
                    </div>
                    <div class="information">
                        <img src="/CA/contact/email.png" class="icon" alt="">
                        <p>akhipatil0707@gmail.com</p>
                    </div>
                    <div class="information">
                        <img src="/CA/contact/phone.png" class="icon" alt="">
                        <p>7666990703</p>
                    </div>
                </div>

                <div class="social-media">
                    <p>Connect with us :</p>
                    <div class="social-icon">
                        <a href="#">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div class="contact-form">
                <span class="circle one"></span>
                <span class="circle two"></span>

                <form action="contact.php" method="post">
                    <h3 class="title">Contact us</h3>
                    <div class="input-container">
                        
                        <input type="text" name="name" class="input" >
                        <label for="">Username</label>
                        <span>Username</span>
                    </div>
                    <div class="input-container">
                      
                        <input type="email" name="email" class="input" >
                        <label for="">Email</label>
                        <span>Email</span>
                    </div>
                    <div class="input-container">
                        <input type="number" name="phone" class="input">
                        <!-- <input type="tel" name="phone" class="input" required> -->
                        <label for="">Phone</label>
                        <span>Phone</span>
                    </div>
                    <div class="input-container textarea">
                        <textarea name="message" class="input"></textarea>
                        <label for="">Message</label>
                        <span>Message</span>
                    </div>
                    <input type="submit" value="Send" class="btn">
                </form>

            </div>
        </div>
    </div>
    <script src="../js/contact.js"></script>
    <script>
var close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
  close[i].onclick = function(){
    var div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.display = "none"; }, 600);
  }
}
</script>

    <script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
</body>

</html>