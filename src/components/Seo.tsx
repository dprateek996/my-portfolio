import Head from "next/head";

interface SeoProps {
    title: string;
    description: string;
    image?: string;
}

export const Seo = ({ title, description, image = "/opengraph-image" }: SeoProps) => (
    <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        <link rel="icon" href="/favicon.png" type="image/png" />
    </Head>
);
