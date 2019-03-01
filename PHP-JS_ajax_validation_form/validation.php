<?php
function check_field1($field) {
	$field = trim($field); 
	$response = array(); 
	if (!$field || $field == "") {
		$response = array(
			'ok' => false, 
			'msg' => "Please enter a value");
	} else if (strlen($field)>10) {
		$response = array(
			'ok' => false, 
			'msg' => "Please enter less than 10 characters");
	} else if (!preg_match('/^\s*[a-zA-Z0-9,\.\-_\s]+\s*$/', $field)) {
	//} else if (!preg_match('/^[a-z0-9.-_]+$/', $field)) {
	

		$response = array(
			'ok' => false, 
			'msg' => "Your field can only contain alphanumerics and period, dash and underscore (.-_)");
	} else {
		$response = array(
			'ok' => true, 
			'msg' => "");
	}
	return $response; 
}

function check_field2($field) {
	$field = trim($field); 
	$response = array(); 
	if (!$field || $field == "") {
		$response = array(
			'ok' => false, 
			'msg' => "Please enter a value");
	} else if (strlen($field)>10) {
		$response = array(
			'ok' => false, 
			'msg' => "Please enter less than 10 characters");
	} else if (!preg_match('/^\s*[a-zA-Z0-9,\.\-_\s]+\s*$/', $field)) {
		$response = array(
			'ok' => false, 
			'msg' => "Your field can only contain alphanumerics and period, dash and underscore (.-_)");
	} else {
		$response = array(
			'ok' => true, 
			'msg' => "");
	}
	return $response;
}
function check_field3($field) {
	$field = trim($field); 
	$response = array(); 
	if (!$field || $field == "") {
		$response = array(
			'ok' => false, 
			'msg' => "Please enter a value");
	} else if (strlen($field)>10) {
		$response = array(
			'ok' => false, 
			'msg' => "Please enter less than 10 characters");
	} else if (!preg_match('/^\s*[a-zA-Z0-9,\.\-_\s]+\s*$/', $field)) {
		$response = array(
			'ok' => false, 
			'msg' => "Your field can only contain alphanumerics and period, dash and underscore (.-_)");
	} else {
		$response = array(
			'ok' => true, 
			'msg' => "");
	}
	return $response;
}
function check_field4($field) {
	$field = trim($field); 
	$response = array(); 
	if (!$field || $field == "") {
		$response = array(
			'ok' => false, 
			'msg' => "Please enter a value");
	} else if (strlen($field)>10) {
		$response = array(
			'ok' => false, 
			'msg' => "Please enter less than 10 characters");
	} else if (!preg_match('/^\s*[a-zA-Z0-9,\.\-_\s]+\s*$/', $field)) {
		$response = array(
			'ok' => false, 
			'msg' => "Your field can only contain alphanumerics and period, dash and underscore (.-_)");
	} else {
		$response = array(
			'ok' => true, 
			'msg' => "");
	}
	return $response;
}
function check_field5($field) {
	$field = trim($field); 
	$response = array(); 
	if (!$field || $field == "") {
		$response = array(
			'ok' => false, 
			'msg' => "Please enter a value");
	} else if (strlen($field)>10) {
		$response = array(
			'ok' => false, 
			'msg' => "Please enter less than 10 characters");
	} else if (!preg_match('/^\s*[a-zA-Z0-9,\.\-_\s]+\s*$/', $field)) {
		$response = array(
			'ok' => false, 
			'msg' => "Your field can only contain alphanumerics and period, dash and underscore (.-_)");
	} else {
		$response = array(
			'ok' => true, 
			'msg' => "");
	}
	return $response;
}

function check_field6($field) {
	$field = trim($field); 
	$response = array(); 
	if (!$field || $field == "") {
		$response = array(
			'ok' => false, 
			'msg' => "Please enter a value");
	} else if (strlen($field)<10) {
		$response = array(
			'ok' => false, 
			'msg' => "Please enter more than 10 characters");
	} else {
		$response = array(
			'ok' => true, 
			'msg' => "");
	}
	return $response;
}

function check_field7($field) {
	$field = trim($field); 
	$response = array(); 
	if (!$field || $field == "") {
		$response = array(
			'ok' => false, 
			'msg' => "Please enter a value");
	} else if (strlen($field)<10) {
		$response = array(
			'ok' => false, 
			'msg' => "Please enter more than 10 characters");
	} else {
		$response = array(
			'ok' => true, 
			'msg' => "");
	}
	return $response;
}

function del_file($file_name) {
	if (file_exists(dirname(__FILE__)."/uploads/".$file_name)) {
		if (unlink(dirname(__FILE__)."/uploads/".$file_name)) {
			$response = array(
				'ok' => true, 
				'msg' => "Uploaded file was deleted");
		} else {
			$response = array(
				'ok' => false, 
				'msg' => "Uploaded file wasn't deleted");
		}
	} else {
		$response = array(
			'ok' => false, 
			'msg' => "File not exist");
	}
	return $response;
}

if (@$_REQUEST['action'] == 'check_field1' && isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
	echo json_encode(check_field1($_REQUEST['field1']));
	exit; 
}
if (@$_REQUEST['action'] == 'check_field2' && isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
	echo json_encode(check_field2($_REQUEST['field2']));
	exit; 
}
if (@$_REQUEST['action'] == 'check_field3' && isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
	echo json_encode(check_field3($_REQUEST['field3']));
	exit; 
}
if (@$_REQUEST['action'] == 'check_field4' && isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
	echo json_encode(check_field4($_REQUEST['field4']));
	exit; 
}
if (@$_REQUEST['action'] == 'check_field5' && isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
	echo json_encode(check_field5($_REQUEST['field5']));
	exit; 
}
if (@$_REQUEST['action'] == 'check_field6' && isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
	echo json_encode(check_field6($_REQUEST['field6']));
	exit; 
}
if (@$_REQUEST['action'] == 'check_field7' && isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
	echo json_encode(check_field7($_REQUEST['field7']));
	exit; 
}

if (@$_REQUEST['action'] == 'del_file' && isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
	echo json_encode(del_file($_REQUEST['file']));
	exit; 
}

///*****************************************************************************///
/// UPLOADING FILE  ///
///*****************************************************************************///
function check_uploadfilemimetype($mimetype) {
	if($mimetype != 'image/pjpeg' && $mimetype != 'image/jpeg' && $mimetype != 'image/jpg' && $mimetype != 'image/gif' && $mimetype != 'image/png')	{
		return "FALSE";
	} else {
		return "TRUE";
	}
}

if (is_uploaded_file($_FILES['field8']['tmp_name'])) {
	$files_field1 = $_FILES['field8'];
	if ($files_field1['error'] > 0) {
		$response = array(
			'ok' => false, 
			'msg' => $files_field1['error']);
	} elseif (check_uploadfilemimetype($files_field1['type']) == 'FALSE') {
		$response = array(
			'ok' => false, 
			'msg' => 'Please upload a file in the correct format: jpeg, gif or png');
	} elseif ($files_field1['size'] > 500000) {
		$response = array(
			'ok' => false, 
			'msg' => 'Size of file can\'t be more, then 50kb');
	} else {
		//md5_file
		$tmp_file_name = $files_field1['tmp_name'];
		$new_file_name1 = md5_file($files_field1['tmp_name']);
		$upload_file_path = dirname(__FILE__).'/uploads/'.$new_file_name1;
		$ok = move_uploaded_file($tmp_file_name, $upload_file_path);
		if (!$ok) {
			$response = array(
				'ok' => false, 
				'msg' => 'Can\'t move uploaded file to destination directory');
		} else {
			$response = array(
				'ok' => true, 
				'msg' => $new_file_name1);
		}
	}
	if ($without_javascript) {
		if (!$response['ok']) { 
			$error = "1";
			$error8 = $response['msg'];
		}
	} else {
		echo json_encode($response);
		exit; 
	}
} else {
	$response = array(
		'ok' => false, 
		'msg' => "You must upload file");
	if ($without_javascript) {
			$error = "1";
			$error8 = $response['msg'];
	}// else {
	//	echo json_encode($response);
	//}
}

if (is_uploaded_file($_FILES['field9']['tmp_name'])) {
	$files_field2 = $_FILES['field9'];
	if ($files_field2['error'] > 0) {
		$response = array(
			'ok' => false, 
			'msg' => $files_field2['error']);
	} elseif (check_uploadfilemimetype($files_field2['type']) == 'FALSE') {
		$response = array(
			'ok' => false, 
			'msg' => 'Please upload a file in the correct format: jpeg, gif or png');
	} elseif ($files_field2['size'] > 500000) {
		$response = array(
			'ok' => false, 
			'msg' => 'Size of file can\'t be more, then 50kb');
	} else {
		//md5_file
		$tmp_file_name = $files_field2['tmp_name'];
		$new_file_name2 = md5_file($files_field2['tmp_name']);
		$upload_file_path = dirname(__FILE__).'/uploads/'.$new_file_name2;
		$ok = move_uploaded_file($tmp_file_name, $upload_file_path);
		if (!$ok) {
			$response = array(
				'ok' => false, 
				'msg' => 'Can\'t move uploaded file to destination directory');
		} else {
			$response = array(
				'ok' => true, 
				'msg' => $new_file_name2);
		}
	}
	if ($without_javascript) {
		if (!$response['ok']) { 
			$error = "1";
			$error8 = $response['msg'];
		}
	} else {
		echo json_encode($response);
		exit; 
	}
} else {
	$response = array(
		'ok' => false, 
		'msg' => "You must upload file");
	if ($without_javascript) {
			$error = "1";
			$error9 = $response['msg'];
	} //else {
	//	echo json_encode($response);
	//}
}

?>