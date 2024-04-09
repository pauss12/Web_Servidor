import { NextResponse } from 'next/server'
import { readFileSync } from 'fs';


export async function POST(request) {

    const data = await request.json()

    if (data.opcionSeleccionada == 'Usuarios Registrados' || data.opcionSeleccionada == 'Administrador') {

        try {

            const users = JSON.parse(readFileSync("data/users.txt"));

            const user = users.filter(user => user.nombreUsuario.trim().toLowerCase() === data.nombreUsuario.trim().toLowerCase() && user.passwordUsuario.trim() === data.passwordUsuario.trim())

            if (user.length > 0) {

                return NextResponse.json({ message: "Usuario existe...", status: 200 });

            } else {

                return NextResponse.json({ message: "Usuario no existe...", status: 400 });

            }

        } catch (error) {

            return NextResponse.json({ message: "Comercio no existe...", status: 400 })

        }

    } else if (data.opcionSeleccionada == 'Comercios') {

        try {

            const comercios = JSON.parse(readFileSync("data/comercios.txt"))

            const comercio = comercios.filter(comercio => comercio.nombreComercio.trim().toLowerCase() === data.nombreComercio.trim().toLowerCase() && comercio.cifComercio.trim() === data.cifComercio.trim())

            if (comercio.length > 0) {

                return NextResponse.json({ message: "Comercio existe...", status: 200 });

            } else {

                return NextResponse.json({ message: "Comercio no existe...", status: 400 });

            }

        } catch (error) {

            return NextResponse.json({ message: "Comercio no existe...", status: 400 })
        }

    } else {

        console.error('Error en la API:', error.message);
        
        return NextResponse.json({ message: "Opcion no existe...", status: 400 })
    }
    
}



