import Timer from "@/components/timer";
import { kv } from "@vercel/kv";

export default async function Home() {
  const data = await kv.json.get("palavras");
  let palavras = data["Palavras"];
  let totalPalavras: number = Object.keys(palavras).length;
  const indicePalavraSorteada = Math.floor(Math.random() * totalPalavras);
  const palavra = palavras[indicePalavraSorteada];

  const dificultadores = palavra.Dificultadores.map((d: String, i: number) => {
    return (
      <p key={i} className="p-6 font-black uppercase">
        {d}
      </p>
    );
  });

  const initTimer = function () {
    return (
      <div>
        <button className="py-3 px-5 w-1/2 m-1 bg-black text-slate-100 rounded-xl scale-in-center shadow-xl ">
          Vai!
        </button>
        <Timer expiryTimestamp={new Date(Date.now() + 60 * 1000)} />
      </div>
    );
  };

  const pular = function () {
    return (
      <div className=" py-3 px-5 w-1/2 m-1 bg-black text-slate-100 rounded-xl scale-in-center shadow-xl align-middle text-center">
        <button className="align-middle">
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
            {palavra.Palavra}
          </div>
          <div className="w-100 text-shadow-drop-center">{dificultadores}</div>
        </div>
        <div className="flex flex-row">
          {initTimer()}
          {pular()}
        </div>
      </section>
    </main>
  );
}
