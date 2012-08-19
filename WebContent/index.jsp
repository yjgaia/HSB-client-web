<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="EUC-KR"%><%@ page session="false" %><%@ page import ="kr.swmaestro.client.util.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script language="javascript">
function check(){
	<%
		String result = ConnectUtil.getPage("http://localhost:8080/HSB/user/account.json?username=", "UTF-8");
	%>
	var json = <%=result%>;
	if(json.result.success != "true"){
		for(var i=0;i<json.result.errors.length;i++){
			document.write("code : " + json.result.errors[i].code + "<br />");
			document.write("arguments : " + json.result.errors[i].arguments + "<br />");
			document.write("defaultMessage : " + json.result.errors[i].defaultMessage + "<br /><br />")
		}
	}
	else{
		alert("success!");
	}
}
</script>
</head>
<body>
ID : <input type="text" id="username" maxlength=20 /><br />
PW : <input type="password" id="password" maxlength=20 /><br />
<input type="button" value="로그인" onclick="check()"/>&nbsp;&nbsp;<input type="button" value="회원가입" />

<!--  testcode  -->
<br />
<%=result%>
<!-- //testcode  -->

</body>
</html>