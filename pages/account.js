import Head from 'next/head'
import { useContext, useState, useEffect } from 'react'
import { API_URL } from '../utils/urls'
import AuthContext from '../context/AuthContext'
import Link from 'next/link'

const useOrders = (user, getToken) => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchOrders = async () => {
            if (user) {
                try {
                    setLoading(true)
                    const token = await getToken()
                    const order_res = await fetch(`${API_URL}/orders`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    const data = await order_res.json()
                    setOrders(data)
                } catch (err) {
                    setOrders([])
                }
                setLoading(false)
            }
        }
        fetchOrders()
    }, [user])

    return { orders, loading }
}

export default function Account() {
    const { user, logoutUser, getToken } = useContext(AuthContext)

    const { orders, loading } = useOrders(user, getToken)
    console.log('Account.render order', orders)

    if (!user) {
        return (
            <div>
                <p>Please login or register first.</p>
                <Link href="/"><a href="#">Go Back</a></Link>
            </div>
        )
    }

    return (
        <div>
            <Head>
                <title>Account Page</title>
                <meta name="User's Account Page" content="This is an account page, view your order and logout." />
            </Head>
            <h2>Account Page</h2>
            <h3>Your Order</h3>
            {loading && <p>loading your order</p>}
            {orders.map(order => (
                <div key={order.key}>
                    {new Date(order.created_at).toLocaleDateString('en-EN')}{order.product.name} ${order.total} {order.status}
                </div>
            ))}
            <p>Logged i n as = {user.email}</p>
            <a href="#" onClick={logoutUser}>Logout</a>
        </div>
    )
}