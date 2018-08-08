import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

    //类定义组件
    // class Square extends React.Component {
        
    //     render() {
    //         return (
    //             <button className="square" onClick={()=>{this.props.onClick()}}>
    //             {this.props.value}
    //             </button>
    //         );
    //     }
    // }

    //函数定义组件。使用纯组件的不可变性
    function Square(props){
        return (
            <button className="square" onClick={props.onClick}>
                {props.value}
            </button>
        );
    }
  
    //判断是否有人赢了这场比赛
    function calculateWinner(squares){
        const winlist=[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,6,6]
        ];
        for (let index = 0; index < winlist.length; index++) {
            const [a,b,c]=winlist[index];
            if (squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c]) {
                return squares[a];
            }
            
        }
        return null;
    }

    class Board extends React.Component {
        renderSquare(i) {
            return <Square 
            value={this.props.squares[i]} 
            onClick={()=>{this.props.onClick(i)}}
            />;
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
    constructor(){
        super();
        this.state={
            history:[
                {squares:Array(9).fill(null)}
            ],
            isNext:true, //将X设为先手棋
            stepNumber:0
        }
    }
    handleClick(i){
        const history = this.state.history.slice(0,this.state.stepNumber+1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        //若有人赢了，则游戏无法继续
        if (calculateWinner(squares)) {
            return;
        }
        squares[i]=this.state.isNext?"X":"O";
        //const item=this.state.squares.slice();
        //item[i]=this.state.isNext?"X":"O";
        this.setState({
            history:history.concat([{
                squares:squares
            }]),
            isNext:!this.state.isNext,
            stepNumber:history.length
        });
    }
    jumpTo(step){
        this.setState({
            stepNumber:step,
            isNext:(step%2)?false:true
        })
    }
    render() {
        const history=this.state.history;
        const current=history[this.state.stepNumber];
        const winner=calculateWinner(current.squares)
    
        let status;
        if(winner){
            status = 'This Games Winner: '+ winner;
        }
        else{
            status = 'Now player: '+(this.state.isNext?"X":"O");
        }

        const moves = history.map((step,move)=>{
            const desc=move?'下了'+move+'步':'Start Game';
            return (
                <li key={move}>
                    <button onClick={()=>this.jumpTo(move)}>{desc}</button>
                    {/* <a onClick={()=>this.jumpTo(move)} href="#">{desc}</a> */}
                </li>
            )
        })
        return (
            <div className="game">
                <div className="game-board">
                <Board 
                    squares={current.squares}
                    onClick={(i)=>{this.handleClick(i)}}
                />
                </div>
                <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
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
  