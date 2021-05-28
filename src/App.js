import React, { Component } from 'react'
import Button from './component/Button'
import './App.scss';
import Item from './component/Item';


class App extends Component {
  constructor(props){
    super(props)
    this.state={
      menu: [
        {
          id:1,
          name:'Black Tea',
          recipe:'Brew with 100°C water for 180s',
          degree: 100, 
          time:10
        },
        {
          id:2,
          name:'Green Tea',
          recipe:'Brew with 80°C water for 120s',
          degree: 80, 
          time:120
        },
        {
          id:3,
          name:'White Tea',
          recipe:'Brew with 75°C water for 120s',
          degree: 75, 
          time:120
        },
        {
          id:4,
          name:'Yellow Tea',
          recipe:'Brew with 100°C water for 120s',
          degree: 100, 
          time:120
        },
        {
          id:5,
          name:'Herbal Tea',
          recipe:'Brew with 70°C water for 200s',
          degree: 70, 
          time:200
        }
      ],
      order:'your oreder',
      choosedItem:[],
      seconds: 0,
      seeMore: false,
      isTimerRun: false
    }
  }


  componentWillUnmount(){
    clearInterval(this.timer)
  }

  componentDidUpdate(prevProps,prevState){
    if(prevState.order !=='your oreder' && prevState.order !== this.state.order && this.state.order !== 'your order is ready'){
      if(prevState.choosedItem.length === 3 ){
        prevState.choosedItem.splice(2,1)
        this.setState({choosedItem: [prevState.order, ...prevState.choosedItem]})
      }else{
        this.setState({choosedItem: [prevState.order, ...prevState.choosedItem]})
      }
    }
  }

  handleChoice = (item) => {
    this.setState({
      order: item.name,
      seconds: this.secondsTominutes(item.time),
    })
  }

  handleTimer = () => {
    if (this.state.order === 'your oreder' || this.state.order === 'your order is ready') {
      alert('Please choose an item')
    }else{
      this.timer = setInterval(() => {
        this.setState(prevState => {
          const curSec = this.minutesToSeconds(prevState.seconds)
          if (curSec === 0) {
            clearInterval(this.timer)
            return{order: "your order is ready", seconds: 0, isTimerRun: false }
          }
          return{seconds: this.secondsTominutes(curSec - 1), isTimerRun: true}})
      }, 1000)
    }
  }

  handleSeeMore = () => {
    this.setState(prevState => {return {seeMore: !prevState.seeMore}})
  }

  handleCancelTimer = () =>{
      clearInterval(this.timer)
          this.setState({order:'your oreder',choosedItem:[],seconds: 0,isTimerRun: false})
  }

  secondsTominutes = (seconds) =>{
    const min = Math.floor(seconds/60);
    const sec = seconds - min * 60
    return `${min}:${sec<10? `0${sec}` : sec}`
  }

  minutesToSeconds = (minutes) => {
    const newminutes = minutes.split(':')
    const seconds = Number(newminutes[0])*60 + Number(newminutes[1])
    return seconds
  }

  

  render() {
    const numberOfShowedItem = this.state.seeMore ?  this.state.menu : this.state.menu.slice(0,3)
    console.log(numberOfShowedItem);
    console.log(this.state.seeMore);
    return (
      <div className="menu">
        <h1 className='menu__header'>{this.state.order}</h1>
        <div className='menu__history'>
          {this.state.choosedItem.map(prevOrders => <span className="menu__history__item">{prevOrders}</span>)}
        </div>
        {this.state.seconds? <h2 className="menu__timer">{`${(this.state.seconds)} min left`}</h2> : ''}
        <div className="menu__items">
          {numberOfShowedItem.map(item => <Item key={item.id} data={item} timeTransform={this.secondsTominutes} onClick={this.handleChoice}/>)}
          {this.state.seeMore? <Button content="See Less" onClick={this.handleSeeMore}/> : <Button content="See More" onClick={this.handleSeeMore}/>}
        </div>
        <div className="menu__button">
          <Button content='Start Timer' onClick={this.handleTimer} disabled={this.state.isTimerRun}/>
          <Button content='Cancel' onClick={this.handleCancelTimer} disabled={!this.state.isTimerRun}/>
        </div>
      </div>
    )
  }
}


export default App;
