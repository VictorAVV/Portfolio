<?php 
	#require('includes/acces.inc.php');

	$user = "***";
	$password = "***";
	$db = "***";
	$page_available=1;		

	require("phpmail/class.phpmailer.php");
	
	//debug($_SESSION);
	//mysqldump -ac --add-drop-table --user="dad" --password="mum" pluto > dumpfile.mysql 

	if (isset($_REQUEST['create']))
	{
		$shortfilename = "/backups/".date("Y-m-d-H_i_s").".sql.gz";
		$filename=getcwd().$shortfilename;
		$filename=str_replace("\\","/",$filename);
		
		if(file_exists($filename)) @unlink($filename);
		
		exec("mysqldump -ac --add-drop-table --default-character-set=latin1 --user=\"".$user."\" --password=\"".$password."\" ".$db." | gzip -c > ".$filename);

		$message = "Backup file created (***). 1\r\nLink to download backup:"+ "http://***/peugeot".$shortfilename;

		$mail = new PHPMailer();
		$mail->IsSendmail();
		$mail->AddAddress("***");
		$mail->Subject = "Backup file created (***)";
		$mail->Body    = $message;

		if(!$mail->Send())
		{
			print "Message could not be sent. <p>";
			print "Mailer Error: " . $mail->ErrorInfo;
			exit;
		}

		header("location:backup.php?msg=created");
	}

	if (isset($_REQUEST['restore']) && isset($_POST['confirm']))
	{
		$filename=getcwd()."/backups/".$_REQUEST['restore'];
		$filename=str_replace("\\","/",$filename);	
		
		if(file_exists($filename))
		{
				if(!empty($password))
				{
					exec("mysql -u ".$user." -p".$password." ".$db." < | gunzip ".$filename);
				}else{
					exec("mysql -u ".$user." ".$db." < | gunzip ".$filename);		
				}
			
				 header("location:backup.php?msg=restore");				
		}else{
				header("location:backup.php?msg=invalidfile");				
		}
	}
	
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>Backup</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link rel="stylesheet" href="style/style.css" type="text/css">
<link href="css/restore_page.css" rel="stylesheet">
<script src="js/jquery.js"></script>
<script src="js/restore.js"></script>
</head>

<body>
<div class="restore-request">
	<div class="modal_restore">
	</div>
</div>

<?php
if ($page_available)
{	
?>
		<?php 
			if(isset($_GET['msg']))
			{
				$msg="";
				switch($_GET['msg'])
				{
					case "created":
					$msg="Le backup a été crée avec succès";
					break;
					
					case "restore":
					$msg="Le backup a été importé avec succès";
					break;
				}
				
				echo "<h1 style='color:#FF0000'>".$msg."</h1>";
			}
		?>
		
		<?php 
			if(isset($_REQUEST['restore']) && $_SERVER['REQUEST_METHOD']!="POST") : 
			$date=explode("-",$_REQUEST['restore']);
			$time=$date[3];
			$date=$date[2]."/".$date[1]."/".$date[0];
			
			$time=explode("_",$time);
			$time=$time[0].":".$time[1]." ".$time[3];

		?>
		<h1>Restaurer votre Database</h1>
		<form method="post" action="backup.php">
		<input type="hidden" name="confirm" value="1">
		<input type="hidden" name="restore" value="<?=$_REQUEST['restore']?>">
		
		<p>ETES-VOUS CERTAIN DE VOULOIR FAIRE CETTE OPERATION IRREVERSIBLE : <b> <?=$date?> <?=$time?></b></p>
		<table cellpadding="2" cellspacing="0" border="0">
		<tr>
		<td><input type="submit" name="submit" value="Confirmer"></td>
		<td><a href="backup.php">Annuler l'opération (recommandé)</a></td>
		</tr>
		</table>
		
		<?php else: ?>
		<b><a href="backup.php?create">Créer un Backup</a></b><br>		
		<?php	
				echo "<h3>Restaurer</h3>";
				$handler = opendir("backups");
				$files=array();
				
				while ($file = readdir($handler)) 
				{
					if ((is_file("backups/".$file)) && ($file != '.' && $file != '..'))
					{
						//same timestamp can have multiple files
						 $files[filemtime("backups/".$file)][] = $file;
					}
				}
				
				ksort($files);
				$files=array_reverse($files);
		?>		
				
				<?php if(count($files)>0) :	?>
		
					<?php foreach($files as $file_collections) : foreach($file_collections as $file) : ?>
					<a href="backup.php?restore=<?=$file?>" class="restore_link">Restaurer : <?=$file?></a>
					<span>&nbsp;&nbsp;</span>
					<a href="backups/<?=$file?>" class="download_link">Download backup</a><br>
					<?php endforeach; endforeach; ?>
					
				<?php endif; ?>				
		<?php endif; ?>

<?php
}else{
	#require('page_not_found.php');
}
?>
</body>
</html>
