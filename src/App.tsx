import './App.css'
import Field from './components/field';

function App() {

  return (
    <>
      <div className="card">
        <Field placeholder="google.com,commbank.com.au" variable="domains"/>
        <Field placeholder="Head of Data,PMO" variable="titles"/>
        <Field placeholder="10" variable="max_results"/>
      </div>
      <div className="card">
        <button onClick={() => alert('Hello world!')}>Find Client Contacts</button>
      </div>
    </>
  )
}

export default App
