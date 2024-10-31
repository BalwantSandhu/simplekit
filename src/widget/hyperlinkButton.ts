import { SKButton, SKButtonProps } from "./button";

export class SKHyperlinkButton extends SKButton {
  private isPressed: boolean = false; // Track if the button is pressed

  constructor(buttonProps: SKButtonProps = {}) {
    super(buttonProps);
    this.fill = "#D0F0C0";
  }

  draw(gc: CanvasRenderingContext2D) {
    gc.save();

    const w = this.paddingBox.width;
    const h = this.paddingBox.height;

    gc.translate(this.margin, this.margin);

    // Set the fill color based on the button state
    gc.fillStyle = this.fill;

    // Draw button background without border
    gc.beginPath();
    gc.roundRect(this.x, this.y, w, h, this.radius);
    gc.fill(); // Only fill the background without a stroke

    // Draw button label, styled like a hyperlink
    gc.fillStyle = this.state === "hover" ? this._highlightColour : this._fontColour;
    gc.font = this.isPressed ? "bold " + this._font : this._font;
    gc.textAlign = "center";
    gc.textBaseline = "middle";

    // Change font style if the button is pressed
    if (this.isPressed) {
      gc.font = "bold " + this._font; // Change to bold or different style
    }

    gc.fillText(this.text, this.x + w / 2, this.y + h / 2);

    // Draw underline for the button text
    const textWidth = gc.measureText(this.text).width; // Measure text width
    const underlineY = this.y + h / 2 + 10; // Adjust Y position for underline
    gc.beginPath();
    gc.moveTo(this.x + (w - textWidth) / 2, underlineY); // Starting point of underline
    gc.lineTo(this.x + (w + textWidth) / 2, underlineY); // Ending point of underline
    gc.strokeStyle =  this.state === "hover" ? this._highlightColour : this._fontColour;// Use the same color as the text
    gc.lineWidth = 1; // Set line width for underline
    gc.stroke();

    if (this.state === "hover" || this.state === "down") {
        gc.beginPath();
        gc.roundRect(this.x, this.y, w, h, this.radius);
        gc.fillStyle = "rgba(0, 0, 0, 0.1)"; // Optional: change the highlight color if needed
        gc.fill(); // Fill with a slight background color for visibility
    }
  

    gc.restore();

    // Call to super.draw(gc) if you want the debug visualization, otherwise omit
    // super.draw(gc);
  }

  public toString(): string {
    return `SKHyperlinkButton '${this.text}'`;
  }
}
