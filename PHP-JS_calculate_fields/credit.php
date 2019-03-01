<?php

	include('login.php');
	
	/*
	$requiredUserLevel = array(3);
	$cfgProgDir = 'phpSecurePages/';
	include($cfgProgDir . "secure.php");
	*/
?>
<!-- saved from url=(0022)http://internet.e-mail -->
<html>
	<head>
		<title>Credit</title>
		<script type="text/javascript" src="funcs.js"></script>
		<script type="text/javascript" src="jquery.js"></script>
		<script language="javascript">
			var php_file = "credit"; 
		</script>
		<script type="text/javascript" src="./js/calculs_frais.js"></script>
		<STYLE>
			.style2 { background-image:url(header_hypo.jpg);
				background-repeat:no-repeat }
			.Buttons1
			{
			font-family:Verdana;
			font-size:24px;
			font-weight:bold;
			color:#CA8B58;
			}
			.Buttons2
			{
			font-family:Verdana;
			font-size:24px;
			font-weight:bold;
			color:#779579;
			}
			.Results
			{
			font-family:Verdana;
			font-size:18px;
			font-weight:bold;
			color:#CA8B58;
			}
			input.vrai:focus {
			background-color: #0F0;
			}
			input.vrai {
			background-color: #9ACD32;
			}
		</STYLE>	
		<script language="javascript">
function Calculate(){
//alert('calculate');
	//get input values
		var aval = parseFloat(document.getElementById("f2a").value); if (isNaN(aval)) {aval=0;}
		var bval = parseFloat(document.getElementById("f2b").value); if (isNaN(bval)) {bval=0;}
		var cval = parseFloat(document.getElementById("f2c").value); if (isNaN(cval)) {cval=0;}
		var dval = parseFloat(document.getElementById("f2d").value); if (isNaN(dval)) {dval=0;}		
		var ahval = parseFloat(document.getElementById("f2ah").value); if (isNaN(ahval)) {ahval=0;}
		if (ahval>1140){ahval = 1140;}
		var afval = parseFloat(document.getElementById("f2af").value); if (isNaN(afval)) {afval=0;}
		if (afval>440) {afval = 440}
		var ccval = parseFloat(document.getElementById("f2cc").value); if (isNaN(ccval)) {ccval=0;}
		var ihval = parseFloat(document.getElementById("f2ih").value); if (isNaN(ihval)) {ihval=0;}
		var ifval = parseFloat(document.getElementById("f2if").value); if (isNaN(ifval)) {ifval=0;}
		var selihval = parseFloat(document.getElementById("self2ih").options[document.getElementById("self2ih").selectedIndex].value); 
		var selifval = parseFloat(document.getElementById("self2if").options[document.getElementById("self2if").selectedIndex].value); 
		//if ((ihval!=0)&&(selihval!=100)){ihval=selihval;}
		//if ((ifval!=0)&&(selifval!=100)){ifval=selifval;}
		
		var eval = parseFloat(document.getElementById("f2e").value); if (isNaN(eval)) {eval=0;}
		var fval = parseFloat(document.getElementById("f2f").value); if (isNaN(fval)) {fval=0;}
		var chhval = parseFloat(document.getElementById("f2chh").value); if (isNaN(chhval)) {chhval=0;}
		var chfval = parseFloat(document.getElementById("f2chf").value); if (isNaN(chfval)) {chfval=0;}
		
		var sval = parseFloat(document.getElementById("f2s").value); if (isNaN(sval)) {sval=0;}
		//var tval = parseFloat(document.getElementById("f2t").value); if (isNaN(tval)) {tval=0;}
		var tval_a = parseFloat(document.getElementById("f2t").value); if (isNaN(tval_a)) {tval_a=0;}
		var tval_b = parseFloat(document.getElementById("f2tb").value); if (isNaN(tval_b)) {tval_b=0;}
		var tval = tval_a + tval_b;
		
		var qval = parseFloat(document.getElementById("f2q").value); if (isNaN(qval)) {qval=0;}
		var rval = parseFloat(document.getElementById("f2r").value); if (isNaN(rval)) {rval=0;}
		
		//var tolerance = parseInt(document.getElementById("selTolerance").options[document.getElementById("selTolerance").selectedIndex].value);
		var tolerance = 2;		
		//var quotite = parseInt(document.getElementById("selTolerance").options[document.getElementById("selTolerance").selectedIndex].text);
		var quotite = parseInt(document.getElementById("selTolerance").value);
		
		var f2add = document.getElementById("f2add").options[document.getElementById("f2add").selectedIndex].value;
		var f2bdd = document.getElementById("f2bdd").options[document.getElementById("f2bdd").selectedIndex].value;
		var f2cdd = document.getElementById("f2cdd").options[document.getElementById("f2cdd").selectedIndex].value;
		var f2ddd = document.getElementById("f2ddd").options[document.getElementById("f2ddd").selectedIndex].value;	
		
		totalH = Math.round(aval)+Math.round(cval)+Math.round(qval*1/12)+Math.round(ahval)+Math.round(eval)+Math.round(ihval)+chhval;
		totalF = Math.round(bval)+Math.round(dval)+Math.round(rval*1/12)+Math.round(afval)+Math.round(fval)+Math.round(ifval)+chfval;
		
					
			totalRevenus = totalH+totalF;
			totalCharges = Math.round(sval)+Math.round(tval);

			var percent;
			percent = Math.round(totalCharges / totalRevenus *100);
			var totalResColor, totalRes;
			totalResColor = "green"
			
			//If all  C/R  > 45 %   refusal = RED  
			
			var reason = 0;
			if (percent>47){
				totalResColor = "red";
				reason = 1;
			} else {
				if (percent>=45){  //quontitie = 2%
					totalResColor = "orange";
				}
			}
			
			//if  Futur mensualite du Pret Hypothecaire > 30 %    refusal
			if (sval/totalRevenus>0.3){
				totalResColor = "red";
				reason = 2;
			}
			
			//if  Revenu - Charge < 740     then  refusal = RED
			if (totalRevenus-totalCharges<740){
				totalResColor = "red";
				reason = 3;
			}
			
			//one person
			if ((totalF==0)&&(totalH!=0)){
				//For a alone person If CDD less then  2 years    refusal
				if ((aval!=0)&&(f2add=="CDD4")){totalResColor = "red"; reason=4;}
				if ((cval!=0)&&(f2cdd=="CDD4")){totalResColor = "red"; reason=5;}
				if ((aval!=0)&&(f2add=="CDD5")){totalResColor = "red"; reason=6;}
				if ((cval!=0)&&(f2cdd=="CDD5")){totalResColor = "red"; reason=7;}
				if ((aval!=0)&&(f2add=="CDD6")){totalResColor = "red"; reason=8;}
				if ((cval!=0)&&(f2cdd=="CDD6")){totalResColor = "red"; reason=9;}
				if ((aval!=0)&&(f2add=="CDD7")){totalResColor = "red"; reason=10;}
				if ((cval!=0)&&(f2cdd=="CDD7")){totalResColor = "red"; reason=11;}
				
				//if (ahval!=0){totalResColor = "red"; reason=12;}	 //IF   alone person  = Allocations de chomage (/mois)    refused
				if (ihval==493){totalResColor = "red"; reason=13;}	 //IF   alone person  = Invalide ? (/mois)       refused

			}
			if ((totalH==0)&&(totalF!=0)){
				//For a alone person If CDD less then  2 years    refusal
				if ((bval!=0)&&(f2bdd=="CDD4")){totalResColor = "red"; reason=14;}
				if ((dval!=0)&&(f2ddd=="CDD4")){totalResColor = "red"; reason=15;}
				if ((bval!=0)&&(f2bdd=="CDD5")){totalResColor = "red"; reason=16;}
				if ((dval!=0)&&(f2ddd=="CDD5")){totalResColor = "red"; reason=17;}
				if ((bval!=0)&&(f2bdd=="CDD6")){totalResColor = "red"; reason=18;}
				if ((dval!=0)&&(f2ddd=="CDD6")){totalResColor = "red"; reason=19;}
				if ((bval!=0)&&(f2bdd=="CDD7")){totalResColor = "red"; reason=20;}
				if ((dval!=0)&&(f2ddd=="CDD7")){totalResColor = "red"; reason=21;}
				
				//if (afval!=0){totalResColor = "red"; reason=22;}  //IF   alone person  = Allocations de chomage (/mois)    refused
				if (ifval==493){totalResColor = "red"; reason=23;}  //IF   alone person  = Invalide ? (/mois)       refused
			}
			
			//two persons
			//If both are not CDI or CDD (1st is not  CDI or CDD AND second is not  CDI or CDD) - refusal
			//If one of 2 people is CDI or CDD>=3ans - we check the other person
			//if another person has CCD < 3 mois - then refusal, otherwise - all other options for another person are ok
			
			var cddcheck = false;
			if ((totalH!=0)&&(totalF!=0)){
				if ((aval!=0)||(bval!=0)||(cval!=0)||(dval!=0)){
					if ((aval!=0)&&((f2add=="CDD1")||(f2add=="CDI"))){
						if (((bval!=0)&&(f2bdd!="CDD7"))||(bval==0)){cddcheck=true;}
					}
					if ((bval!=0)&&((f2bdd=="CDD1")||(f2bdd=="CDI"))){
						if (((aval!=0)&&(f2add!="CDD7"))||(aval==0)){cddcheck=true;}
					}
					if ((cval!=0)&&((f2cdd=="CDD1")||(f2cdd=="CDI"))){
						if (((dval!=0)&&(f2ddd!="CDD7"))||(dval==0)){cddcheck=true;}
					}
					if ((dval!=0)&&((f2ddd=="CDD1")||(f2ddd=="CDI"))){
						if (((cval!=0)&&(f2cdd!="CDD7"))||(cval==0)){cddcheck=true;}
					}  
					if (cddcheck==false){totalResColor = "red"; reason=24;}
				}
			}
			
			
			//If not select then always "no"  even all other element do YES : )  
			var chbUniquementLiege = document.getElementById("chbUniquementLiege").checked;
			if (!chbUniquementLiege){totalResColor = "red"; reason=25;}
			
			
			
		if (totalResColor=="green"){
			totalRes = "<table class='Results'><tr><td>POSSIBILITE D'ACCEPTATION = </td><td style='color:white;background-color:#336600' width='50px' align='center'>OUI</td></tr></table>";
		}
		else
		{
			if (totalResColor=="orange"){
				totalRes = "<table class='Results'><tr><td>POSSIBILITE D'ACCEPTATION = </td><td width='50px' align='center' style='color:white;background-color:#FF8000'>OUI</td></tr></table>";
			}
			else {
				totalRes = "<table class='Results'><tr><td>POSSIBILITE D'ACCEPTATION = </td><td width='50px' align='center' style='color:white;background-color:#990000'>NON</td></tr></table>";
			}
		} 
		
		document.getElementById("totalRes").innerHTML =  totalRes;
		
		//    commenter document.getElementById("debug").innerHTML = "H:" + totalH + "F:" + totalF + "Reason of refusal:" + reason;	
		saveInputToCookies();		
	
}

function changeTolerance()
{
	//document.getElementById("tolerance").value = document.getElementById("selTolerance").options[document.getElementById("selTolerance").selectedIndex].text;
	document.getElementById("tolerance").value = parseInt(document.getElementById("selTolerance").value);
}

function CalculateMonthlyAmount()
{
	var capitalAmount = document.getElementById("txtCapitalAmount").value;
	capitalAmount = capitalAmount.replace(",",".");
	var rate = <?php echo ($theRate)? $theRate : '4.0'; ?>;
	var duration = document.getElementById("txtDuration").value;
	duration = duration.replace(",",".");
	if (!isNumber(capitalAmount)){alert("Please enter valid value"); document.getElementById("txtCapitalAmount").focus(); return;}	
	if (!isNumber(duration)){alert("Please enter valid value"); document.getElementById("txtDuration").focus(); return;}
	duration = duration*12;
	var taux_mois=Math.pow((1+rate/100),(1/12))-1; 
	var res = (capitalAmount/((1-(Math.pow((taux_mois+1),(-(duration)))))/taux_mois)).toFixed(2); 
	
	document.getElementById("f2s").value=res;
		
	document.getElementById("divCalc").style.visibility = "hidden";
	document.getElementById("divCalc").style.display = "none";
	
	Calculate();
}

function showCalc()
{
	document.getElementById("txtCapitalAmount").value = "";
	document.getElementById("txtDuration").value ="";
	document.getElementById("divCalc").style.visibility = "visible";
	document.getElementById("divCalc").style.display = "block";
}
function closeMontantCalculator()
{
	document.getElementById("divCalc").style.visibility = "hidden";
	document.getElementById("divCalc").style.display = "none";
}
function isNumber(str){ 
	if(str.length==0) 
	{
		return false;
	} 
	numdecs = 0; 
	for (i = 0; i < str.length; i++) 
	{
		mychar = str.charAt(i); 
		if ((mychar >= "0" && mychar <= "9") || mychar == "." ){ 
		if (mychar == ".") 
			numdecs++; 
		} 
		else
		{ 
			return false; 
		}
	} 
	if (numdecs > 1){return false;} 
	return true; 
}

	function resetForm()
	{
		document.getElementById("frmAchat").reset();
		resetCookies();
		loadInputFromCookies();
		document.getElementById("tolerance").value = 0;
		Calculate();
	}
</script>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"></head>
	
<body  background="header_hypo.jpg" link="#000055" vlink="#000055" alink="#000055" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" style="background-repeat:no-repeat"  onLoad="loadInputFromCookies();Calculate();">
<form id="frmAchat">
<table cellpadding="0" border="0" cellspacing="0" width="99%">
    <tr>				
      <td align="right" height="160px" valign="top">
      
<p><strong><font face="Arial, Helvetica, sans-serif"><a href="contact.php">Contact</a> 
          - <a href="formulaire.php">Formulaire de demande de RDV</a></font></strong><br>          
          <br/>
          <div style="width:700px">
          <table cellpadding="0" border="0" cellspacing="0" width="100%"><tr>
              <td align="right" colspan="2"><font size="4" face="Arial, Helvetica, sans-serif">&nbsp;&nbsp; <a href="http://***/calcul_de_frais.php" target="_blank" ><font size="4" face="Arial, Helvetica, sans-serif"> 
                Frais de notaire</font></a><font size="4" face="Arial, Helvetica, sans-serif">&nbsp;&nbsp; 
                <a href="#"  onClick="showCalc()">Taux/Mensualit&eacute;</a>&nbsp;&nbsp;<a href="#"  onClick="resetForm()">Reset</a></font> 
              </td>
            </tr>
          <tr>
          <td width="400px">&nbsp;</td>
          <td width="300px" align="left">
    <div id="divCalc" style="background-color:#CCCCCC;border: 1 solid black;width:300px;height:150px;visibility:hidden;display:none;position:absolute;z-index:2;margin-top:2px">
<table style="font-family:Arial;font-size:12px" ID="Table4" align="right">
	<tr><td colspan="2" align="center"><div style="font-size:16px;font-weight:bold;color:#CA8B58">Calcul de mensualit&eacute;s</div></td></tr>
	<tr><td height="5px"></td></tr>
	<tr>
		<td>Montant emprunt&eacute;:</td>
		<td><input type="text" id="txtCapitalAmount" NAME="txtCapitalAmount" style="width:100px"/></td>
	</tr>
	<tr>
		<td>Dur&eacute;e:</td>
		<td><input type="text" id="txtDuration" NAME="txtDuration" style="width:100px"/>
		&nbsp;
		(Ann&eacute;es)
		</td>
	</tr>
	<tr><td colspan="2"><input type="button" value="Calculer" onClick="CalculateMonthlyAmount()" ID="Button1" NAME="Button1"/>&nbsp;<input type="button" value="Fermer" onClick="closeMontantCalculator()" /></td></tr>
	<tr><td colspan="2"><?php  echo $theRate ?> % - Taux fixe moyen de base<br>
(sous r&eacute;serve de changement)</td></tr>
</table>
</div>          
 </td></tr></table>
</div></p> 
</td></tr>
<tr><td><a href="index.php"><img src="img/credit_classiques_off.jpg" border="0" /></a><a href="credit.php"><img src="img/credit_sociaux_on.jpg" border="0" /></a></td></tr>		
			<tr>
				<td>
					 <!-- CREDIT -->
<div id="form2">
<input type="hidden" id="tolerance" value="115" NAME="tolerance" />
					<table width="100%%" border="0" cellpadding="2" cellspacing="2">
							<tr>
								<td width="35%" bgcolor="#000066">
									<div align="center" style="margin-top:2px;margin-bottom:2px">
										<font style="font-size:15px" face="Arial, Helvetica, sans-serif">&nbsp;<strong><font color="#FFFFFF">REVENUS</font></strong></font>
									</div>
								</td>
								<td width="8%" bgcolor="#CCCCCC">
									<div align="center">
										<strong>
											<font style="font-size:15px" color="#000055" face="Arial, Helvetica, sans-serif">Emp.</font>
										</strong>
									</div>
								</td>
								<td width="8%" bgcolor="#CCCCCC">
									<div align="center">
										<strong>
											<font style="font-size:15px" color="#000055" face="Arial, Helvetica, sans-serif">Co-Emp.</font>
										</strong>
									</div>
								</td>
								<td width="33%" bgcolor="#000066">
									<div align="center">
										<font style="font-size:15px" color="#FFFFFF" face="Arial, Helvetica, sans-serif"><strong>CHARGES</strong></font>
									</div>
								</td>
								<td width="16%" bgcolor="#CCCCCC">
									<div align="center">
										<font color="#000055" style="font-size:15px" face="Arial, Helvetica, sans-serif"><strong>Emp. + Co-Emp.</strong></font>
									</div>
								</td>
							</tr>
							<tr>
								<td height="21" valign="top" bgcolor="#E6E6E6">
									<font size="2" face="Arial, Helvetica, sans-serif">Uniquement Liege</font>	
								</td>
								<td valign="top" bgcolor="#E6E6E6" colspan="2">
									<div align="center">
										<input type="checkbox" id="chbUniquementLiege" onclick="Calculate()" />
									</div> 
								</td> 													
								<td bgcolor="#F5F5F5">
									<font size="2" face="Arial, Helvetica, sans-serif">Prix d'achat:</font>
								</td>
								<td bgcolor="#F5F5F5" align="center">
									<font face="Arial, Helvetica, sans-serif"> 
										<input class="vrai" type="text" name="prix_d_achat_" size="10" value="">
									</font>
								</td>
							</tr>
							<tr>
								<td height="21" valign="top" bgcolor="#E6E6E6" rowspan="2">
									<table width="100%" ID="Table2" cellpadding="0" cellspacing="0">
										<tr>
											<td>
												<font size="2" face="Arial, Helvetica, sans-serif">Salaire Net Employ&eacute; (/mois)</font>
											</td>
											<td>
												<font size="2" face="Arial, Helvetica, sans-serif">
													<select id="f2add" onchange="Calculate();" NAME="f2add">
														<option value=""></option> 
														<option value="CDI">CDI</option> 
														<option value="CDD1">CDD:>=3 ans</option> 
														<option value="CDD3">CDD ou INTERIMAIRE:>=2 ans</option>
														<option value="CDD4">CDD:<2 ans (>6 mois)</option>
														<option value="CDD5">CDD:<6 mois (>3 mois)</option>
														<option value="CDD6">CDD:>=3 mois</option>
														<option value="CDD7">CDD:<3 mois</option>
													</select>
											</td>
											<td>
												<select id="f2bdd" onchange="Calculate();" NAME="f2bdd">
													<option value=""></option> 
													<option value="CDI">CDI</option> 
													<option value="CDD1">CDD:>=3 ans</option> 
													<option value="CDD3">CDD ou INTERIMAIRE:>=2 ans</option>
													<option value="CDD4">CDD:<2 ans (>6 mois)</option>
													<option value="CDD5">CDD:<6 mois (>3 mois)</option>
													<option value="CDD6">CDD:>=3 mois</option>
													<option value="CDD7">CDD:<3 mois</option>
												</select>
												</font>
											</td>
										</tr>
									</table>
								</td>
								<td valign="top" bgcolor="#E6E6E6" rowspan="2">
									<div align="center">
										<font size="2" face="Arial, Helvetica, sans-serif">
											<input name="textfield" type="text" id="f2a" value="" size="10" onKeyUp="Calculate();" > 
										</font>
									</div>
								</td>
								<td valign="top" bgcolor="#E6E6E6" rowspan="2">
									<div align="center">
										<font face="Arial, Helvetica, sans-serif"> 
											<input name="textfield2" type="text" id="f2b" value="" size="10" onKeyUp="Calculate();" >
										</font>
									</div>
								</td>																
								<td bgcolor="#F5F5F5">
									<font size="2" face="Arial, Helvetica, sans-serif">Taux de base</font>
								</td>
								<td bgcolor="#F5F5F5"  align="center">
									<font face="Arial, Helvetica, sans-serif"> 
										<input class="vrai" type="radio" value="a" name="taux_">5%
										<input class="vrai" type="radio" value="b" name="taux_">6%
										<input class="vrai" type="radio" value="d" name="taux_" checked >12,5%
									</font>
								</td>
							</tr>
							<tr>
								<td bgcolor="#F5F5F5">
									<font size="2" face="Arial, Helvetica, sans-serif">Provision:</font>
								</td>
								<td bgcolor="#F5F5F5" align="center">
									<font face="Arial, Helvetica, sans-serif"> 
										<input readonly type="text" name="provis1_" size="10">
									</font>
								</td>							
							</tr>	
							<tr>
								<td height="21" valign="top" bgcolor="#E6E6E6" rowspan="2">
									<table width="100%" ID="Table2" cellpadding="0" cellspacing="0">
										<tr>
											<td>
												<font size="2" face="Arial, Helvetica, sans-serif">Salaire Net Ouvrier (/mois)&nbsp;</font>
											</td>
											<td>
												<font size="2" face="Arial, Helvetica, sans-serif">
													<select id="f2cdd" onchange="Calculate();" NAME="f2cdd">
														<option value=""></option> 
														<option value="CDI">CDI</option> 
														<option value="CDD1">CDD:>=3 ans</option> 
														<option value="CDD3">CDD ou INTERIMAIRE:>=2 ans</option>
														<option value="CDD4">CDD:<2 ans (>6 mois)</option>
														<option value="CDD5">CDD:<6 mois (>3 mois)</option>
														<option value="CDD6">CDD:>=3 mois</option>
														<option value="CDD7">CDD:<3 mois</option>
													</select>
											</td>
											<td>
												<select id="f2ddd" onchange="Calculate();" NAME="f2ddd">
													<option value=""></option> 
													<option value="CDI">CDI</option> 
													<option value="CDD1">CDD:>=3 ans</option> 
													<option value="CDD3">CDD ou INTERIMAIRE:>=2 ans</option>
													<option value="CDD4">CDD:<2 ans (>6 mois)</option>
													<option value="CDD5">CDD:<6 mois (>3 mois)</option>
													<option value="CDD6">CDD:>=3 mois</option>
													<option value="CDD7">CDD:<3 mois</option>
												</select>
												</font>
											</td>
										</tr>
									</table>
								</td>
								<td  valign="top" bgcolor="#E6E6E6" rowspan="2">
									<div align="center">
										<font size="2" face="Arial, Helvetica, sans-serif">
											<input name="textfield3" type="text" id="f2c" value="" size="10" onKeyUp="Calculate();"> 
										</font>
									</div>
								</td>
								<td valign="top" bgcolor="#E6E6E6" rowspan="2">
									<div align="center"><font face="Arial, Helvetica, sans-serif"> <input name="textfield4" type="text" id="f2d" value="" size="10" onKeyUp="Calculate();"> </font>
									</div>
								</td> 	
								<td bgcolor="#F5F5F5">
									<font size="2" face="Arial, Helvetica, sans-serif">TOTAL :</font>
								</td>
								<td bgcolor="#F5F5F5" align="center">
									<font face="Arial, Helvetica, sans-serif"> 
										<input readonly type="text" name="total1_" size="10">
									</font>
								</td>
							</tr>
							<tr>
								<td bgcolor="#F5F5F5">
									<font size="2" face="Arial, Helvetica, sans-serif">Fonds propres:</font>
								</td>
								<td bgcolor="#F5F5F5" align="center">
									<font face="Arial, Helvetica, sans-serif"> 
										<input class="vrai" type="text" name="fonds_propres" size="10" value="">
									</font>
								</td>								
							</tr>								
							<tr>
								<td height="21" valign="top" bgcolor="#E6E6E6">
									<font size="2" face="Arial, Helvetica, sans-serif">Ind&eacute;pendants imposable annuel moins l'imp&ocirc;t a payer</font>
								</td>
								<td valign="top" bgcolor="#E6E6E6">
									<div align="center">
										<font face="Arial, Helvetica, sans-serif">
											<input name="textfield32" type="text" id="f2q" value="" size="10" onKeyUp="Calculate();"> 
										</font>
									</div>
								</td>
								<td valign="top" bgcolor="#E6E6E6">
									<div align="center"><font face="Arial, Helvetica, sans-serif">
										<input name="textfield33" type="text" id="f2r" value="" size="10" onKeyUp="Calculate();"> </font>
									</div>
								</td>
								<td bgcolor="#F5F5F5">
									<font size="2" face="Arial, Helvetica, sans-serif">Montant &agrave; financer:</font>
								</td>
								<td bgcolor="#F5F5F5" align="center">
									<font face="Arial, Helvetica, sans-serif"> 
										<input readonly type="text" name="montant_a_financer_" size="10" >
									</font>
								</td>								
							</tr>
							<tr>
								<td height="21" valign="top" bgcolor="#E6E6E6">
									<font size="2" face="Arial, Helvetica, sans-serif">Allocations de ch&ocirc;mage (/mois)</font>
								</td>
								<td valign="top" bgcolor="#E6E6E6" nowrap="true">
									<div align="center">
										<font size="2" face="Arial, Helvetica, sans-serif">
											<input type="text" id="f2ah" size="10" onKeyUp="Calculate();" NAME="f2ah" /> 
										</font>
									</div>
								</td>
								<td valign="top" bgcolor="#E6E6E6" nowrap="true">
									<div align="center">
										<font size="2" face="Arial, Helvetica, sans-serif">
											<input type="text" id="f2af" size="10" onKeyUp="Calculate();" NAME="f2af" /> 
										</font>
									</div>
								</td> 
								<td bgcolor="#F5F5F5">
									<font size="2" face="Arial, Helvetica, sans-serif">Provision:</font>
								</td>
								<td bgcolor="#F5F5F5" align="center">
									<font face="Arial, Helvetica, sans-serif"> 
										<input readonly type="text" name="provis2_" size="10">
									</font>
								</td>								
							</tr>
							<tr>
								<td height="21" valign="top" bgcolor="#E6E6E6">
									<table width="100%" ID="Table3">
										<tr>
											<td>
												<font size="2" face="Arial, Helvetica, sans-serif">Invalide ? (/mois)</font>
											</td>
											<td width="40px">
												<font size="2" face="Arial, Helvetica, sans-serif">
													<select id="self2ih" onchange="Calculate();">
														<option value="0"></option>
														<option value="100">Temporairement sur la mutuel</option>
														<option value="493">Invalidite permanente</option>
														<option value="100">Vierge Noire</option>
													</select> 
												</font>
											</td>
											<td width="40px">
												<font size="2" face="Arial, Helvetica, sans-serif">
													<select id="self2if" onchange="Calculate();">
														<option value="0"></option>
														<option value="100">Temporairement sur la mutuel</option>
														<option value="493">Invalidite permanente</option>
														<option value="100">Vierge Noire</option>
													</select> 
												</font>
											</td>
										</tr>
									</table>
								</td>
								<td valign="top" bgcolor="#E6E6E6" nowrap="true">
									<div align="center">
										<font size="2" face="Arial, Helvetica, sans-serif">
											<input type="text" id="f2ih" size="10" onKeyUp="Calculate();" NAME="Text2" />
										</font>
									</div>
								</td>
								<td valign="top" bgcolor="#E6E6E6" nowrap="true">
									<div align="center">
										<font size="2" face="Arial, Helvetica, sans-serif">
											<input type="text" id="f2if" size="10" onKeyUp="Calculate();" NAME="Text1" />
										</font>
									</div>
								</td> 								
								<td bgcolor="#F5F5F5">
									<font size="2" face="Arial, Helvetica, sans-serif">GENERAL TOTAL:</font>
								</td>
								<td bgcolor="#F5F5F5" align="center">
									<font face="Arial, Helvetica, sans-serif"> 
										<input readonly type="text" name="general_total" size="10">
									</font>
								</td>
							</tr>
							<tr>
								<td height="21" valign="top" bgcolor="#E6E6E6">
									<font size="2" face="Arial, Helvetica, sans-serif">Retrait&eacute; ? (/mois)</font>
								</td>
								<td valign="top" bgcolor="#E6E6E6">
									<div align="center">
										<font face="Arial, Helvetica, sans-serif"> 
											<input name="textfield7" id="f2e" type="text" value="" size="10" onKeyUp="Calculate();"> 
										</font>
									</div>
								</td>
								<td valign="top" bgcolor="#E6E6E6">
									<div align="center">
										<font face="Arial, Helvetica, sans-serif"> 
											<input name="textfield8" id="f2f" type="text" value="" size="10" onKeyUp="Calculate();"> 
										</font>
									</div>
								</td>								
								<td bgcolor="#F5F5F5" >
									<font size="2" face="Arial, Helvetica, sans-serif">Dur&eacute;e du pr&ecirc;t (ann&eacute;e)</font>
								</td>
								<td bgcolor="#F5F5F5" align="center">
									<font size="2" face="Arial, Helvetica, sans-serif">
										<select name="rate_futur_mensualite" id="rate_futur_mensualite" style="width:172px">

										</select>
									</font>	
								</td>								
							</tr>

							<tr>
								<td height="21" valign="top" bgcolor="#E6E6E6">
									<font size="2" face="Arial, Helvetica, sans-serif">Ch&egrave;ques repas </font>
								</td>
								<td valign="top" bgcolor="#E6E6E6">
									<div align="center">
										<font face="Arial, Helvetica, sans-serif"> 
											<input type="text" id="f2chh" size="10" onKeyUp="Calculate();" NAME="f2chh">
										</font>
									</div>
								</td>
								<td valign="top" bgcolor="#E6E6E6">
									<div align="center">
										<font face="Arial, Helvetica, sans-serif"> 
											<input type="text" id="f2chf" size="10" onKeyUp="Calculate();" NAME="f2chf">
										</font>
									</div>
								</td>	
								<td bgcolor="#F5F5F5">
									<font size="2" face="Arial, Helvetica, sans-serif">Futur mensualit&eacute; du Pr&ecirc;t Hypoth&eacute;caire (euro / mois)</font>
								</td>
								<td bgcolor="#F5F5F5" align="center">
									<div align="center">
										<font face="Arial, Helvetica, sans-serif"> 
											<input readonly name="textfield11" type="text" id="f2s" value="" size="10" onChange="Calculate();"> 
										</font>
									</div>	
								</td>							
							</tr>
							<tr>
								<td valign="top" bgcolor="#E6E6E6">
								</td>
								<td valign="top" bgcolor="#E6E6E6">
								</td>
								<td valign="top" bgcolor="#E6E6E6">
								</td>
								<td bgcolor="#F5F5F5">
									<font size="2" face="Arial, Helvetica, sans-serif">Dur&eacute;e du pr&ecirc;t (mois)</font>
								</td>
								<td bgcolor="#F5F5F5" align="center">
									<font size="2" face="Arial, Helvetica, sans-serif">
										<select id="mensualite_totale" NAME="mensualite_totale" style="width: 125px;">
											<option value=" "></option>
										</select>
									</font>
								</td>	
							</tr>
							<tr>
								<td valign="top" bgcolor="#E6E6E6">
								</td>
								<td valign="top" bgcolor="#E6E6E6">
								</td>
								<td valign="top" bgcolor="#E6E6E6">
								</td>
								<td bgcolor="#F5F5F5">
									<font size="2" face="Arial, Helvetica, sans-serif">Mensualite totale des credits et des financements en cours <br />(euro / mois)</font>
								</td>
								<td bgcolor="#F5F5F5" align="center">
									<span >
										<font face="Arial, Helvetica, sans-serif"> 
											<input readonly name="textfield12" type="text" id="f2t" value="" size="7" onKeyUp="Calculate();"> 
										</font>
									</span>
									<span> + </span>
									<span >
										<font face="Arial, Helvetica, sans-serif"> 
											<input class="vrai" name="textfield12b" type="text" id="f2tb" value="" size="7" onKeyUp="Calculate();"> 
										</font>
									</span>
								</td>								
							</tr>
							<tr>
								<td valign="top" bgcolor="#E6E6E6">
								</td>
								<td valign="top" bgcolor="#E6E6E6">
								</td>
								<td valign="top" bgcolor="#E6E6E6">
								</td>
								<td rowspan="1" bgcolor="#F5F5F5" valign="top" bgcolor="#F5F5F5">
									<p>
										<font size="2" face="Arial, Helvetica, sans-serif">Montant total des cartes</font>  
										<br/>
										<font size="2" face="Arial, Helvetica, sans-serif">(VISA - MASTERCARD)</font>
									</p>
								</td>
								<td rowspan="1" bgcolor="#F5F5F5">
									<div align="center">
										<input name="textfield15" type="text" id="f2cc" value="" size="10" onKeyUp="Calculate();">
									</div>
								</td>

							</tr>							

							<tr>
								<td valign="top" bgcolor="#E6E6E6">
								</td>
								<td valign="top" bgcolor="#E6E6E6">
								</td>
								<td valign="top" bgcolor="#E6E6E6">

								</td>							
								<td colspan="2" rowspan="7" valign="top" style="margin:0;padding:0">
								<font size="2" face="Arial, Helvetica, sans-serif"><b>Quotit&eacute;:</b></font>
								<input readonly id="selTolerance" name="selTolerance" type="text" value="0" size="3"> <!--onChange="Calculate();"--> 
								<font size="2" face="Arial, Helvetica, sans-serif">%</font> 
								<div id="totalRes">
								</div>
								</td>
							</tr>
							

				<!--			<tr>
								<td>
									<div id="debug">
									</div>
								</td>
							</tr> -->
						</table>
					</div>
				</td>
			</tr>
		</table>
		</form>
		</body>
	</html>