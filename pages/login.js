import Head from 'next/Head'
import { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import styles from '../styles/Login.module.css'

export default function Login() {

    const [email, setEmail] = useState("")
    const { loginUser } = useContext(AuthContext)

    const handleSubmit = (event) => {
        event.preventDefault()
        loginUser(email)
    }

    return (
        < div >
            <Head>
                <title>Login</title>
                <meta name="login page" content="login here to make your purchase"></meta>
            </Head>
            <h2>
                <form onSubmit={handleSubmit}>
                    <input
                        className={styles.input}
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Input your email address"
                    />
                    <button
                        type="submit"
                        className={styles.button}>Login</button>
                </form>
            </h2>
        </div >
    )
}