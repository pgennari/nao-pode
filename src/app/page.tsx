import { sql } from "@vercel/postgres";
import dynamic from 'next/dynamic'

export default async function Home() {
  const palavras = await sql`SELECT * from palavras`;
  let totalPalavras: number = Object.keys(palavras.rows).length;
  console.log(totalPalavras)
  const indicePalavraSorteada = Math.floor(Math.random() * totalPalavras);
  console.log(indicePalavraSorteada)
  const palavra = palavras.rows[indicePalavraSorteada];
  console.log(palavra)
  const Timer = dynamic(() => import('@/components/timer'), { ssr: false })
  //const timer = Timer(expiryTimestamp={new Date(Date.now() + 60 * 1000)});
  const dificultadores = palavra.dificultadores.split(";").map((d: String, i: number) => {
    return (
      <p key={i} className="p-6 font-black uppercase">
        {d}
      </p>
    );
  });

  const vai = function () {
    return (
      <div className="w-1/2 m-2">
        <button className="py-3 px-5 w-full m-1 bg-violet-500 text-slate-100 rounded-xl scale-in-center shadow-xl " >
          Vai!&nbsp; 
          {/* <Timer   />  */}
        </button>
      </div>
    );
  };

  const pular = function () {
    return (
      <div className="w-1/2 m-2">
        <button className="w-full py-3 px-5 w-1/2 m-1 bg-violet-500 text-slate-100 rounded-xl scale-in-center shadow-xl align-middle text-center">
          Pular
        </button>
      </div>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <section>
        <div className=" border-black w-80 bg-neutral-100 text-center box-content border-5 h-[32rem] border-solid ">
          <div className="border-solid p-3 bg-indigo-500 text-slate-100 uppercase leading-loose font-mono antialiased font-black tracking-widest text-2xl text-focus-in text-shadow-drop-center ">
            {palavra.palavra}
          </div>
          <div className="w-100 text-shadow-drop-center">{dificultadores}</div>
        </div>
        <div className="flex flex-row">
          {vai()}
          {pular()}
        </div>
      </section>
    </main>
  );
}
