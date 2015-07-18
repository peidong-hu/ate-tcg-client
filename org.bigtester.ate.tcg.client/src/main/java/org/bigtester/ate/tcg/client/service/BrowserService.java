package org.bigtester.ate.tcg.client.service;

import org.bigtester.ate.tcg.client.launcher.AppLauncher;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class BrowserService {
	private static WebDriver webDriver;
	public static void initWebDriverInstance() {
		if (webDriver == null) {
			webDriver = new FirefoxDriver();
		} 
	}
	public void launchFireBug() {
//		AppLauncher.webView.getEngine().executeScript("if (!document.getElementById('FirebugLite')){E = document['createElement' + 'NS'] && document.documentElement.namespaceURI;E = E ? document['createElement' + 'NS'](E, 'script') : document['createElement']('script');E['setAttribute']('id', 'FirebugLite');E['setAttribute']('src', 'https://getfirebug.com/' + 'firebug-lite.js' + '#startOpened');E['setAttribute']('FirebugLite', '4');(document['getElementsByTagName']('head')[0] || document['getElementsByTagName']('body')[0]).appendChild(E);E = new Image;E['setAttribute']('src', 'https://getfirebug.com/' + '#startOpened');}");
		
		((JavascriptExecutor) webDriver).executeScript("if (!document.getElementById('FirebugLite')){E = document['createElement' + 'NS'] && document.documentElement.namespaceURI;E = E ? document['createElement' + 'NS'](E, 'script') : document['createElement']('script');E['setAttribute']('id', 'FirebugLite');E['setAttribute']('src', 'https://getfirebug.com/' + 'firebug-lite.js' + '#startOpened');E['setAttribute']('FirebugLite', '4');(document['getElementsByTagName']('head')[0] || document['getElementsByTagName']('body')[0]).appendChild(E);E = new Image;E['setAttribute']('src', 'https://getfirebug.com/' + '#startOpened');}");
		//((JavascriptExecutor) webDriver).executeScript("if (!document.getElementById('FirebugExten')){E = document['createElement' + 'NS'] && document.documentElement.namespaceURI;E = E ? document['createElement' + 'NS'](E, 'script') : document['createElement']('script');E['setAttribute']('id', 'FirebugLite');E['setAttribute']('src', 'https://getfirebug.com/' + 'firebug-lite.js' + '#startOpened');E['setAttribute']('FirebugLite', '4');(document['getElementsByTagName']('head')[0] || document['getElementsByTagName']('body')[0]).appendChild(E);E = new Image;E['setAttribute']('src', 'https://getfirebug.com/' + '#startOpened');}");
		
		
	}
	
	public void launchUserHomepage() {
		if (webDriver == null) initWebDriverInstance();
		webDriver.get("http://bigtester.com");
	}
	public void launchUserHomepage(String url) {
		if (webDriver == null) initWebDriverInstance();
		webDriver.get(url);
	}
	public static WebDriver getWebDriver() {
		if (webDriver == null) initWebDriverInstance();
		return webDriver;
	}
	
	public static void stopBrowser() {
		webDriver.quit();
	}
}
