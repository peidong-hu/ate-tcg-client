package org.bigtester.ate.tcg.client.service;

import org.bigtester.ate.tcg.client.launcher.AppLauncher;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
/*
 * Launch by bookmarklet url
 * javascript:(function(F,i,r,e,b,u,g,L,I,T,E){if(F.getElementById(b))return;E=F[i+'NS']&&F.documentElement.namespaceURI;E=E?F[i+'NS'](E,'script'):F[i]('script');E[r]('id',b);E[r]('src',I+g+T);E[r](b,u);(F[e]('head')[0]||F[e]('body')[0]).appendChild(E);E=new%20Image;E[r]('src',I+L);})(document,'createElement','setAttribute','getElementsByTagName','FirebugLite','4','firebuglite/build/firebug-lite-debug.js','releases/lite/debug/skin/xp/sprite.png','http://172.16.173.132:9080/','#startOpened');
 */
public class BrowserService {
	private static WebDriver webDriver;
	public static void initWebDriverInstance() {
		if (webDriver == null) {
			webDriver = new FirefoxDriver();
		} 
	}
	public void launchFireBug() {
//		AppLauncher.webView.getEngine().executeScript("if (!document.getElementById('FirebugLite')){E = document['createElement' + 'NS'] && document.documentElement.namespaceURI;E = E ? document['createElement' + 'NS'](E, 'script') : document['createElement']('script');E['setAttribute']('id', 'FirebugLite');E['setAttribute']('src', 'https://getfirebug.com/' + 'firebug-lite.js' + '#startOpened');E['setAttribute']('FirebugLite', '4');(document['getElementsByTagName']('head')[0] || document['getElementsByTagName']('body')[0]).appendChild(E);E = new Image;E['setAttribute']('src', 'https://getfirebug.com/' + '#startOpened');}");
		
		//((JavascriptExecutor) webDriver).executeScript("if (!document.getElementById('FirebugLite')){E = document['createElement' + 'NS'] && document.documentElement.namespaceURI;E = E ? document['createElement' + 'NS'](E, 'script') : document['createElement']('script');E['setAttribute']('id', 'FirebugLite');E['setAttribute']('src', 'https://getfirebug.com/' + 'firebug-lite.js' + '#startOpened');E['setAttribute']('FirebugLite', '4');(document['getElementsByTagName']('head')[0] || document['getElementsByTagName']('body')[0]).appendChild(E);E = new Image;E['setAttribute']('src', 'https://getfirebug.com/' + '#startOpened');}");
		//((JavascriptExecutor) webDriver).executeScript("if (!document.getElementById('FirebugExten')){E = document['createElement' + 'NS'] && document.documentElement.namespaceURI;E = E ? document['createElement' + 'NS'](E, 'script') : document['createElement']('script');E['setAttribute']('id', 'FirebugLite');E['setAttribute']('src', 'https://getfirebug.com/' + 'firebug-lite.js' + '#startOpened');E['setAttribute']('FirebugLite', '4');(document['getElementsByTagName']('head')[0] || document['getElementsByTagName']('body')[0]).appendChild(E);E = new Image;E['setAttribute']('src', 'https://getfirebug.com/' + '#startOpened');}");
		//((JavascriptExecutor) webDriver).executeScript("if (!document.getElementById('FirebugLite')){E = document['createElement' + 'NS'] && document.documentElement.namespaceURI;E = E ? document['createElement' + 'NS'](E, 'script') : document['createElement']('script');E['setAttribute']('id', 'FirebugLite');E['setAttribute']('src', 'http://localhost:9080/firebuglite/content/firebug-lite-dev.js' + '#startOpened');E['setAttribute']('FirebugLite', '4');(document['getElementsByTagName']('head')[0] || document['getElementsByTagName']('body')[0]).appendChild(E);E = new Image;E['setAttribute']('src', 'http://localhost:9080/' + '#startOpened');}");
		((JavascriptExecutor) webDriver).executeScript("if (!document.getElementById('FirebugLite')){E = document['createElement' + 'NS'] && document.documentElement.namespaceURI;E = E ? document['createElement' + 'NS'](E, 'script') : document['createElement']('script');E['setAttribute']('id', 'FirebugLite');E['setAttribute']('src', 'http://172.16.173.132:63342/ate-tcg-client/com.bigtester.ate.tcg.webclient/WebContent/content/firebug-lite-dev.js' + '#startOpened');E['setAttribute']('FirebugLite', '4');(document['getElementsByTagName']('head')[0] || document['getElementsByTagName']('body')[0]).appendChild(E);E = new Image;E['setAttribute']('src', 'http://172.16.173.132:63342/' + '#startOpened');}");
		
		//((JavascriptExecutor) webDriver).executeScript("if (!document.getElementById('FirebugLite')){E = document['createElement' + 'NS'] && document.documentElement.namespaceURI;E = E ? document['createElement' + 'NS'](E, 'script') : document['createElement']('script');E['setAttribute']('id', 'FirebugLite');E['setAttribute']('src', 'http://localhost:9080/firebuglite/build/firebug-lite.js' + '#startOpened');E['setAttribute']('FirebugLite', '4');(document['getElementsByTagName']('head')[0] || document['getElementsByTagName']('body')[0]).appendChild(E);E = new Image;E['setAttribute']('src', 'http://localhost:9080/' + '#startOpened');}");
		//WebElement element = webDriver.findElement(By.id("FirebugUI"));
		//((JavascriptExecutor) webDriver).executeScript("arguments[0].setAttribute('style', 'display:inline')",element);
	}
	
	public void launchUserHomepage() {
		if (webDriver == null) initWebDriverInstance();
		//webDriver.get("http://172.16.173.132:8080/com.bigtester.ate.tcg/mvc/chat");
		webDriver.get("http://bigtester.com");
	}
	public boolean launchUserHomepage2(String url) {
		if (webDriver == null) initWebDriverInstance();
		webDriver.get(url);
		return true;
	}
	public static WebDriver getWebDriver() {
		if (webDriver == null) initWebDriverInstance();
		return webDriver;
	}
	
	public void stopBrowser() {
		webDriver.quit();
	}
}
