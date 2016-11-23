<?php
session_start();
?>

<html>

<head>
	<title>Adam Johnson Dev</title>
	<link rel="icon" type="image/ico" href="/img/icon.ico">
	<link rel="stylesheet" href="../css/style.css">

    <style>
        body {
            font-family: 'Josefin Sans', sans-serif;
            text-align: center;
        }
    </style>
</head>

<body>
<div class="body">
	<p>I'm are sorry, but there are some errors:</p><br/><br/>
	<?php
	echo $_SESSION['error'] . "<br/>";
	?>
	
	<br/>
	<p><a href="http://adamjohnsondev.com">CLICK HERE</a> to go back.</p>
	
</div>
</body>

</html>

