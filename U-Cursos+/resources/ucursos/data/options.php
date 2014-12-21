<?php
	if(!isset($_SESSION['prueba'])){
		$_SESSION['prueba']=0;
	}
	else{
		$_SESSION['prueba']=1-$_SESSION['prueba'];
	}
?>