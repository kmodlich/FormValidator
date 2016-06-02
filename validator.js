function validate_form(email,password){
	var codes = [];
	if(password.length < 8){ //Check length
		codes.push(1);
	}
	if(/[A-Z]/.test(password) == false){ //Check for a capital
		codes.push(2);
	}
	if(/\d/.test(password) == false){ //Check for a digit
		codes.push(3);
	}
	if(/.+@.+\..+/i.test(email) == false){ //Check if it resembles a format of something@email.com
		codes.push(0);
	}
	return codes;
}

function parse_response_code(codes,error_handles,submit_handle){
	console.log(codes);
		error_handles.each(function(index,value){
			if(codes.indexOf(index) != -1){
				$(value).show();
			}else{
				$(value).hide();
			}
		});
		if(codes.length < 1){
			submit_handle.prop('disabled',false);
		}else{
			submit_handle.prop('disabled',true);
		}
	console.log(codes);
}

$(document).ready(function(){
	var submit_handle = $(":submit");
	var email_handle = $(":text");
	var password_handle = $(":password");
	var error_handles = $(".errors > li")

	/*
	Reset page state for when the user refreshes the page.
	*/
	email_handle.val("");
	password_handle.val("");
	submit_handle.prop('disabled',true);

	email_handle.keyup(function(){
		parse_response_code(validate_form($(this).val(),password_handle.val()),error_handles,submit_handle);
	});
	password_handle.keyup(function(){
		parse_response_code(validate_form(email_handle.val(),$(this).val()),error_handles,submit_handle);
	});
});
/* comment