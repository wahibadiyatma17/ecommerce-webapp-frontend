import Head from 'next/Head'
import { API_URL, fromImageToUrl } from '../../utils/urls'
import { twoDecimals } from '../../utils/format'


const Product = ({ product }) => {
    return (
        <div>
            <Head>
                {product.meta_title &&
                    <title>{product.meta_title}</title>
                }
                {product.meta_description &&
                    <meta name="description" content={product.meta_description} />
                }
            </Head>
            <h3>{product.name}</h3>
            <img src={fromImageToUrl(product.image)} />
            <h3>{product.name}</h3>
            <p>${twoDecimals(product.price)}</p>

            <p>
                {product.content}
            </p>
        </div>
    )

}

export async function getStaticProps({ params: { slug } }) {
    const product_res = await fetch(`${API_URL}/products/?slug=${slug}`)
    const found = await product_res.json()

    return {
        props: {
            product: found[0] //[0] because the API response in found is an array
        }
    }
}

export async function getStaticPaths() {
    //Retrieve all possible path    
    const products_res = await fetch(`${API_URL}/products/`)
    const products = await products_res.json()

    //Return them into nextJS content
    return {
        paths: products.map(product => ({
            params: { slug: String(product.slug) }
        })),
        fallback: false //return 404 error if params is not found
    }
}

export default Product;