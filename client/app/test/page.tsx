import Script from 'next/script'

const page = () => {
    return (
        <Script
            src="http://localhost:3000/widget.js"
            data-id="3ef9ac85-2604-4593-b1df-401a0ad60ad6"
            defer
        >
        </Script>
    )
}

export default page
