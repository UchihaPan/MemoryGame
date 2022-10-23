import './App.css'
import React,{useState,useEffect} from 'react'
import Card from './copmponents/Card'


const cardimages=[
  {"src":"/img/helmet-1.png",matched:false},
  {"src":"/img/potion-1.png",matched:false},
  {"src":"/img/ring-1.png",matched:false},
  {"src":"/img/scroll-1.png",matched:false},
  {"src":"/img/shield-1.png",matched:false},
  {"src":"/img/sword-1.png",matched:false},
]

function App() {

  const [cards,setcards]= useState([])
  const [turns,setturns]= useState(0)
  const [choiceone,setchoiceone]=useState(null)
  const [choicetwo,setchoicetwo]=useState(null)
  const [disable,setdisable]=useState(false)



  const shufflecards=()=>{
    const shuffle=[...cardimages,...cardimages]
    .sort(()=> Math.random() - 0.5)
    .map((card)=>({...card,id:Math.random()}))

    setchoiceone(null)
    setchoicetwo(null)

    setcards(shuffle)
    setturns(0)
  }


  const resetturn=()=>{

    setchoiceone(null)
    setchoicetwo(null)
    setturns(prev=>prev+1)
    setdisable(false)
  }



  const handlechoice=(card)=>{
    choiceone ? setchoicetwo(card) : setchoiceone(card)

  }

  useEffect(() => {
    if(choiceone && choicetwo){
      setdisable(true)

      if(choiceone.src === choicetwo.src){
        setcards(prevcards=>{
          return prevcards.map(card=>{
            if(card.src === choiceone.src){
              return {...card,matched:true}
            }else{
              return card
            }
          })
        })
        resetturn()
        
      }else{
        setTimeout(()=>resetturn(),500)
          
      }
  

    }
  

  }, [choiceone,choicetwo])

  useEffect(()=>{
    shufflecards()
  },[])

  

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={()=>shufflecards()}>New Game</button>
      <div className="card-grid">
        {cards.map(card=>(
         <Card key={card.id} card={card} handlechoice={handlechoice} flipped={ card=== choiceone || card === choicetwo || card.matched===true} disabled={disable}/>
        ))}
      </div>
      <p>Turns:{turns}</p>
    </div>
  );
}

export default App 