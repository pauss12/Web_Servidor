import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs';

export async function GET() {

    try {
        
        const users = JSON.parse(readFileSync("data/users.txt"))

        return NextResponse.json({ users })

    } catch (e) {

        return NextResponse.json({ message: "Usuarios no existen...", status: 400 })

    }
}

export async function DELETE(request) {

    const data = await request.json()

    try {

        const users = JSON.parse(readFileSync("data/users.txt"))

        const usersFilter = users.filter(user => user.email != data.email)

        writeFileSync("data/users.txt", JSON.stringify(usersFilter, null, 4))

        return NextResponse.json({ message: "Usuario eliminado...", status: 200 })

    } catch (e) {
        console.log(e)

    }
}

export async function POST(request) {

    const data = await request.json()
    
    try {

        const users = JSON.parse(readFileSync("data/users.txt"))

        writeFileSync("data/users.txt", JSON.stringify([...users, data], null, 4))

    } catch (e) {
        writeFileSync("data/users.txt", JSON.stringify([data], null, 4))

    }
    
    return NextResponse.json({ message: "Guardando datos..." })
}