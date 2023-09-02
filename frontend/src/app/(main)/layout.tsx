export default function StartLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode;
  }) {
    return(
      <>
        <div 
          className="flex flex-col items-center justify-center w-full h-screen bg-cover"
          style={{ backgroundImage: `url(/background/bg-page-01.svg)` }}
        >
          {children}
        </div>
      </>
  
    ) 
  }