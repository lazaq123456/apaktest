import { NextAdmin } from "@premieroctet/next-admin"
import { getPropsFromParams } from "@premieroctet/next-admin/dist/appHandler"
import { requireAdmin } from "@/lib/auth"
import schema from "@/prisma/schema.prisma"
import { PrismaClient } from "@prisma/client"
import { options } from "./options"

const prisma = new PrismaClient()

export default async function AdminPage({
  params,
  searchParams,
}: {
  params: Promise<{ nextadmin?: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  await requireAdmin()
  const props = await getPropsFromParams({
    params: await params,
    searchParams: await searchParams,
    options,
    prisma,
    schema,
  })

  return <NextAdmin {...props} options={options} />
}

