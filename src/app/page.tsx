import Grid from "@/components/Grid";

export default function Home() {
  return (
    <main >
      <Example />
    </main>
  )
}

const Example = () => {
  return <div className="flex justify-center items-center h-screen">
    <Box />
  </div>
}

//bootstrap and tailwind 
//btn-primary-red
// 

const Box = () => {
  return <div className="h-20 w-20 rounded bg-emerald-400"></div>
}

const CssBox = () => {
  return <div className="box"></div>
}
/*
.box{
  height:5rem;
  width:5rem;
  borderRadiusL
}
*/