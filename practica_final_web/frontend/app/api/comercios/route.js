import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs';

export async function POST(request) {
    
    const data = await request.json()
    
    try {
        
        const comercios = JSON.parse(readFileSync("data/comercios.txt"))
       
        writeFileSync("data/comercios.txt", JSON.stringify([...comercios, data], null, 4))

    } catch (e) {
        
        writeFileSync("data/comercios.txt", JSON.stringify([data], null, 4))

    }
    return NextResponse.json({ message: "Guardando datos..." })
}

export async function GET() {

    try {
     
        const comercios = JSON.parse(readFileSync("data/comercios.txt"))
        
        return NextResponse.json({ comercios })

    } catch (e) {

        return NextResponse.json({ message: "NO existen Comercios...", status: 400 })
    }
}


export async function DELETE(request) {
    
    const data = await request.json()

    try {

        const comercios = JSON.parse(readFileSync("data/comercios.txt"))
        
        const comercioFilter = comercios.filter(comercio => comercio.idComercio != data.idComercio)
        
        writeFileSync("data/comercios.txt", JSON.stringify(comercioFilter, null, 4))
        
        return NextResponse.json({ message: "Comercio eliminado...", status: 200 })

    } catch (e) {

        console.log(e)
        return NextResponse.json({ message: "ERROR...", status: 404 })
    }
}

export async function PUT(request) {

    const data = await request.json();

    try {

        const comercios = JSON.parse(readFileSync("data/comercios.txt"));

        const comercioIndex = comercios.findIndex((comercio) => comercio.emailComercio === data.emailComercio);

        if (comercioIndex !== -1) {

            comercios[comercioIndex].comentarios = data.comentarios;

            writeFileSync("data/comercios.txt", JSON.stringify(comercios, null, 4));

            console.log("Reseña actualizada:", data.comentarios);

            return NextResponse.json({ message: "Comercio actualizado...", status: 200 });

        } else {

            return NextResponse.json({ message: "Comercio no encontrado", status: 404 });

        }

    } catch (e) {

        console.log(e);

        return NextResponse.json({ message: "Error al actualizar el comercio", status: 500 });

    }
}