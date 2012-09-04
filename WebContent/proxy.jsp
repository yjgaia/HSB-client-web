<%@page import="java.io.InputStreamReader"%>
<%@page import="java.io.BufferedReader"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="java.net.HttpURLConnection"%>
<%@page import="java.net.URL"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%

String charset = "UTF-8";
String query = request.getParameter("params");
String method = request.getParameter("method");

URL url;
if (method.equals("GET")) {
	url = new URL(request.getParameter("url") + "?" + query);
} else {
	url = new URL(request.getParameter("url"));
}

HttpURLConnection connection = (HttpURLConnection) url.openConnection();
connection.setRequestProperty("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/534.52.7 (KHTML, like Gecko) Version/5.1.2 Safari/534.52.7");
connection.setRequestProperty("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
connection.setRequestProperty("Cache-Control", "max-age=0");
connection.setRequestMethod(request.getParameter("method"));

if (!method.equals("GET")) {
	connection.setDoOutput(true);
	connection.getOutputStream().write(query.getBytes(charset));
}

BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));
String line;
while ((line = br.readLine()) != null) {
	out.println(line);
}
%>