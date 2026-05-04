import Script from 'next/script'

const page = () => {
    return (
        <Script
            src="http://localhost:3000/widget.js"
            data-id="06bdbb18-cdf4-4e5a-b1cc-1055ede35573"
            defer
        >
        </Script>
    )
}

export default page
