import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App(props) {
  const [currFir, getCurrFir] = useState(props.data.base_code)
  const [currSec, getCurrSec] = useState(Object.keys(props.data.rates).find(el => el == 'USD'))
  const [amount, getAmount] = useState(1)
  const [result, setResult] = useState('')

  const convertFunc = async () => {
    let response = await fetch('https://open.er-api.com/v6/latest/'+currFir);

    if (response.ok) {
      let json = await response.json();
      if (json) {
        setResult(Object.entries(json.rates).find(el => el[0] == currSec)[1] * amount)
        console.log(result)
      }
    } else {
      alert("Попробуйте перезагрузить страницу. Ошибка HTTP: " + response.status);
    }
  }

  convertFunc()

  return (
    <div class="calculator-container">
      <input type="number" id="amount" value={amount} placeholder="Введите сумму" onChange={e => getAmount(e.target.value)}/>
      <select id="from-currency" onChange={(el) => getCurrFir(el.target.value)}>
        {Object.keys(props.data.rates).map(curr => <option value={curr}>{curr}</option>)}
      </select>
      <select id="to-currency" onChange={(el) => getCurrSec(el.target.value)}>
        {Object.keys(props.data.rates).map(curr => {
          if (curr == "USD") {
            return <option selected value={curr}>{curr}</option>
          } else {
            return <option value={curr}>{curr}</option>
          }
        })}
      </select>
      <div id="result">{result}</div>
      <script src="script.js"></script>
    </div>

  );
}

export default App;
