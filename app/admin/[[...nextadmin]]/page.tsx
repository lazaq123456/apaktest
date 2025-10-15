import { NextAdmin } from "@premieroctet/next-admin"
import { requireAdmin } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { options } from "./options"
import { getNextAdminProps } from "@premieroctet/next-admin/appRouter"

export default async function AdminPage({
  params,
  searchParams,
}: {
  params: { nextadmin?: string[] }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  await requireAdmin()

  const nextAdminProps = await getNextAdminProps({
    params: params?.nextadmin,
    searchParams: searchParams ?? {},
    prisma,
    basePath: "/admin",
    apiBasePath: "/api/admin",
    options,
  })

  return <NextAdmin {...nextAdminProps} />
}


