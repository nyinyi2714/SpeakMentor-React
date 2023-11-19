import "./HelpSection.css";

function HelpSection({ displayHelp }) {
  return (
    <div className={`expandable-wrapper ${displayHelp && "open"}`}>
      <div className="help-popup expandable-content">
        <div style={{ margin: "2rem" }}>
          <h1>Instructions</h1>
          <div className="instruction">
            <span>Record</span>
            <p>Click "Record" to start recording your voice, and <i>"Pause"</i> when you want to take a break.</p>
            <p>When you're ready to move on, click <i>"Next"</i>.</p>
          </div>
          <div className="instruction">
            <span>Reset</span>
            <p>If you need a fresh start, hit <i>"Reset"</i> to clear both your recording and transcript.</p>
          </div>
          <div className="instruction">
            <span>Preview</span>
            <p>You can listen your recording by clicking <i>"Listen to yourself"</i>.</p>
            <p>You can listen to correct pronunciation by clicking <i>"Speak"</i>.</p>
          </div>
          <div className="instruction">
            <span>Analyze</span>
            <p>When you're satisfied with your recording and edit, click <i>"Analyze"</i> to evaluate your voice.</p>
          </div>
          <div className="instruction">
            <span>Practice</span>
            <p>Once your voice is analyzed, click on words to view the analysis or practice.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpSection;
