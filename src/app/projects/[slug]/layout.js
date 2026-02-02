import { allProjects } from '@/data/projectsData';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { slug } = params;
    const project = allProjects.find(p => p.slug === slug);

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    return {
        title: project.title,
        description: project.description,
        keywords: [
            'Dhruvesh Shyara',
            project.title,
            ...project.tags,
            project.category,
            'web development',
            'portfolio project',
        ],
        openGraph: {
            title: `${project.title} | Dhruvesh Shyara`,
            description: project.description,
            url: `https://dhruveshshyara.com/projects/${project.slug}`,
            images: [
                {
                    url: project.image,
                    width: 1200,
                    height: 630,
                    alt: project.title,
                },
            ],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${project.title} | Dhruvesh Shyara`,
            description: project.description,
            images: [project.image],
        },
    };
}

export default function ProjectDetailLayout({ children }) {
    return children;
}
