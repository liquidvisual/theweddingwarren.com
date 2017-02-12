<?php
	//----------------------------------------------
	// Cross Domain
	// http://stackoverflow.com/questions/10143093/origin-is-not-allowed-by-access-control-allow-origin
	//----------------------------------------------

	header('Access-Control-Allow-Origin: *');

	//----------------------------------------------
	//
	//----------------------------------------------

	$post_data = $_POST['myData'];
	$post_data_length = count($post_data);

	for ($i = 0; $i < $post_data_length; $i++) {

		$name      = print_r($post_data[$i][name], true);
		$attending = print_r($post_data[$i][attending], true);
		$excuse    = print_r($post_data[$i][excuse], true);
		$dietary   = print_r($post_data[$i][dietary], true);
		$song      = print_r($post_data[$i][song], true);

		$guest = "Name: $name\nAttending: $attending\nExcuse: $excuse \nDietary: $dietary \nSong: $song \n\n";

		echo $guest;

		$final .= $guest;
	}

	// $txt = "user id date";
	// $myfile = file_put_contents('guests.txt', $txt.PHP_EOL , FILE_APPEND);

	file_put_contents('guests.txt', $final, FILE_APPEND);


	//exit();
?>