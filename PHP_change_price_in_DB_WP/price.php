<?php
include '../machines-a-glace/wp-config.php';
include './countries.php';

function getConnection() { 
	try {
		$conn = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=".DB_CHARSET."", DB_USER, DB_PASSWORD);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	} catch(PDOException $e) {
		error("Can't connect to database: ".$e->getMessage());
	}
	return $conn;
};

function error($message) {
	http_response_code(400);
	echo 'message : '.$message;
	exit();
};

try {
	$procent_for_rest_world = 10;
	$dbCon = getConnection();
	$posts = $dbCon->prepare("SELECT * FROM `wp_posts` WHERE `post_type`='product'");
	$posts->execute();
	//$i=1;
	foreach ($posts->fetchAll(PDO::FETCH_OBJ) as $product) {
		$post_price = $dbCon->prepare("SELECT * FROM `wp_postmeta` WHERE `post_id`=".(int)$product->ID);
		$post_price->execute();
		$product_p = array();
		$product_p['ID'] = $product->ID;
		foreach ($post_price->fetchAll(PDO::FETCH_OBJ) as $post_price_arr) {
			if ($post_price_arr->meta_key == '_price') {
				$product_p['price'] = $post_price_arr->meta_value;
				$product_p['meta_id_price'] = $post_price_arr->meta_id;
			} elseif ($post_price_arr->meta_key == '_regular_price') {
				$product_p['_regular_price'] = $post_price_arr->_regular_price;
				$product_p['meta_id_regular_price'] = $post_price_arr->meta_id;
			} //elseif ($post_price_arr->meta_key == '_sale_price') {
			//	print($i.'   '.$product_p['ID'].' _sale_price = '.$post_price_arr->_sale_price.'<br/>');
			//}
		}

		if ($product_p['price'] == null || $product_p['price'] == "") continue;
		$price_for_world = $product_p['price'] + ceil($product_p['price']*$procent_for_rest_world)/100;

	/*	$priceBE_insert = $dbCon->prepare("INSERT INTO `wp_postmeta` (`post_id`, `meta_key`, `meta_value`) VALUES ({$product_p['ID']}, '_belgium_price', {$product_p['price']})");
		$priceBE_insert->execute();
		
		$priceRestP_update = $dbCon->prepare("UPDATE `wp_postmeta` SET `meta_value`= {$price_for_world} WHERE `meta_id`={$product_p['meta_id_price']}");
		$priceRestP_update->execute();			
		
		$priceRestRP_update = $dbCon->prepare("UPDATE `wp_postmeta` SET `meta_value`= {$price_for_world} WHERE `meta_id`={$product_p['meta_id_regular_price']}");
		$priceRestRP_update->execute();			
		*/
	}
	print('Prices updated!');
	$dbCon = null;
} catch(PDOException $e) {
	error('DB error: ' . $e->getMessage());
}





?>