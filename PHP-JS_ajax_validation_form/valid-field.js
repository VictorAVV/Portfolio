
//you must enter here name of field(how it named in html), number of field, required of field and field ID
var array_field_name = {field1: {n : 1, required : true, id : 'field1_id'},
						field2: {n : 2, required : true, id : 'field2_id'},
						field3: {n : 3, required : true, id : 'field3_id'},
						field4: {n : 4, required : true, id : 'field4_id'},
						field5: {n : 5, required : true, id : 'field5_id'},
						field6: {n : 6, required : true, id : 'field6_id'},
						field7: {n : 7, required : true, id : 'field7_id'},
						field8: {n : 8, required : true, id : 'field8_id'},
						field9: {n : 9, required : true, id : 'field9_id'}						
						}; 


var array_error = new Array();
var array_change = new Array();
var query_submit = false;
var top_error_block = "<div class='message error'><div class='message-inner'>There was a problem with your submission. Please correct the errors shown below:</div></div>";
var top_confirm_block = "<div class='message confirm'><div class='message-inner'>Thank you - your details have been updated.</div></div>";
var tinymce1_content_lastValue;
var tinymce2_content_lastValue;
var file_uploaded1 = false;
var file_uploaded2 = false;
var new_file_name1 = '';
var new_file_name2 = '';
var deleting_file = false;

validate_field = function(t) {
	var field_name = t.attr('name');
	n_in_error_array=array_field_name[field_name].n;
		var field_message = $('#'+field_name+'_id .formarea-row-right .sub.error');
		if (t.val() != t.lastValue) {
			//field_message.html('checking availability...');
			$.ajax({
				url: 'validation.php',
				data: 'action=check_' + field_name + '&' + field_name + '=' + t.val(),
				dataType: 'json',
				type: 'post',
				success: function (j) {
					field_message.html(j.msg);
					if (j.ok) {
						array_error[n_in_error_array] = 0;
						t.attr('class','textbox normal');
						if (parseInt(array_error.join(''))==0) {
							$(".message.error").remove();
						}
					} else {
						query_submit = false;
						array_error[n_in_error_array] = 1;
						t.attr('class','textbox error');
						if (!$(".message.error").length) {
							$(".message.confirm").remove();
							$(".outer").prepend(top_error_block);
						}
					}
					array_change[n_in_error_array] = 0;
				},
				error: function(xhr) { 
					alert("Error occured: "+xhr.responseText);
				}
			});
		t.lastValue = t.val();
		}
} 

validate_tinymce1 = function() {
var mce_content = $('#'+array_field_name.field6.id+' iframe').contents().find('body').html();
var field_message_area = $('#'+array_field_name.field6.id+' .sub.error');
	mce_content = mce_content.replace('<br _mce_bogus="1">', "");
	//mce_content = mce_content.replace('<br+_mce_bogus="1">', "");
	mce_replace = mce_content.replace(/(<[a-zA-Z]+(.*?)>)|(<\/[a-zA-Z]+>)/gi, "");
	if (mce_replace=='') {mce_content=''};
	if (mce_content != tinymce1_content_lastValue) {
		tinymce1_content_lastValue = mce_content;
			//field_message_area.html('checking availability...');
			$.ajax({
			url: 'validation.php',
			data: 'action=check_field6&field6=' + encodeURIComponent(mce_content),
			dataType: 'json',
			type: 'post',
			success: function (j) {
				field_message_area.html(j.msg);
				if (j.ok) {
					array_error[array_field_name.field6.n] = 0;
					array_change[array_field_name.field6.n] = 0;
					$('textarea[name=field6]').attr('class','tinymce1 normal');
					$('#field6_tbl').attr('class','tinymce1 normal');
					if (parseInt(array_error.join(''))==0) {
						$(".message.error").remove();
					}
				} else {
					query_submit = false;
					array_error[array_field_name.field6.n] = 1;
					$('textarea[name=field6]').attr('class','tinymce1 error');
					$('#field6_tbl').attr('class','tinymce1 error');
					if (!$(".message.error").length) {
						$(".message.confirm").remove();
						$(".outer").prepend(top_error_block);
					}
				}
			},
			error: function(xhr) { 
				alert("Error occured: "+xhr.responseText);
			}
		});
		tinymce1_content_lastValue = mce_content;
	}
};

validate_tinymce2 = function() {
var mce_content = $('#'+array_field_name.field7.id+' iframe').contents().find('body').html();
var field_message_area = $('#'+array_field_name.field7.id+' .sub.error');
	mce_content = mce_content.replace('<br _mce_bogus="1">', "");
	//mce_content = mce_content.replace('<br+_mce_bogus="1">', "");
	mce_replace = mce_content.replace(/(<[a-zA-Z]+(.*?)>)|(<\/[a-zA-Z]+>)/gi, "");
	if (mce_replace=='') {mce_content=''};
	if (mce_content != tinymce2_content_lastValue) {
		tinymce2_content_lastValue = mce_content;
			//field_message_area.html('checking availability...');
			$.ajax({
			url: 'validation.php',
			data: 'action=check_field7&field7=' + encodeURIComponent(mce_content),
			dataType: 'json',
			type: 'post',
			success: function (j) {
				field_message_area.html(j.msg);
				if (j.ok) {
					array_error[array_field_name.field7.n] = 0;
					array_change[array_field_name.field7.n] = 0;
					$('textarea[name=field7]').attr('class','tinymce1 normal');
					$('#field7_tbl').attr('class','tinymce1 normal');
					if (parseInt(array_error.join(''))==0) {
						$(".message.error").remove();
					}
				} else {
					query_submit = false;
					array_error[array_field_name.field7.n] = 1;
					$('textarea[name=field7]').attr('class','tinymce2 error');
					$('#field7_tbl').attr('class','tinymce2 error');
					if (!$(".message.error").length) {
						$(".message.confirm").remove();
						$(".outer").prepend(top_error_block);
					}
				}
			},
			error: function(xhr) { 
				alert("Error occured: "+xhr.responseText);
			}
		});
		tinymce2_content_lastValue = mce_content;
	}
};

// Field 1
$(document).ready(function () {
var field1_input = $('#'+array_field_name.field1.id+' .formarea-row-right .sub.input > input');
	$('input[name=field1]').blur(function () {
		if (array_field_name.field1.required) {
			validate_field(field1_input);
			//html tag 'input' must have attr "name = 'field1'"
		}
	});
});

$(document).ready(function () {
	$('input[name=field1]').change(function(){
		if (array_field_name.field1.required) {
			//alert('field1 was changed.');
			array_change[array_field_name.field1.n]=1;
		}
	});
});

$(document).ready(function () {
	$('input[name=field1]').on('keydown', function(e) {
		if (e.which == 13) {
			e.preventDefault(); 
			$('input[name=field1]').blur();
		} 
	});
});
//Field 2	
$(document).ready(function () {
var field2_input = $('#'+array_field_name.field2.id+' .formarea-row-right .sub.input > input');
	$('input[name=field2]').blur(function () {
		if (array_field_name.field2.required) {
			validate_field(field2_input);
			//html tag 'input' must have attr "name = 'field2'"
		}
	});
});

$(document).ready(function () {
	$('input[name=field2]').change(function(){
		if (array_field_name.field2.required) {
			array_change[array_field_name.field2.n]=1;
		}
	});
});

$(document).ready(function () {
	$('input[name=field2]').on('keydown', function(e) {
		if (e.which == 13) {
			e.preventDefault(); 
			$('input[name=field2]').blur();
		} 
	});
});
//Field 3
$(document).ready(function () {
var field3_input = $('#'+array_field_name.field3.id+' .formarea-row-right .sub.input > input');
	$('input[name=field3]').blur(function () {
		if (array_field_name.field3.required) {
			validate_field(field3_input);
			//html tag 'input' must have attr "name = 'field2'"
		}
	});
});

$(document).ready(function () {
	$('input[name=field3]').change(function(){
		if (array_field_name.field3.required) {
			array_change[array_field_name.field3.n]=1;
		}
	});
});

$(document).ready(function () {
	$('input[name=field3]').on('keydown', function(e) {
		if (e.which == 13) {
			e.preventDefault(); 
			$('input[name=field3]').blur();
		} 
	});
});
//Field 4
$(document).ready(function () {
var field4_input = $('#'+array_field_name.field4.id+' .formarea-row-right .sub.input > input');
	$('input[name=field4]').blur(function () {
		if (array_field_name.field4.required) {
			validate_field(field4_input);
			//html tag 'input' must have attr "name = 'field2'"
		}
	});
});

$(document).ready(function () {
	$('input[name=field4]').change(function(){
		if (array_field_name.field4.required) {
			array_change[array_field_name.field4.n]=1;
		}
	});
});

$(document).ready(function () {
	$('input[name=field4]').on('keydown', function(e) {
		if (e.which == 13) {
			e.preventDefault(); 
			$('input[name=field4]').blur();
		} 
	});
});
//Field 5
$(document).ready(function () {
var field5_input = $('#'+array_field_name.field5.id+' .formarea-row-right .sub.input > input');
	$('input[name=field5]').blur(function () {
		if (array_field_name.field5.required) {
			validate_field(field5_input);
			//html tag 'input' must have attr "name = 'field2'"
		}
	});
});

$(document).ready(function () {
	$('input[name=field5]').change(function(){
		if (array_field_name.field5.required) {
			array_change[array_field_name.field5.n]=1;
		}
	});
});

$(document).ready(function () {
	$('input[name=field5]').on('keydown', function(e) {
		if (e.which == 13) {
			e.preventDefault(); 
			$('input[name=field5]').blur();
		} 
	});
});
//Field 6
change_tinymce1 = function() {
	if (array_field_name.field6.required) {
		array_change[array_field_name.field6.n]=1;
	}
}
//Field 7
change_tinymce2 = function() {
	if (array_field_name.field7.required) {
		array_change[array_field_name.field7.n]=1;
	}
}


$(function(){
	$("form[name='register']").submit(function() {
/*		var parent_field8 = '';
		var parent_field9 = '';
		if (new_file_name1 != '') {
			parent_field8 = $("#field8").parent();
			$("#field8").remove();
			parent_field8.append("<input id='field8' name='field8' type='text' class='textbox normal' size='15' value='' style='display:none;'>");	
			$("#field8").val(new_file_name1);
		}
		if (new_file_name2 != '') {
			parent_field9 = $("#field9").parent();
			$("#field9").remove();
			parent_field9.append("<input id='field9' name='field9' type='text' class='textbox normal' size='15' value='' style='display:none;'>");	
			$("#field9").val(new_file_name1);
		}
*/	
		if (new_file_name1 != '') {
			$("form[name='register']").append("<input name='field8' type='text' class='textbox normal' size='15' value="+new_file_name1+" style='display:none;'>");
		}
		if (new_file_name2 != '') {
			$("form[name='register']").append("<input name='field9' type='text' class='textbox normal' size='15' value="+new_file_name2+" style='display:none;'>");
		}
		tinymce.triggerSave();
		data_form_send = $.post($(this).attr("action"), $(this).serialize() );
		data_form_send.success(function () {
	//		$("#field8").attr("type","file");
	//		$("#field9").attr("type","file");
//	document.getElementById("field8");//.setAttribute("type", "file");
//	document.getElementById("field9");//.setAttribute("type", "file");
/*			if (parent_field8 !='') {
				$("#field8").remove();
				parent_field8.append("<input id='field8' name='field8' type='file' class='textbox normal' size='15' value='' style='display:none;'>");
			}
			if (parent_field9 !='') {
				$("#field9").remove();
				parent_field9.append("<input id='field9' name='field9' type='file' class='textbox normal' size='15' value='' style='display:none;'>");			
			}*/
			$("form[name='register'] > input[name='field8']").remove();
			$("form[name='register'] > input[name='field9']").remove();
			if (!$(".message.confirm").length) {
				$(".outer").prepend(top_confirm_block);
				//scroll page
				$("html, body").animate({
					scrollTop: $(".message.confirm").offset().top
				}, 200);
				$("#java_submit_form").css("display","none");
				//or load another page
				//window.location.href = "http://www.google.com";
			}
		});
		data_form_send.error(function () {
			alert("form data not send");
	//		$("#field8").attr("type","file");
	//		$("#field9").attr("type","file");
/*			if (parent_field8 !='') {
				$("#field8").remove();
				parent_field8.append("<input id='field8' name='field8' type='file' class='textbox normal' size='15' value='' style='display:none;'>");			
			}
			if (parent_field9 !='') {
				$("#field9").remove();
				parent_field9.append("<input id='field9' name='field9' type='file' class='textbox normal' size='15' value='' style='display:none;'>");			
			}*/
			$("form[name='register'] > input[name='field8']").remove();
			$("form[name='register'] > input[name='field9']").remove();
		});
		return false;
	});
});

$(document).bind("ajaxSend", function(){
		if (!deleting_file) {
			$(".message.confirm").remove();
			$("#java_submit_form").css("display","block");
			$("#java_submit_form").html("Validating...");
			//$("#java_submit_form").css('background-color', 'red');
		}
	}).bind("ajaxComplete", function(){
		$("#java_submit_form").html("Submit");
		//$("#java_submit_form").css('background-color', '#808080');
		if (query_submit && parseInt(array_error.join(''))==0) {	
			$("form[name='register']").submit();
		}
	query_submit= false;
});

$(document).ready(function () {
	$("input[type=submit]").parent().append(" <button id='java_submit_form' type='button' class='button small'>Submit</button> ");
	$("input[type=submit]").css('display','none');	
});

$(function(){
	$('#java_submit_form').click(function(){
		if (array_field_name.field8.required && file_uploaded1 && array_field_name.field9.required && file_uploaded2) {
			query_submit = true;
			if (parseInt(array_change.join(''))==0 && parseInt(array_error.join(''))==0) { 	
				query_submit= false;
				$("form[name='register']").submit();
			}
		} else if (array_field_name.field8.required && file_uploaded1 && !array_field_name.field9.required) {
			if ($("#"+array_field_name.field9.id+" .sub.loading").html() != "Loading..." || $("#"+array_field_name.field9.id+" .sub.loading").html() != "Wait until file uploading complete") {
				query_submit = true;
				if (parseInt(array_change.join(''))==0 && parseInt(array_error.join(''))==0) { 	
					query_submit= false;
					$("form[name='register']").submit();
				}
			} else if ($("#"+array_field_name.field9.id+" .sub.loading").html() == "Loading...") {
				$("#"+array_field_name.field9.id+" .sub.loading").html() = "Wait until file uploading complete";
			}			
		} else if (!array_field_name.field8.required && array_field_name.field9.required && file_uploaded2) {
			if ($("#"+array_field_name.field8.id+" .sub.loading").html() != "Loading..." || $("#"+array_field_name.field8.id+" .sub.loading").html() != "Wait until file uploading complete") {
				query_submit = true;
				if (parseInt(array_change.join(''))==0 && parseInt(array_error.join(''))==0) { 	
					query_submit= false;
					$("form[name='register']").submit();
				}
			} else if ($("#"+array_field_name.field8.id+" .sub.loading").html() == "Loading...") {
				$("#"+array_field_name.field8.id+" .sub.loading").html() = "Wait until file uploading complete";
			}
		} else if (!array_field_name.field8.required && !array_field_name.field9.required) {
			if ($("#"+array_field_name.field8.id+" .sub.loading").html() != "Loading..." || $("#"+array_field_name.field8.id+" .sub.loading").html() != "Wait until file uploading complete" ||
			$("#"+array_field_name.field9.id+" .sub.loading").html() != "Loading..." || $("#"+array_field_name.field9.id+" .sub.loading").html() != "Wait until file uploading complete") {
				query_submit = true;
				if (parseInt(array_change.join(''))==0 && parseInt(array_error.join(''))==0) { 	
					query_submit= false;
					$("form[name='register']").submit();
				}
			}
		} else {
			if (array_field_name.field8.required && !file_uploaded1) {
				if ($("#"+array_field_name.field8.id+" .sub.loading").html() == "Loading...") {
					$("#"+array_field_name.field8.id+" .sub.loading").html("Wait until file uploading complete");
					$("#"+array_field_name.field8.id+" .sub.loading").css("color", "red");
				} else {			
					$("#"+array_field_name.field8.id+" .sub.loading").html("You must upload file");
					$("#"+array_field_name.field8.id+" .sub.loading").css("color", "red");
					$("#"+array_field_name.field8.id+" input").attr("class","textbox error");
				}
			}
			if (array_field_name.field9.required && !file_uploaded2) {
				if ($("#"+array_field_name.field9.id+" .sub.loading").html() == "Loading...") {
					$("#"+array_field_name.field9.id+" .sub.loading").html("Wait until file uploading complete");
					$("#"+array_field_name.field9.id+" .sub.loading").css("color", "red");
				} else {			
					$("#"+array_field_name.field9.id+" .sub.loading").html("You must upload file");
					$("#"+array_field_name.field9.id+" .sub.loading").css("color", "red");
					$("#"+array_field_name.field9.id+" input").attr("class","textbox error");
				}
			}
		} 
	
		if (array_change[array_field_name.field1.n] != 0 && array_field_name.field1.required) validate_field($("#"+array_field_name.field1.id+" .formarea-row-right .sub.input > input"));
		if (array_change[array_field_name.field2.n] != 0 && array_field_name.field2.required) validate_field($("#"+array_field_name.field2.id+" .formarea-row-right .sub.input > input"));
		if (array_change[array_field_name.field3.n] != 0 && array_field_name.field3.required) validate_field($("#"+array_field_name.field3.id+" .formarea-row-right .sub.input > input"));
		if (array_change[array_field_name.field4.n] != 0 && array_field_name.field4.required) validate_field($("#"+array_field_name.field4.id+" .formarea-row-right .sub.input > input"));
		if (array_change[array_field_name.field5.n] != 0 && array_field_name.field5.required) validate_field($("#"+array_field_name.field5.id+" .formarea-row-right .sub.input > input"));
		if (array_change[array_field_name.field6.n] != 0 && array_field_name.field6.required) validate_tinymce1();
		if (array_change[array_field_name.field7.n] != 0 && array_field_name.field7.required) validate_tinymce2();
	});
});

$(document).ready(function () {
	var input_file1 = $("#"+array_field_name.field8.id+" input");
	var loading_file1 = $("#"+array_field_name.field8.id+" .sub.loading");
	upclick({
		element: "field8",
		action: "validation.php", 
		dataname: "field8",
		onstart:
			function(filename) {
				deleting_file = false;
				input_file1.css("display","none");
				file_uploaded1 = false;
				loading_file1.html("Loading...");
				loading_file1.css("color", "black");
				$("#message_file_uploaded1").remove();
			},
		oncomplete:
			function(response_data) {
				response_data = jQuery.parseJSON(response_data);
				if (response_data.ok) {
					input_file1.attr("class","textbox normal");
					new_file_name1 = response_data.msg;
					loading_file1.html("");
					input_file1.parent().prepend("<div id='message_file_uploaded1' class='message file_uploaded' size='20'><div class='message-file_inner'>File was uploaded. <br>Name of uploaded file on server: "+new_file_name1+" </div></div>");
					file_uploaded1 = true;
					input_file1.parent().append(" <button id='del_file1' type='button' class='button delete_file'>Delete uploaded file</button> ");
					//Del button onClick event
					$("#del_file1").click(function(){
						deleting_file = true;
						$(".message.confirm").remove();
						$("#del_file1").remove();
						$("#java_submit_form").css("display","block");
						$.ajax({
							url: 'validation.php',
							data: 'action=del_file&file=' + new_file_name1,
							dataType: 'json',
							type: 'post',
							success: function (j) {
								//alert(j);
								$("#message_file_uploaded1").remove();
								input_file1.attr("class","textbox normal");
								input_file1.css("display","block");
								loading_file1.css("color", "black");
								loading_file1.html(j.msg);
								deleting_file = false;
								file_uploaded1 = false;
							},
							error: function(xhr) { 
								alert("Error occured: "+xhr.responseText);
							}
						})
					})
				} else {
					input_file1.attr("class","textbox error");
					input_file1.css("display","block");
					loading_file1.html("File wasn't uploaded. "+response_data.msg);
					loading_file1.css("color", "red");
				}
			}
	});
});

$(document).ready(
	setTimeout(function () {
	var input_file2 = $("#"+array_field_name.field9.id+" input");
	var loading_file2 = $("#"+array_field_name.field9.id+" .sub.loading");
	upclick({
		element: "field9",
		action: "validation.php", 
		dataname: "field9",
		onstart:
			function(filename) {
				deleting_file = false;
				input_file2.css("display","none");
				file_uploaded2 = false;
				loading_file2.html("Loading...");
				loading_file2.css("color", "black");
				$("#message_file_uploaded2").remove();
			},
		oncomplete:
			function(response_data) {
				response_data = jQuery.parseJSON(response_data);
				if (response_data.ok) {
					input_file2.attr("class","textbox normal");
					new_file_name2 = response_data.msg;
					loading_file2.html("");
					input_file2.parent().prepend("<div id='message_file_uploaded2' class='message file_uploaded' size='20'><div class='message-file_inner'>File was uploaded. <br>Name of uploaded file on server: "+new_file_name2+" </div></div>");
					file_uploaded2 = true;
					input_file2.parent().append(" <button id='del_file2' type='button' class='button delete_file'>Delete uploaded file</button> ");
					//Del button onClick event
					$("#del_file2").click(function(){
						deleting_file = true;
						$(".message.confirm").remove();
						$("#del_file2").remove();
						$("#java_submit_form").css("display","block");
						$.ajax({
							url: 'validation.php',
							data: 'action=del_file&file=' + new_file_name2,
							dataType: 'json',
							type: 'post',
							success: function (j) {
								//alert(j);
								$("#message_file_uploaded2").remove();
								input_file2.attr("class","textbox normal");
								input_file2.css("display","block");
								loading_file2.css("color", "black");
								loading_file2.html(j.msg);
								deleting_file = false;
								file_uploaded2 = false;
							},
							error: function(xhr) { 
								alert("Error occured: "+xhr.responseText);
							}
						})
					})
				} else {
					input_file2.attr("class","textbox error");
					input_file2.css("display","block");
					loading_file2.html("File wasn't uploaded. "+response_data.msg);
					loading_file2.css("color", "red");
				}
			}
	});
}, 500
)
);
