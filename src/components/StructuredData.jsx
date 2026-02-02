'use client';

export default function StructuredData() {
    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Dhruvesh Shyara',
        alternateName: 'Dhruvesh',
        url: 'https://dhruveshshyara.com',
        image: 'https://dhruveshshyara.com/png/dhruvesh-home-avatar2.png',
        jobTitle: 'Full Stack Developer',
        description: 'Full Stack Developer specializing in MERN stack, React, Next.js, and modern web development',
        alumniOf: {
            '@type': 'EducationalOrganization',
            name: 'Rai University',
        },
        knowsAbout: [
            'JavaScript',
            'React.js',
            'Next.js',
            'Node.js',
            'Express.js',
            'MongoDB',
            'Full Stack Development',
            'MERN Stack',
            'Web Development',
            'UI/UX Design',
        ],
        sameAs: [
            'https://github.com/Dhruvesh1611',
            'https://www.linkedin.com/in/dhruvesh-shyara',
            'https://twitter.com/dhruveshshyara',
        ],
    };

    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Dhruvesh Shyara Portfolio',
        url: 'https://dhruveshshyara.com',
        description: 'Portfolio showcasing projects, skills, and experience of Dhruvesh Shyara, a Full Stack Developer',
        author: {
            '@type': 'Person',
            name: 'Dhruvesh Shyara',
        },
        potentialAction: {
            '@type': 'SearchAction',
            target: 'https://dhruveshshyara.com/projects?search={search_term_string}',
            'query-input': 'required name=search_term_string',
        },
    };

    const profilePageSchema = {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        mainEntity: {
            '@type': 'Person',
            name: 'Dhruvesh Shyara',
            url: 'https://dhruveshshyara.com',
            description: 'Full Stack Developer with expertise in MERN stack and modern web technologies',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
            />
        </>
    );
}
