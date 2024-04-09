import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from 'fs';


export async function GET(request, { params }) {

    try {

        const users = JSON.parse(readFileSync("data/comercios.txt"));

        const user = users.find((comercio) => comercio.id === params.id);

        if (!user) {

            return NextResponse.json({ message: "Comercio not found", status: 404 });

        }

        return NextResponse.json({ user });

    } catch (error) {

        console.error("Error fetching Comercio:", error);

        return NextResponse.json({ message: "Error fetching Comercio", status: 500 });

    }
}


export async function PUT(request, { params }) {

    try {

        const comercios = JSON.parse(readFileSync("data/comercios.txt"));

        const indiceComercio = comercios.findIndex((comercio) => comercio.idComercio === params.idComercio);

        if (indiceComercio === -1) {

            return NextResponse.json({ message: "API: COMERCIO not found", status: 404 });

        }

        const comercio = comercios[indiceComercio];

        const chunks = [];

        for await (const chunk of request.body) {
            chunks.push(chunk);
        }

        const body = JSON.parse(Buffer.concat(chunks).toString());

        const nuevoComercio = { ...comercio, ...body };

        comercios[indiceComercio] = nuevoComercio;

        writeFileSync("data/comercios.txt", JSON.stringify(comercios, null, 4));

        return NextResponse.json({ comercio: nuevoComercio });

    } catch (error) {

        console.error("API: Error fetching Comercio:", error);

        return NextResponse.json({ message: "API: Error fetching Comercio", status: 500 });

    }
}

export async function DELETE(request, { params }) {

    try {

        const comercios = JSON.parse(readFileSync("data/comercios.txt"))

        const indiceComercio = comercios.findIndex((comercio) => comercio.idUsuario === params.idUsuario)

        if (indiceComercio === -1) {

            return NextResponse.json({ message: "API:Comercio not found", status: 404 });

        }

        comercios.splice(indiceComercio, 1);

        writeFileSync("data/comercios.txt", JSON.stringify(comercios, null, 4));

        return NextResponse.json({ message: "API:Comercio deleted" });

    } catch (error) {

        console.error("API: Error fetching Comercio:", error);

        return NextResponse.json({ message: "API: Error fetching Comercio", status: 500 });

    }
}
