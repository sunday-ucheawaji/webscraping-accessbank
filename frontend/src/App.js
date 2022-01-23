import styles from  './styles/App.module.css';
import {Link} from 'react-router-dom'

function App() {
  return (
 
     <div  className={styles.container}>
       <h1>Welcome to scraper</h1>
       <p className={styles.para}>Click here to {' '}
         <Link to='/register'>Get Started</Link>
       </p>
     </div>
  )
}

export default App;
