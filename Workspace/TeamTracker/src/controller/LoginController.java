package controller;

import com.jfoenix.controls.JFXButton;
import com.jfoenix.controls.JFXPasswordField;
import com.jfoenix.controls.JFXTextField;

import javafx.fxml.FXML;
import javafx.scene.Parent;
import javafx.scene.layout.AnchorPane;
import view.View;

public class LoginController implements Rootable, Frameable{
	
	//root fxml element & children:
	@FXML private AnchorPane rootAP;
    @FXML private JFXTextField nameTxtFld;
    @FXML private JFXPasswordField pswrdTxtFld;
    @FXML private JFXButton loginBtn;
    
    @FXML
    void initialize() {
    
    }
    
    //fxml root node:
  	private Parent root;
  	
  	private View view = View.LOGIN_FXML; //set this to then get ...
  	
  	//constructor:
  	LoginController() {
  		setRoot(); //set root node
  		
  	}

  	/** from Frameable: */
	@Override
	public void setRoot() {this.root = Rootable.getRoot(this, View.LOGIN_FXML);} //set root
	@Override
	public Parent getRoot() {return root;} //get root
	@Override
	public String getViewTitle() {return null; /*view2.getTitle();*/} //get view2 title

}
