import { NextAdmin } from "@premieroctet/next-admin"
import { prisma } from "@/lib/prisma"
import { options } from "@/app/admin/[[...nextadmin]]/options"

const { run } = NextAdmin({
  apiBasePath: "/api/admin",
  prisma,
  schema: options.model,
  options,
})

export { run as DELETE, run as GET, run as POST }

