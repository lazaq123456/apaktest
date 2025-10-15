import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: "Błąd podczas pobierania produktów" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Brak uprawnień" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { name, description, price, stock } = body

    if (!name || !price) {
      return NextResponse.json(
        { error: "Nazwa i cena są wymagane" },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: {
        name,
        description: description || null,
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Błąd podczas tworzenia produktu" },
      { status: 500 }
    )
  }
}

