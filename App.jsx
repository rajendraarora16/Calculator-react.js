import React from 'react';

class App extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            math: [
                ["c", "±", "÷", "*"],
                [7, 8, 9, "-"],
                [4, 5, 6, "+"],
                [1, 2, 3, "="],
                [0, " ", ".", " "]
            ],
            expression: "",
            result: "0"
        }

        this.doMath = this.doMath.bind(this);
        this.updateExpression = this.updateExpression.bind(this);
    }

    doMath(val) {

        if (val === "c") {
            return (this.setState({expression: this.state.expression.substring(0, this.state.expression.length - 1)}))
        } else {
            return (this.setState({result: this.evaluateString()}))
        }
    }

    updateExpression(val){
        return this.setState({expression: this.state.expression + val});
    }

    evaluateString(){
        var reg = this.state.expression.replace(/\W/g, " $& ");
        reg = reg.split(" ");
        var update = reg.filter(function(val){
            return val != ""
        })
        return update.solveCalculation()
    }

    render(){

        return(
            <div id="calculator">
                <div id="result">
                    <div id="doingMatch">
                        <p>{this.state.expression}</p>
                    </div>
                    <div id="answers">
                        <p>{this.state.result}</p>
                    </div>
                </div>
                <div id="mathtable">
                    {
                        this.state.math.map((row, i) => {
                            var mutants = row.map((operator, j) => {
                                return(
                                    <div className="numOperand" id={operator === "=" || (i == 4 && j == 3) ? "orange" : null}
                                    onClick={operator === "c" || operator === "=" ? this.doMath.bind(null, operator) : this.updateExpression.bind(null, operator)}>
                                        {operator}
                                    </div>
                                );
                            })
                            return(
                                <div className="rows">
                                    {mutants}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

Array.prototype.solveCalculation = function(){
    var arith = isNaN(this[0]) ? false : parseInt(this[0]);

    this.forEach((n, next) => {
        if(!isNaN(arith)){
            if(isNaN(n) && this[next+1] && !isNaN(this[next + 1])) {
                switch (n) {
                    case "+":
                        arith += parseInt(this[next + 1]);
                        break;

                    case "-":
                        arith -= parseInt(this[next + 1]);
                        break;

                    case "÷":
                        arith /= parseInt(this[next + 1]);
                        break;

                    case "±":
                        arith -= parseInt(this[next + 1]);
                        break;

                    case "*":
                        arith *= parseInt(this[next + 1]);
                        break;
                }
            }
        }
    })
    return arith;
}

export default App;
