package model;

public abstract class Dialog {
	
	//+++++++++++++++DialogButtonText
	public enum CloseButtonText {
		
		CLOSE("Close"),
		OK("OK");
		
		private final String buttonText;
		CloseButtonText(String buttonText){
			this.buttonText = buttonText;
		}
		@Override
		public String toString() {
			return buttonText;
		}
	}
}
