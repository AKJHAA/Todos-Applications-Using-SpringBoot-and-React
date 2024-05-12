import './App.css';
// import Counter from './component/counter/Counter'
import TodoApp from './component/todo/TodoApp';

function App() {
  return (
    <div className="App">
        {/* <Counter /> */}
        <TodoApp/>
    </div>
  );

}

//USing Modern Java Script
function PlayingWithProps({property1 , property2}) {

  console.log(property1);
  console.log(property2);

  return (
    <div>Props</div>
  )
}


// function PlayingWithProps(properties) {

//   console.log(properties);
//   console.log(properties.property1);
//   console.log(properties.property2);

//   return (
//     <div>Props</div>
//   )
// }

export default App;
