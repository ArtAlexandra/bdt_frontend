import DashboardArticlePage from '@bdt/pages/admin/DashboardArticlePage';

interface IProps {
    params: Promise<{ articleId: string }>
};

export default async function Page({ params }: IProps) {
    const { articleId } = await params;
    return <DashboardArticlePage articleId={articleId} />;
}

export const dynamic = 'force-dynamic';
