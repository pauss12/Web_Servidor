import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from 'fs';


export async function GET(request, { params }) {

    try {
        
        const users = JSON.parse(readFileSync("data/users.txt"))

        const user = users.find((user) => user.idUsuario === params.idUsuario)

        if (!user) {

            return NextResponse.json({ message: "API:USER not found", status: 404 });
        
        }

        return NextResponse.json({ user });

    } catch (error) {

        console.error("API: Error fetching USER:", error);

        return NextResponse.json({ message: "API: Error fetching USER", status: 500 });

    }
}

export async function PUT(request, { params }) {

    try {
        
        const users = JSON.parse(readFileSync("data/users.txt"))

        const userIndex = users.findIndex((user) => user.idUsuario === params.idUsuario)

        if (userIndex === -1) {

            return NextResponse.json({ message: "API:USER not found", status: 404 });
        
        }

        const user = users[userIndex];

        const chunks = [];

        for await (const chunk of request.body) {
            chunks.push(chunk);
        }
        
        const body = JSON.parse(Buffer.concat(chunks).toString());

        const newUser = { ...user, ...body };

        users[userIndex] = newUser;

        writeFileSync("data/users.txt", JSON.stringify(users, null, 4));

        return NextResponse.json({ user: newUser });

    } catch (error) {

        console.error("API: Error fetching USER:", error);

        return NextResponse.json({ message: "API: Error fetching USER", status: 500 });

    }
}

export async function DELETE(request, { params }) {

    try {
        
        const users = JSON.parse(readFileSync("data/users.txt"))

        const userIndex = users.findIndex((user) => user.idUsuario === params.idUsuario)

        if (userIndex === -1) {

            return NextResponse.json({ message: "API:USER not found", status: 404 });
        
        }

        users.splice(userIndex, 1);

        writeFileSync("data/users.txt", JSON.stringify(users, null, 4));

        return NextResponse.json({ message: "API:USER deleted" });

    } catch (error) {

        console.error("API: Error fetching USER:", error);

        return NextResponse.json({ message: "API: Error fetching USER", status: 500 });

    }
}