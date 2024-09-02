
import { useState } from 'react';
import './App.css'
import converter from './assets/converter.svg';
import { useEffect } from 'react';

function App() {
  const[amount,setAmount]=useState(1);
  const[fromCurrency,setFromCurrency]=useState("USD")
  const[toCurrency,setToCurrency]=useState("INR")
  const[convertedCurrency,setConvertedCurrency]=useState(null);
  const[exchangeRate,setExchangeRate]=useState(null);

  function handleamount(e){
    setAmount(e.target.value);

  }
  function fromhandler(e){
    setFromCurrency(e.target.value)
  }
   function tohandler(e){
    setToCurrency(e.target.value);

  }
  useEffect(() => {
    async function getExchangeRate() {
      try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await res.json();
        setExchangeRate(data.rates[toCurrency]);
      } catch (error) {
        console.error("Error Occurred:", error);
      }
    }
    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect (()=>{
    if(exchangeRate!==null){
      setConvertedCurrency((amount * exchangeRate).toFixed(2))
    }
  },[amount, exchangeRate])
  
  

  return (
    <>
      <div className='currency-converter'>
        <div className='box'>
          <img src={converter} alt='image'/>
        </div>
        <div className='data'>
          <h1>Currency Converter</h1>
          <div className='input-container'>
            <label htmlFor='amt'>Amount</label>
            <input type='number' id='amt' value={amount} onChange={handleamount}></input>
          </div>
          <div className='input-container'>
            <label htmlFor='from'>From Currency :</label>
            <select id='from' onChange={fromhandler} value={fromCurrency}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australine Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chainese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className='input-container'>
            <label htmlFor='to'>To Currency :</label>
            <select id='to' onChange={tohandler} value={toCurrency}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australine Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chainese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className='result'>
            <p>{amount} {fromCurrency} is Equal to {convertedCurrency} {toCurrency}</p>
          </div>
        </div>
        
        
      </div>
    </>
  )
}

export default App
