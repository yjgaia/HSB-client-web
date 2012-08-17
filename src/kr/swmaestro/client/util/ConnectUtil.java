package kr.swmaestro.client.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class ConnectUtil {
	public static String getPage(String reqUrl,String encoding){
		String result="";
		try{
			String line="";
			URL url=new URL(reqUrl);
			HttpURLConnection conn=(HttpURLConnection) url.openConnection();
			
			conn.setDoOutput(true);
			conn.setUseCaches(false);
			
			BufferedReader rd= new BufferedReader(new InputStreamReader(conn.getInputStream(),encoding));
			
			while((line=rd.readLine())!=null){
				result+=line;
			}
			rd.close();
			
			
		}catch(Exception e){
			System.out.println(e.toString());
		}
		return result;
	}
}
