var prix_d_achat_g=0;
var prix_d_achat105=0;
var montant_a_financer=0;
var taux=0;
var droit=0;
var val1=0;
var honord=0;
var fonds_propres=0;
var total1=0;
var provis2=0;
var general_total=0;
var montant_do_pret;
var montant_mois = {};
var taux_mois = '';

function changeMontant()
    {
	//alert('changeMontant');
		var gMontant = montant_do_pret;
		var hMontant = document.getElementById("mensualite_totale");
		
		if (gMontant <1500 ){
			hMontant.length = 1;
			hMontant.options[0].text = "";
		}			
		if (gMontant>=1500 && gMontant<=2500){
			hMontant.length = 1;
			hMontant.options[0].text = "24 mois - " + montant_mois['24 mois']+"%";
			hMontant.options[0].value = "24:"+montant_mois['24 mois'];
		}
		if ((gMontant>=2501) && (gMontant<=3700)){
			hMontant.length = 2;
			hMontant.options[0].text = "24 mois - " + montant_mois['24 mois']+"%";
			hMontant.options[0].value = "24:"+montant_mois['24 mois'];
			hMontant.options[1].text = "30 mois - " + montant_mois['30 mois']+"%";
			hMontant.options[1].value = "30:"+montant_mois['30 mois'];
			hMontant.selectedIndex = 1;
		}
		if ((gMontant>=3701) && (gMontant<=5600)){
			hMontant.length = 3;
			hMontant.options[0].text = "24 mois - " + montant_mois['24 mois']+"%";
			hMontant.options[0].value = "24:"+montant_mois['24 mois'];
			hMontant.options[1].text = "30 mois - " + montant_mois['30 mois']+"%";
			hMontant.options[1].value = "30:"+montant_mois['30 mois'];
			hMontant.options[2].text = "36 mois - " + montant_mois['36 mois']+"%";
			hMontant.options[2].value = "36:"+montant_mois['36 mois'];
			hMontant.selectedIndex = 2;			
		}
			if ((gMontant>=5601) && (gMontant<=7500)){
			hMontant.length = 4;
			hMontant.options[0].text = "24 mois - " + montant_mois['24 mois']+"%";
			hMontant.options[0].value = "24:"+montant_mois['24 mois'];
			hMontant.options[1].text = "30 mois - " + montant_mois['30 mois']+"%";
			hMontant.options[1].value = "30:"+montant_mois['30 mois'];
			hMontant.options[2].text = "36 mois - " + montant_mois['36 mois']+"%";
			hMontant.options[2].value = "36:"+montant_mois['36 mois'];	
			hMontant.options[3].text = "42 mois - " + montant_mois['42 mois']+"%";
			hMontant.options[3].value = "42:"+montant_mois['42 mois'];	
			hMontant.selectedIndex = 3;
		}
		if ((gMontant>=7501) && (gMontant<=10000)){
			hMontant.length = 5;
			hMontant.options[0].text = "24 mois - " + montant_mois['24 mois']+"%";
			hMontant.options[0].value = "24:"+montant_mois['24 mois'];
			hMontant.options[1].text = "30 mois - " + montant_mois['30 mois']+"%";
			hMontant.options[1].value = "30:"+montant_mois['30 mois'];
			hMontant.options[2].text = "36 mois - " + montant_mois['36 mois']+"%";
			hMontant.options[2].value = "36:"+montant_mois['36 mois'];	
			hMontant.options[3].text = "42 mois - " + montant_mois['42 mois']+"%";
			hMontant.options[3].value = "42:"+montant_mois['42 mois'];	
			hMontant.options[4].text = "48 mois - " + montant_mois['48 mois']+"%";
			hMontant.options[4].value = "48:"+montant_mois['48 mois'];	
			hMontant.selectedIndex = 4;
		}
		if ((gMontant>=10001) && (gMontant<=15000)){
			hMontant.length = 6;
			hMontant.options[0].text = "24 mois - " + montant_mois['24 mois']+"%";
			hMontant.options[0].value = "24:"+montant_mois['24 mois'];
			hMontant.options[1].text = "30 mois - " + montant_mois['30 mois']+"%";
			hMontant.options[1].value = "30:"+montant_mois['30 mois'];
			hMontant.options[2].text = "36 mois - " + montant_mois['36 mois']+"%";
			hMontant.options[2].value = "36:"+montant_mois['36 mois'];	
			hMontant.options[3].text = "42 mois - " + montant_mois['42 mois']+"%";
			hMontant.options[3].value = "42:"+montant_mois['42 mois'];	
			hMontant.options[4].text = "48 mois - " + montant_mois['48 mois']+"%";
			hMontant.options[4].value = "48:"+montant_mois['48 mois'];	
			hMontant.options[5].text = "60 mois - " + montant_mois['60 mois']+"%";
			hMontant.options[5].value = "60:"+montant_mois['60 mois'];	
			hMontant.selectedIndex = 5;
		}
		if ((gMontant>=15001) && (gMontant<=20000)){
			hMontant.length = 7;
			hMontant.options[0].text = "24 mois - " + montant_mois['24 mois']+"%";
			hMontant.options[0].value = "24:"+montant_mois['24 mois'];
			hMontant.options[1].text = "30 mois - " + montant_mois['30 mois']+"%";
			hMontant.options[1].value = "30:"+montant_mois['30 mois'];
			hMontant.options[2].text = "36 mois - " + montant_mois['36 mois']+"%";
			hMontant.options[2].value = "36:"+montant_mois['36 mois'];	
			hMontant.options[3].text = "42 mois - " + montant_mois['42 mois']+"%";
			hMontant.options[3].value = "42:"+montant_mois['42 mois'];	
			hMontant.options[4].text = "48 mois - " + montant_mois['48 mois']+"%";
			hMontant.options[4].value = "48:"+montant_mois['48 mois'];	
			hMontant.options[5].text = "60 mois - " + montant_mois['60 mois']+"%";
			hMontant.options[5].value = "60:"+montant_mois['60 mois'];	
			hMontant.options[6].text = "84 mois - " + montant_mois['84 mois']+"%";
			hMontant.options[6].value = "84:"+montant_mois['84 mois'];		
			hMontant.selectedIndex = 6;
		}
		if (gMontant>=20001){
			hMontant.length = 8;
			hMontant.options[0].text = "24 mois - " + montant_mois['24 mois']+"%";
			hMontant.options[0].value = "24:"+montant_mois['24 mois'];
			hMontant.options[1].text = "30 mois - " + montant_mois['30 mois']+"%";
			hMontant.options[1].value = "30:"+montant_mois['30 mois'];
			hMontant.options[2].text = "36 mois - " + montant_mois['36 mois']+"%";
			hMontant.options[2].value = "36:"+montant_mois['36 mois'];	
			hMontant.options[3].text = "42 mois - " + montant_mois['42 mois']+"%";
			hMontant.options[3].value = "42:"+montant_mois['42 mois'];	
			hMontant.options[4].text = "48 mois - " + montant_mois['48 mois']+"%";
			hMontant.options[4].value = "48:"+montant_mois['48 mois'];	
			hMontant.options[5].text = "60 mois - " + montant_mois['60 mois']+"%";
			hMontant.options[5].value = "60:"+montant_mois['60 mois'];	
			hMontant.options[6].text = "84 mois - " + montant_mois['84 mois']+"%";
			hMontant.options[6].value = "84:"+montant_mois['84 mois'];	
			hMontant.options[7].text = "120 mois - " + montant_mois['120 mois']+"%";
			hMontant.options[7].value = "120:"+montant_mois['120 mois'];			
			hMontant.selectedIndex = 7;
		}

    }

	
//function getMontant() 
function getDuree() 
{
	$.get("/charges_test/php/durees.php", 
		function(data) {
			data = JSON.parse(data);
			if ( data['annee']['ok'] && (php_file == 'credit') ? data['mois']['ok'] : 1 ) {
				get_annee = data['annee'];
				if (get_annee['num_rows'] > 0) {
					for (key in get_annee) {
						montant_mois[key] = get_annee[key];
						//console.log(montant_mois[key]);
					}
				} else {
					alert("Can't find rows width mois taux data in table");
				} 
			if (php_file == 'credit') {	
				get_mois = data['mois'];
				if (get_mois['taux_mois']) {
					taux_mois = get_mois['taux_mois'];
					strout  = '<option value="10" rel='+ taux_mois +'>Taux fixe 10 ans : ' + taux_mois + '%</option>';
					strout  += '<option value="15" rel='+ taux_mois +'>Taux fixe 15 ans : ' + taux_mois + '%</option>';
					strout  += '<option value="20" rel='+ taux_mois +'>Taux fixe 20 ans : ' + taux_mois + '%</option>';
					strout  += '<option value="25" rel='+ taux_mois +' selected="selected">Taux fixe 25 ans : ' + taux_mois + '%</option>';
					strout  += '<option value="30" rel='+ taux_mois +'>Taux fixe 30 ans : ' + taux_mois + '%</option>';
					$('#rate_futur_mensualite').html(strout);
				} else {
					alert("Can't find column with annee taux data in table");
				}
			}	
			} else {
				alert("Can't connect to database");
			}
		}
	);
}

function favori() 
{
    browsername = navigator.appName;
    browserVer = parseInt(navigator.appVersion);
    if (browsername == "Microsoft Internet Explorer" && browserVer >= 4)
        {
            window.external.AddFavorite("http://www.immo-tt.be/frais_notaire_achat-emprunt.htm", "Frais d'actes - Thonnard & Trinon"); 
        }
}

function arrondi_cents(montant)
{
    return Math.round(montant*100)/100
}

function euros(montant, simbol)
{
   sepg = " " ;   //  séparateurGroupe
   chap =  2  ;   //  chiffresAprèsVirgule
   sepd = "," ;   //  séparateurDécimal
   chpg =  3  ;   //  chiffresParGroupe
   var str = "";
   var s= ""+Math.round(montant*100)/100;
   if (chap > 0) 
   {
      var i = s.indexOf(".");
      if (i==-1) s+=".";
      var i = s.indexOf(".");
      i = s.substring(i+1).length;
      while (i < chap) 
         { s += "0";  i++; }
   }
   i = s.indexOf(".");
   if (i==-1) i = s.length;
   var k = s.substring(0,i);
   var k2 = s.substring(i+1);
   var n = 0;
   for (var i=k.length-1; i >= 0; i--) 
   {
      if (k.charAt(i)!='-') n++;
      str = k.charAt(i) + str;
      if (n >= chpg && i > 0) 
      { 
         str = sepg + str; 
         n=0;
      }
   }
   if (chap > 0) { str += "." + k2;}
   if (simbol=='euro') {return str.split(".").join(sepd) + "  " + "\u20AC"} ;
   if (simbol=='noteuro') {return str.split(".").join(sepd)} ;
}



function calcul1(prix_d_achat)
{
		prix_d_achat_g = eval(prix_d_achat);
		prix_d_achat105 = arrondi_cents(1.05*prix_d_achat_g);
		taux_val = $('.vrai:checked').val();
		if (taux_val == 'd') {taux = 0.125;}
		else if (taux_val == 'b') {taux = 0.06 ;}
		else if (taux_val == 'a') {taux = 0.05 ;};
        indexation = 1.0 ;                                             // indexation = 1.08618516 ; (utilisée pour 2013)
                                                                      // VOIR AUSSI http://coulissesdunotariat.be
		//if (frm.pression_[0].checked) {plafond = indexation * 160000 ;};  // si zone de pression immobilière (soit 217237.03 EUR)
		//if (frm.pression_[1].checked) {
		plafond = indexation * 150000 ;
		//};  // si non                          (soit 207461.37 EUR)
		var non_admis = 0 ;
		if (taux==0.06 && prix_d_achat_g>plafond) { non_admis = (prix_d_achat_g - plafond) * (0.125 - 0.06) ; };
		if (taux==0.05 && prix_d_achat_g>plafond) { non_admis = (prix_d_achat_g - plafond) * (0.125 - 0.05) ; };
		droits1     = arrondi_cents( prix_d_achat_g*taux + non_admis ) ;
		droits1_min = 25.00 ;
		droits1     = Math.max(droits1, droits1_min) ;
		fraisd1 = divers1(prix_d_achat_g) ;
		fraTVA1 = 0.21 * fraisd1 ;
		honor1  = honor_achat(prix_d_achat_g) ;
		honTVA1 = 0.21 * honor1 ;
		provis1 = arrondi_cents(droits1 + fraisd1 + fraTVA1 + honor1 + honTVA1) ;
		pourc1  = arrondi_cents(100 * provis1/prix_d_achat_g) ;
		total1  = arrondi_cents(prix_d_achat_g + provis1) ;
		$('input[name=provis1_]').val(euros(provis1,'euro'));
		$('input[name=total1_]').val(euros(total1,'euro'));

}
 
function divers1(prix_d_achat)
{
	frais_divers = 1000.00;  // entre 800 et 1.100 EUR, selon www.notaire.be 
	return frais_divers;
}

function honor_achat(prix_d_achat)
{
	var pa1=prix_d_achat;
	var honord=0;

        	               honord=        Math.min(pa1,  7500.00)            * 4.56 / 100;
	if (pa1>   7500.00)   {honord=honord+(Math.min(pa1, 17500.00)- 7500.00)  * 2.85 / 100;};
	if (pa1>  17500.00)   {honord=honord+(Math.min(pa1, 30000.00)-17500.00)  * 2.28 / 100;};
	if (pa1>  30000.00)   {honord=honord+(Math.min(pa1, 45495.00)-30000.00)  * 1.71 / 100;};
	if (pa1>  45495.00)   {honord=honord+(Math.min(pa1, 64095.00)-45495.00)  * 1.14 / 100;};
	if (pa1>  64095.00)   {honord=honord+(Math.min(pa1,250095.00)-64095.00)  * 0.57 / 100;};
	if (pa1> 250095.00)   {honord=honord+(pa1-250095.00)                     * 0.057/ 100;};

    honord = arrondi_cents(honord);
    honordMin = 8.48;
    return Math.max(honord,honordMin);
}

function calcul2(fonds_propres)
{

		fonds_propres = eval(fonds_propres);
		montant_a_financer = total1 - fonds_propres;
		var coeff = 1.1;
		// calcul des droits d'enregistrement
		droits2 = droits_credit(coeff * montant_a_financer);
		// calcul des frais divers
		fraisd2 = divers2(coeff * montant_a_financer);
		fraTVA2 = 0.21 * fraisd2 ;
		honor2 = honor_credit(coeff * montant_a_financer);
		honTVA2 = 0.21 * honor2 ;
		// calcul de la provision totale
		provis2 = arrondi_cents(droits2 + fraisd2 + fraTVA2 + honor2 + honTVA2) ;
		pourc2  = arrondi_cents(100 * provis2/montant_a_financer ) ;
		$('input[name=provis2_]').val(euros(provis2,'euro'));
		$('input[name=montant_a_financer_]').val(euros(montant_a_financer,'euro'));
		//frm.pourc2_.value  =    pourc2+" %" ; 
		general_total = arrondi_cents(montant_a_financer+provis2);
		quotite = Math.round(100*general_total/prix_d_achat_g);
		if (quotite < -999999) {quotite = -999999}
		else if (quotite > 105) {quotite = 105};
		$('input[name=general_total]').val(euros(general_total,'euro'));
		$('#selTolerance').val(quotite);
		if (general_total > prix_d_achat105) {
			montant_do_pret = arrondi_cents(general_total - prix_d_achat105);
		} else {
			montant_do_pret=0;
		};
		changeMontant();
		$('#mensualite_totale').change();
}

 
$(document).ready(function () {

	if (php_file == 'index') {
		getRates();
	} else if (php_file == 'credit') {
		calculate_futur_mensualite();
	} else {
		alert("Can't calculate futur_mensualite");
	};

		
	
	//getMontant();
	getDuree();
//	getDuree('mois');
	
	$('input[name=prix_d_achat_]').keyup(function () {
		entered_value_prix_d_achat=$('input[name=prix_d_achat_]').val();
		if (entered_value_prix_d_achat=='') entered_value_prix_d_achat=0;
		if (/^([1-9][0-9]*)$|^([1-9][0-9]*\.[0-9]*)$/.test(entered_value_prix_d_achat)) {
			calcul1(entered_value_prix_d_achat);
			entered_value_fonds_propres=$('input[name=fonds_propres]').val();
			if (entered_value_fonds_propres == '') {entered_value_fonds_propres=0};
			if (/^(0)$|^([1-9][0-9]*)$|^([1-9][0-9]*\.[0-9]*)$/.test(entered_value_fonds_propres)) {
				calcul2(entered_value_fonds_propres);
				//getRates();
				if (php_file == 'index') {
					$('#futur_mensualite').change();
				} else if (php_file == 'credit') {
					calculate_futur_mensualite();
				} else {
					alert("Can't calculate futur_mensualite");
				}
			} else {	
				general_total=0;
				$('input[name=provis2_]').val('');
				$('input[name=montant_a_financer_]').val('');
				$('input[name=general_total]').val('');
				$('#selTolerance').val(0);
				$('#f2s').val('');
				montant_do_pret=0;
				changeMontant();
				$('#mensualite_totale').change();
			};
		} else {
			general_total=0;
			$('input[name=provis1_]').val('');
			$('input[name=total1_]').val('');
			$('input[name=montant_a_financer_]').val('');
			$('input[name=provis2_]').val('');
			$('input[name=montant_a_financer_]').val('');
			$('input[name=general_total]').val('');
			$('#selTolerance').val(0);
			$('#f2s').val('');
			montant_do_pret=0;
			changeMontant();
			$('#mensualite_totale').change();
		};
		changeTolerance();
		//Calculate();
	}); 

	
	$('input[name=fonds_propres]').keyup(function () {

			entered_value_fonds_propres=$('input[name=fonds_propres]').val();
			entered_value_prix_d_achat=$('input[name=prix_d_achat_]').val();
			if (entered_value_fonds_propres == '') {entered_value_fonds_propres=0};
			if (entered_value_prix_d_achat == '') {entered_value_prix_d_achat=0};
			if (/^(0)$|^([1-9][0-9]*)$|^([1-9][0-9]*\.[0-9]*)$/.test(entered_value_fonds_propres) &&
			/^([1-9][0-9]*)$|^([1-9][0-9]*\.[0-9]*)$/.test(entered_value_prix_d_achat)) {
				calcul2(entered_value_fonds_propres);
				//getRates();
				if (php_file == 'index') {
					$('#futur_mensualite').change();
				} else if (php_file == 'credit') {
					calculate_futur_mensualite();
				} else {
					alert("Can't calculate futur_mensualite");
				}
			} else {
				general_total=0;
				$('input[name=provis2_]').val('');
				$('input[name=montant_a_financer_]').val('');
				$('input[name=general_total]').val('');
				$('#selTolerance').val(0);
				$('#f2s').val('');
				montant_do_pret=0;
				changeMontant();
				$('#mensualite_totale').change();
			};
		changeTolerance();
		//Calculate();
	}); 

	$('input[name=taux_]').click(function () {
		$('input[name=prix_d_achat_]').keyup();
	});

	$('#rate_futur_mensualite').change(function () {
		calculate_futur_mensualite();
	});

	$('#futur_mensualite').change(function () {
		if (php_file == "index") getRates();
	});
	
	$('#mensualite_totale').change(function () {
		var h = montant_do_pret;
		var iArr = (document.getElementById("mensualite_totale").options[document.getElementById("mensualite_totale").selectedIndex].value).split(":");
		var resDiv = $('#f2t');
		var i2, taux_mensualite_totale;		
		if (iArr.length == 2){
			i2 = iArr[0];
			taux_mensualite_totale = iArr[1];
		}
		else
		{
			i2 = " ";
			taux_mensualite_totale = 0;
		}		
		if ((h == " ") || (h == 0) || (i2 == " ")){
			resDiv.val('');
			//resDiv.style.visibility = "hidden";
			//resDiv.style.display = "none";			
		} else if (h < 1500) {
			resDiv.val('imposible');
		} else {
			h = parseInt(h);
			i2 = parseInt(i2);
			//resDiv.style.visibility = "visible";
			//resDiv.style.display = "block";		
			
			var taux_mois=Math.pow((1+taux_mensualite_totale/100),(1/12))-1; 
			var ab=(h/((1-(Math.pow((taux_mois+1),(-(i2)))))/taux_mois)).toFixed(2); 
			
			resDiv.val(ab);
		}
   			Calculate();

	});
	

}); 

function getRates(ttttt) 
{	
	$.get("/charges_test/demande_achat_ajax2_hypo.php", {
		//quotit: 'equal100',
		quotit: 'less80',
		ans: $('#futur_mensualite option:selected').val()
		},
	function(data) {
		data = data.replace(/\\/gi, "");
		$('#rate_futur_mensualite').html(data);
		//$('#futur_mensualite').change();
		if (/^([1-9][0-9]*)$|^([1-9][0-9]*\.[0-9]*)$/.test($('input[name=prix_d_achat_]').val()) &&
		/^()$|^(0)$|^([1-9][0-9]*)$|^([1-9][0-9]*\.[0-9]*)$/.test($('input[name=fonds_propres]').val())) {
			calculate_futur_mensualite();
		}
	});

};




function calculate_futur_mensualite() {

		$('#f2s').val('');
		var h = general_total;
		if (php_file == "index") {
			var i = $('#futur_mensualite option:selected').val();
		} else if (php_file == "credit") {
			var i = $('#rate_futur_mensualite option:selected').val();
		}
		var taux_futur_mensualite = $('#rate_futur_mensualite option:selected').attr('rel');
			h = parseInt(h);
			i = parseInt(i);
			// duration to month 
			i = i*12;
		if (h == '' || h == 0 || taux_futur_mensualite =='') {$('#f2s').val(''); return;}
		var taux_mois = Math.pow((1 + taux_futur_mensualite/100),(1/12)) - 1; 
		var ab_futur_mensualite = (h/((1 - (Math.pow((taux_mois + 1),(-(i)))))/taux_mois)).toFixed(2); 

		if (ab_futur_mensualite == 'NaN') {$('#f2s').val(''); return;}
			$('#f2s').val(ab_futur_mensualite);
			Calculate();
};



function droits_hypo(val1)
{
                       droit=        Math.min(val1,   5000.00)                * 2.865 /100;
if (val1>    5000.00) {droit=droit +(Math.min(val1,  12000.00) -    5000.00 ) * 13.00 /1000;}
if (val1>   12000.00) {droit=droit +(Math.min(val1,  12249.00) -   12000.00 ) * 11.70 /1000;}
if (val1>   12249.00) {droit=droit +(Math.min(val1,  22500.00) -   12249.00 ) * 14.30 /1000;}
if (val1>   22500.00) {droit=droit +(Math.min(val1,  22749.00) -   22500.00 ) * 84.58 /1000;}
if (val1>   22749.00) {droit=droit +(Math.min(val1,  45250.00) -   22749.00 ) * 14.30 /1000;}
if (val1>   45250.00) {droit=droit +(Math.min(val1,  45494.00) -   45250.00 ) * 86.00 /1000;}
if (val1>   45494.00) {droit=droit +(Math.min(val1,  68000.00) -   45494.00 ) * 14.30 /1000;}
if (val1>   68000.00) {droit=droit +(Math.min(val1,  68499.00) -   68000.00 ) * 49.38 /1000;}
if (val1>   68499.00) {droit=droit +(Math.min(val1,  90500.00) -   68499.00 ) * 14.30 /1000;}
if (val1>   90500.00) {droit=droit +(Math.min(val1,  90999.00) -   90500.00 ) * 49.36 /1000;}
if (val1>   90999.00) {droit=droit +(Math.min(val1, 113500.00) -   90999.00 ) * 14.30 /1000;}
if (val1>  113500.00) {droit=droit +(Math.min(val1, 113999.00) -  113500.00 ) * 49.38 /1000;}
if (val1>  113999.00) {droit=droit +(Math.min(val1, 136000.00) -  113999.00 ) * 14.30 /1000;}
if (val1>  136000.00) {droit=droit +(Math.min(val1, 136999.00) -  136000.00 ) * 31.82 /1000;}
if (val1>  136999.00) {droit=droit +(Math.min(val1, 159000.00) -  136999.00 ) * 14.30 /1000;}
if (val1>  159000.00) {droit=droit +(Math.min(val1, 159999.00) -  159000.00 ) * 31.81 /1000;}
if (val1>  159999.00) {droit=droit +(Math.min(val1, 181000.00) -  159999.00 ) * 14.30 /1000;}
if (val1>  181000.00) {droit=droit +(Math.min(val1, 181999.00) -  181000.00 ) * 31.82 /1000;}
if (val1>  181999.00) {droit=droit +(Math.min(val1, 200000.00) -  181999.00 ) * 14.30 /1000;}
if (val1>  200000.00) {droit=droit +(Math.min(val1, 205000.00) -  200000.00 ) * 13.00 /1000;}
if (val1>  205000.00) {droit=droit +(Math.min(val1, 205999.00) -  205000.00 ) * 30.52 /1000;}
if (val1>  205999.00) {droit=droit +(Math.min(val1, 230000.00) -  205999.00 ) * 13.00 /1000;}
if (val1>  230000.00) {droit=droit +(Math.min(val1, 230999.00) -  230000.00 ) * 30.52 /1000;}
if (val1>  230999.00) {droit=droit +(Math.min(val1, 255000.00) -  230999.00 ) * 13.00 /1000;}
if (val1>  255000.00) {droit=droit +(Math.min(val1, 257499.00) -  255000.00 ) * 20.00 /1000;}
if (val1>  257499.00) {droit=droit +(Math.min(val1, 279999.00) -  257499.00 ) * 13.00 /1000;}
if (val1>  279999.00) {droit=droit +(Math.min(val1, 282499.00) -  279999.00 ) * 20.00 /1000;}
if (val1>  282499.00) {droit=droit +(Math.min(val1, 304999.00) -  282499.00 ) * 13.00 /1000;}
if (val1>  304999.00) {droit=droit +(Math.min(val1, 307499.00) -  304999.00 ) * 20.00 /1000;}
if (val1>  307499.00) {droit=droit +(Math.min(val1, 329999.00) -  307499.00 ) * 13.00 /1000;}
if (val1>  329999.00) {droit=droit +(Math.min(val1, 332499.00) -  329999.00 ) * 20.00 /1000;}
if (val1>  332499.00) {droit=droit +(Math.min(val1, 354999.00) -  332499.00 ) * 13.00 /1000;}
if (val1>  354999.00) {droit=droit +(Math.min(val1, 357499.00) -  354999.00 ) * 20.00 /1000;}
if (val1>  357499.00) {droit=droit +(Math.min(val1, 379999.00) -  357499.00 ) * 13.00 /1000;}
if (val1>  379999.00) {droit=droit +(Math.min(val1, 382499.00) -  379999.00 ) * 20.00 /1000;}
if (val1>  382499.00) {droit=droit +(Math.min(val1, 404999.00) -  382499.00 ) * 13.00 /1000;}
if (val1>  404999.00) {droit=droit +(Math.min(val1, 407499.00) -  404999.00 ) * 20.00 /1000;}
if (val1>  407499.00) {droit=droit +(Math.min(val1, 429999.00) -  407499.00 ) * 13.00 /1000;}
if (val1>  429999.00) {droit=droit +(Math.min(val1, 432499.00) -  429999.00 ) * 20.00 /1000;}
if (val1>  432499.00) {droit=droit +(Math.min(val1, 449999.00) -  432499.00 ) * 13.00 /1000;}
if (val1>  449999.00) {droit=droit +(Math.min(val1, 459999.00) -  449999.00 ) * 14.75 /1000;}
if (val1>  459999.00) {droit=droit +(Math.min(val1, 479999.00) -  459999.00 ) * 13.00 /1000;}
if (val1>  479999.00) {droit=droit +(Math.min(val1, 489999.00) -  479999.00 ) * 14.75 /1000;}
if (val1>  489999.00) {droit=droit +(Math.min(val1, 499999.00) -  489999.00 ) * 13.00 /1000;}
if (val1>  499999.00) {droit=droit +(Math.min(val1, 509999.00) -  499999.00 ) * 14.75 /1000;}
if (val1>  509999.00) {droit=droit +(Math.min(val1, 529999.00) -  509999.00 ) * 13.00 /1000;}
if (val1>  529999.00) {droit=droit +(Math.min(val1, 539999.00) -  529999.00 ) * 14.75 /1000;}
if (val1>  539999.00) {droit=droit +(Math.min(val1, 549999.00) -  539999.00 ) * 13.00 /1000;}
if (val1>  549999.00) {droit=droit +(Math.min(val1, 559999.00) -  549999.00 ) * 14.75 /1000;}
if (val1>  559999.00) {droit=droit +(Math.min(val1, 579999.00) -  559999.00 ) * 13.00 /1000;}
if (val1>  579999.00) {droit=droit +(Math.min(val1, 589999.00) -  579999.00 ) * 14.75 /1000;}
if (val1>  589999.00) {droit=droit +(Math.min(val1, 599999.00) -  589999.00 ) * 13.00 /1000;}
if (val1>  599999.00) {droit=droit +(Math.min(val1, 609999.00) -  599999.00 ) * 14.75 /1000;}
if (val1>  609999.00) {droit=droit +(Math.min(val1, 629999.00) -  609999.00 ) * 13.00 /1000;}
if (val1>  629999.00) {droit=droit +(Math.min(val1, 639999.00) -  629999.00 ) * 14.75 /1000;}
if (val1>  639999.00) {droit=droit +(Math.min(val1, 649999.00) -  639999.00 ) * 13.00 /1000;}
if (val1>  649999.00) {droit=droit +(Math.min(val1, 659999.00) -  649999.00 ) * 14.75 /1000;}
if (val1>  659999.00) {droit=droit +(Math.min(val1, 679999.00) -  659999.00 ) * 13.00 /1000;}
if (val1>  679999.00) {droit=droit +(Math.min(val1, 689999.00) -  679999.00 ) * 14.75 /1000;}
if (val1>  689999.00) {droit=droit +(Math.min(val1, 700000.00) -  689999.00 ) * 13.00 /1000;}
if (val1>  700000.00) {droit=droit +         (val1             -  700000.00 ) * 13.70 /1000;}
droit = arrondi_cents(droit);
return droit;
}
 
 
function droits_credit(val1)
{
    droit = droits_hypo(val1);
    droit = arrondi_cents(droit);
    return droit;
}
 
 
 
function divers2(montant_a_financer)
{
    val1 = montant_a_financer;
//  frais_divers = 625.00;
	frais_divers = 1000.00;  // entre 800 et 1.100 EUR, selon www.notaire.be
    return frais_divers;
}
 
 
 
function honor_hypo(val1)
{
    var honord=0;
                          honord=        Math.min(val1,  7500.00)               * 1.425 /100;
    if (val1>   7500.00) {honord=honord+(Math.min(val1, 17500.00) -   7500.00 ) * 1.14  /100;}
    if (val1>  17500.00) {honord=honord+(Math.min(val1, 30000.00) -  17500.00 ) * 0.684 /100;}
    if (val1>  30000.00) {honord=honord+(Math.min(val1, 45495.00) -  30000.00 ) * 0.57  /100;}
    if (val1>  45495.00) {honord=honord+(Math.min(val1, 64095.00) -  45495.00 ) * 0.456 /100;}
    if (val1>  64095.00) {honord=honord+(Math.min(val1,250095.00) -  64095.00 ) * 0.228 /100;}
    if (val1> 250095.00) {honord=honord+         (val1            - 250095.00 ) * 0.0456/100;}
    
    return arrondi_cents(honord)
}


function honor_credit(val1)
{
    var honord=0;
                          honord=        Math.min(val1,  7500.00)               * 1.71  /100;
    if (val1>   7500.00) {honord=honord+(Math.min(val1, 17500.00) -   7500.00 ) * 1.368 /100;}
    if (val1>  17500.00) {honord=honord+(Math.min(val1, 30000.00) -  17500.00 ) * 0.912 /100;}
    if (val1>  30000.00) {honord=honord+(Math.min(val1, 45495.00) -  30000.00 ) * 0.684 /100;}
    if (val1>  45495.00) {honord=honord+(Math.min(val1, 64095.00) -  45495.00 ) * 0.456 /100;}
    if (val1>  64095.00) {honord=honord+(Math.min(val1,250095.00) -  64095.00 ) * 0.228 /100;}
    if (val1> 250095.00) {honord=honord+         (val1            - 250095.00 ) * 0.0456/100;}
 
    return arrondi_cents(honord)
}
