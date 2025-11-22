import { Loading } from '@/components/ui/loading';

export default function AppLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950/95">
      <Loading size="lg" />
    </div>
  );
}
