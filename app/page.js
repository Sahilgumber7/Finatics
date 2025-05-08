import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
        Track Your Expenses
      </h1>
      <p className="text-lg text-gray-600 mb-6 max-w-xl">
        Stay on top of your budget. Monitor your spending, visualize your savings, and take control of your finances with our simple expense tracker.
      </p>
      <Link href="/login">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-lg hover:bg-blue-700 transition">
          Get Started
        </button>
      </Link>
    </main>
  );
}

