import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Rozpoczynam seed bazy danych...")

  // Usuń istniejące dane
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()

  // Utwórz użytkownika admin
  const adminPassword = await hash("admin123", 12)
  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Admin",
      password: adminPassword,
      role: "ADMIN",
    },
  })
  console.log("✅ Utworzono użytkownika admin:", admin.email)

  // Utwórz zwykłego użytkownika
  const userPassword = await hash("user123", 12)
  const user = await prisma.user.create({
    data: {
      email: "user@example.com",
      name: "Jan Kowalski",
      password: userPassword,
      role: "USER",
    },
  })
  console.log("✅ Utworzono użytkownika:", user.email)

  // Utwórz przykładowe produkty
  const products = await prisma.product.createMany({
    data: [
      {
        name: "Laptop Dell XPS 15",
        description: "Wydajny laptop do pracy i zabawy z procesorem Intel Core i7",
        price: 5999.99,
        stock: 15,
      },
      {
        name: "iPhone 15 Pro",
        description: "Najnowszy iPhone z chipem A17 Pro",
        price: 4999.00,
        stock: 25,
      },
      {
        name: "Samsung Galaxy S24",
        description: "Flagowy smartfon Samsung z aparatem 200MP",
        price: 3799.00,
        stock: 30,
      },
      {
        name: "Sony WH-1000XM5",
        description: "Słuchawki bezprzewodowe z najlepszą redukcją szumów",
        price: 1399.00,
        stock: 50,
      },
      {
        name: "iPad Air M2",
        description: "Lekki i wydajny tablet Apple",
        price: 2999.00,
        stock: 20,
      },
    ],
  })
  console.log(`✅ Utworzono ${products.count} produktów`)

  console.log("🎉 Seed zakończony pomyślnie!")
}

main()
  .catch((e) => {
    console.error("❌ Błąd podczas seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

