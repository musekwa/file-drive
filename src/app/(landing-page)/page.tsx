import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";


export default function LandingPage() {
  return (
    <div className="light:bg-white">
      <div className="relative  px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-12 sm:py-24 lg:py-12">
          <div className="text-center">
            <div className="flex flex-col justify-center">
              <Image
                alt="hero picture"
                src="/heroImage.svg"
                width={200}
                height={200}
                className="mx-auto"
              />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-sky-600/90 sm:text-6xl py-2">
              The easiest way to upload and share files within your organization
            </h1>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Create an account and start managing your files in less than a
              minute.
            </p>
            <SignedOut>
              <div className="mt-4 flex items-center justify-center gap-x-6">
                <Link
                  href="/dashboard/files"
                  className="rounded-md bg-sky-600/90 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </Link>
              </div>
            </SignedOut>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
