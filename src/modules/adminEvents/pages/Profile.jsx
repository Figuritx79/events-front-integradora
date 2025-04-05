export default function Profile () {

    return (
    <>
    <div className="h-full flex-1 lg:ml-12 xl:mx-20 py-6 flex flex-col text-text-50 dark:text-text-950">
        <div className="flex-1 min-h-0 flex flex-col px-2 pt-6">
            {/* Encabezado */}
            <div className="flex flex-col gap-4 items-start">
                <h1 className="text-4xl font-bold pb-2"></h1>
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
