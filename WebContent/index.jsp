<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="EUC-KR"%><%@ page session="false" %><%@ page import ="kr.swmaestro.client.util.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<body>
<%	String result=ConnectUtil.getPage("http://localhost:8080/HSB/user/account.json", "UTF-8"); %>
<script language="javascript">var a=<%=result%>;
alert(a.result.url);</script>
</body>
</html>