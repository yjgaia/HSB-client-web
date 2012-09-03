<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<title>HSB</title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
		<script>
		$(function() {
			$.get('proxy.jsp', {
				url: 'http://localhost:8080/HSB/user/auth'
				, method: 'POST'
				, params: $.param({
					username: 'test1'
					, password: 'test'
				})
			}, function(data) {
				document.write(data);
			});
		});
		</script>
	</head>
	
	<body>
	</body>
</html>
