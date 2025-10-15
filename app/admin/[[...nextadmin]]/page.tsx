import { NextAdmin } from "@premieroctet/next-admin"
import { submitFormAction } from "@premieroctet/next-admin/actions"
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
  
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  return (
    <NextAdmin
      basePath="/admin"
      apiBasePath="/api/admin"
      title="Panel Administracyjny"
      prisma={prisma}
      schema={options.model}
      options={options}
      submitFormAction={submitFormAction}
      searchParams={resolvedSearchParams}
      params={resolvedParams}
    />
  )
}


