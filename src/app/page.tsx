import { kv } from "@vercel/kv";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <div className="w-96 bg-neutral-100 text-center box-content border-5 h-[32rem]">
          <div className="alert p-3 bg-indigo-500 text-slate-100 uppercase leading-loose font-mono antialiased font-black tracking-widest text-2xl">
            Palavra
          </div>
        </div>
      </section>
    </main>
  );
}


