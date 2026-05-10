import Script from 'next/script'

const page = () => {
    return (
        <Script
            src="http://localhost:3000/widget.js"
            data-id="4ceb1342-db41-470f-b301-29987800f8af"
            defer
        >
        </Script>
    )
}

export default page
