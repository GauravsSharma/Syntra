import Script from 'next/script'

const page = () => {
    return (
        <Script
            src="http://localhost:3000/widget.js"
            data-id="fd045a3f-87b5-494d-9409-dafffc856b26"
            defer
        >
        </Script>
    )
}

export default page
