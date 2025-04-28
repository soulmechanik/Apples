import Header from '@/components/Header/Header'
import React from 'react'
import styles from './about.module.scss'

const page = () => {
  return (
    <div className={styles.about}>
      
      <Header/>

    
    
     <span className={styles.texts}> This is the aboiut page for John</span>
    </div>
  )
}

export default page