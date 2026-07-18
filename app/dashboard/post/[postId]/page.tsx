import DashboardPostPage from '@bdt/pages/admin/DashboardPostPage';

interface IProps {
    params: Promise<{ postId: string }>
};

export default async function Page({ params }: IProps) {
    const { postId } = await params;
    return <DashboardPostPage postId={postId} />;
}

export const dynamic = 'force-dynamic';
