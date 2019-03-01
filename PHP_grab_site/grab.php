<?php
//header('Content-Type: text/html; charset=utf-8');
include("simple_html_dom.php");
//require_once '/Classes/PHPExcel.php';
//$page_name = 'https://www.***/Public/List?fromOutside=False';

function getConnection() { 
    try {
        $db_username = 'mysql';
        $db_password = 'mysql';
        $conn = new PDO('mysql:host=localhost;dbname=grab_data;charset=utf8', $db_username, $db_password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e) {
		echo("Can't connect to database: ".$e->getMessage());
    }
    return $conn;
}

//дипломы задвоены!!!!!!!!

$company_arr = array();
$main_data_title = array();
				 
$dbCon = getConnection();

$sth_archi = $dbCon->prepare('SELECT `link`, `matricule` FROM `index` WHERE `type_company` = "Architect"');
$sth_archi->execute();
$sth_archi_keys = $sth_archi->fetchAll(PDO::FETCH_OBJ);
							 
$archi_page = 0;
foreach($sth_archi_keys as $sth_archi_key) {
	unset($company_arr);
	$archi_page++;
	if ($archi_page > 2500) break;

	print("<br> **************archi_page= ".$archi_page."*******************<br>");
		
		$link_company = "https://www.***".$sth_archi_key->link;
		echo "Link = ".$link_company.'<br>';

		if ($link_company != '') {
			preg_match('/(.*)\/(Public.*)/', $link_company, $link_company_replace);
			$link_company_preg = preg_replace(['/\?/', '/&/', '/=/', '/\//'], '_', $link_company_replace[2]);
			print($link_company_preg); print('<br>');
			if (file_exists("cache/".$link_company_preg)){
				print(" exist");
				$html_company = new simple_html_dom();
				$html_company->load_file("cache/".$link_company_preg);
			} else {
				$html_company = file_get_html($link_company);
				$html_company->save("cache/".$link_company_preg);
			}

		//	print("<br> Architect --------------------------------------<br>");
		
			$company_identification = $html_company->find('div.identification'); 
		//	echo $company_identification[0];
			
		//	print("<br> company_identification_fields --------------------------------------<br>");
			$company_identification_fields = $company_identification[0]->find('div.field');
			//echo $company_identification_fields[1];
			
				foreach($company_identification_fields as $element) {
					$element_text = $element->find('span.title')[0]->plaintext;
					$element_text_preg = trim(preg_replace('/\s:/u',  '', $element_text));
					$company_arr[$element_text_preg] = $element->find('span.value')[0]->plaintext;
				}
				
				print("<br> company_main_data --------------------------------------<br>");
				$company_main_datas = $html_company->find('#main_data');
				$main_data_subtitle = "";
				foreach ($company_main_datas as $company_main_data) {
					$company_main_data = $company_main_data->find('div');
					foreach ($company_main_data as $element_main_data) {
					
						$element_main_data_class = $element_main_data->getAttribute('class');
						print(" class= ".$element_main_data_class."<br>");
						
						if ($element_main_data_class == "subtitle") {
							$main_data_subtitle = $element_main_data->plaintext;
							//print $main_data_subtitle;
						} elseif($element_main_data_class == "field") {
							//echo " main_data_subtitle = ".$main_data_subtitle;
							if ($main_data_subtitle == "Préférences de mission") {
								print("Préférences de mission");
								$company_arr["Préférences de mission"] = '';
								$element_main_data_mission_li = $element_main_data->find('li');
								foreach ($element_main_data_mission_li as $li) {
									echo " li = ".$li->plaintext.".\n";
									$company_arr["Préférences de mission"] .= $li->plaintext)).".\n";	
								}
							} else {
								$title_element = "";
								foreach ($element_main_data->find('.title') as $tile) { 
									$title_element = trim(preg_replace('/:/u',  '',$tile->plaintext));
									echo " title = ".trim(preg_replace('/:/u',  '',$tile->plaintext));
								}

								foreach ($element_main_data->find('.value') as $val) {
									$value_element = trim(preg_replace('/\s:/u',  '',$val->plaintext));
									echo "<br> value = ".trim(preg_replace('/\s:/u',  '',$val->plaintext))."<br>";
								}
								if ($title_element != "") $company_arr[$title_element] = $value_element;
							}		

						} elseif($element_main_data_class == "field list") {
							$title_element = $value_element = "";
							foreach ($element_main_data->find('.title') as $tile) {
								echo " title = ".trim(preg_replace('/\s:/u',  '',$tile->plaintext));
								$title_element = trim(preg_replace('/\s:/u',  '',$tile->plaintext));
							}
							foreach ($element_main_data->find('li') as $val) {
								echo " value = ".trim(preg_replace('/\s:/u',  '',$val->plaintext))."<br>";
								$value_element .= trim(preg_replace('/\s:/u',  '',$val->plaintext)).". ";
							}
							if ($title_element != "") $company_arr[$title_element] = $value_element;
								
						} elseif($element_main_data_class == "") {
							if ($main_data_subtitle == "Diplôme" || $main_data_subtitle == "Diplômes" ) {
								echo " Diplome = ".trim(preg_replace('/\s:/u',  '',$element_main_data->plaintext))."<br>";
								if (array_key_exists("Diplome", $company_arr)) {
									$company_arr["Diplome"] .= trim(preg_replace('/\s:/u',  '',$element_main_data->plaintext)).". ";
								} else {
									$company_arr["Diplome"] = trim(preg_replace('/\s:/u',  '',$element_main_data->plaintext)).". ";
								}//дипломы задвоены!!!!!!!!
							} else {
								echo " description = ".$element_main_data->plaintext."<br>";
								$company_arr["description"] = $element_main_data->plaintext;
							}
						}
		
					}
				
				}
				print("<br>  -- examples --<br>");
				$company_examples = $html_company->find('#examples');
				foreach ($company_examples as $company_example) {
					//echo $company_example;
					$title_element = $value_element = "";
					foreach ($company_example->find('.subtitle') as $examples_subtitle) {
						echo " examples_subtitle = ".trim(preg_replace('/\s:/u',  '',$examples_subtitle->plaintext))."<br>";
						$title_element .= trim(preg_replace('/\s:/u',  '',$examples_subtitle->plaintext));
					}
					foreach ($company_example->find('.lightbox img') as $examples_img) {
					//echo $examples_img->getAttribute('src');
						echo " examples_img = ".trim(preg_replace('/\s:/u',  '',$examples_img->getAttribute('src')))."<br>";
						$value_element .= "https://www.***".trim(preg_replace('/\s:/u',  '',$examples_img->getAttribute('src'))).". ";
					}
					if ($title_element != "") $company_arr[$title_element] = $value_element;
				}

			print_r($company_arr);
			
			//get assoc array of column
			$column_names = array();
			$sql = 'SHOW COLUMNS FROM `architect`';
			$stmt = $dbCon->prepare($sql);
			try {    
				if($stmt->execute()){
					$raw_column_data = $stmt->fetchAll();
					foreach($raw_column_data as $outer_key => $array){
						$sth_company = $dbCon->prepare("SELECT `".$array['Field']."` FROM `architect` WHERE `id` = 1");
						$sth_company->execute();
						$sth_company = $sth_company->fetch(PDO::FETCH_OBJ);
						//print_r($sth_company);
						$column_names[$sth_company->$array["Field"]] = $array["Field"];
					}        
				}
			} catch (Exception $e){
				print($e->getMessage()); //return exception
			}        
			// end get assoc array of column
			
			$matricule_company = $sth_archi_key->matricule;
			$sth_company = $dbCon->prepare("SELECT `id` FROM `architect` WHERE `".$column_names['matricule']."` = {$matricule_company}");
			$sth_company->execute();
			$sth_company = $sth_company->fetch(PDO::FETCH_OBJ);
				print("<br>matricule sql ///");
			print_r($sth_company);

			//write row in table	
			print_r("<br>column_names-----<br>");
			print_r($column_names);
			print_r("<br>company_arr-----<br>");
			print_r($company_arr);
			$company_insert_row = $dbCon->prepare("INSERT INTO `architect` (`".$column_names['matricule']."`) VALUES (:matricule)");
			$company_insert_row->bindParam(':matricule',  $matricule_company, PDO::PARAM_STR);
			$company_insert_row->execute();
			
			foreach($company_arr as $key => $value){
				$company_insert_row = $dbCon->prepare("UPDATE `architect` SET `".$column_names[$key]."` = :key WHERE `".$column_names['matricule']."` = '".$matricule_company."'");
				$company_insert_row->bindParam(':key', $company_arr[$key], PDO::PARAM_STR);
				$company_insert_row->execute();
			}
			//end write row in table
			
		}
	$html_company->clear();
}	

?>