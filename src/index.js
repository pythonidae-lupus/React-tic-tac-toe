import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
  return(
    <button className = "square" onClick={props.onClick}>
    {props.value}
    </button>
    );
}

class Board extends React.Component {
   //// constructor(props) {
  //   super(props);
  //   this.state= {squares: Array(9).fill(null), 
  //     xIsNext: true,};
  // }


  renderSquare(i) {
    return (
      <Square value={this.props.squares[i]}
    onClick={()=>this.props.onClick(i)} />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{squares : Array(9).fill(null),}],
      stepNumber: 0,
      xIsNext: true,
      squareNumVar: Array(9).fill(null),
      col: [],
      row: [],
    };
  }

  squareNum(val) {
	console.log(val);
	
	if ( val === 0 || val === 3 || val === 6) {
		this.setState({
			col : this.state.col.concat(1),
		});
		
	}
	else if (val === 1 || val === 4 || val === 7) {
		this.setState({
			col : this.state.col.concat(2),
		});
	}
	else {
		this.setState({
			col : this.state.col.concat(3),
		});
	}

	//row number

	if (val === 0 || val === 1 || val === 2) {
		this.setState({
			row : this.state.row.concat(1),
		});
	}
	else if (val === 3 || val === 4 || val === 5) {
		this.setState({
			row : this.state.row.concat(2),
		});
	}
	else {
		this.setState({
			row : this.state.row.concat(3),
		});
	}
	

	//console.log(col, row);
}



   handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];    
        const squares = current.squares.slice();
        const squareNumVar = this.state.squareNumVar;

        
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X':'O';
    this.setState({
      history: history.concat([{        
        squares: squares,      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      squareNumVar: this.state.squareNumVar.concat(i),
  });
    
    this.squareNum(i);


  }



  jumpTo(step) {    
    this.setState({      
      stepNumber: step,      
      xIsNext: (step % 2) === 0,    
    });  

    var x = document.getElementsByClassName('steptojump');

    for(var i=0;i<x.length;i++){
    	x[i].style.fontWeight = 'normal';
    }
    x[step].style.fontWeight = 'bold';
  }

  render() {

    const history = this.state.history;    
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const squareNumVar = this.state.squareNumVar;
    const col = this.state.col;
    const row = this.state.row;





    const moves = history.map((step, move) => {      
      const desc = move ?        
      'Go to move #' + move + " square number: " + squareNumVar[move + 8] + " (" + col[move-1] + ", " + row[move-1] + ") " :        
      'Go to game start';      
      return (   

      <li key={move}>           
      <button class="steptojump" onClick={() => this.jumpTo(move)}>{desc}</button>        
      </li>      
      );    
    });


    let status;    
    if (winner) {      
      status = 'Winner: ' + winner;    
    } else {      
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');    
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board            
            squares={current.squares}            
            onClick={(i) => this.handleClick(i)}          
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol >{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}