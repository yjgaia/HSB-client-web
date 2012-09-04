<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<title>HSB</title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
		<script src="p.js"></script>
		<script>
		$(function() {
			get('http://hsb1.anak.kr:8080/HSB/user/timeline', {
				secureKey: '3de8ddd6b6bdeeffd32e17a462575f40bbb5fcad'
			}, function(data) {
				document.write(data);
			});
		});
		</script>
	</head>
	
	<body>
	</body>
</html>
