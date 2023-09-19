import { kv } from "@vercel/kv";

export default async function Home() {
  const data = await kv.json.get("palavras");
  let palavras = data["Palavras"];
  let totalPalavras: number = Object.keys(palavras).length;
  const indicePalavraSorteada = Math.floor(Math.random() * totalPalavras);
  const palavra = palavras[indicePalavraSorteada];

  const dificultadores = palavra.Dificultadores.map((d: String) => {
    return (
      <p key={d} className="p-6 font-black uppercase">
        {d}
      </p>
    );
  });

  const initTimer = function () {
    return <button className="p-5 m-5 bg-black text-slate-100 scale-in-center">Teste</button>;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <section>
        <div className="w-80 bg-neutral-100 text-center box-content border-5 h-[32rem]">
          <div className="alert p-3 bg-indigo-500 text-slate-100 uppercase leading-loose font-mono antialiased font-black tracking-widest text-2xl">
            {palavra.Palavra}
          </div>
          <div className="w-100">{dificultadores}</div>
        </div>
        <div>{initTimer()}</div>
      </section>
    </main>
  );
}
