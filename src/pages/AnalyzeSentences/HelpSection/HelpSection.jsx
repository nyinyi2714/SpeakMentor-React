import "./HelpSection.css";

function HelpSection() {
  return (
    <div className="help-popup">
      <h1>Instructions</h1>
      <div className="instruction">
        <span>Record</span>
        <p>Click "Record" to start recording your voice, and "Pause" when you want to take a break.</p>
        <p>When you're ready to move on, click "Next"</p>
      </div>
      <div className="instruction">
        <span>Reset</span>
        <p>If you need a fresh start, hit "Reset" to clear both your recording and transcript.</p>
      </div>
      <div className="instruction">
        <span>Preview</span>
        <p>You can review your recording by clicking "Listen to yourself" and simply press "Pause" to stop playback.</p>
        <p>Feel free to edit your transcript right in the textarea.</p>
      </div>
      <div className="instruction">
        <span>Analyze</span>
        <p>When you're satisfied with your recording and edit, click "Analyze" to evaluate your voice.</p>
      </div>
    </div>
  );
}

export default HelpSection;
