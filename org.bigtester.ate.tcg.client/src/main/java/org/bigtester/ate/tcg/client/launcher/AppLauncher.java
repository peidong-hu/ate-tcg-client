package org.bigtester.ate.tcg.client.launcher;

import static org.bigtester.ate.tcg.client.java2script.Java2JavascriptUtils.connectBackendObject;

import org.bigtester.ate.tcg.client.service.BrowserService;
import org.bigtester.ate.tcg.client.service.CalculatorService;
import org.bigtester.ate.tcg.client.service.FruitsService;
import org.bigtester.ate.tcg.client.service.UserInputService;
import org.w3c.dom.Document;

import javafx.application.Application;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebEvent;
import javafx.scene.web.WebView;
import javafx.stage.Stage;

public class AppLauncher extends Application {
	// create the JavaFX webview
	final public static WebView webView = new WebView();

	private final String PAGE = "/index.html";

	@Override
	public void start(Stage primaryStage) {
		createWebView(primaryStage, PAGE);
	}

	private void createWebView(Stage primaryStage, String page) {
		
	
		// connect the FruitsService instance as "fruitsService" 
		// javascript variable
		connectBackendObject(
				webView.getEngine(),
				"fruitsService", new FruitsService());
		
		// connect the CalculatorService instance as "calculatorService" 
		// javascript variable		
		connectBackendObject(
				webView.getEngine(),
				"calculatorService", new CalculatorService());
		
		connectBackendObject(
				webView.getEngine(),
				"browserService", new BrowserService());
		
		// connect the CalculatorService instance as "calculatorService" 
		// javascript variable		
		connectBackendObject(
				webView.getEngine(),
				"userInputService", new UserInputService());
		
		
		// show "alert" Javascript messages in stdout (useful to debug)	
		webView.getEngine().setOnAlert(new EventHandler<WebEvent<String>>(){
			@Override
			public void handle(WebEvent<String> arg0) {
				System.err.println("alertwb1: " + arg0.getData());
			}
		});
		
		// load index.html
		webView.getEngine().load(
				getClass().getResource(page).
				toExternalForm());

		
		primaryStage.setScene(new Scene(webView));
		primaryStage.setTitle("ATE test case modeling tool.");		
		primaryStage.show();
//		webView.getEngine().documentProperty().addListener(new ChangeListener<Document>() {
//		      @Override public void changed(ObservableValue<? extends Document> prop, Document oldDoc, Document newDoc) {
//		        enableFirebug(webView.getEngine());
//		      }
//		    });
//		
	}
	/**
	   * Enables Firebug Lite for debugging a webEngine.
	   * @param engine the webEngine for which debugging is to be enabled.
	   */
	  private static void enableFirebug(final WebEngine engine) {
	    engine.executeScript("if (!document.getElementById('FirebugLite')){E = document['createElement' + 'NS'] && document.documentElement.namespaceURI;E = E ? document['createElement' + 'NS'](E, 'script') : document['createElement']('script');E['setAttribute']('id', 'FirebugLite');E['setAttribute']('src', 'https://getfirebug.com/' + 'firebug-lite.js' + '#startOpened');E['setAttribute']('FirebugLite', '4');(document['getElementsByTagName']('head')[0] || document['getElementsByTagName']('body')[0]).appendChild(E);E = new Image;E['setAttribute']('src', 'https://getfirebug.com/' + '#startOpened');}"); 
	  }
	public static void main(String[] args) {		
		System.setProperty("prism.lcdtext", "false"); // enhance fonts		
		launch(args);
	}
}
