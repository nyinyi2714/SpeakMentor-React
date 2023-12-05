import "./DisplaySteps.css";

function DisplaySteps({ currentStep }) {
    return(
        <div className="display-steps">
            <div className={`step-circle ${currentStep >= 1 && 'finished'}`}><div>1</div></div>

            <div className={`line ${currentStep >= 2 && 'finished'}`}><span /></div>
            <div className={`step-circle ${currentStep >= 2 && 'finished'}`}><div>2</div></div>

            <div className={`line ${currentStep >= 3 && 'finished'}`}><span /></div>
            <div className={`step-circle ${currentStep >= 3 && 'finished'}`}><div>3</div></div>

        </div>
    );
}

export default DisplaySteps;