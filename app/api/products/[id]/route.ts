import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = await prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      return NextResponse.json(
        { error: "Produkt nie znaleziony" },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { error: "Błąd podczas pobierania produktu" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Brak uprawnień" },
        { status: 403 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const { name, description, price, stock } = body

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(price && { price: parseFloat(price) }),
        ...(stock !== undefined && { stock: parseInt(stock) }),
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { error: "Błąd podczas aktualizacji produktu" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Brak uprawnień" },
        { status: 403 }
      )
    }

    const { id } = await params
    await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Produkt usunięty" })
  } catch (error) {
    return NextResponse.json(
      { error: "Błąd podczas usuwania produktu" },
      { status: 500 }
    )
  }
}

