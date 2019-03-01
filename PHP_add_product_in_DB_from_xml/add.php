<?php

function getConnection($db, $db_username, $db_password)
{
    try {
        $conn = new PDO('mysql:host=localhost;dbname=' . $db, $db_username, $db_password, array(
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
        ));
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    catch(PDOException $e) {
        print ("Can't connect to database: " . $e->getMessage());
    }

    return $conn;
}

function update_voiture_db($numero, $serie, $modele, $cylindree, $essence, $couleur, $int, $options, $chassis, $localisation, $remarque, $concessionnaire, $plaque, $immatriculation, $libre, $annee_modele)
{
    print ("<br/>");
    try {
        $dbCon = getConnection('***', '***', '***');
        $wp_posts_check = $dbCon->prepare("SELECT `id_voiture` FROM `voiture` WHERE `numero`='{$numero}'");
        $sthfetchAllwp_posts_check = $wp_posts_check->fetchAll(PDO::FETCH_ASSOC);
        print ("<br/>");
        print_r($sthfetchAllwp_posts_check[0]);
        if ($sthfetchAllwp_posts_check) {
            print ("<br/> numero " . $numero . " already in DB");
        }
        else {
            if ($immatriculation != "") {
                $immatriculation = " DATE_ADD('1899-12-30', INTERVAL " . $immatriculation . " DAY)";
                print (" immatriculation date add");
            }
            else {
                $immatriculation = "'" . $immatriculation . "'";
            };
            if ($libre != "") {
                $libre = " DATE_ADD('1899-12-30', INTERVAL " . $libre . " DAY)";
                print (" libre date add");
            }
            else {
                $libre = "'" . $libre . "'";
            };
            $voiture_add = $dbCon->prepare("INSERT INTO `voiture` (
                `numero`,
				`serie`, 
				`modele`, 
				`cylindree`, 
				`essence`, 
				`couleur`, 
				`int`, 
				`options`, 
				`chassis`, 
				`localisation`, 
				`remarque`, 
				`concessionnaire`, 
				`plaque`, 
				`immatriculation`, 
				`libre`, 
				`annee_modele`
			) VALUES (
				'{$numero}', 
				'{$serie}', 
				'{$modele}', 
				'{$cylindree}', 
				'{$essence}', 
				'{$couleur}', 
				'{$int}', 
				'{$options}', 
				'{$chassis}', 
				'{$localisation}', 
				'{$remarque}', 
				'{$concessionnaire}', 
				'{$plaque}', 
				{$immatriculation}, 
				{$libre}, 
				'{$annee_modele}'
			)");
            print ("    numero " . $numero . " was added");
        };
    }

    catch(PDOException $e) {
        print ('DB error: ' . $e->getMessage());
    }
}

print ("start read xml");
header('Content-Type: text/html; charset=utf-8');
$xml = simplexml_load_file('modele1/xl/sharedStrings.xml');
$sharedStringsArr = array();

foreach($xml->children() as $item) {
    $sharedStringsArr[] = (string)$item->t;
}

$handle = @opendir('modele1/xl/worksheets');
$out = array();

while ($file = @readdir($handle)) {
    if ($file != "." && $file != ".." && $file != '_rels') {
        $xml = simplexml_load_file('modele1/xl/worksheets/' . $file);
        $row = 0;
        foreach($xml->sheetData->row as $item) {
            $out[$file][$row] = array();
            $cell = 0;
            foreach($item as $child) {
                $attr = $child->attributes();
                $value = isset($child->v) ? (string)$child->v : false;
                $out[$file][$row][$cell] = isset($attr['t']) ? $sharedStringsArr[$value] : $value;
                if ($out[$file][$row][$cell] == ")))") $out[$file][$row][$cell] = "";
                if ($out[$file][$row][$cell] == "?") $out[$file][$row][$cell] = "";
                if ($out[$file][$row][$cell] == ",") $out[$file][$row][$cell] = "";
                $cell++;
            }

            $row++;
        }
    }
}

print ("finish read xml");
?>