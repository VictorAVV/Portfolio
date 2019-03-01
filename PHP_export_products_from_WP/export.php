<?php
function getConnection($db, $db_username, $db_password) { 
    try {
		$conn = new PDO('mysql:host=localhost;dbname='.$db,$db_username,$db_password,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e) {
		print("Can't connect to database: ".$e->getMessage());
    }
    return $conn;
}

try {
		$products_arr = array();
		$term_relationships_arr = array();
		$dbConProduct = getConnection('***', '***', '***');
		$sthwp_term_relationships = $dbConProduct->prepare("SELECT a.object_id, c.name FROM `wp_term_relationships` a LEFT JOIN `wp_term_taxonomy` b ON a.term_taxonomy_id = b.term_taxonomy_id LEFT JOIN `wp_terms` c ON b.term_id = c.term_id WHERE b.taxonomy = 'product_cat'");
		$sthwp_term_relationships->execute();
		$sthfetchAllwp_term_relationships = $sthwp_term_relationships->fetchAll(PDO::FETCH_ASSOC);
		foreach ($sthfetchAllwp_term_relationships as $key=>$value) {
			if ($term_relationships_arr[$value['object_id']]!='') $term_relationships_arr[$value['object_id']] .= ', ';
			$term_relationships_arr[$value['object_id']] .= $value['name'];
		};
		$sthProduct = $dbConProduct->prepare("SELECT * FROM `wp_posts` where `post_type`='product' AND `post_status`!='trash'");
		$sthProduct->execute();
		$sthfetchAllProduct = $sthProduct->fetchAll(PDO::FETCH_ASSOC);
		foreach ($sthfetchAllProduct as $product) {
			$products_arr[$product['ID']]['post_title'] = $product['post_title'];
			$products_arr[$product['ID']]['post_name'] = 'http://***/materiels/product/'.$product['post_name'];
			$products_arr[$product['ID']]['post_date'] = $product['post_date'];
			$products_arr[$product['ID']]['post_content'] = $product['post_content'];
			$sthwp_postmeta = $dbConProduct->prepare("SELECT * FROM `wp_postmeta` where `post_id`=".$product['ID']."");
			$sthwp_postmeta->execute();
			$sthfetchAllwp_postmeta = $sthwp_postmeta->fetchAll(PDO::FETCH_ASSOC);
			foreach ($sthfetchAllwp_postmeta as $key=>$value) {
				$products_arr[$product['ID']]['_regular_price'] = '';
				$products_arr[$product['ID']]['_sale_price'] = '';
				$products_arr[$product['ID']]['total_sales'] = '';
				$products_arr[$product['ID']]['pdf'] = '';
				$products_arr[$product['ID']]['_sku'] = '';
				switch ($value['meta_key']) {
					case '_regular_price':
						$products_arr[$product['ID']]['_regular_price'] = $value['meta_value'];
						break;
					case '_sale_price':
						$products_arr[$product['ID']]['_sale_price'] = $value['meta_value'];
						break;
					case 'total_sales':
						$products_arr[$product['ID']]['total_sales'] = $value['meta_value'];
						break;
					case 'pdf':
						$products_arr[$product['ID']]['pdf'] = $value['meta_value'];
						break;						
					case '_sku':
						$products_arr[$product['ID']]['_sku'] = $value['meta_value'];
						break;						
				}
			}
		}
} catch(PDOException $e) {
	print('DB error: ' . $e->getMessage());
}

error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);
date_default_timezone_set('Europe/London');

if (PHP_SAPI == 'cli')
	die('This example should only be run from a Web Browser');
require_once dirname(__FILE__) . '/PHPExcel/Classes/PHPExcel.php';

$objPHPExcel = new PHPExcel();
$objPHPExcel->getProperties()->setCreator("anonymous")
							 ->setLastModifiedBy("anonymous")
							 ->setTitle("Office 2007 XLSX Document")
							 ->setSubject("Office 2007 XLSX Document")
							 ->setDescription("document for Office 2007 XLSX, generated using PHP classes.")
							 ->setKeywords("office 2007 openxml php")
							 ->setCategory("Test result file");

// Add some data
$i=1;
$objPHPExcel->setActiveSheetIndex(0)
            ->setCellValue('A'.$i, 'ID')
            ->setCellValue('B'.$i, 'post_title')
            ->setCellValue('C'.$i, 'url')
            ->setCellValue('D'.$i, 'post_date')
			->setCellValue('E'.$i, 'regular_price')
			->setCellValue('F'.$i, 'sale_price')
			->setCellValue('G'.$i, 'sku')
			->setCellValue('H'.$i, 'pdf')
			->setCellValue('I'.$i, 'category')
			->setCellValue('J'.$i, 'post_content');

foreach ($products_arr as $key=>$value) {
	$i++;
	$objPHPExcel->setActiveSheetIndex(0)
            ->setCellValue('A'.$i, $key)
            ->setCellValue('B'.$i, $value["post_title"])
            ->setCellValue('C'.$i, $value["post_name"])
            ->setCellValue('D'.$i, $value["post_date"])
			->setCellValue('E'.$i, $value["_regular_price"])
			->setCellValue('F'.$i, $value["_sale_price"])
			->setCellValue('G'.$i, $value["_sku"])
			->setCellValue('H'.$i, $value["pdf"])
			->setCellValue('I'.$i, $term_relationships_arr[$key])
			->setCellValue('J'.$i, $value["post_content"]);
	
}			
$objPHPExcel->getActiveSheet()->setTitle('Products');
$objPHPExcel->setActiveSheetIndex(0);
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
$objWriter->save('products.xls');

?>
