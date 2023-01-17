// import { useState,useRef } from "react";

// function App() {
//   const dragItem = useRef();
//   const [boxes]=useState([1,2,3,4,5,6,7,8])
//   const dragStart = (e, position) => {
//     // dragItem.current = position;
//     console.log(e.target,"e","position ",position)
//     // console.log(e.target.innerHTML);
//   };
//   const drop = (e) => {
//     console.log("on drop event",e.target)
//     // const copyListItems = [...list];
//     // const dragItemContent = copyListItems[dragItem.current];
//     // copyListItems.splice(dragItem.current, 1);
//     // copyListItems.splice(dragOverItem.current, 0, dragItemContent);
//     // dragItem.current = null;
//     // dragOverItem.current = null;
//     // setList(copyListItems);
//   };
//   return (
//     <div className="App">
//       <div className="row">
//         {boxes.map((e,index)=>{
// return(
//   <div class="card col-4 " draggable     key={e}
//   onDragStart={(e) => dragStart(e, index)}
//   onDragEnd={drop}
//   >
//   <h5 class="card-header">{e}</h5>
// </div>
// )
//         })}

// </div>
//     </div>
//   );
// }

// export default App;


import React, { useState, useRef, useEffect } from 'react';
import './App.css';
 
const App = () => {
  
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [list, setList] = useState(localStorage.getItem("userorder")?JSON.parse(localStorage.getItem("userorder")):['Item 1','Item 2','Item 3','Item 4','Item 5','Item 6']);
 
  const dragStart = (e, position) => {
    console.log(position,"on the drag start")
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };
 
  const dragEnter = (e, position) => {
    console.log(position,"on the drag enter")
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };
 
  const drop = (e) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  };
  useEffect(()=>{
    console.log(list)
localStorage.setItem("userorder",JSON.stringify(list))
  },[list])
 
  return (
    <>
    {
    list&&
    list.map((item, index) => (
      <div style={{backgroundColor:'lightblue', margin:'20px 25%', textAlign:'center', fontSize:'40px'}}
        onDragStart={(e) => dragStart(e, index)}
        onDragEnter={(e) => dragEnter(e, index)}
        onDragEnd={drop}
        key={index}
        draggable>
          {item}
      </div>
      ))}
    </>
  );
};
export default  App;