

function Home () {
    return (
        <>
        <div className="h-full flex-1 lg:ml-12 xl:mx-20 py-6 flex flex-col text-text-50 bg-bg-50 dark:text-text-950 dark:bg-bg-950">
      <div className="flex-1 min-h-0 flex flex-col px-2">
          {/* Encabezado */}
          <div className="flex flex-col gap-4 pt-32 items-center">
                <h1 className="text-4xl font-bold pb-2">Bienvenido Administrador</h1>
                <p className="text-sm">¿Qué quieres hacer hoy?</p>   
          </div>
          <div className="flex-1 min-h-0 overflow-hidden mt-12 pb-6 "> {/* Espacio restante */}
          <div className="h-full overflow-y-auto">
            <div className="mx-2">
                
          </div>
          </div>
          </div>
        </div>
      </div>
      </>
    );
}

export default Home;