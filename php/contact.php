<?php

session_start();
	
if(isset($_POST['email'])){
	$email_to = "adam@adamjohnsondev.com";
	$email_subject = "Job Offer - form";
	
	$_SESSION['error'] = "";
	$error_count = 0;
	
	// make sure the data exists
	if(!isset($_POST['name']) ||
		!isset($_POST['email'])){
		died("Name or Email field is empty.");
	} else {
        $name = $_POST['name'];
        $email_from = $_POST['email']; 
    }
	
	// set the variables
    if(isset($_POST['details'])){
        $project = $_POST['details'];
    }
    /*
    if(isset($_POST['website'])){
        $website = $_POST['website'];
    }
    if(isset($_POST['company'])){
        $company = $_POST['company'];
    }
    */
	
	
	$error_details = "";
	
	// user entered an invalid email
	$email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
	if(!preg_match($email_exp, $email_from)){
		$_SESSION['error'] .= "The email you entered is invalid. <br/>";
		$error_count++;
	}
	
	// some error occured
	if($error_count > 0){
		header("Location: error.php");
		die();
	}
	
	// add the details of the form to the details
	//$email_details = "Form details below: <br/><br/>";
    $email_details = "";
	
	function clean_string($string){
		$bad = array("content-type", "bcc:", "cc:", "to:", "href");
		return str_replace($bad, "", $string);
	}


	$email_details .= "Name: " . clean_string($name) . "\n";
	$email_details .= "Email: " . clean_string($email_from) . "\n";

    //if(isset($_POST['company'])){
        //$email_details .= "Company: " . clean_string($company) . "\n";
    //}
    //if(isset($_POST['website'])){
        //$email_details .= "Website: " . clean_string($website) . "\n";
    //}
    //if(isset($_POST['details'])){
        $email_details .= "Project: " . clean_string($project) . "\n";
    //}

	// setup the headers
	$headers = "From: " . $email_from . "\r\n"
	. "Reply To: " . $name . " <" . $email_from . ">";
	
	// send the email
	@mail($email_to, $email_subject, $project, $headers);

    $confirmation = "This is your confirmation email!\n\nIf you're getting this, it means your email was sent to me and I'll follow up personally as soon as I can.\n\nIf for some reason I don't contact you in the next 24 hours, go ahead and email me directly at the following address: " . $email_to . "\n";
    $confirmation_subject = "Adam Johnson Dev - Email Confirmation";
    $name = "Adam Johnson";
	$headers = "From: " . $email_to . "\r\n"
	. "Reply To: " . $name . " <" . $email_to . ">";
    @mail($email_from, $confirmation_subject, $confirmation);
?>

<!-------------------- BEGIN HTML -------------------->
<html>

<head>
	<title>Adam Johnson Dev</title>
	<link type="text/css" rel="stylesheet" href="../css/style.css">

    <style>
        body {
            padding: 2.168em;
        }

        p {
            text-align: center;
            font-size: 1em;
        }

        a {
            font-family: "Josefin Sans", sans-serif;
        }
    </style>
</head>

<body>
<div class="body">

    <div class="content">
        <p><strong>Thank you for contacting me!</strong></p>
        <br />
        <p>You should be getting a confirmation email soon. If that email doesn't come, or I don't contact you in the next 24 hours, go ahead and email me directly at adam@adamjohnsondev.com.</p>
        <p><a href="http://adamjohnsondev.com">CLICK HERE</a> to go back.</p>
    </div>
	
</div>
</body>

</html>

<!-------------------- END HTML -------------------->

<?php
}
?>
