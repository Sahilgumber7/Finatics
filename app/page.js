import Link from 'next/link';

export default function Home() {
  return (
    <section className="bg-background text-foreground lg:grid lg:h-screen lg:place-content-center">
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Manage your spending and {' '}
            <span className="text-primary">reach your goals</span>
          </h1>

          <p className="mt-6 text-pretty text-base text-muted-foreground sm:text-lg">
            Track every expense, set saving targets, and visualize your progress — all in one clean and powerful dashboard.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/pages/dashboard"
              className="inline-block rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow transition hover:bg-primary/90"
            >
              Start Tracking
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
