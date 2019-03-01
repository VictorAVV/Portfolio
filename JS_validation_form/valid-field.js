
var array_fields_name = {};
var array_error = new Array();
var array_not_check = new Array(); 
var array_in_checking = new Array();
var not_ready_to_send = new Array();
var query_submit = false;
var top_error_block = "<div class='message wide error'><div class='message-inner'>There was a problem with your submission. Please correct the errors shown below:</div></div>";
var top_confirm_block = "<div class='message wide confirm'><div class='message-inner'>"+confirmation+"</div></div>";
var tiny_lastValue = new Array();
var new_file_name_array = new Array();
var file_uploaded_array = new Array();
var timer= new Array();
var deleting_file = false; 
var number_field_in_array = 0;
var timer_n=0;
var n_passwordrepeat, n_developerfund;
var email_value='';
var timer_sub_loading = new Array();
var destination_url='';
var data_post_sub;
var del_file_button_n;

validate_field = function(t,n) {
	not_ready_to_send[n] = 1;
	array_not_check[n] = 0;
	array_in_checking[n] = 1;
	var field_name = t.attr('name');

	if (field_name=='password') {
		array_not_check[n_passwordrepeat]=1;
	} else if (field_name=='totalfund') {
		array_not_check[n_developerfund]=1;
	}	
	
	if (field_name=='terms') {
		var field_message = $('#'+field_name+'_id .special-error');
		var field_val = (t.prop( "checked" ))?t.val():'';
		t.lastValue = t.lastValue+'1';
	} else {
		var field_message = $('#'+field_name+'_id .formarea-row-right .sub.error');
		var field_val = t.val();
	}
	
	if (field_name=='passwordrepeat') {
		//var password_value = '&password='+$("#"+form_id+" input[name=password]").val(); 
		var add_field = '&password='+$("#"+form_id+" input[name=password]").val();
		t.lastValue = t.lastValue+'1';
	} else if (field_name == 'password' && form_submit == 'Login') {
		//email_value = '&email='+$("#"+form_id+" input[name=email]").val();
		add_field = '&email='+$("#"+form_id+" input[name=email]").val();
	} else if (field_name == 'company' && $("#"+form_id+" #represent_id input[type=radio]:checked").val() != "undefined" && $("#"+form_id+" #represent_id input[type=radio]:checked").val() == "COMPANY") {
		add_field = '&represent='+$("#"+form_id+" #represent_id input[type=radio]:checked").val();
	} else if (field_name=='developerfund') {
		var add_field = '&totalfund='+$("#"+form_id+" input[name=totalfund]").val(); 
	} else {
		var add_field = '';
	}
	
	if (t.val() != t.lastValue) {
		$.ajax({
			url: path_to_validation_php,
			data: 'action=sitecenter_validajax_' + field_name + '&' + field_name + '=' + field_val + add_field, //password_value + email_value,
			dataType: 'json', 
			type: 'post',
			success: function (j) {
				array_in_checking[n] = 0;
				field_message.html(j.msg);
				if (j.ok) {
					not_ready_to_send[n] = 0;
					remove_message_error(n);
					t.attr('class','textbox normal');
				} else {
					prepend_message_error(n);
					t.attr('class','textbox error');
				} 
			},
			error: function(xhr) { 
				alert("Error occured: "+xhr.responseText);
			}
		});
	t.lastValue = t.val();
	} else {
		array_in_checking[n] = 0;
		if (array_error[n] == 1) {not_ready_to_send[n] = 1;} else {not_ready_to_send[n] = 0;};
	}
} 

validate_tinymce = function(t, n, tiny_name) {
	array_not_check[n] = 0;
	array_in_checking[n] = 1;
	not_ready_to_send[n] = 1;
	var mce_content = $("#"+t+"_tbl iframe").contents().find('body').html();
	var field_message_area = $("textarea[name="+t+"]").parent().parent().find('.sub.error')
	mce_content = mce_content.replace('<br _mce_bogus="1">', "");
	mce_replace = mce_content.replace(/(<[a-zA-Z]+(.*?)>)|(<\/[a-zA-Z]+>)/gi, "");
	if (mce_replace=="") {mce_content=""};
	if (mce_content != tiny_lastValue[n]) {
		t.lastValue = mce_content;
		$.ajax({
			url: path_to_validation_php,
			data: "action=sitecenter_validajax_"+t+"&"+t+"=" + encodeURIComponent(mce_content),
			dataType: "json",
			type: "post",
			success: function (j) {
				array_in_checking[n] = 0;
				field_message_area.html(j.msg);
				if (j.ok) {
					not_ready_to_send[n] = 0;
					remove_message_error(n);
					$("textarea[name="+t+"]").attr("class", "textbox normal tinymce "+tiny_name);
					$("#"+t+"_tbl").attr("class", "textbox normal tinymce "+tiny_name);
				} else {
					prepend_message_error(n);
					$("textarea[name="+t+"]").attr("class","textbox error tinymce "+tiny_name);
					$("#"+t+"_tbl").attr("class", "textbox error tinymce "+tiny_name);
				}
			},
			error: function(xhr) { 
				alert("Error occured: "+xhr.responseText);
			}
		});
		tiny_lastValue[n] = mce_content;
	} else {
		array_in_checking[n] = 0;
		if (array_error[n] == 1) {not_ready_to_send[n] = 1;} else {not_ready_to_send[n] = 0;};
	}
};

prepend_message_error = function(n) {
	query_submit = false;
	array_error[n] = 1;
	if (!$(".message.wide.error").length) {
		$(".message.wide.confirm").remove();
		$(".message-holder").prepend(top_error_block);
	}
}
remove_message_error = function(n) {
	array_error[n] = 0;
	if (parseInt(array_error.join(''))==0) {
		$(".message.wide.error").remove();
	}
};

add_fields_to_array_fields_name = function(array_fields, type_f) {
	for (var i = 0; i < array_fields.length; i++) {
		number_field_in_array++;
		array_fields_name[number_field_in_array] = {
			n:number_field_in_array, 
			type:type_f, 
			name:array_fields[i].getAttribute("name")
		}
		if (array_fields_name[number_field_in_array]['name']=="passwordrepeat") {
			n_passwordrepeat = number_field_in_array;
		} else if (array_fields_name[number_field_in_array]['name']=="developerfund") {
			n_developerfund = number_field_in_array;
		}
		if (type_f == "textarea_tiny") {
			class_name = array_fields[i].getAttribute("class");
			array_fields_name[number_field_in_array]["tiny_class"] = class_name.substr(class_name.indexOf('tinymce'));
		}
	}
};

input_text_for_send_filename = function(action_f) {
	for (key in array_fields_name) {
		if (array_fields_name[key].type == "file") {
			if (action_f == "append") {
				if (!$("#for_send_"+array_fields_name[key].name).length) {
					$("#"+form_id).append("<input id='for_send_"+array_fields_name[key].name+"' name='"+array_fields_name[key].name+"' type='text' class='textbox normal' size='15' style='display:none;' value="+new_file_name_array[array_fields_name[key].n]+">");
				}
			} else if (action_f == "remove") {
				$("#"+form_id+" > input[name='"+array_fields_name[key].name+"'][type='text']").remove();
			}
		}
	}
};

var input_submit;
var submit_string;

$(document).ready(function () { 
	//replace submit button
	$("#"+form_id+" input[type=submit]").css("display","none");	
	input_submit = $("#"+form_id+" input[type=submit]");
	for (i=0; i<input_submit.length; i++) {
		$("#"+form_id+" input[type=submit]").parent().append(" <button id='java_submit_form"+i+"' name='"+input_submit[i].name+"' type='button' class='"+buttonclass+"'>"+input_submit[i].value+"</button> ");
		(function (_submit_string,_i) {
			$("#"+form_id+" #java_submit_form"+_i).click(function(){
				//alert('input_submit[i].name= '+_input_submit);
				submit_string = _submit_string;
				destination_url = "";
				//destination_url = destination+i;
				if (input_submit.length==1) {
					//alert(window['destination']);
					if (window['destination'] != null) destination_url = window['destination'];
				} else { 
					//alert(window['destination'+(_i+1)]);
					if (window['destination'+(_i+1)] != null) destination_url = window['destination'+(_i+1)];
				}
				submit_click();
			});
		})(input_submit[i].name,i);
		
	}
	//$("#"+form_id+" input[type=submit]").css("display","none");	
	//$("#"+form_id+" input[type=submit]").parent().append(" <button id='java_submit_form' type='button' class='"+buttonclass+"'>"+form_submit+"</button> ");
	
	//find fields
	text_fields = $("#"+form_id+" input[type=text]");
	textarea_tiny_fields = $("#"+form_id+" textarea[class*='tinymce']");
	textarea_fields = $("#"+form_id+" textarea").not("[class*='tinymce']");  
	file_fields = $("#"+form_id+" input[type=file]");
	select_fields = $("#"+form_id+" select");
	password_fields = $("#"+form_id+" input[type=password]");
	checkboxs = $("#"+form_id+" input[type=checkbox]");
	//radios = $("#"+form_id+" .sub.input input[type=radio]");
	if (text_fields.length > 0) {
		add_fields_to_array_fields_name(text_fields, "text");
	};
	if (textarea_tiny_fields.length > 0) {
		add_fields_to_array_fields_name(textarea_tiny_fields, "textarea_tiny");
	};	
	if (textarea_fields.length > 0) {
		add_fields_to_array_fields_name(textarea_fields, "textarea");
	};
	if (file_fields.length > 0) {
		add_fields_to_array_fields_name(file_fields, "file");
	};
	if (select_fields.length > 0) {
		add_fields_to_array_fields_name(select_fields, "select");
	};
	if (password_fields.length > 0) {
		add_fields_to_array_fields_name(password_fields, "password");
	};	
	if (checkboxs.length > 0) {
		add_fields_to_array_fields_name(checkboxs, "checkbox");
	};	
	
	for (key in array_fields_name) {
	number_f = array_fields_name[key].n;
	array_error[number_f] = 1;
	array_not_check[number_f] = 1;
	not_ready_to_send[number_f] = 1;
		if (array_fields_name[key].type == 'text') {
		//Events For text fields
			input_field = $("#"+form_id+" input[name="+array_fields_name[key].name+"]");
				(function (_input_field,_key, _number_f) {
					_input_field.blur(function () {
						validate_field(_input_field, _number_f);
					});
					_input_field.on('keydown', function(e) {
						if (e.which == 13) {
							e.preventDefault(); 
							_input_field.blur();
						//	alert("click");
							$('#java_submit_form0').click();
						} 
					});
				})(input_field, key, number_f);
		} else if (array_fields_name[key].type == 'textarea_tiny') {
		//init tinyMCE and create events for tinyMCE fields
			(function (_key, _number_f, _tinymce_name) {
				tinyMCE.init({
					content_css : '/css/style.css',
					theme : 'advanced',
					theme_advanced_buttons1 : "justifyleft,justifycenter,justifyright,justifyfull,|,undo,redo,|,selectall,cut,copy,paste,pastetext,pasteword,|,cleanup,|,bullist,numlist",
					theme_advanced_buttons2 : "bold,italic,underline,|,formatselect,fontselect,fontsizeselect",
					theme_advanced_buttons3 : "outdent,indent,|,table,|,link,unlink,anchor,image,|,code,|,forecolor,backcolor,styleprops",
					theme_advanced_buttons4 : "",
					theme_advanced_toolbar_location : "top",
					theme_advanced_toolbar_align : "left",
					theme_advanced_statusbar_location : "bottom",
					theme_advanced_resizing : false,
					theme_advanced_blockformats : "p,h2,h3",
					plugins : 'advimage,advlink,preview,style,table,paste,inlinepopups,advlist,embed,media',
					skin : "o2k7",
					skin_variant : "silver",
					mode : "specific_textareas",
					editor_selector : array_fields_name[_key].tiny_class,
					inline_styles : false,
					convert_fonts_to_spans : true,
					force_hex_style_colors : false,
					fix_table_elements : true,
					fix_list_elements : true,
					fix_nesting : false,
					convert_urls : false,
					cleanup : false,
					cleanup_on_startup : false,
					verify_html : true,
					forced_root_block : '',
					force_p_newlines : false,
					force_br_newlines : false,
					relative_urls: false,
					remove_script_host : true,
					document_base_url : "",
					file_browser_callback : "",
					entity_encoding : "raw",
					setup: function(ed) {
						ed.onInit.add(function(ed){
							$("#"+array_fields_name[_key].name+"_tbl").attr("class", "textbox normal tinymce "+array_fields_name[_key].tiny_class);
							//for Chrome
							$(ed.getDoc()).contents().find('body').blur(function() {
								validate_tinymce(array_fields_name[_key].name, _number_f, _tinymce_name);
							}); 
							//for FF, IE, Opera
							var dom = ed.dom;
							tinymce.dom.Event.add(ed.getDoc(), 'blur', function(e) {
								validate_tinymce(array_fields_name[_key].name, _number_f, _tinymce_name);
							});
						});
					}  
				});
			})(key, number_f, array_fields_name[key].tiny_class);	
		} else if (array_fields_name[key].type == 'textarea') {
		//Events For textarea fields
			input_field = $("#"+form_id+" textarea[name="+array_fields_name[key].name+"]");
				(function (_input_field,_key, _number_f) {
					_input_field.blur(function () {
						validate_field(_input_field, _number_f);
					});
				})(input_field, key, number_f);
		} else if (array_fields_name[key].type == 'file') {
			//create events for input file 
			(function (_key, _number_f) {		
				setTimeout(function () { //for IE8
					var input_file_field = $("#"+form_id+" input[name="+array_fields_name[_key].name+"]");
					var loading_file_field = $("#"+form_id+" input[name="+array_fields_name[_key].name+"]").parent().parent().find(".sub.loading");
					upclick({
						element: array_fields_name[_key].name,
						action: path_to_validation_php, 
						action_params: {filetype:''},
						dataname: array_fields_name[_key].name,
						onstart:
						function(filename) {
							not_ready_to_send[_number_f] = 1;
							array_not_check[_number_f] = 0;
							array_in_checking[_number_f] = 1;
							deleting_file = false;
							input_file_field.css("display","none");
							file_uploaded_array[_key] = false;
							loading_file_field.html('<img src="/images/loading.gif" alt="loading"width="192" height="12"/>');
							$("#message_file_uploaded"+_key+"").remove();
						}, 
						oncomplete:
						function(response_data) {
							array_in_checking[_number_f] = 0;
							clearTimeout(timer_sub_loading[_number_f]);
							try {
								response_data = jQuery.parseJSON(response_data);
								if (response_data.ok) {
									not_ready_to_send[_number_f] = 0;
									remove_message_error(_number_f);
									input_file_field.attr("class","textbox normal");
									new_file_name_array[_number_f] = response_data.msg;
									
									//clearTimeout(timer_sub_loading[_number_f]);
									loading_file_field.html("");

									if (response_data.msg != "") input_file_field.parent().prepend("<div id='message_file_uploaded"+_key+"' class='message file_uploaded'><div class='message-inner'><div class='left'>Your file was successfully uploaded.</div><div class='right imageblock'><a id='del_file"+_key+"' href='javascript:void(0)' title='Delete File'><img src='/images/file-delete.png' width='20' height='20' alt='Delete'/></a></div></div></div>");
									file_uploaded_array[_key] = true;
							del_file_button_n = _key;
									if (query_submit && parseInt(array_error.join(''))==0 && parseInt(not_ready_to_send.join(''))==0) {	
										$("#"+form_id).submit();
									}

									//Del button onClick event
									$("#del_file"+_key+"").click(function(){
										deleting_file = true;
										$(".message.wide.confirm").remove();
										$("#del_file"+_key+"").remove();
										$("#java_submit_form0").css("display","block");
										$.ajax({
											url: path_to_validation_php,
											data: 'action=sitecenter_ajax_deletefile&file=' + new_file_name_array[_number_f],
											dataType: 'json',
											type: 'post',
											success: function (j) {
												array_not_check[_number_f] = 1;
												new_file_name_array[_number_f] = "";
												$("#message_file_uploaded"+_key+"").remove();
												input_file_field.attr("class","textbox normal");
												input_file_field.css("display","block");
				
												deleting_file = false;
												file_uploaded_array[_key] = false;
											},
											error: function(xhr) { 
												alert("Error occured: "+xhr.responseText);
											}
										})
									})
								} else {
									prepend_message_error(_number_f);
									input_file_field.attr("class","textbox error");
									input_file_field.css("display","block");
									loading_file_field.html(response_data.msg);
									loading_file_field.css("color", "red");
									if (response_data.required != null && response_data.required == "no") {
										not_ready_to_send[_number_f] = 0;
										array_error[_number_f] = 0;
										new_file_name_array[_number_f] = "";
										if (query_submit && parseInt(array_error.join(''))==0 && parseInt(not_ready_to_send.join(''))==0) {	
											$("#"+form_id).submit();
										}
									}
									
								}
								if (parseInt(array_in_checking.join(''))==0) query_submit = false;
							} catch (e) {
								prepend_message_error(_number_f);
								input_file_field.attr("class","textbox error");
								input_file_field.css("display","block");
								loading_file_field.html("Can't upload this file");
								loading_file_field.css("color", "red");
							}
						}
					});
				},500*timer_n);
			})(key, number_f);	
			timer_n++;
		} else if (array_fields_name[key].type == 'select') {
		//Events For select fields 
			select_field = $("#"+form_id+" select[name="+array_fields_name[key].name+"]");
				(function (_select_field,_key, _number_f) {
					_select_field.blur(function () {
						if (_select_field.attr('name') == "filetype" && $("div[name=container_for_upload_file] input[name=filetype]") != "undefined") {
							$("div[name=container_for_upload_file] input[name=filetype]")[0].value = $("#"+form_id+" select[name=filetype] option:selected")[0].value;
							if ($("#"+form_id+" a#del_file"+del_file_button_n) != "undefined") {
								array_not_check[del_file_button_n] = 1;
								$("#"+form_id+" a#del_file"+del_file_button_n).click();
							}
						}
						validate_field(_select_field, _number_f);
					});
					_select_field.on('keydown', function(e) {
						if (e.which == 13) {
							e.preventDefault(); 
							_select_field.blur();
							$('#java_submit_form0').click();
						} 
					});
				})(select_field, key, number_f);
		} else if (array_fields_name[key].type == 'password') {
		//Events For password fields
			input_field = $("#"+form_id+" input[name="+array_fields_name[key].name+"]");
				(function (_input_field,_key, _number_f) {
					_input_field.blur(function () {
						validate_field(_input_field, _number_f);
					});
					_input_field.on('keydown', function(e) {
						if (e.which == 13) {
							e.preventDefault(); 
							_input_field.blur();
							//alert("click");
							$('#java_submit_form0').click();
						} 
					});
				})(input_field, key, number_f);
		} else if (array_fields_name[key].type == 'checkbox') {
		//Events For checkbox fields
			checkbox = $("#"+form_id+" input[name="+array_fields_name[key].name+"]");
				(function (_checkbox,_key, _number_f) {
					_checkbox.change(function () {
						validate_field(_checkbox, _number_f);
					});
				})(checkbox, key, number_f);
		} 
		
	}
});

$(function(){
	$("#"+form_id).submit(function() {
		input_text_for_send_filename("append");
		if (textarea_tiny_fields.length > 0) tinymce.triggerSave();
		//data_form_send = $.post($(this).attr("action"), $(this).serialize()+'&submit=1' );
		data_form_send = $.post($(this).attr("action"), $(this).serialize()+'&'+submit_string+'=1'+'&get_destination=1' );
		data_form_send.success(function (data) { 
			try {
				data_post_sub = jQuery.parseJSON(data);
			} catch (e) {
				data_post_sub = "";
			};
			input_text_for_send_filename("remove"); 
			//if (typeof destination != 'undefined' && destination != null && destination != "") {

			if (data_post_sub != null && data_post_sub != "") {
				//alert('data_post_sub');
				window.location = data_post_sub;
			} else if (destination_url != "") {
				//alert('destination_url');
				window.location = destination_url; 
			} else {
				if (!$(".message.wide.confirm").length) {
					$(".message-holder").prepend(top_confirm_block);  
					//scroll page 
					$("html, body").animate({
						scrollTop: $(".message.wide.confirm").offset().top
					}, 200);
					//$("#java_submit_form").css("display","none");
				}
				if (hideform == "true") $("div[id=formarea].formarea").css("display","none");
			}
		}); 
		data_form_send.error(function () {
			alert("form data not send");
			input_text_for_send_filename("remove");
		});
		return false;
	});
});

$(document).bind("ajaxSend", function(){
		if (!deleting_file) {
			$(".message.wide.confirm").remove();
			$("#java_submit_form0").css("display","block");
			$("#java_submit_form0").html("Verifying...");
		}
	}).bind("ajaxComplete", function(){
		//$("#java_submit_form0").html(form_submit);
		$("#java_submit_form0").html(input_submit[0].value);
		if (query_submit && parseInt(array_error.join(''))==0 && parseInt(not_ready_to_send.join(''))==0) {	
			$("#"+form_id).submit();
		}
		if (parseInt(array_in_checking.join(''))==0) query_submit = false;
});
 
 
get_n_field = function(field_name) {
	for (key in array_fields_name) {
		if (array_fields_name[key].name == field_name) return array_fields_name[key].n;
	}	
};
 
/*$(function(){
	$('#java_submit_form').click(function(){
		for (key in array_fields_name) {
			number_f = array_fields_name[key].n;
			name_f = array_fields_name[key].name;
			type_f = array_fields_name[key].type;
			if (name_f == 'company' && $("#"+form_id+" #represent_id input[type=radio]:checked") != "undefined" && $("#"+form_id+" #represent_id input[type=radio]:checked").val() == "INDIVIDUAL") {
				
				not_ready_to_send[number_f] = 0;
				array_not_check[number_f] = 0;
				array_in_checking[number_f] = 0;
				array_error[number_f] = 0;
				continue;
			}			
			if (array_not_check[number_f] != 0) {
				if (type_f == "text" || type_f == "password" || type_f == "checkbox") {
					validate_field($("#"+form_id+" input[name="+name_f+"]"), number_f);
				} else if (type_f == "textarea_tiny") {
					validate_tinymce(name_f, number_f, array_fields_name[key].tiny_class);
				} else if (type_f == "textarea") {
					validate_field($("#"+form_id+" textarea[name="+name_f+"]"), number_f);
				} else if (type_f == "file") {
					$("div[name=container_for_upload_file] input[name="+name_f+"]").parent().submit();
					array_not_check[number_f] = 0;
					array_in_checking[number_f] = 1;
					not_ready_to_send[number_f] = 1;
				} else if (type_f == "select") {
					validate_field($("#"+form_id+" select[name="+name_f+"]"), number_f);
				} 
			}
			if (type_f == "file" && array_in_checking[number_f] == 1) {
				sub_loading = $("#"+form_id+" input[name="+array_fields_name[key].name+"]").parent().parent().find(".sub.loading");
				(function (_sub_loading, _number_f) {
					timer_sub_loading[_number_f] = setTimeout(function () {
						_sub_loading.html("Please wait until this file has been uploaded")
						_sub_loading.css("color", "red");
					}, 1000);
				})(sub_loading, number_f);
				//sub_loading.html("Please wait until this file has been uploaded");
				//sub_loading.css("color", "red");
			}
		}
		if (parseInt(array_error.join(''))==0 && parseInt(array_in_checking.join(''))==0) { 	
			query_submit = false;
			$(".message.wide.error").remove();
			$("#"+form_id).submit();
		} else if (parseInt(array_in_checking.join('')) > 0) {
			query_submit = true;
		}
	});
});*/


submit_click=function(){
		for (key in array_fields_name) {
			number_f = array_fields_name[key].n;
			name_f = array_fields_name[key].name;
			type_f = array_fields_name[key].type;
			if (name_f == 'company' && $("#"+form_id+" #represent_id input[type=radio]:checked") != "undefined" && $("#"+form_id+" #represent_id input[type=radio]:checked").val() == "INDIVIDUAL") {
				not_ready_to_send[number_f] = 0;
				array_not_check[number_f] = 0;
				array_in_checking[number_f] = 0;
				array_error[number_f] = 0;
				continue;
			}			
			if (array_not_check[number_f] != 0) {
				if (type_f == "text" || type_f == "password" || type_f == "checkbox") {
					validate_field($("#"+form_id+" input[name="+name_f+"]"), number_f);
				} else if (type_f == "textarea_tiny") {
					validate_tinymce(name_f, number_f, array_fields_name[key].tiny_class);
				} else if (type_f == "textarea") {
					validate_field($("#"+form_id+" textarea[name="+name_f+"]"), number_f);
				} else if (type_f == "file") {
					$("div[name=container_for_upload_file] input[name="+name_f+"]").parent().submit();
					array_not_check[number_f] = 0;
					array_in_checking[number_f] = 1;
					not_ready_to_send[number_f] = 1;
				} else if (type_f == "select") {
					validate_field($("#"+form_id+" select[name="+name_f+"]"), number_f);
				} 
			}
			if (type_f == "file" && array_in_checking[number_f] == 1) {
				sub_loading = $("#"+form_id+" input[name="+array_fields_name[key].name+"]").parent().parent().find(".sub.loading");
				(function (_sub_loading, _number_f) {
					timer_sub_loading[_number_f] = setTimeout(function () {
						_sub_loading.html("Please wait until this file has been uploaded")
						_sub_loading.css("color", "red");
					}, 1000);
				})(sub_loading, number_f);
				//sub_loading.html("Please wait until this file has been uploaded");
				//sub_loading.css("color", "red");
			}
		}
		if (parseInt(array_error.join(''))==0 && parseInt(array_in_checking.join(''))==0) { 	
			query_submit = false;
			$(".message.wide.error").remove();
			$("#"+form_id).submit();
		} else if (parseInt(array_in_checking.join('')) > 0) {
			query_submit = true;
		}
	};

