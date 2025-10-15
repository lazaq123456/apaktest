import { NextAdmin } from "@premieroctet/next-admin"
import { getNextAdminProps } from "@premieroctet/next-admin/appHandler"
import { requireAdmin } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { options } from "./options"

export default async function AdminPage({
  params,
  searchParams,
}: {
  params: Promise<{ nextadmin?: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  await requireAdmin()
  
  const props = await getNextAdminProps({
    params: params,
    searchParams: searchParams,
    options,
    prisma,
  })

  return <NextAdmin {...props} />
}


