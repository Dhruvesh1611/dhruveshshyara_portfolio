export default function manifest() {
    return {
        name: 'Dhruvesh Shyara - Full Stack Developer Portfolio',
        short_name: 'Dhruvesh Portfolio',
        description: 'Portfolio of Dhruvesh Shyara, a Full Stack Developer specializing in MERN stack, React, Next.js, and modern web development.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#a855f7',
        icons: [
            {
                src: '/aquaregia-favicon.svg',
                sizes: 'any',
                type: 'image/svg+xml',
            },
        ],
    };
}
