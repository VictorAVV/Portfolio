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
	$dbCon = getConnection();
	$posts = $dbCon->prepare('SELECT * FROM `wp_posts` WHERE `post_type` = \'shop_order\'');
	$posts->execute();
	foreach ($posts->fetchAll(PDO::FETCH_OBJ) as $posts_fetch) {
		$orders = $dbCon->prepare("SELECT * FROM `orders` WHERE `order_id`={$posts_fetch->ID}");
		$orders->execute();
		$orders_id = $orders->fetch(PDO::FETCH_OBJ);
		if (!empty($orders_id)) {
			continue;
		}
		$data = array();
		$products_info = null;
		$data['ORDER_ID'] = $posts_fetch->ID;
		$flename = $posts_fetch->ID.'-'.str_replace(array('-', ' ', ':'), '', $posts_fetch->post_date).'.txt';
		$postmeta = $dbCon->prepare('SELECT * FROM `wp_postmeta` WHERE `post_id`='.(int)$posts_fetch->ID.'');
		$postmeta->execute();
		foreach ($postmeta->fetchAll(PDO::FETCH_OBJ) as $pm) {
			$data[$pm->meta_key] = $pm->meta_value;
		}	
		$woocommerce_order_items = $dbCon->prepare('SELECT * FROM `wp_woocommerce_order_items` WHERE `order_id`='.(int)$posts_fetch->ID.' AND `order_item_type`=\'line_item\'');
		$woocommerce_order_items->execute();
		$products = array();
		foreach ($woocommerce_order_items->fetchAll(PDO::FETCH_OBJ) as $wo_items) {
			$product = array();
			$woocommerce_order_itemmeta = $dbCon->prepare('SELECT * FROM `wp_woocommerce_order_itemmeta` WHERE `order_item_id`='.(int)$wo_items->order_item_id.'');
			$woocommerce_order_itemmeta->execute();
			foreach ($woocommerce_order_itemmeta->fetchAll(PDO::FETCH_OBJ) as $wo_itemmeta) {
				$product[$wo_itemmeta->meta_key] = $wo_itemmeta->meta_value;
			}
			$postmeta2 = $dbCon->prepare('SELECT * FROM `wp_postmeta` WHERE `post_id`='.(int)$product['_product_id'].'');
			$postmeta2->execute();
			foreach ($postmeta2->fetchAll(PDO::FETCH_OBJ) as $p_meta2) {
				$product2[$p_meta2->meta_key] = $p_meta2->meta_value;
			}
			$product['product_ids'] = $product2['product_ids'];
			$products[] = $product;
		}
		$order_text = '#'.$data['ORDER_ID'];
		$order_text .= '#'.$data['_billing_vat'];
		$order_text .= '#'.$data['_billing_company'];
		$order_text .= '#'.$data['_billing_first_name'];
		$order_text .= '#'.$data['_billing_last_name'];
		$order_text .= '#'.$data['_billing_address_1'];
		$order_text .= '#'.$data['_billing_address_2'];
		$order_text .= '#'.$data['_billing_city'];
		$order_text .= '#'.$data['_billing_state'];
		$order_text .= '#'.$data['_billing_postcode'];
		if (isset($countries[$data['_billing_country']])) {
			$order_text .= '#'.$countries[$data['_billing_country']];
		} else {
			$order_text .= '#'.$data['_billing_country'];
		}
		$order_text .= '#'.$data['_billing_email'];
		$order_text .= '#'.$data['_billing_phone'];
		$order_text .= '#'.$data['_shipping_company'];
		$order_text .= '#'.$data['_shipping_first_name'];
		$order_text .= '#'.$data['_shipping_last_name'];
		$order_text .= '#'.$data['_shipping_address_1'];
		$order_text .= '#'.$data['_shipping_address_1'];
		$order_text .= '#'.$data['_shipping_city'];
		$order_text .= '#'.$data['_shipping_state'];
		$order_text .= '#'.$data['_shipping_postcode'];
		if (isset($countries[$data['_shipping_country']])) {
			$order_text .= '#'.$countries[$data['_shipping_country']];
		} else {
			$order_text .= '#'.$data['_shipping_country'];
		}
		if (isset($data['_shipping_email'])) {
			$order_text .= '#'.$data['_shipping_email'];
		} else {
			$order_text .= '#'.$data['_billing_email'];
		}
		if (isset($data['_shipping_phone'])) {
			$order_text .= '#'.$data['_shipping_phone'];
		} else {
			$order_text .= '#'.$data['_billing_phone'];
		}
		foreach ($products as $prod) {
			//$order_text .= PHP_EOL.$prod['_product_id'].'#'.$prod['product_ids'].'#'.$prod['_qty'].'#'.$prod['_line_total'];
			$order_text .= PHP_EOL.$prod['product_ids'].'#'.$prod['_qty'].'#'.$prod['_line_total'];
		}
		$order_text .= PHP_EOL.$data['_order_shipping'];
		$order_text .= '#'.$data['_payment_method_title'];
		$order_text .= PHP_EOL.'EOF';
		//echo $order_text;
		$file_id = fopen('../order/'.$flename,'w');
		if (!$file_id) 
			error("Can't create file");
		if (!fwrite($file_id, $order_text))
			error("Can't write to file");
		if (!fclose($file_id))
			error("Error file close");;
		$order_insert = $dbCon->prepare("INSERT INTO `orders` (`order_id`, `text`) VALUES ({$data['ORDER_ID']}, '{$order_text}')");
		$order_insert->execute();
	}
	
	$dbCon = null;
} catch(PDOException $e) {
	error('DB error: ' . $e->getMessage());
}





?>