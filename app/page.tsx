"use client"
import { Button } from "@/components/ui/button";
import { Graph } from "./src/components/Graph"
import { Chart } from "./src/components/Donnut";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function Home() {
  const {data: session} = useSession()

  if (session) redirect("/dashboard/notes")
  return (
    <section className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-center max-w-[900px] py-2">
        Writing Note now for the web
      </h1>
      <p className="">Redécouvrez la prise de note simple et rapide avec NoteNow.ai</p>
      <div className="flex items-center justify-between py-5 gap-5">
        <Button>Get Started</Button>
        <Button>More information</Button>
      </div>
      <div className="flex items-center justify-center gap-5">
        <Graph />
        <Chart />
      </div>
      
    </section>  
  );
}
