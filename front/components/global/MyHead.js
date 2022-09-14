import Head from "next/head";

function MyHead({title}) {
    return (
        <Head>
            <title>{title + ' - Weather App'}</title>
            <meta name="description" content="Generated by create next app"/>
            <link rel="icon" href="/icons/cloud.png"/>
        </Head>
    )
}

export default MyHead